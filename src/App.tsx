import { useCallback, useState } from "react"
import defaultNote from "./common/defaultNote"
import AppRouter from "./components/AppRouter"
import RootContext from "./context"
import { getAllNotes } from "./services/noteService"
import { Note } from "./types/Note"

export default function App() {
	const [workingNote, setWorkingNote] = useState<Note>(defaultNote)
	const [notes, setNotes] = useState<Note[]>([])

	const fetchNotes = useCallback(async function () {
		const notes = await getAllNotes()
		if (notes) setNotes(notes)
	}, [])

	return (
		<RootContext.Provider
			value={{
				workingNote,
				setWorkingNote,
				notes,
				setNotes,
				fetchNotes
			}}
		>
			<AppRouter />
		</RootContext.Provider>
	)
}
