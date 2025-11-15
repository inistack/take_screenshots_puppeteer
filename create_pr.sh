#!/bin/bash

# Script to create a GitHub Pull Request
# Usage: GITHUB_TOKEN=your_token ./create_pr.sh
# Or: export GITHUB_TOKEN=your_token && ./create_pr.sh

REPO_OWNER="inistack"
REPO_NAME="take_screenshots_puppeteer"
BRANCH="chore-remove-set-viewport-437a1"
BASE_BRANCH="main"
TITLE="Remove setViewport and add PDF generation functionality"
BODY="This PR:
- Removes the page.setViewport() call from screenshot.js
- Adds PDF generation functionality using page.pdf()

Changes:
- Removed viewport setting (line 11)
- Added PDF generation code that creates a PDF from the LambdaTest homepage"

# Check if token is provided
if [ -z "$GITHUB_TOKEN" ]; then
    echo "Error: GITHUB_TOKEN environment variable is not set"
    echo "Please set it with: export GITHUB_TOKEN=your_token"
    exit 1
fi

# Create PR using GitHub API
RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/pulls" \
  -d "{
    \"title\": \"$TITLE\",
    \"body\": \"$BODY\",
    \"head\": \"$BRANCH\",
    \"base\": \"$BASE_BRANCH\"
  }")

# Check if PR was created successfully
PR_URL=$(echo "$RESPONSE" | grep -o '"html_url":"[^"]*"' | cut -d'"' -f4)

if [ -n "$PR_URL" ]; then
    echo "✅ Pull request created successfully!"
    echo "🔗 PR URL: $PR_URL"
else
    echo "❌ Failed to create pull request"
    echo "Response: $RESPONSE"
    exit 1
fi


