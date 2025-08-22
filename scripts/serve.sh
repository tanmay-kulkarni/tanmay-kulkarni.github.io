#!/usr/bin/env zsh
# Simple helper to run the MkDocs site locally (zsh-friendly)
# - Activates .venv if present
# - Falls back to system mkdocs if no venv
# - Runs mkdocs serve on 127.0.0.1:8000 with livereload

set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$REPO_ROOT"

echo "Starting local preview for MkDocs site..."

if [ -d ".venv" ] && [ -f ".venv/bin/activate" ]; then
  echo "Activating .venv..."
  # shellcheck disable=SC1091
  source .venv/bin/activate
else
  echo ".venv not found. Attempting to run system mkdocs."
fi

if ! command -v mkdocs >/dev/null 2>&1; then
  echo "mkdocs not found in PATH. To install quickly, run:"
  echo "  python3 -m pip install --upgrade pip"
  echo "  python3 -m pip install mkdocs mkdocs-terminal pymdown-extensions"
  exit 1
fi

echo "Running: mkdocs serve --dev-addr=127.0.0.1:8000"
exec mkdocs serve --dev-addr=127.0.0.1:8000
