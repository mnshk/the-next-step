export const API_URL = import.meta.env.VITE_API_URL

export function getDate() {
	const now = new Date()
	return `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`
}

export function getTime() {
	const now = new Date()
	return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
}

export function getDateTime() {
	return `${getDate()} ${getTime()}`
}

export function addMinutesToTime(current: string, minutesToAdd: number) {
	const nt = new Date(new Date(`${getDate()} ${current}`).getTime() + minutesToAdd * 60000)
	return `${nt.getHours().toString().padStart(2, "0")}:${nt.getMinutes().toString().padStart(2, "0")}`
}

export function urlBase64ToUint8Array(base64String: string) {
	const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
	const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
	const rawData = window.atob(base64)
	const outputArray = new Uint8Array(rawData.length)

	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}
