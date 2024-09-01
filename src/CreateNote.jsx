import React, { useState } from 'react';

function CreateNote({ notes, setNotes }) {
    // Lokaler State für die Eingabewerte der neuen Notiz (Titel, Beschreibung, Datum und Uhrzeit)
    const [noteData, setNoteData] = useState({
        title: "",
        description: "",
        dateTime: ""
    });

    // Handler für die Änderung der Eingabefelder
    // Diese Funktion wird aufgerufen, wenn der Benutzer eine Eingabe macht
    // Sie aktualisiert den entsprechenden Wert (title, description, dateTime) im lokalen State
    const handleInputChange = (event) => {
        const { name, value } = event.target; // Extrahiere den Namen und den Wert des Eingabefeldes
        setNoteData((prevData) => ({
            ...prevData, // Behalte die bestehenden Werte bei
            [name]: value // Aktualisiere den Wert des entsprechenden Feldes (title, description, dateTime)
        }));
    };

    // Funktion, um die Notiz hinzuzufügen
    // Diese Funktion überprüft, ob alle Felder ausgefüllt sind, 
    // fügt die Notiz zur Liste hinzu und sortiert die Notizen nach Datum und Uhrzeit
    const addNote = () => {
        if (noteData.title && noteData.description && noteData.dateTime) {
            // Überprüfen, ob alle Felder ausgefüllt sind
            const updatedNotes = [...notes, noteData]; // Fügt die neue Notiz zur Liste der bestehenden Notizen hinzu
            updatedNotes.sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime)); // Sortiere die Notizen nach Datum und Uhrzeit
            setNotes(updatedNotes); // Aktualisiert den State mit den sortierten Notizen
            setNoteData({ title: "", description: "", dateTime: "" }); // Setzt die Eingabefelder zurück
        } else {
            alert("Bitte alle Felder ausfüllen!"); // Zeigt eine Warnung, wenn ein Feld leer ist
        }
    };
    
    return (
        <div className="noteMenu">
            {/* Eingabefeld für den Titel der Notiz */}
            <label>Bezeichnung:
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={noteData.title}
                    onChange={handleInputChange} // Verknüpft das Eingabefeld mit dem State
                    required
                />
            </label>

            {/* Eingabefeld für den Inhalt/Beschreibung der Notiz */}
            <label htmlFor="description">Inhalt:</label>
            <textarea
                id="description"
                name="description"
                value={noteData.description}
                onChange={handleInputChange} // Verknüpft das Textfeld mit dem State
                rows="4"
                cols="50"
                required
            />

            {/* Eingabefeld für Datum und Uhrzeit der Notiz */}
            <label htmlFor="dateTime">Datum und Uhrzeit:</label>
            <input
                type="datetime-local"
                id="dateTime"
                name="dateTime"
                value={noteData.dateTime}
                onChange={handleInputChange} // Verknüpft das Eingabefeld mit dem State
                required
            />

            {/* Button zum Erstellen der Notiz */}
            <button onClick={addNote}>Notiz Erstellen</button>
        </div>
    );
}

export default CreateNote;