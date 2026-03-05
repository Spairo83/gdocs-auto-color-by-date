// ==============================================
// gdocs-auto-color-by-date
// Author: Spairo83
// Description: Automatically changes text color
// in Google Docs based on how many days ago each
// paragraph was written. No manual dates needed.
// 10-color urgency scale, changes every 3 days.
// ==============================================
//
// COLOR SCALE:
// Stage 1:  0-3  days  => #000000 Black    (fresh)
// Stage 2:  3-6  days  => #27AE60 Green
// Stage 3:  6-9  days  => #A8D800 Lime
// Stage 4:  9-12 days  => #F1C40F Golden Yellow
// Stage 5: 12-15 days  => #F39C12 Yellow-Orange
// Stage 6: 15-18 days  => #E67E22 Orange
// Stage 7: 18-21 days  => #D35400 Dark Orange
// Stage 8: 21-24 days  => #E74C3C Red
// Stage 9: 24-27 days  => #C0392B Deep Red
// Stage 10: 27+ days   => #8E1A1A Bordeaux (critical)
// ==============================================

/**
 * Registers today's date for each new paragraph
 * that doesn't have a saved date yet.
 * Uses PropertiesService to store dates invisibly.
 */
function registraNuoviParagrafi() {
  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var props = PropertiesService.getDocumentProperties();
  var oggi = new Date().getTime();

  var numParagrafi = body.getNumChildren();
  for (var i = 0; i < numParagrafi; i++) {
    var elemento = body.getChild(i);
    if (elemento.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    var paragrafo = elemento.asParagraph();
    var testo = paragrafo.getText().trim();
    if (testo === '') continue;

    var chiave = 'para_' + i + '_' + testo.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
    if (!props.getProperty(chiave)) {
      props.setProperty(chiave, oggi.toString());
    }
  }
}

/**
 * Main function: updates text color of each paragraph
 * based on how many days have passed since it was written.
 * Run manually or via daily trigger.
 */
function aggiornaColori() {
  registraNuoviParagrafi();

  var doc = DocumentApp.getActiveDocument();
  var body = doc.getBody();
  var props = PropertiesService.getDocumentProperties();
  var oggi = new Date().getTime();

  // Color scale: each stage = 3 days
  var scalaColori = [
    { soglia: 3,        colore: '#000000' }, // Black       0-3 days
    { soglia: 6,        colore: '#27AE60' }, // Green       3-6 days
    { soglia: 9,        colore: '#A8D800' }, // Lime        6-9 days
    { soglia: 12,       colore: '#F1C40F' }, // Yellow      9-12 days
    { soglia: 15,       colore: '#F39C12' }, // Yell-Org   12-15 days
    { soglia: 18,       colore: '#E67E22' }, // Orange     15-18 days
    { soglia: 21,       colore: '#D35400' }, // Dk Orange  18-21 days
    { soglia: 24,       colore: '#E74C3C' }, // Red        21-24 days
    { soglia: 27,       colore: '#C0392B' }, // Deep Red   24-27 days
    { soglia: Infinity, colore: '#8E1A1A' }  // Bordeaux   27+ days
  ];

  var numParagrafi = body.getNumChildren();
  for (var i = 0; i < numParagrafi; i++) {
    var elemento = body.getChild(i);
    if (elemento.getType() !== DocumentApp.ElementType.PARAGRAPH) continue;
    var paragrafo = elemento.asParagraph();
    var testo = paragrafo.getText().trim();
    if (testo === '') continue;

    var chiave = 'para_' + i + '_' + testo.substring(0, 30).replace(/[^a-zA-Z0-9]/g, '_');
    var dataStr = props.getProperty(chiave);
    if (!dataStr) {
      props.setProperty(chiave, oggi.toString());
      dataStr = oggi.toString();
    }

    var dataScrittura = parseInt(dataStr);
    var giorniPassati = Math.floor((oggi - dataScrittura) / (1000 * 60 * 60 * 24));

    var colore = '#8E1A1A'; // default: bordeaux
    for (var j = 0; j < scalaColori.length; j++) {
      if (giorniPassati < scalaColori[j].soglia) {
        colore = scalaColori[j].colore;
        break;
      }
    }

    paragrafo.setForegroundColor(colore);
  }
}

/**
 * Sets up a daily automatic trigger at 8:00 AM.
 * Run this function ONCE to activate auto-updates.
 * It removes duplicate triggers before creating a new one.
 */
function impostaTrigger() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'aggiornaColori') {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
  ScriptApp.newTrigger('aggiornaColori')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
  Logger.log('Daily trigger set! Colors will update every day at 8:00 AM.');
}
