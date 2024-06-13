self.addEventListener("push", function (event) {
	if (!(self.Notification && self.Notification.permission === "granted")) {
		return
	}

	const data = event.data.json()
	self.registration.showNotification(data?.title, {
		body: data?.body,
		actions: [
			{
				action: "open",
				title: "Open",
			},
			{
				action: "close",
				title: "Close",
			},
		],
	})
})

self.addEventListener(
	"notificationclick",
	event => {
		if (event.action === "open") {
			event.notification.close()
			self.clients.openWindow("http://192.168.1.100:5173")
		} else if (event.action === "close") {
			event.notification.close()
		}
	},
	false
)
