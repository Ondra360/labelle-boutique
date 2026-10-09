# La Belle Boutique — web

Statický, vícestránkový web butiku La Belle Boutique. Publikovaná verze běží na:

https://labelle-boutique-prague-2026.bloomy-basil-9958.chatgpt.site

## Práce ve VS Code

Otevři tuto složku ve VS Code. Veškerý veřejný obsah je ve složce `dist/`.

Lokální náhled spustíš z kořenové složky projektu:

```powershell
python -m http.server 4173 --directory dist
```

Potom otevři `http://127.0.0.1:4173`.

## Struktura

- `dist/index.html` — úvodní stránka
- `dist/o-butiku.html` — o butiku
- `dist/navsteva.html` — návštěva a mapa
- `dist/kontakt.html` — kontaktní formulář
- `dist/robots.txt` a `dist/sitemap.xml` — podklady pro vyhledávače

## GitHub

Zdrojový kód je uložený ve veřejném repozitáři:

https://github.com/Ondra360/labelle-boutique

Po úpravě souborů ve VS Code odešli změny na GitHub takto:

```powershell
git add .
git commit -m "Popis změny"
git push
```

Web nyní hostuje služba Sites; GitHub bude záloha a verzování zdrojového kódu. Pro vlastní doménu není nutné používat GitHub Pages.

## Google Search Console

Pro web se používá Google Search Console, ne Google Play Console (ta je určena pro aplikace pro Android). Po zprovoznění domény přidej do Search Console vlastnost domény `labelleboutique.cz`, ověř ji DNS záznamem a odešli sitemapu:

```text
https://www.labelleboutique.cz/sitemap.xml
```
