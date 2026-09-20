#!/usr/bin/env bash
# ═══════════════════════════════════════════════════════════════
#  חזרה לרילוז הקודם.
#
#  מיקום בשרת:  /usr/local/bin/cd-rollback
#  שימוש:       cd-rollback              → פרודקשן
#               cd-rollback staging      → סטייג'ינג
#               cd-rollback list         → הצגת הרילוזים הקיימים
#
#  ההחלפה אטומית ולוקחת פחות משנייה. אין צורך להפעיל מחדש את nginx.
# ═══════════════════════════════════════════════════════════════
set -euo pipefail

TARGET="${1:-production}"

case "$TARGET" in
  production|prod) ROOT=/var/www/chiefdesigns-next ;;
  staging)         ROOT=/var/www/chiefdesigns-staging ;;
  list)
    for r in /var/www/chiefdesigns-next /var/www/chiefdesigns-staging; do
      [ -d "$r" ] || continue
      echo "── $r"
      echo "   פעיל כעת: $(readlink "$r/current" 2>/dev/null || echo 'אין')"
      ls -1dt "$r"/releases/*/ 2>/dev/null | sed 's|.*/releases/|   |' || true
    done
    exit 0 ;;
  *) echo "שימוש: $0 [production|staging|list]" >&2; exit 1 ;;
esac

cd "$ROOT"

if [ ! -f .previous ]; then
  echo "אין רילוז קודם שמור ב-$ROOT/.previous" >&2
  echo "הרילוזים הקיימים:" >&2
  ls -1dt releases/*/ >&2
  exit 1
fi

PREV="$(cat .previous)"
CURR="$(readlink current)"

if [ ! -d "$PREV" ]; then
  echo "הרילוז הקודם ($PREV) כבר נמחק" >&2
  exit 1
fi

if [ ! -f "$PREV/index.html" ]; then
  echo "הרילוז הקודם ($PREV) לא מכיל index.html — לא מחליף" >&2
  exit 1
fi

echo "מ:  $CURR"
echo "אל: $PREV"

# הרילוז שאנחנו עוזבים הופך להיות ה'קודם', כדי שאפשר יהיה לחזור קדימה
echo "$CURR" > .previous

ln -sfn "$PREV" .current-new
mv -Tf .current-new current

echo "בוצע. הדפדפן עשוי להחזיק קאש — רענון קשיח יראה את השינוי."
