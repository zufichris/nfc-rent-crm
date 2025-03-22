#!/bin/bash
# Set script to exit on error
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to log messages
log() {
  echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1"
}

# Function to log errors and exit
error() {
  echo -e "${RED}[ERROR]${NC} $1" >&2
  exit 1
}

# Check if we're in a git repository
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  error "Not a git repository!"
fi

# Get the current branch name
current_branch=$(git branch --show-current)
log "Processing changes in branch: $current_branch"

# Counter for committed files
commit_count=0

# Store git status output
status_output=$(git status --porcelain)

# Function to commit a file
commit_file() {
  local file="$1"
  local status="$2"
  local message="$3"
  
  if [ "$status" = "D" ]; then
    git rm "$file" 2>/dev/null || error "Failed to stage deletion of $file"
  else
    git add "$file" 2>/dev/null || error "Failed to stage $file"
  fi
  
  git commit -m "$message" || error "Failed to commit $file"
  ((commit_count++))
  log "Committed $file"
}

# Process each line from the stored git status output
echo "$status_output" | while IFS= read -r status_and_file; do
  # Skip empty lines
  [ -z "$status_and_file" ] && continue
  
  # Extract status and filename
  status="${status_and_file:0:2}"
  file="${status_and_file:3}"
  
  # Skip .DS_Store files
  if [[ "$file" == *".DS_Store"* ]]; then
    continue
  fi
  
  # Handle different statuses
  case "$status" in
    "M "| " M"|"MM")
      # Modified files
      commit_file "$file" "M" "chore: update $file
- Modified existing file
- Path: $file"
      ;;
    
    "D "| " D"|"DD")
      # Deleted files
      commit_file "$file" "D" "refactor: remove $file
- Removed file from repository
- Path: $file"
      ;;
    
    "A ")
      # Added files
      commit_file "$file" "A" "feat: add $file
- Added new file to repository
- Path: $file"
      ;;
    
    "??")
      # Untracked files
      commit_file "$file" "??" "feat: add $file
- Added new untracked file
- Path: $file"
      ;;
    
    "R "*)
      # Renamed files 
      if [[ "$file" =~ (.*)\ ->\ (.*) ]]; then
        old_file="${BASH_REMATCH[1]}"
        new_file="${BASH_REMATCH[2]}"
        git add "$new_file" || error "Failed to stage renamed file $new_file"
        git commit -m "refactor: rename $old_file to $new_file
- Renamed file
- From: $old_file
- To: $new_file" || error "Failed to commit renamed file: $old_file to $new_file"
        ((commit_count++))
        log "Committed rename of $old_file to $new_file"
      else
        error "Could not parse renamed file: $file"
      fi
      ;;
    
    *)
      # Fallback for unhandled status codes
      commit_file "$file" "$status" "chore: update $file
- Updated file with status $status
- Path: $file"
      ;;
  esac
done

# Use process substitution instead of pipe to avoid subshell
while IFS= read -r status_and_file; do
  # Skip empty lines
  [ -z "$status_and_file" ] && continue
  
  # Extract status and filename
  status="${status_and_file:0:2}"
  file="${status_and_file:3}"
  
  # Skip .DS_Store files
  if [[ "$file" == *".DS_Store"* ]]; then
    continue
  fi
  
  # Handle different statuses
  case "$status" in
    "M "| " M"|"MM")
      # Modified files
      commit_file "$file" "M" "chore: update $file
- Modified existing file
- Path: $file"
      ;;
    
    "D "| " D"|"DD")
      # Deleted files
      commit_file "$file" "D" "refactor: remove $file
- Removed file from repository
- Path: $file"
      ;;
    
    "A ")
      # Added files
      commit_file "$file" "A" "feat: add $file
- Added new file to repository
- Path: $file"
      ;;
    
    "??")
      # Untracked files
      commit_file "$file" "??" "feat: add $file
- Added new untracked file
- Path: $file"
      ;;
    
    "R "*)
      # Renamed files 
      if [[ "$file" =~ (.*)\ ->\ (.*) ]]; then
        old_file="${BASH_REMATCH[1]}"
        new_file="${BASH_REMATCH[2]}"
        git add "$new_file" || error "Failed to stage renamed file $new_file"
        git commit -m "refactor: rename $old_file to $new_file
- Renamed file
- From: $old_file
- To: $new_file" || error "Failed to commit renamed file: $old_file to $new_file"
        ((commit_count++))
        log "Committed rename of $old_file to $new_file"
      else
        error "Could not parse renamed file: $file"
      fi
      ;;
    
    *)
      # Fallback for unhandled status codes
      commit_file "$file" "$status" "chore: update $file
- Updated file with status $status
- Path: $file"
      ;;
  esac
done < <(echo "$status_output")

# Final summary
if [ $commit_count -gt 0 ]; then
  log "Successfully processed $commit_count files"
else
  log "No changes to commit"
fi