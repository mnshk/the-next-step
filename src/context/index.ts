import { Note } from "@/types/Note"
import { Context, createContext, Dispatch, SetStateAction } from "react"

type IRootContext = {
	workingNote: Note
	setWorkingNote: Dispatch<SetStateAction<Note>>
	notes: Note[]
	setNotes: Dispatch<SetStateAction<Note[]>>
	fetchNotes: () => void
}
const RootContext: Context<IRootContext> = createContext({} as IRootContext)

export default RootContext
