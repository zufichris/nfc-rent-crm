#!/bin/bash
# Loop over each line of git status in porcelain mode.
while IFS= read -r line; do
  # The first two characters are the status code; the rest is the filename.
  status="${line:0:2}"
  file="${line:3}"

  # Determine the commit message based on file status.
  if [[ "$status" =~ M ]]; then
    # Modified files.
    git add "$file"
    git commit -m "chore: update $file"
  elif [[ "$status" =~ D ]]; then
    # Deleted files.
    # Use 'git rm' to register the deletion.
    git rm "$file"
    git commit -m "refactor: remove $file"
  elif [[ "$status" == "??" ]]; then
    # Untracked files.
    git add "$file"
    git commit -m "feat: add $file"
  else
    # Fallback commit message.
    git add "$file"
    git commit -m "chore: update $file"
  fi

done < <(git status --porcelain)
