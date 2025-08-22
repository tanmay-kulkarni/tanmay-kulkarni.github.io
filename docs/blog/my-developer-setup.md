## Developer setup (macOS)

A compact list of tools and a minimal `~/.zshrc` snippet used for local development.

- zsh — Modern, configurable shell with strong plugin support.
- zsh-autosuggestions / zsh-autocomplete — Inline suggestions or completion to speed typing.
- starship — Fast, informative prompt that shows Git/Python status and other context.
- Nerd font (e.g., CascadiaCode Nerd Font) — Provides icons and ligatures for prompts and editors.
- eza — Modern replacement for `ls` with color, git integration, and sensible defaults.

### Minimal `~/.zshrc` snippet

```zsh
# environment and path
. "$HOME/.local/bin/env"
export PATH="$HOME/.local/bin:$PATH"

# starship prompt
eval "$(starship init zsh)"

# zsh autosuggestions (or autocomplete)
source $(brew --prefix)/share/zsh-autosuggestions/zsh-autosuggestions.zsh

# alias using eza
alias ll='eza -l --reverse --time=modified --long'
```

Tips: keep packages updated via Homebrew, install fonts with Homebrew Cask (or a font manager), and use the `scripts/serve.sh` helper to preview the site locally before publishing.