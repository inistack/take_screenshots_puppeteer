#!/usr/bin/env python3
"""
Script to create a GitHub Pull Request
Usage: 
    GITHUB_TOKEN=your_token python3 create_pr.py
    Or: python3 create_pr.py (will prompt for token)
"""

import os
import sys
import json
import urllib.request
import urllib.error
import getpass

REPO_OWNER = "inistack"
REPO_NAME = "take_screenshots_puppeteer"
BRANCH = "chore-remove-set-viewport-437a1"
BASE_BRANCH = "main"
TITLE = "Remove setViewport and add PDF generation functionality"
BODY = """This PR:
- Removes the page.setViewport() call from screenshot.js
- Adds PDF generation functionality using page.pdf()

Changes:
- Removed viewport setting (line 11)
- Added PDF generation code that creates a PDF from the LambdaTest homepage"""

def create_pr(token):
    """Create a pull request using GitHub API"""
    url = f"https://api.github.com/repos/{REPO_OWNER}/{REPO_NAME}/pulls"
    
    data = {
        "title": TITLE,
        "body": BODY,
        "head": BRANCH,
        "base": BASE_BRANCH
    }
    
    req = urllib.request.Request(url)
    req.add_header("Authorization", f"token {token}")
    req.add_header("Accept", "application/vnd.github.v3+json")
    req.add_header("Content-Type", "application/json")
    
    try:
        with urllib.request.urlopen(req, data=json.dumps(data).encode()) as response:
            result = json.loads(response.read().decode())
            pr_url = result.get("html_url")
            if pr_url:
                print("✅ Pull request created successfully!")
                print(f"🔗 PR URL: {pr_url}")
                return True
            else:
                print("❌ Failed to create pull request")
                print(f"Response: {result}")
                return False
    except urllib.error.HTTPError as e:
        error_body = e.read().decode()
        print(f"❌ Error creating pull request: {e.code}")
        try:
            error_json = json.loads(error_body)
            print(f"Message: {error_json.get('message', error_body)}")
        except:
            print(f"Response: {error_body}")
        return False
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    token = os.environ.get("GITHUB_TOKEN")
    
    if not token:
        print("GITHUB_TOKEN environment variable not set.")
        token = getpass.getpass("Enter your GitHub personal access token: ")
    
    if not token:
        print("Error: Token is required")
        sys.exit(1)
    
    create_pr(token)

if __name__ == "__main__":
    main()


