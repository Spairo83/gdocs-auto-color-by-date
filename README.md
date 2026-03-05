# gdocs-auto-color-by-date

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Google Apps Script](https://img.shields.io/badge/Google%20Apps%20Script-4285F4?logo=google&logoColor=white)](https://script.google.com)

> **EN** | [IT](#italiano)

## English

### What it does

A **Google Apps Script** that automatically changes the text color of each paragraph in a Google Docs document based on how many days have passed since it was written.

- No manual date entry required
- Dates are stored invisibly using PropertiesService
- Colors update automatically every day at 8:00 AM via a time-based trigger
- 10-color urgency scale, one stage every 3 days

### Color Scale

| Stage | Days elapsed | Color | Hex | Meaning |
|-------|-------------|-------|-----|---------|
| 1 | 0 – 3 days | Black | `#000000` | Fresh, no urgency |
| 2 | 3 – 6 days | Green | `#27AE60` | Calm |
| 3 | 6 – 9 days | Lime | `#A8D800` | Pay attention |
| 4 | 9 – 12 days | Golden Yellow | `#F1C40F` | Mild attention |
| 5 | 12 – 15 days | Yellow-Orange | `#F39C12` | Getting warm |
| 6 | 15 – 18 days | Orange | `#E67E22` | Medium urgency |
| 7 | 18 – 21 days | Dark Orange | `#D35400` | Growing urgency |
| 8 | 21 – 24 days | Red | `#E74C3C` | Urgent |
| 9 | 24 – 27 days | Deep Red | `#C0392B` | Very urgent |
| 10 | 27+ days | Bordeaux | `#8E1A1A` | Critical – too long ignored |

### How to install

1. Open your Google Docs document
2. Go to **Extensions → Apps Script**
3. Delete the default code and paste the content of `Code.gs`
4. Click **Save**
5. Select the function `impostaTrigger` and click **Run** (do this only once)
6. Grant the required permissions
7. Select `aggiornaColori` and run it once to apply colors immediately

From that point on, colors will update automatically every day at 8:00 AM.

### Functions

| Function | Description |
|----------|-------------|
| `registraNuoviParagrafi()` | Registers the current date for any new paragraph |
| `aggiornaColori()` | Updates all paragraph colors based on age |
| `impostaTrigger()` | Sets up the daily automatic trigger (run once) |

### Tech stack

- **Google Apps Script** (JavaScript ES5)
- **DocumentApp** – to read and style paragraphs
- **PropertiesService** – to store paragraph dates invisibly
- **ScriptApp** – to manage time-based triggers

---

## Italiano

### Cosa fa

Uno **script Google Apps** che cambia automaticamente il colore del testo di ogni paragrafo in un documento Google Docs, in base a quanti giorni fa è stato scritto.

- Non è necessario inserire date manualmente
- Le date vengono salvate in modo invisibile tramite PropertiesService
- I colori si aggiornano ogni giorno alle 8:00 tramite un trigger automatico
- Scala di 10 colori, un cambio ogni 3 giorni

### Scala dei colori

| Stadio | Giorni trascorsi | Colore | Hex | Significato |
|--------|-----------------|--------|-----|-------------|
| 1 | 0 – 3 giorni | Nero | `#000000` | Fresco, nessuna urgenza |
| 2 | 3 – 6 giorni | Verde | `#27AE60` | Tranquillo |
| 3 | 6 – 9 giorni | Lime | `#A8D800` | Inizia l'attenzione |
| 4 | 9 – 12 giorni | Giallo dorato | `#F1C40F` | Attenzione lieve |
| 5 | 12 – 15 giorni | Giallo-arancio | `#F39C12` | Comincia a scottare |
| 6 | 15 – 18 giorni | Arancione | `#E67E22` | Attenzione media |
| 7 | 18 – 21 giorni | Arancione scuro | `#D35400` | Urgenza crescente |
| 8 | 21 – 24 giorni | Rosso | `#E74C3C` | Urgente |
| 9 | 24 – 27 giorni | Rosso intenso | `#C0392B` | Molto urgente |
| 10 | 27+ giorni | Bordeaux | `#8E1A1A` | Critico – ignorato da troppo tempo |

### Come installarlo

1. Apri il tuo documento Google Docs
2. Vai su **Estensioni → Apps Script**
3. Cancella il codice predefinito e incolla il contenuto di `Code.gs`
4. Clicca **Salva**
5. Seleziona la funzione `impostaTrigger` e clicca **Esegui** (farlo una sola volta)
6. Concedi i permessi richiesti
7. Seleziona `aggiornaColori` ed eseguila una volta per applicare subito i colori

Da quel momento i colori si aggiorneranno automaticamente ogni giorno alle 8:00.

---

## License

MIT © [Spairo83](https://github.com/Spairo83)
