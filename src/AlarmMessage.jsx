import React from 'react';

function AlarmMessage({ note, onClose }) {
  return (
    <div style={styles.overlay}>
      {/* Die Overlay-Schicht sorgt für einen halbtransparenten Hintergrund und zentriert das MessageBox-Fenster */}
      <div style={styles.messageBox}>
        {/* Zeigt den Titel der Notiz an */}
        <h2>Titel: {note.title}</h2>
        
        {/* Zeigt die Beschreibung der Notiz an, wobei das <pre> Element dafür sorgt, dass Zeilenumbrüche und Leerzeichen beibehalten werden */}
        <pre><strong>Beschreibung:</strong> {note.description}</pre>
        
        {/* Zeigt das Datum und die Uhrzeit der Notiz an */}
        <p><strong>Datum und Uhrzeit:</strong> {note.dateTime}</p>
        
        {/* OK-Button, der das Alarmfenster schließt. Die onClick-Eigenschaft ruft die onClose-Funktion auf, die von der AlarmToggle-Komponente übergeben wurde */}
        <button onClick={onClose} style={styles.button}>OK</button>
      </div>
    </div>
  );
}

const styles = {
  // Definiert das Overlay, das über dem restlichen Inhalt liegt und die MessageBox zentriert
  overlay: {
    position: 'fixed', // Fixiert die Position relativ zum Viewport
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Halbtransparentes schwarzes Overlay
    display: 'flex', // Flexbox zur Zentrierung der MessageBox
    alignItems: 'center', // Vertikale Zentrierung
    justifyContent: 'center', // Horizontale Zentrierung
    zIndex: 1000, // Stellt sicher, dass das Overlay über anderen Inhalten liegt
  },
  // Stil für das eigentliche Nachrichtenfenster (MessageBox), das den Alarmtext enthält
  messageBox: {
    backgroundColor: 'black', // Schwarzer Hintergrund der MessageBox
    color: 'white', // Weißer Text
    padding: '20px', // Innenabstand um den Inhalt herum
    borderRadius: '8px', // Abgerundete Ecken
    textAlign: 'center', // Zentrierter Text
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)', // Leichter Schatten um die MessageBox
  },
  // Stil für den OK-Button in der MessageBox
  button: {
    marginTop: '20px', // Abstand oberhalb des Buttons
    padding: '10px 20px', // Innenabstand des Buttons
    backgroundColor: '#007BFF', // Blau hinterlegter Button
    color: 'white', // Weißer Text auf dem Button
    border: 'none', // Keine Randlinie um den Button
    borderRadius: '4px', // Abgerundete Ecken des Buttons
    cursor: 'pointer', // Mauszeiger wird zu einem Zeigefinger bei Hover
  },
};

export default AlarmMessage;
