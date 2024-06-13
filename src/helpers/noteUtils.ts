import { createNote, updateNote } from "@/services/noteService"
import { Note } from "@/types/Note"
import moment from "moment"
import { getDateTime } from "./utils"

export function sortNotes(a: Note, b: Note): number {
	if (doesNoteHaveTimeBlock(a)) {
		if (moment(a.timeBlock.starts, "HH:mm").isAfter(moment(b.timeBlock.starts, "HH:mm"))) {
			return 1
		} else {
			return -1
		}
	} else {
		if (a.endsAt === "" && b.endsAt === "") {
			return 0
		} else if (a.endsAt === "") {
			return 1
		} else if (b.endsAt === "") {
			return -1
		} else {
			if (moment(a.endsAt).isAfter(b.endsAt)) {
				return 1
			} else {
				return -1
			}
		}
	}
}

export function isNoteOverdue(note: Note) {
	if (doesNoteHaveTimeBlock(note)) {
		if (moment(note.timeBlock.ends, "HH:mm").isBefore(moment.now())) return true
	} else if (moment(note.endsAt).isBefore(moment.now())) return true
	return false
}

export function isNoteClosed(note: Note) {
	if (doesNoteHaveTimeBlock(note)) {
		return note.instanceStatus === "DONE" || note.instanceStatus === "ABANDONED"
	}
	return note.status === "DONE" || note.status === "ABANDONED"
}

export function doesNoteHaveTimeBlock(note: Note) {
	return note.timeBlock.starts !== ""
}

export function doesNoteHaveADeadline(note: Note) {
	return note.endsAt !== ""
}

export async function saveNote(note: Note) {
	if (note.title === "" && note.description === "") {
		return false
	}
	if (note._id === undefined) {
		return await createNote(note)
	} else {
		return await updateNote(note)
	}
}

export function noteDuration(note: Note) {
	if (doesNoteHaveTimeBlock(note)) {
		return moment(note.timeBlock.ends, "HH:mm").diff(moment(note.timeBlock.starts, "HH:mm"), "minutes") + " min"
	} else if (doesNoteHaveADeadline(note)) {
		return moment(note.endsAt).diff(moment(note.startsAt), "days") + " days"
	} else {
		return false
	}
}

export function markNote(note: Note, status: "DONE" | "ABANDONED" | "PENDING", all: boolean = true) {
	if (doesNoteHaveTimeBlock(note) && !all) {
		note.instanceStatus = status
	} else {
		note.status = status
		note.closedAt = getDateTime()
	}
	return note
}

export function getDependencyTitle(_id: string, allNotes: Note[]): string {
	return allNotes.filter(n => n._id === _id)[0]?.title ?? false
}

export function areDependenciesMet(note: Note, notes: Note[]): boolean {
	const dependencies = notes.filter(currentNote => note.dependencies.includes(currentNote._id!))
	return dependencies.every(dependency => dependency.status === "DONE" || dependency.status === "ABANDONED")
}

export function getSchedules(notes: Note[]) {
	return notes
		.filter(doesNoteHaveTimeBlock)
		.filter(note => !(isNoteOverdue(note) && isNoteClosed(note)))
		.filter(note => note.instanceStatus !== "DONE")
		.sort(sortNotes)
}
export function getTasks(notes: Note[]) {
	return notes
		.filter(note => !doesNoteHaveTimeBlock(note) && !isNoteClosed(note))
		.filter(note => areDependenciesMet(note, notes))
		.sort(sortNotes)
}
