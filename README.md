# La Belle Boutique — web

Statický, vícestránkový web butiku La Belle Boutique. Bezplatná veřejná verze běží na:

https://ondra360.github.io/labelle-boutique/

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

GitHub Pages web automaticky publikuje po každém `git push` do větve `main`.

## Google Search Console

Pro web se používá Google Search Console, ne Google Play Console (ta je určena pro aplikace pro Android). Bez vlastní domény lze přidat službu s předponou adresy URL a odeslat sitemapu:

```text
https://ondra360.github.io/labelle-boutique/sitemap.xml
```
