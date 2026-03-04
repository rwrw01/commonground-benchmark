# Common Ground - Portfolio Selector

Webapplicatie waarmee gemeenten hun Common Ground initiatieven kunnen selecteren, beheren en exporteren. Gebouwd als benchmark-tool op basis van het [Common Ground Portfolio](https://commonground.nl).

## Functionaliteiten

- **61 initiatieven** uit het Common Ground portfolio, ingedeeld in 9 categorieën
- **Profielbeheer** — maak meerdere profielen aan (bijv. per gemeente), schakel ertussen, hernoem of verwijder ze
- **Aan/uit toggles** — klik op een initiatief om het te selecteren of deselecteren
- **Categoriefilter** — filter de weergave op categorie (Zaaksystemen, Portalen, Registers, etc.)
- **JSON export** — download je selectie als `.json` bestand
- **JSON import** — laad een eerder opgeslagen selectie in
- **Persistentie** — selecties blijven bewaard in de browser (localStorage)

## Categorieën

| Categorie | Voorbeelden |
|---|---|
| Zaaksystemen | Open Zaak, GZAC, Zakenregister |
| Portalen & MijnOmgeving | Open Inwoner Platform, NLPortal |
| Registers & Data | OpenCatalogi, Open Registers, vrijBRP |
| Documenten & Archief | Xential, Open Archiefbeheer |
| Notificaties & Communicatie | Signalen, NotifyNL en OMC |
| Formulieren & Klantinteractie | Open Formulieren, Open Klant, KISS |
| Geo & Visualisatie | MapGallery, OpenStad |
| AI & Innovatie | SafeGPT, Digitale Medewerker |
| Overig | Rx.Open, MyFMS, ASE Cloud Services |

## Technologie

- [Next.js 16](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Vercel deployment

## Lokaal draaien

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in je browser.

## Deployment

De app is gekoppeld aan Vercel. Elke push naar `main` triggert automatisch een nieuwe deployment.
