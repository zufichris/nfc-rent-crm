#!/bin/bash

# Define commit messages for each file
declare -A commit_messages=(
    ["auto-commit.sh"]="Update auto-commit script for improved automation."
    ["types/shared.ts"]="Refactor shared types to enhance reusability."
    ["components/cars/car-form.tsx"]="Remove outdated car form component."
    ["lib/services/bookings.ts"]="Delete unused booking service to clean up codebase."
    ["types/features.ts"]="Remove deprecated feature types."
    ["components/feature/car-features-input.tsx"]="Add car features input component."
    ["components/misc/multi-select.tsx"]="Introduce reusable multi-select component."
    ["components/models/models-select.tsx"]="Implement models select dropdown component."
)

# Add, commit, and push each file
for file in "${!commit_messages[@]}"; do
    if [ -e "$file" ]; then
        git add "$file"
        git commit -m "${commit_messages[$file]}"
    else
        echo "Skipping $file (not found)"
    fi
done

# Push changes
git push origin $(git rev-parse --abbrev-ref HEAD)

