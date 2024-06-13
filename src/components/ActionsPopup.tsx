import RootContext from "@/context"
import { useContext, useEffect, useState } from "react"
import FlexButton from "./common/FlexButton"
import { updateNote } from "@/services/noteService"
import { doesNoteHaveTimeBlock, isNoteClosed, markNote } from "@/helpers/noteUtils"
import PopupSeparator from "./common/PopupSeparator"
import { twMerge } from "tailwind-merge"

type ActionsPopupProps = {
	open: boolean
	handleClose: () => void
	handleDelete: () => void
}

export default function ActionsPopup({ open, handleClose, handleDelete }: ActionsPopupProps) {
	const { workingNote } = useContext(RootContext)
	const [internalOpen, setInternalOpen] = useState(false)
	const [classes, setClasses] = useState("")

	useEffect(() => {
		if (open) {
			setInternalOpen(open)
			setTimeout(() => {
				setClasses("opacity-100 scale-100")
			}, 100)
		} else {
			setClasses("")
			setTimeout(() => setInternalOpen(false), 100)
		}
	}, [open])

	return (
		<div
			onClick={handleClose}
			className={twMerge(
				"absolute z-30 top-0 left-0 right-0 w-full duration-100 opacity-0 scale-110 h-full bg-black bg-opacity-20 flex items-center justify-center",
				classes,
				internalOpen ? "visible" : "hidden"
			)}
		>
			<div
				onClick={e => e.stopPropagation()}
				className="bg-white bg-opacity-75 backdrop-blur-lg p-5 px-3 rounded-xl flex flex-col gap-1 w-[275px] shadow-2xl"
			>
				<div className="p-2 text-center font-semibold">Actions</div>
				{isNoteClosed(workingNote) ? (
					<>
						<FlexButton
							onClick={() => {
								updateNote(markNote(workingNote, "PENDING", false))
								handleClose()
							}}
						>
							Mark as Pending
						</FlexButton>
						{doesNoteHaveTimeBlock(workingNote) && (
							<FlexButton
								onClick={() => {
									updateNote(markNote(workingNote, "PENDING", true))
									handleClose()
								}}
							>
								Mark all Pending
							</FlexButton>
						)}
						<PopupSeparator />
					</>
				) : (
					<>
						<FlexButton
							onClick={() => {
								updateNote(markNote(workingNote, "DONE", false))
								handleClose()
							}}
						>
							Mark as Done
						</FlexButton>
						<FlexButton
							onClick={() => {
								updateNote(markNote(workingNote, "ABANDONED", false))
								handleClose()
							}}
						>
							Mark as Abandoned
						</FlexButton>
						<PopupSeparator />
					</>
				)}
				{doesNoteHaveTimeBlock(workingNote) && (
					<>
						<FlexButton
							onClick={() => {
								updateNote(markNote(workingNote, "DONE", true))
								handleClose()
							}}
						>
							Mark all Done
						</FlexButton>
						<FlexButton
							onClick={() => {
								updateNote(markNote(workingNote, "ABANDONED", true))
								handleClose()
							}}
						>
							Mark all Abandoned
						</FlexButton>
						<PopupSeparator />
					</>
				)}
				<FlexButton className="text-white bg-red-500 border-0" onClick={handleDelete}>
					<div>Delete</div>
				</FlexButton>
			</div>
		</div>
	)
}
