#!/usr/bin/env bash
# Installs Retro Relay into your Obsidian vault(s).
#
#   bash scripts/install-local.sh              # find vaults, ask which
#   bash scripts/install-local.sh --all        # install into every vault found
#   bash scripts/install-local.sh --vault "/path/to/vault"
#   bash scripts/install-local.sh --list       # just show what was found
#
# A vault is any folder containing a `.obsidian` directory. The theme goes to
# <vault>/.obsidian/themes/Retro Relay/ and the folder name must match the
# `name` in manifest.json exactly, or Obsidian will not list it.

set -euo pipefail

THEME_NAME="Retro Relay"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

for f in theme.css manifest.json; do
  [[ -f "$ROOT/$f" ]] || { echo "error: $f not found in $ROOT" >&2; exit 1; }
done

# Places Obsidian vaults usually live on macOS. SEARCH_ROOTS can be overridden
# for testing: SEARCH_ROOTS="/tmp/fake" bash scripts/install-local.sh --list
if [[ -n "${SEARCH_ROOTS:-}" ]]; then
  # shellcheck disable=SC2206
  IFS=$'\n' read -rd '' -a ROOTS <<<"$SEARCH_ROOTS" || true
else
  ROOTS=(
    "$HOME/Library/Mobile Documents/iCloud~md~obsidian/Documents"
    "$HOME/Documents"
    "$HOME/Obsidian"
    "$HOME/Library/CloudStorage"
  )
fi

MODE="ask"
EXPLICIT_VAULT=""
while [[ $# -gt 0 ]]; do
  case "$1" in
    --all)   MODE="all"; shift ;;
    --list)  MODE="list"; shift ;;
    --vault) EXPLICIT_VAULT="${2:-}"; MODE="explicit"; shift 2 ;;
    -h|--help) sed -n '2,14p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "unknown argument: $1" >&2; exit 1 ;;
  esac
done

install_into() {
  local vault="$1"
  local dest="$vault/.obsidian/themes/$THEME_NAME"
  mkdir -p "$dest"
  cp "$ROOT/theme.css" "$ROOT/manifest.json" "$dest/"
  echo "  installed → $dest"
}

if [[ "$MODE" == "explicit" ]]; then
  [[ -d "$EXPLICIT_VAULT" ]] || { echo "error: no such folder: $EXPLICIT_VAULT" >&2; exit 1; }
  if [[ ! -d "$EXPLICIT_VAULT/.obsidian" ]]; then
    echo "warning: $EXPLICIT_VAULT has no .obsidian — is it really a vault?" >&2
    echo "         creating the themes folder anyway." >&2
  fi
  install_into "$EXPLICIT_VAULT"
  echo
  echo "Restart Obsidian, then Settings → Appearance → Themes → $THEME_NAME"
  exit 0
fi

# Discover vaults. -maxdepth 3 catches <root>/<vault>/.obsidian and one level
# deeper, without walking an entire home directory.
VAULTS=()
for r in "${ROOTS[@]}"; do
  [[ -d "$r" ]] || continue
  while IFS= read -r marker; do
    VAULTS+=("$(dirname "$marker")")
  done < <(find "$r" -maxdepth 3 -type d -name ".obsidian" 2>/dev/null)
done

# De-duplicate while preserving order.
if [[ ${#VAULTS[@]} -gt 0 ]]; then
  mapfile -t VAULTS < <(printf '%s\n' "${VAULTS[@]}" | awk '!seen[$0]++')
fi

if [[ ${#VAULTS[@]} -eq 0 ]]; then
  cat >&2 <<EOF
No vaults found. Searched:
$(printf '  %s\n' "${ROOTS[@]}")

If your vault is elsewhere, pass it directly:
  bash scripts/install-local.sh --vault "/path/to/your/vault"
EOF
  exit 1
fi

echo "Found ${#VAULTS[@]} vault(s):"
for i in "${!VAULTS[@]}"; do
  echo "  [$((i + 1))] ${VAULTS[$i]}"
done
echo

[[ "$MODE" == "list" ]] && exit 0

if [[ "$MODE" == "all" ]]; then
  for v in "${VAULTS[@]}"; do install_into "$v"; done
elif [[ ${#VAULTS[@]} -eq 1 ]]; then
  install_into "${VAULTS[0]}"
else
  read -rp "Install into which? (number, or 'a' for all): " choice
  if [[ "$choice" == "a" ]]; then
    for v in "${VAULTS[@]}"; do install_into "$v"; done
  elif [[ "$choice" =~ ^[0-9]+$ ]] && (( choice >= 1 && choice <= ${#VAULTS[@]} )); then
    install_into "${VAULTS[$((choice - 1))]}"
  else
    echo "error: invalid choice" >&2; exit 1
  fi
fi

echo
echo "Restart Obsidian, then Settings → Appearance → Themes → $THEME_NAME"
