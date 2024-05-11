import React, { forwardRef, useEffect, useState } from "react";

const Note = forwardRef(({ note, allNotesRef }, ref) => {
	const [position, setPosition] = useState([0, 0]);

	useEffect(() => {
		let posi = getRandomPosition();
		setPosition(posi);
	}, [allNotesRef.current[note.id]]);

	function onMouseDown(e) {
		const rect = allNotesRef.current[note.id].getBoundingClientRect();
		let curr = rect;

		let headerHeight = document.querySelector(".addNote")?.offsetHeight;

		// Getting the starting position
		let offsetX = e.clientX - rect.left;
		let offsetY = e.clientY - rect.top;

		// To check the current location
		function onMouseMove(e) {
			let currX = e.clientX - offsetX;
			let currY = e.clientY - offsetY - headerHeight;

            let notesHeight = document.querySelector(".noteList").offsetHeight;
			if (currX >= 0 && currY >= 0 && currY + rect.height <= notesHeight) {
				setPosition([currX, currY]);
			}
		}

		// Adding move listeners
		document.addEventListener("mousemove", onMouseMove);
		document.addEventListener("mouseup", onMouseUp);

		// To remove listeners after mouse up
		function onMouseUp() {
			if (checkIfIntersect()) {
				setPosition([curr.left, curr.top - headerHeight]);
			}
			document.removeEventListener("mousemove", onMouseMove);
			document.removeEventListener("mouseup", onMouseUp);
		}
	}

	function getRandomPosition() {
		const rect = allNotesRef.current[note.id].getBoundingClientRect();
		let notesHeight = document.querySelector(".noteList");
		const maxWidth = window.innerWidth - rect.width;
		const maxHeight = notesHeight.offsetHeight - rect.height;
		return [Math.floor(Math.random() * maxWidth), Math.floor(Math.random() * maxHeight)];
	}

	function checkIfIntersect() {
		let currRect = allNotesRef.current[note.id].getBoundingClientRect();
		return Object.entries(allNotesRef.current)
			.filter((item) => item[0] != note.id)
			.some(([_, value]) => {
				let otherRect = value.getBoundingClientRect();
				console.log(currRect, otherRect);
				let intersect = !(
					currRect.right < otherRect.left ||
					currRect.left > otherRect.right ||
					currRect.top > otherRect.bottom ||
					currRect.bottom < otherRect.top
				);

				return intersect;
			});
	}

	return (
		<div
			ref={ref}
			style={{
				position: "absolute",
				left: `${position[0]}px`,
				top: `${position[1]}px`,
			}}
			className="noteItem"
			onMouseDown={onMouseDown}
		>
			<div>📌</div>
			<div>{note.title}</div>
		</div>
	);
});

export default Note;
