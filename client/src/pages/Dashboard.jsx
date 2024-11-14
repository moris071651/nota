import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';

const Dashboard = () => {
    const [error, setError] = useState('');

    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);
    const [isEdited, setIsEdited] = useState(false);

    // Fetch notes from the backend API
    useEffect(() => {
        const fetchNotes = async () => {
            setNotes([
                {
                    "id": 1,
                    "title": 'Hell',
                    'content': "uydstftgvisidmikdujhundiji",
                    'status': 'active'
                },
                {
                    "id": 2,
                    "title": 'Hell',
                    'content': "uydstftgvisidmikdujhundiji",
                    'status': 'active'
                }

            ])
        };

        fetchNotes();
    }, []);

    const handleNoteClick = (note) => {
        setSelectedNote(note);

        setTitle(note.title)
        setContent(note.content)
        setIsEdited(false);
    };

    // TODO: Needs to be connected to the server
    const handleSave = async () => {
        setNotes(notes.map((note) => {
            if (note.id == selectedNote.id) {
                note.title = title
                note.content = content
            }

            return note
        }))

        setIsEdited(false);
    };

    // TODO: Needs to be connected to the server
    const handleDelete = async () => {
        setNotes(notes.filter((note) => {
            return selectedNote.id != note.id
        }))

        handleClose()
    };

    const handleClose = () => {
        setSelectedNote(null);

        setTitle('');
        setContent('');

        setIsEdited(false);
    };

    return (
        <>
        { error && (
            <div className="alert alert-danger mx-2 my-1">{ error }</div>
        )}

        <div className="container-fluid vh-100 vw-100 d-flex p-4 bg-light">
            <div className="row flex-grow-1">
                <div className="col-md-3 border-end overflow-auto" style={{ maxWidth: '300px' }}>
                    <h4 className="text-center mb-3">Notes</h4>
                    <ul className="list-group">
                        {notes.map((note) => (
                            <li
                                key={note.id}
                                className={`list-group-item ${selectedNote?.id === note.id ? 'active' : ''}`}
                                onClick={() => handleNoteClick(note)}
                                style={{ cursor: 'pointer' }}
                            >
                                <strong>{note.title}</strong>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="col-md-9 d-flex flex-column p-4">
                    {selectedNote ? (
                        <>
                            <div className="my-1">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => {
                                        setIsEdited(true);
                                        setTitle(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="my-1">
                                <textarea
                                    className="form-control"
                                    rows="5"
                                    value={content}
                                    onChange={(e) => {
                                        setIsEdited(true);
                                        setContent(e.target.value);
                                    }}
                                />
                            </div>
                            {isEdited ? (
                                <button onClick={handleSave} className="btn btn-success my-2">Save</button>
                            ) : (
                                <button onClick={handleSave} className="btn btn-success my-2" disabled>Save</button>
                            )}
                            <button onClick={handleDelete} className="btn btn-danger my-2">Delete</button>
                            <button onClick={handleClose} className="btn btn-secondary my-2">Close</button>
                        </>
                    ) : (
                        <div className="text-center text-muted">
                            <h5>Select a note to view its content</h5>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </>
    );
};

export default Dashboard;
