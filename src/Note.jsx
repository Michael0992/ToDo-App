const Note = ({ title, description, dateTime, deleteNote, noteClass }) => (
    <div className={noteClass}> {/* Verwende die übergebene Klasse */}
        <div className="note">
            <div className="noteHead">
                <button onClick={deleteNote}>
                    <img src="./trash.svg" alt="Icon"/>
                </button>
                <span>{dateTime}</span>
                <h3>{title}</h3>
            </div>
            <div className="noteBody">
                <pre>{description}</pre>
            </div>
            
        </div> 
    </div>
  );
  
  export default Note;
  