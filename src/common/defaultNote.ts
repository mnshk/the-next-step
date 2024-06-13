import { getDate } from "@/helpers/utils"
import { Note } from "@/types/Note"

const defaultNote: Note = {
	title: "",
	description: "",
	status: "NEW",
	startsAt: getDate(),
	endsAt: "",
	instanceStatus: "PENDING",
	timeBlock: {
		starts: "",
		ends: "",
		days: [false, true, true, true, true, true, false],
	},
	tags: [],
	dependencies: [],
	doneStreak: 0,
	abandonStreak: 0,
	createdAt: "",
	modifiedAt: "",
	closedAt: "",
	settings: {
		notification: {
			shouldNotifyAboutOverdue: true,
		},
	},
	notifications: {
		notifiedAboutOverdue: false,
		notifiedAboutStart: false,
	},
}

export default defaultNote
