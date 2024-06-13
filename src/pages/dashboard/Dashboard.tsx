import ItemBox from "@/components/common/ItemBox"
import NotesListContainer from "@/components/common/NotesListContainer"
import RootContext from "@/context"
import {
	getSchedules,
	getTasks
} from "@/helpers/noteUtils"
import { Note } from "@/types/Note"
import { useContext, useEffect, useState } from "react"
import NotePopup from "../../components/NotePopup"
import Header from "./Header"

export default function Dashboard() {
	const [openNotePopup, setOpenNotePopup] = useState(false) // change that
	const { notes, setWorkingNote, fetchNotes } = useContext(RootContext)

	useEffect(() => {
		if (!openNotePopup) fetchNotes()
	}, [openNotePopup, fetchNotes])

	function handleOpenNote(note: Note) {
		setWorkingNote(note)
		setOpenNotePopup(true)
	}

	const [schedules, setSchedules] = useState<Note[]>([])
	const [tasks, setTasks] = useState<Note[]>([])

	useEffect(() => {
		setSchedules(getSchedules(notes))
		setTasks(getTasks(notes))
	}, [notes])

	return (
		<>
			<div className="animate-page-load w-full h-full overflow-auto flex flex-col bg-zinc-100">
				<Header onOpenNote={handleOpenNote} />
				<div className="flex-grow flex flex-col overflow-auto">
					<NotesListContainer title="Schedules">
						{schedules.length > 0 ? (
							schedules.map(note => <ItemBox key={note._id} note={note} open={handleOpenNote} />)
						) : (
							<div className="w-full h-full flex items-center justify-center text-zinc-400">No Schedules</div>
						)}
					</NotesListContainer>
					<NotesListContainer title="Tasks">
						{tasks.length > 0 ? (
							tasks.map(note => <ItemBox key={note._id} note={note} open={handleOpenNote} />)
						) : (
							<div className="w-full h-full flex items-center justify-center text-zinc-400">No Tasks</div>
						)}
					</NotesListContainer>
				</div>
			</div>
			<NotePopup open={openNotePopup} setOpen={setOpenNotePopup} />
		</>
	)
}
