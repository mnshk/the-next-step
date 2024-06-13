export type NoteStatus = "NEW" | "PENDING" | "OVERDUE" | "DONE" | "ABANDONED"

export type DaysOfWeekNumeric = 0 | 1 | 2 | 3 | 4 | 5 | 6

export type Note = {
	_id?: string
	title: string
	description: string
	status: NoteStatus
	startsAt: string
	endsAt: string
	instanceStatus: NoteStatus
	timeBlock: {
		starts: string
		ends: string
		days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
	}
	tags: string[]
	dependencies: string[]
	doneStreak: number
	abandonStreak: number
	createdAt: string
	modifiedAt: string
	closedAt: string
	settings: {
		notification: {
			shouldNotifyAboutOverdue: boolean
		}
	}
	notifications: {
		notifiedAboutStart: boolean
		notifiedAboutOverdue: boolean
	}
}
