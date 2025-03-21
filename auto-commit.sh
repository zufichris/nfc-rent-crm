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

# Process git status output
while IFS= read -r line; do
  # Skip empty lines
  [ -z "$line" ] && continue
  
  # Extract status: first character (index), second character (working tree), and filename
  index_status="${line:0:1}"
  worktree_status="${line:1:1}"
  file="${line:3}"
  
  # Skip .DS_Store files
  if [[ "$file" == *".DS_Store"* ]]; then
    continue
  fi

  # Handle different statuses
  if [ "$index_status" = "M" ] || [ "$worktree_status" = "M" ]; then
    # Modified files
    commit_file "$file" "M" "chore: update $file

- Modified existing file
- Path: $file"
  elif [ "$index_status" = "D" ] || [ "$worktree_status" = "D" ]; then
    # Deleted files
    commit_file "$file" "D" "refactor: remove $file

- Removed file from repository
- Path: $file"
  elif [ "$index_status" = "A" ]; then
    # Added files
    commit_file "$file" "A" "feat: add $file

- Added new file to repository
- Path: $file"
  elif [ "$index_status" = "?" ] && [ "$worktree_status" = "?" ]; then
    # Untracked files
    commit_file "$file" "??" "feat: add $file

- Added new untracked file
- Path: $file"
  elif [ "$index_status" = "R" ]; then
    # Renamed files (e.g., "R  old_file -> new_file")
    old_file=$(echo "$file" | cut -d' ' -f1)
    new_file=$(echo "$file" | cut -d' ' -f3)
    git add "$new_file" || error "Failed to stage renamed file $new_file"
    git commit -m "refactor: rename $old_file to $new_file

- Renamed file
- From: $old_file
- To: $new_file" || error "Failed to commit renamed file: $old_file to $new_file"
    ((commit_count++))
    log "Committed rename of $old_file to $new_file"
  else
    # Fallback for unhandled status codes
    commit_file "$file" "$index_status$worktree_status" "chore: update $file

- Updated file with status $index_status$worktree_status
- Path: $file"
  fi

done < <(git status --porcelain)

# Final summary
if [ $commit_count -gt 0 ]; then
  log "Successfully processed $commit_count files"
else
  log "No changes to commit"
fi