## Developer setup (macOS)

A compact list of useful tools and a minimal `~/.zshrc` snippet I use for local development on macOS.

### Recommended tools

- `zsh` — Modern, configurable shell with strong plugin support.
- `zsh-autosuggestions` / `zsh-autocomplete` — Inline suggestions or completion to speed typing.
- `starship` — Fast, informative prompt that shows Git/Python status and other context.
- Nerd font (for example, CascadiaCode Nerd Font) — Provides icons and ligatures for prompts and editors.
- `eza` — Modern replacement for `ls` with color, git integration, and sensible defaults.

### Minimal `~/.zshrc` snippet

Drop the following into your `~/.zshrc` (adjust paths as needed):

```zsh
# environment and path
. "$HOME/.local/bin/env"
export PATH="$HOME/.local/bin:$PATH"

# starship prompt
eval "$(starship init zsh)"

# zsh autosuggestions (installed via Homebrew)
source "$(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh"

# useful alias using eza
alias ll='eza -l --reverse --time=modified --long'
```

Notes:
- Ensure `~/.local/bin` is created and on your `PATH` before adding scripts there.
- If you installed `zsh-autosuggestions` with Homebrew, the `$(brew --prefix)` expansion points to the right location.

---

## Update Homebrew and all installed packages

Keep a small helper script to update Homebrew and all installed packages. Create a file called `brew-update.sh` with these contents:

```bash
#!/usr/bin/env bash
set -euo pipefail

# update Homebrew metadata, upgrade all packages, then clean old versions
brew update && brew upgrade && brew cleanup
echo "Homebrew update complete."
```

Make it executable and (optionally) move it into `~/.local/bin` so you can run it from anywhere:

```bash
chmod +x brew-update.sh
mkdir -p ~/.local/bin
mv brew-update.sh ~/.local/bin/brew-update
```

Now you can run `brew-update` from the command line.

Optional: add `~/.local/bin` to your `PATH` in `~/.zshrc` if it isn't already:

```zsh
export PATH="$HOME/.local/bin:$PATH"
```
