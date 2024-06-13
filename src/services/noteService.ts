import { API_URL, getDateTime } from "@/helpers/utils"
import { Note } from "@/types/Note"

export async function createNote(note: Note) {
	note.createdAt = getDateTime()
	try {
		await fetch(`${API_URL}/notes`, {
			method: "POST",
			headers: [["Content-Type", "application/json"]],
			body: JSON.stringify(note),
		})
		return true
	} catch (err) {
		console.log("Error creating note", err)
		return false
	}
}

export async function getAllNotes(): Promise<Note[] | false> {
	try {
		const response = await fetch(`${API_URL}/notes`, { method: "GET" })
		if (!response.ok) return false
		const data = await response.json()
		return data
	} catch (err) {
		console.log("Error getting note", err)
		return false
	}
}

export async function updateNote(note: Note) {
	note.modifiedAt = getDateTime()
	try {
		await fetch(`${API_URL}/notes/${note._id}`, {
			method: "PATCH",
			headers: [["Content-Type", "application/json"]],
			body: JSON.stringify(note),
		})
		return true
	} catch (err) {
		console.log("Error updating note", err)
		return false
	}
}

export async function deleteNote(note: Note) {
	try {
		await fetch(`${API_URL}/notes/${note._id}`, { method: "DELETE" })
		return true
	} catch (err) {
		console.log("Error deleting note", err)
		return false
	}
}


