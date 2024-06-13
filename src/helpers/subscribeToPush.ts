import { API_URL, urlBase64ToUint8Array } from "./utils"

if (localStorage.getItem("registeredForPush") === null) {
	localStorage.setItem("registeredForPush", "true")

	if ("serviceWorker" in navigator && "PushManager" in window) {
		subscribeToPush()
	}
}

async function subscribeToPush() {
	const registration = await navigator.serviceWorker.register("/service-worker.js")
	await Notification.requestPermission()
	const subscription = await registration.pushManager.subscribe({
		userVisibleOnly: true,
		applicationServerKey: urlBase64ToUint8Array(import.meta.env.VITE_VAPID_PUBLIC_KEY),
	})

	await fetch(`${API_URL}/save-push-subscription`, {
		method: "POST",
		headers: [["Content-Type", "application/json"]],
		body: JSON.stringify(subscription),
	})
}
