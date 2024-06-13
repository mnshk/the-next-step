self.addEventListener("push", function (event) {
	const payload = JSON.parse(event.payload)

	event.waitUntil(
		self.registration.showNotification(payload.title, {
			body: payload.body,
		})
	)
})
