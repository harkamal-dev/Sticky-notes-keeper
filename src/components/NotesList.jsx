import React, { useRef, useState } from "react";
import Note from "./Note";

const Notes = () => {
	const [notes, setNotes] = useState([
		{
			id: 1,
			title: "Default Note 1",
		},
		{
			id: 2,
			title: "Default Note 2",
		},
	]);
	const allNotesRef = useRef({});
	const [input, setInput] = useState("");

	const handleAddNote = (e) => {
		e.preventDefault();
		if (input) {
			setNotes((prev) => [
				...prev,
				{
					id: notes[notes.length - 1].id + 1,
					title: input,
				},
			]);
			setInput("");
		}
	};

	return (
		<>
			<form onSubmit={handleAddNote} className="addNote">
				<input placeholder="Type a note..." value={input} onChange={(e) => setInput(e.target.value)} />
				<button type="submit">Add Note</button>
			</form>

			<div className="noteList">
				{notes.map((note) => (
					<Note key={note.id} ref={(element) => (allNotesRef.current[note.id] = element)} allNotesRef={allNotesRef} note={note} />
				))}
			</div>
		</>
	);
};

export default Notes;
