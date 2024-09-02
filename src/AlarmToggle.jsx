import React, { useState, useEffect, useRef } from 'react';
import AlarmMessage from './AlarmMessage';

function AlarmToggle({ notes }) {
  // Zustand, um zu verfolgen, ob der Alarm ein- oder ausgeschaltet ist.
  const [alarmOn, setAlarmOn] = useState(true);

  // Zustand, der die aktive Notiz speichert, die den Alarm auslöst.
  // Wenn eine Notiz mit der aktuellen Zeit übereinstimmt, wird diese Notiz hier gespeichert.
  const [activeNote, setActiveNote] = useState(null);

  // useRef wird verwendet, um ein Audio-Objekt zu erstellen und zu speichern.
  // Das Audio-Objekt bleibt während der gesamten Lebensdauer der Komponente gleich, sodass es nicht bei jedem Rendern neu erstellt wird.
  const audioRef = useRef(new Audio('${process.env.PUBLIC_URL}/alarm-sound.mp3'));

  // useEffect-Hook, der einmal beim Initialisieren der Komponente ausgeführt wird.
  // Setzt die `loop`-Eigenschaft des Audio-Objekts auf `true`, sodass die Audiodatei in einer Schleife wiederholt abgespielt wird.
  useEffect(() => {
    audioRef.current.loop = true; // Audiodatei in Schleife abspielen
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal beim ersten Rendern ausgeführt wird.

  // Funktion zum Ein- und Ausschalten des Alarms.
  // Die Funktion wechselt den Zustand `alarmOn` zwischen `true` und `false`.
  const toggleAlarm = () => {
    setAlarmOn(prev => !prev);
  };

  // Funktion zum Schließen der Alarmnachricht.
  // Diese Funktion wird aufgerufen, wenn der Benutzer den "OK"-Button in der AlarmMessage-Komponente drückt.
  const closeAlarmMessage = () => {
    setActiveNote(null); // Setzt die aktive Notiz auf `null`, was das Alarmfenster schließt.
    audioRef.current.pause(); // Pausiert die Audio-Wiedergabe.
    audioRef.current.currentTime = 0; // Setzt die Wiedergabe auf den Anfang der Audiodatei zurück.
  };

  // useEffect-Hook, der ausgeführt wird, wenn sich `alarmOn` oder `notes` ändert.
  useEffect(() => {
    // Funktion, die jede Minute ausgeführt wird, um zu überprüfen, ob eine Notiz mit der aktuellen Zeit übereinstimmt.
    const checkAlarm = () => {
      if (alarmOn) { // Überprüft, ob der Alarm eingeschaltet ist
        const currentTime = new Date().toISOString().slice(0, 16); // Holt die aktuelle Zeit als ISO-String bis zu den Minuten
        // Findet die Notiz, deren `dateTime` mit der aktuellen Zeit übereinstimmt
        const matchingNote = notes.find(note => {
          const noteTime = new Date(note.dateTime).toISOString().slice(0, 16); // Formatiert das Notizdatum
          return noteTime === currentTime; // Überprüft, ob die Notizzeit mit der aktuellen Zeit übereinstimmt
        });

        if (matchingNote) { // Wenn eine passende Notiz gefunden wurde
          setActiveNote(matchingNote); // Setzt die gefundene Notiz als aktive Notiz
          // Startet die Wiedergabe der Audiodatei. Falls es Probleme bei der Wiedergabe gibt, wird ein Fehler in der Konsole ausgegeben.
          audioRef.current.play().catch((error) => {
            console.error("Audio Playback Error:", error);
          });
        }
      }
    };

    // Setzt ein Intervall, das jede Minute `checkAlarm` ausführt.
    const interval = setInterval(checkAlarm, 60000); // 60000 Millisekunden = 1 Minute

    // Cleanup-Funktion, die das Intervall löscht, wenn die Komponente deaktiviert wird oder wenn der Effekt neu ausgeführt wird.
    return () => clearInterval(interval);
  }, [alarmOn, notes]); // Dieser Effekt wird ausgeführt, wenn sich `alarmOn` oder `notes` ändern.

  return (
    <div>
      {/* Wenn `activeNote` gesetzt ist, wird die `AlarmMessage`-Komponente angezeigt */}
      {activeNote && (
        <AlarmMessage note={activeNote} onClose={closeAlarmMessage} />
      )}
      {/* Button, der den Alarm ein- oder ausschaltet */}
      <button
        onClick={toggleAlarm}
        style={{ position: 'fixed', bottom: '20px', right: '20px' }} // Button ist unten rechts fixiert
      >
        {alarmOn ? 'Alarm ausschalten' : 'Alarm einschalten'} {/* Button-Text wechselt je nach Alarmzustand */}
      </button>
    </div>
  );
}

export default AlarmToggle;
