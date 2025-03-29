#!/bin/bash

# Define the branch to push to
BRANCH="main"

# Get the list of modified, deleted, and untracked files
FILES=$(git status --porcelain | awk '{print $2}')

# Loop over each file/directory
for file in $FILES; do
  echo "Processing: $file"

  # Add the file (handles modifications, deletions, and untracked files)
  git add "$file"

  # Check if there is something to commit
  if git diff --cached --quiet; then
    echo "No changes to commit for $file."
    continue
  fi

  # Commit with a message including the file path
  git commit -m "Update: $file"

  # Push the commit
  git push origin "$BRANCH"

  # Optional: Sleep briefly to avoid overwhelming the remote server
  sleep 1
done

echo "All files processed and pushed."
