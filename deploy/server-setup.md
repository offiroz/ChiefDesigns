# הקמה חד-פעמית בשרת

כל מה שכאן מורץ פעם אחת. אחרי זה כל פריסה היא `git push` בלבד.

השרת: `188.166.105.12` (DigitalOcean) — אותו droplet שמריץ את הבוט. האתר כבר מתארח עליו, אז אין העברת דומיין.

---

## המצב בשרת — נבדק ב-20.09.2026

| | |
|---|---|
| nginx | 1.26.0 (Ubuntu) — תומך ב-`http2 on` |
| IPv6 | פעיל — שורות `listen [::]` נשארות |
| קונפיג האתר הקיים | `/etc/nginx/sites-enabled/chiefdesigns-new` |
| root הקיים | `/var/www/chiefdesigns` |
| תעודה | `/etc/letsencrypt/live/chiefdesigns.co.il/` — קיימת |
| קונפיגים נוספים | `whatsapp-bot` |

הקבצים כאן כבר מותאמים לערכים האלה. אין מה לערוך.

**האתר החדש יושב בתיקייה חדשה, `/var/www/chiefdesigns-next`.** `/var/www/chiefdesigns` לא נמחקת, לא זזה ולא משתנה — היא נשארת בדיוק כפי שהיא. זו רשת הביטחון: אם משהו משתבש אחרי ההחלפה, מחזירים שורה אחת ב-nginx והאתר הישן חוזר.

---

## 0. גיבוי

```bash
sudo tar czf ~/backup-nginx-$(date +%F).tar.gz /etc/nginx
sudo tar czf ~/backup-site-$(date +%F).tar.gz /var/www/chiefdesigns
ls -lh ~/backup-*.tar.gz
```

---

## 1. משתמש ייעודי לפריסה

לא פורסים עם root. אם המפתח שב-GitHub ידלוף, הנזק מוגבל לתיקיות האתר.

```bash
sudo adduser --disabled-password --gecos "" deploy

# תיקיות חדשות. /var/www/chiefdesigns הקיימת לא נגעת.
sudo mkdir -p /var/www/chiefdesigns-next/releases \
              /var/www/chiefdesigns-staging/releases \
              /var/www/certbot

sudo chown -R deploy:www-data /var/www/chiefdesigns-next /var/www/chiefdesigns-staging
sudo chmod -R 755 /var/www/chiefdesigns-next /var/www/chiefdesigns-staging
```

---

## 2. מפתח SSH ל-GitHub

**את הפקודה הזו מריצים על המחשב שלך, לא על השרת:**

```bash
ssh-keygen -t ed25519 -C "github-actions-chiefdesigns" -f ~/.ssh/cd_deploy -N ""
```

נוצרו שני קבצים. הציבורי עולה לשרת:

```bash
ssh-copy-id -i ~/.ssh/cd_deploy.pub deploy@188.166.105.12
ssh -i ~/.ssh/cd_deploy deploy@188.166.105.12 "echo החיבור עובד"
```

ואת טביעת האצבע של השרת:

```bash
ssh-keyscan -H 188.166.105.12
```

### ה-Secrets ב-GitHub

`Settings → Secrets and variables → Actions → New repository secret`

| שם | ערך |
|---|---|
| `SSH_HOST` | `188.166.105.12` |
| `SSH_USER` | `deploy` |
| `SSH_PRIVATE_KEY` | תוכן `~/.ssh/cd_deploy` — **כולל** שורות ה-BEGIN וה-END |
| `SSH_KNOWN_HOSTS` | הפלט של `ssh-keyscan` |
| `SSH_PORT` | רק אם השרת לא על 22 |

> המפתח הפרטי לא נכנס לריפו, לא לקובץ `.env`, ולא להודעה בוואטסאפ. רק לשדה הזה.

---

## 3. DNS לסטייג'ינג

בממשק ניהול הדומיין, רשומה אחת חדשה. הרשומה הקיימת לא זזה.

| סוג | שם | ערך |
|---|---|---|
| A | `staging` | `188.166.105.12` |

להמתין להתפשטות ולוודא:

```bash
dig +short staging.chiefdesigns.co.il
```

צריך לחזור ה-IP של השרת. בלי זה certbot ייכשל בשלב הבא.

---

## 4. nginx

```bash
# מהמחשב שלך, מתיקיית הפרויקט:
scp deploy/nginx/*.conf root@188.166.105.12:/tmp/
scp deploy/nginx/snippets/security-headers.conf root@188.166.105.12:/tmp/

# על השרת:
sudo mkdir -p /etc/nginx/snippets
sudo cp /tmp/security-headers.conf /etc/nginx/snippets/
sudo cp /tmp/chiefdesigns.co.il.conf /tmp/staging.chiefdesigns.co.il.conf \
        /etc/nginx/sites-available/

sudo ln -sfn /etc/nginx/sites-available/staging.chiefdesigns.co.il.conf \
             /etc/nginx/sites-enabled/
```

**שים לב לסדר:** בשלב הזה מפעילים רק את הסטייג'ינג. הקונפיג של הפרודקשן יושב ב-`sites-available` וממתין — האתר החי ממשיך לרוץ על הקונפיג הקיים עד שנחליט להחליף (שלב 7).

סיסמה לסטייג'ינג:

```bash
sudo apt install -y apache2-utils
sudo htpasswd -c /etc/nginx/.htpasswd-staging offir
```

תעודת SSL:

```bash
sudo certbot --nginx -d staging.chiefdesigns.co.il
sudo nginx -t && sudo systemctl reload nginx
```

---

## 5. סקריפט ה-rollback

```bash
scp deploy/rollback.sh root@188.166.105.12:/tmp/
# על השרת:
sudo install -m 755 /tmp/rollback.sh /usr/local/bin/cd-rollback
cd-rollback list
```

---

## 6. הפריסה הראשונה

```bash
git checkout -b redesign
git add .
git commit -m "אתר חדש: Next.js, טוקני נגישות, שלושה עמודים משפטיים"
git push -u origin redesign
```

ה-Action רץ אוטומטית. לצפייה: לשונית Actions בריפו.

התוצאה אמורה לעלות ב-`https://staging.chiefdesigns.co.il` (עם הסיסמה משלב 4).

> בדיקת העשן בסוף ה-Action תיכשל בסטייג'ינג בגלל ה-`auth_basic` — היא תקבל 401 ולא 200. זה צפוי בפריסה הראשונה. אם זה מפריע, הוסף את פרטי הגישה לבדיקה או הסר זמנית את הסיסמה.

---

## 7. ההחלפה בפרודקשן

רק אחרי שכל הצ׳קליסט בתכנית העבודה מסומן.

**קודם** דוחפים ל-main, כדי ש-`/var/www/chiefdesigns-next/current` יהיה מלא כשה-nginx יצביע אליו. מהמחשב:

```bash
git checkout main
git merge redesign
git push
```

ממתינים שה-Action יסיים (בדיקת העשן שלו תיכשל — עדיין לא החלפנו את nginx; זה צפוי). מוודאים שהתוכן הגיע:

```bash
ls -l /var/www/chiefdesigns-next/current/
```

**ורק אז** מחליפים את nginx:

```bash
sudo tar czf ~/pre-switch-$(date +%F-%H%M).tar.gz /var/www/chiefdesigns /etc/nginx

sudo rm /etc/nginx/sites-enabled/chiefdesigns-new
sudo ln -sfn /etc/nginx/sites-available/chiefdesigns.co.il.conf \
             /etc/nginx/sites-enabled/

sudo nginx -t          # אם זה לא עובר — לא ממשיכים
sudo systemctl reload nginx
```

> ⚠ **שינוי התנהגות שכדאי להכיר.** הקונפיג הישן תפס גם את `188.166.105.12` כ-server_name, וכך האפיל על הבלוק של `whatsapp-bot` שמוגדר על אותה כתובת ב-port 80. הקונפיג החדש מוגדר על שמות הדומיין בלבד, ולכן אחרי ההחלפה פנייה ל-IP החשוף בפורט 80 תגיע לבוט ולא לאתר. אם משהו אצלך פונה ל-`http://188.166.105.12` ומצפה לאתר — בדוק את זה לפני ההחלפה.

### בדיקת עשן, עשר דקות

```bash
curl -sSI https://chiefdesigns.co.il/           | head -1   # 200
curl -sSI https://chiefdesigns.co.il/privacy.html | head -2  # 301 → /privacy/
curl -sSI https://chiefdesigns.co.il/terms.html   | head -2  # 301 → /terms/
curl -sS  https://chiefdesigns.co.il/robots.txt              # Allow, לא Disallow
curl -sS  https://chiefdesigns.co.il/sitemap.xml | head -5
```

בדפדפן: עמוד הבית, טופס יצירת הקשר עד וואטסאפ, שלושת הקישורים בפוטר, ומעבר Tab על כל האתר.

### אם משהו לא בסדר

חזרה לרילוז קודם של האתר החדש:

```bash
cd-rollback
```

חזרה לאתר הישן לגמרי — שורה אחת:

```bash
sudo rm /etc/nginx/sites-enabled/chiefdesigns.co.il.conf
sudo ln -sfn /etc/nginx/sites-available/chiefdesigns-new /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

`/var/www/chiefdesigns` נשארה שלמה כל הזמן הזה, אז זה מחזיר את המצב המדויק שהיה.

---

## 8. אחרי העלייה

- Google Search Console: אימות הדומיין והגשת `sitemap.xml`
- מעקב אחר שגיאות זחילה בשבועיים הראשונים
- `npm audit` אחת לחודש

---

## מתי למחוק את האתר הישן

לא בשבוע הראשון. אחרי שבועיים של פעילות תקינה ו-Search Console נקי:

```bash
sudo mv /var/www/chiefdesigns /var/www/chiefdesigns-old-$(date +%F)
```

לשנות שם, לא למחוק. מחיקה — רק אחרי חודש.

---

## נספח: תיקון שכדאי לעשות בלי קשר

הלוגו באתר הנוכחי נטען מ-`offiroz.github.io/ChiefDesigns/`, כלומר הפרודקשן תלוי ב-GitHub Pages בשביל תמונה. בשלד החדש הנכסים יושבים ב-`public/` ונפרסים עם האתר, אז זה נפתר מאליו — אבל אם האתר הישן יישאר באוויר עוד זמן מה, שווה להוריד את הקובץ לשרת ולעדכן את ה-`src`.
