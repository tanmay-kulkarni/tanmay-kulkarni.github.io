Publishing workflow (local -> gh-pages)

Purpose
- This repository keeps source content (markdown, theme overrides) on `main` and serves the built site from the `gh-pages` branch.
- Contributors edit files under `docs/`, `mkdocs.yml`, and `overrides/` on `main`. Built files are not tracked on `main`.

Quick summary
- Build locally with MkDocs, then publish the generated `site/` to the `gh-pages` branch.
- Use the helper script: `./scripts/publish-gh-pages.sh` (recommended).

Commands (one-off / local)
1. Activate the virtualenv (if present) or create one:

   source .venv/bin/activate
   # or
   python3 -m venv .venv && source .venv/bin/activate

2. Install dependencies (first time):

   python -m pip install --upgrade pip
   pip install mkdocs mkdocs-terminal pymdown-extensions pygments

3. Build the site locally:

   mkdocs build --clean

4. Publish using the helper script:

   ./scripts/publish-gh-pages.sh

   - The script uses a git worktree at `.deploy/` to update `gh-pages` safely.
   - If there are remote changes on `gh-pages`, fetch & reset first (the script will handle common cases). If push fails due to remote updates, fetch & reset then run the script again.

Repository policy
- Do not commit the `site/` directory to `main`. `.gitignore` already contains `site/`.
- Keep source content (docs, mkdocs.yml, overrides) in `main`.
- The `gh-pages` branch should contain only built static files (what GitHub Pages serves).

Adding a new blog post (typical flow)
1. Add `docs/blog/your-post.md` and any images or assets under `docs/`.
2. Commit and push to `main`.
3. Build & publish locally:

   mkdocs build --clean
   ./scripts/publish-gh-pages.sh

Optional: automatic CI publish
- If you prefer zero-touch publishing, add a GitHub Actions workflow that runs on pushes to `main`, builds with MkDocs, and pushes `site/` to `gh-pages` (for example, using `peaceiris/actions-gh-pages@v3`).
- This repository currently uses local publish via `scripts/publish-gh-pages.sh` and does not include an automatic Pages workflow on `main`.

Rollback
- `gh-pages` is a git branch. To roll back the published site, revert or reset the `gh-pages` branch to an earlier commit and push.

Notes & troubleshooting
- If `git push` to `gh-pages` is rejected because the remote is ahead, run:

  git fetch origin gh-pages
  cd .deploy
  git reset --hard origin/gh-pages
  cd ..
  cp -a site/. .deploy/
  cd .deploy
  git add --all
  git commit -m "Publish site: <timestamp>" || echo "No changes"
  git push origin gh-pages

- If you prefer not to manage `git worktree`, follow the minimal orphan-branch method shown in the repo history, but be aware it force-pushes the branch.

Run the site locally for development
-----------------------------------

You can run a local development server to preview changes before publishing. A small helper script is included at `scripts/serve.sh`.

1. Ensure the script is executable and activate your virtualenv if needed:

   source .venv/bin/activate
   chmod +x scripts/serve.sh

2. Run the helper:

   ./scripts/serve.sh

3. Open the site in your browser (default):

   http://127.0.0.1:8000

The dev server will reload when you edit markdown or assets. Use this to verify layout, code highlighting, and interactive previews before running `./scripts/publish-gh-pages.sh`.

Contact
- If you want this converted to an automated CI deployment instead, open an issue or ask in PR comments and we can add a tested workflow.
