import { useEffect, useState } from 'react';
import './App.css';
import Note from './Note.jsx';
import CreateNote from './CreateNote.jsx';
import AlarmToggle from './AlarmToggle.jsx'; // Import der AlarmToggle-Komponente

function App() {
  // State für die Notizen, der die Liste aller Notizen verwaltet.
  const [notes, setNotes] = useState([]);
  
  // State, um zu verfolgen, ob die Notizen aus dem localStorage geladen wurden.
  const [isInitialized, setIsInitialized] = useState(false);

  // useEffect, der beim ersten Rendern ausgeführt wird, um die Notizen aus dem localStorage zu laden.
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("notes")) || []; // Notizen aus localStorage abrufen oder leeres Array setzen
    setNotes(storedNotes); // Notizen in den State setzen
    setIsInitialized(true); // Markiert die Initialisierung als abgeschlossen
  }, []);

  // useEffect, der jedes Mal ausgeführt wird, wenn sich die Notizen ändern und die Initialisierung abgeschlossen ist.
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("notes", JSON.stringify(notes)); // Notizen im localStorage speichern
    }
  }, [notes, isInitialized]);

  // Funktion, um eine Notiz anhand ihres Indexes aus der Liste zu entfernen.
  const deleteNote = (indexToRemove) => {
    const updatedNotes = notes.filter((_, index) => index !== indexToRemove); // Filtert die Notizen und entfernt die ausgewählte Notiz
    setNotes(updatedNotes); // Aktualisiert den State mit den gefilterten Notizen
  };

  // Funktion, um die CSS-Klasse für eine Notiz basierend auf ihrem Datum zu bestimmen.
  const getNoteClass = (dateTime) => {
    const noteDate = new Date(dateTime).toISOString().slice(0, 10); // Formatiert das Notizdatum auf YYYY-MM-DD
    const currentDate = new Date().toISOString().slice(0, 10); // Formatiert das aktuelle Datum auf YYYY-MM-DD

    // Vergleicht das Notizdatum mit dem aktuellen Datum und gibt die entsprechende CSS-Klasse zurück
    if (noteDate > currentDate) {
      return 'newNotes'; // Die Notiz liegt in der Zukunft
    } else if (noteDate === currentDate) {
      return 'currentNotes'; // Die Notiz entspricht dem heutigen Datum
    } else {
      return 'oldNotes'; // Die Notiz liegt in der Vergangenheit
    }
  };

  return (
    <div>
      {/* Komponente zum Erstellen neuer Notizen, die den aktuellen Notiz-Array und die Setter-Funktion erhält */}
      <CreateNote notes={notes} setNotes={setNotes} />
      <div className="noteBoard">
        {/* Mappt jede Notiz in der Liste auf die Note-Komponente */}
        {notes.map((value, index) => (
          <Note
            key={index} // Einzigartiger Schlüssel für jedes Element in der Liste
            title={value.title} // Titel der Notiz
            description={value.description} // Beschreibung der Notiz
            dateTime={value.dateTime} // Datum und Uhrzeit der Notiz
            deleteNote={() => deleteNote(index)} // Funktion zum Löschen der Notiz
            noteClass={getNoteClass(value.dateTime)} // Übergibt die CSS-Klasse basierend auf dem Datum
          />
        ))}
        {/* Komponente zur Steuerung des Alarms */}
        <AlarmToggle notes={notes} /> {/* Übergibt die Notizen an die AlarmToggle-Komponente */}
      </div>
    </div>
  );
}

export default App;
