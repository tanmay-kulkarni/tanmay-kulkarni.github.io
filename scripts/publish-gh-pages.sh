#!/usr/bin/env bash
# Simple helper to build site with mkdocs and publish to gh-pages using git worktree
# Usage: ./scripts/publish-gh-pages.sh
set -euo pipefail
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

# Activate venv if present
if [ -f .venv/bin/activate ]; then
  # shellcheck disable=SC1091
  source .venv/bin/activate
fi

# Build the site
echo "Building site with mkdocs..."
mkdocs build --clean

# Ensure gh-pages worktree is present
if [ ! -d .deploy ]; then
  echo "Creating worktree for gh-pages..."
  # if gh-pages doesn't exist remotely, create orphan locally
  if git show-ref --verify --quiet refs/heads/gh-pages; then
    git worktree add .deploy gh-pages
  else
    git worktree add .deploy --detach
    (cd .deploy && git init && git checkout -b gh-pages)
  fi
fi

# Copy built site into worktree
echo "Copying built site into .deploy..."
rm -rf .deploy/*
cp -a site/. .deploy/

# Commit & push
cd .deploy
if git status --porcelain | grep -q .; then
  git add --all
  git commit -m "Publish site: $(date -u +%Y-%m-%dT%H:%M:%SZ)"
  git push origin gh-pages
  echo "Site published to gh-pages."
else
  echo "No changes to publish."
fi

# Return to repo root
cd "$REPO_ROOT"
