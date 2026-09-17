#!/usr/bin/env bash
# prepare-media.sh — builds every shipped media file from the read-only sources.
# Reproducible: re-running overwrites outputs only inside this folder. Source files are never modified.
#
#   bash scripts/prepare-media.sh            # everything
#   bash scripts/prepare-media.sh clips      # only the app clips (+ their check sheets)
#
# Requires ffmpeg (libx264, libvpx-vp9, libwebp) and node with `sharp` installed.
set -euo pipefail
cd "$(dirname "$0")/.."

ROOT=${TARIQ_ROOT:-$HOME/projects/Tariq-dz}
DEMO="$ROOT/TARIQ_AI_Demo_2min.mp4"
TERM_DIR="$ROOT/tariq-hardware/models/ourterminal"
FILM="$TERM_DIR/film/tariq-terminal-film.mp4"
CLIPS=public/media/clips
FILMOUT=public/media/film
CHECK=.shots/media-check
mkdir -p "$CLIPS" "$FILMOUT" "$CHECK" src/assets/app

ONLY=${1:-all}

# ---------------------------------------------------------------------------------------------
# App demo video (540x960 screen recording, pillarboxed).
# Measured on frames 16/44/70/95/108/114 s: the phone picture is x 53..486, the Android status bar
# is rows 0..29, the 3-button navigation bar starts at row ~918. Crop = 434x888 at (53,30).
# The home header shows the account's greeting ("Bonjour, <name>") and an initial avatar: both are
# painted over with the header's own colour #2E2E2E before cropping (REDACT_HOME).
# ---------------------------------------------------------------------------------------------
CROP="crop=434:888:53:30"
REDACT_HOME="drawbox=x=110:y=33:w=140:h=21:color=0x2E2E2E:t=fill,drawbox=x=418:y=30:w=64:h=54:color=0x2E2E2E:t=fill"

# name | start (s, source time) | duration (s) | redact home header? | poster offset (s into clip)
# Every range is inside the prompt's safe ranges and was checked on a single-decode timeline:
#   0:34 and 0:56 profile (name, phone) · 0:60–1:09 Chargily (name, email, phone) · 0:40 "LIVE" badge ·
#   1:59 greeting — all excluded. Place cards (0:42–0:54, 1:32–1:37, 1:41+) show star ratings and review
#   counts from demo data; clips and stills are cut to avoid them (they read as statistics). The wallet screen
#   (1:11–1:14) shows an "Unlock higher limits … 50,000 DA" banner (a number and an unlisted feature): only the
#   top-up-confirmed screen (1:10.6) is used. The map pan (0:20–0:25) was dropped: it zooms onto business names
#   (Caterpillar, SOFTAL) that could read as partners.
CLIP_TABLE="
home|14.2|4.6|yes|1.8
ai-dayplan|98.1|3.0|no|0.5
route|108.9|4.0|no|1.2
trip|115.9|2.6|no|1.4
ai-open|35.5|1.5|no|0.3
ai-rush|37.0|4.2|no|1.6
ai-jardin|44.4|5.0|no|2.0
ai-martyrs|50.4|4.4|no|2.2
ai-day|91.0|2.4|no|0.4
ai-casbah|93.3|3.6|no|1.5
ai-nav|107.4|5.0|no|3.6
"
# The seven ai-* clips drive the Tariq AI section on /app (D-102). They follow the recording's own order:
# open -> rush hour -> Jardin -> Maqam Echahid -> the day laid out -> Casbah -> navigation, and each place
# clip shows its Overview / Tips / Getting There tabs being tapped.
# Boundaries verified frame by frame, not estimated: the profile screen showing a display name and wallet
# balance is on screen until 35.3 and clean from 35.4, so ai-open starts at 35.5; ai-martyrs ends at 54.8,
# before the assistant returns to its welcome. The Chargily window (63.5-72.5, email + full name) is nowhere
# near any range. Every clip is <= 5.0 s, so each plays once per view with no control (WCAG 2.2.2, D-31).

# name | source time (s) | redact?
STILL_TABLE="
home|16.0|yes
map|20.4|no
ai-welcome|36.6|no
topup|70.6|no
"

vf_for() { # $1 = redact yes/no
  if [ "$1" = yes ]; then echo "$REDACT_HOME,$CROP"; else echo "$CROP"; fi
}

check_sheet() { # $1 = encoded clip, $2 = source start, $3 = out png
  # 2 fps sheet of the ENCODED file, each tile labelled with its source timestamp, for a human check.
  ffmpeg -nostdin -v error -y -i "$1" -vf "fps=2,scale=217:-2,drawtext=text='%{eif\:t+$2\:d}.%{eif\:mod((t+$2)*10\,10)\:d}s':x=4:y=4:fontsize=18:fontcolor=yellow:box=1:boxcolor=black,tile=10x2:padding=4" -frames:v 1 "$3"
}

if [ "$ONLY" = all ] || [ "$ONLY" = clips ]; then
  echo "== app clips"
  echo "$CLIP_TABLE" | while IFS='|' read -r name ss dur redact poster; do
    [ -z "$name" ] && continue
    vf=$(vf_for "$redact")
    ffmpeg -nostdin -v error -y -ss "$ss" -t "$dur" -i "$DEMO" -an -vf "$vf,fps=30" \
      -c:v libx264 -profile:v high -preset slow -crf 23 -pix_fmt yuv420p -movflags +faststart "$CLIPS/$name.mp4"
    ffmpeg -nostdin -v error -y -ss "$ss" -t "$dur" -i "$DEMO" -an -vf "$vf,fps=30" \
      -c:v libvpx-vp9 -b:v 0 -crf 38 -row-mt 1 -deadline good -cpu-used 2 -pix_fmt yuv420p "$CLIPS/$name.webm"
    ffmpeg -nostdin -v error -y -ss "$poster" -i "$CLIPS/$name.mp4" -frames:v 1 -c:v libwebp -quality 82 "$CLIPS/$name.webp"
    check_sheet "$CLIPS/$name.mp4" "$ss" "$CHECK/clip-$name.png"
    printf "   %-11s mp4 %6s KB  webm %6s KB\n" "$name" $(( $(stat -c %s "$CLIPS/$name.mp4") / 1024 )) $(( $(stat -c %s "$CLIPS/$name.webm") / 1024 ))
  done
fi

if [ "$ONLY" = all ] || [ "$ONLY" = stills ]; then
  echo "== app stills"
  echo "$STILL_TABLE" | while IFS='|' read -r name ss redact; do
    [ -z "$name" ] && continue
    ffmpeg -nostdin -v error -y -ss "$ss" -i "$DEMO" -frames:v 1 -vf "$(vf_for "$redact")" "src/assets/app/$name.png"
  done
  rm -f src/assets/app/{search,places,casbah,maproute,trip,rating,wallet,dayplan}.png  # superseded stills (ratings, a limits banner, weak)
  ffmpeg -nostdin -v error -y $(for f in src/assets/app/*.png; do echo -i "$f"; done) -filter_complex \
    "$(i=0; for f in src/assets/app/*.png; do echo -n "[$i]scale=217:444[s$i];"; i=$((i+1)); done)$(i=0; for f in src/assets/app/*.png; do echo -n "[s$i]"; i=$((i+1)); done)hstack=inputs=$(ls src/assets/app/*.png | wc -l)" \
    "$CHECK/stills.png"
fi

if [ "$ONLY" = all ] || [ "$ONLY" = film ]; then
  echo "== terminal film (kept at native 854x480; no upscale)"
  ffmpeg -nostdin -v error -y -i "$FILM" -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart "$FILMOUT/tariq-terminal-film.mp4"
  ffmpeg -nostdin -v error -y -ss 63 -i "$FILM" -frames:v 1 -c:v libwebp -quality 82 "$FILMOUT/tariq-terminal-film.webp"
  printf "   film mp4 %s KB\n" $(( $(stat -c %s "$FILMOUT/tariq-terminal-film.mp4") / 1024 ))
fi

if [ "$ONLY" = all ] || [ "$ONLY" = images ]; then
  echo "== images (renders, screens, screenshots, vehicles, brand)"
  node scripts/lib/prepare-images.mjs
fi

echo "done. Check sheets: $CHECK/"
