import RootContext from "@/context"
import { doesNoteHaveTimeBlock, isNoteClosed, saveNote } from "@/helpers/noteUtils"
import { addMinutesToTime } from "@/helpers/utils"
import { deleteNote } from "@/services/noteService"
import { DaysOfWeekNumeric, Note } from "@/types/Note"
import { Dispatch, HTMLAttributes, SetStateAction, useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { MdAdd, MdClose, MdExpandMore, MdMoreVert, MdOpenInNew } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { twMerge } from "tailwind-merge"
import ActionsPopup from "./ActionsPopup"
import { IconButton } from "./common/IconButton"
import Pill from "./common/Pill"
import DependenciesInputField from "./DependenciesInputField"

type NewTaskProps = {
	open: boolean
	setOpen: Dispatch<SetStateAction<boolean>>
}

export default function NotePopup({ open, setOpen }: NewTaskProps) {
	const [showMoreSettings, setShowMoreSettings] = useState(false) // change that
	const { workingNote, setWorkingNote } = useContext(RootContext)
	const { register, watch, handleSubmit, reset, getValues, setValue } = useForm<Note>({ defaultValues: workingNote })
	const timeBlockStarts = watch("timeBlock.starts")

	const [actionsPopupOpen, setActionsPopupOpen] = useState(false)

	const navigate = useNavigate()

	const isNewNote = workingNote._id === undefined

	async function onSubmit(note: Note) {
		saveNote(note)
		handleClose()
	}

	function handleOpenInNewWindow() {
		setWorkingNote(getValues())
		navigate("/edit")
	}

	function handleDelete() {
		deleteNote(workingNote)
		handleClose()
	}

	function handleClose() {
		setShowMoreSettings(false)
		setActionsPopupOpen(false)
		reset()
		setOpen(false)
	}

	useEffect(() => {
		reset(workingNote)
	}, [workingNote, reset])

	const [tagsInputField, setTagsInputField] = useState("")

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

	const [internalOpen, setInternalOpen] = useState(false)

	return (
		<>
			<div
				className={twMerge(
					"z-20 w-full bottom-0 fixed top-0 overflow-auto duration-100 flex flex-col items-center justify-center p-5 bg-black bg-opacity-30 opacity-0 scale-110",
					classes,
					internalOpen ? "visible" : "hidden"
				)}
				onClick={() => setOpen(false)}
			>
				<form
					onSubmit={handleSubmit(onSubmit)}
					onClick={e => e.stopPropagation()}
					className="flex flex-col w-full backdrop-blur-lg bg-white bg-opacity-75 gap-5 p-5 rounded-3xl overflow-auto shadow-lg max-w-[400px] min-w-[300px]"
				>
					{/* Form Header */}
					<div>
						<div className="flex items-center gap-2">
							<div className="text-2xl font-semibold flex-grow">{isNewNote ? "Create" : "Update"} Note</div>
							<IconButton onClick={handleOpenInNewWindow} type="button">
								<MdOpenInNew />
							</IconButton>
							{!isNewNote ? (
								<IconButton
									onClick={() => {
										setWorkingNote(getValues())
										setActionsPopupOpen(true)
									}}
									type="button"
								>
									<MdMoreVert />
								</IconButton>
							) : null}
							<IconButton onClick={handleClose} type="button">
								<MdClose />
							</IconButton>
						</div>
					</div>

					{/* Form Body */}
					<div className="flex flex-col gap-2 overflow-auto text-center">
						<input
							{...register("title")}
							placeholder="Title"
							className="bg-white outline-none bg-opacity-50 border-2 dark:border-accentPurple-100"
						/>
						<textarea
							placeholder="Description"
							className="flex-grow min-h-[150px] resize-none outline-none bg-white bg-opacity-50"
							{...register("description")}
						/>

						<div
							onClick={() => setShowMoreSettings(prev => !prev)}
							className="text-center flex items-center justify-center gap-1 cursor-pointer text-red-600 p-2 rounded-xl"
						>
							<div>More Settings</div>
							<MdExpandMore className="text-[20px]" />
						</div>

						{showMoreSettings ? (
							<>
								<div className="font-semibold mt-5">Schedule</div>
								<PopupBlock className="flex-row text-sm">
									<div className="w-full">
										<div>Starts At</div>
										<input type="date" className="w-full" {...register("startsAt")} />
									</div>
									<div className="w-full">
										<div>Ends At</div>
										<input type="date" className="w-full" min={watch("startsAt")} {...register("endsAt")} />
									</div>
								</PopupBlock>

								<div className="font-semibold mt-5">Time Block</div>
								<PopupBlock className="text-sm">
									<div className="flex gap-1">
										<div className="w-full">
											<div>From</div>
											<input type="time" className="w-full" {...register("timeBlock.starts")} />
										</div>
										<div className="w-full">
											<div>To</div>
											<input
												type="time"
												className="w-full"
												min={addMinutesToTime(timeBlockStarts, 5)}
												{...register("timeBlock.ends")}
												disabled={watch("timeBlock.starts") === ""}
											/>
										</div>
									</div>
									<div>Repeats every</div>
									<div className="flex gap-4 py-2 justify-center">
										{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => (
											<label key={day} className="text-center">
												<input
													type="checkbox"
													className="scale-150"
													{...register(`timeBlock.days.${i as DaysOfWeekNumeric}`)}
													disabled={watch("timeBlock.starts") === "" || watch("timeBlock.ends") === ""}
												/>
												<div className="text-sm">{day}</div>
											</label>
										))}
									</div>
								</PopupBlock>

								<div className="font-semibold mt-5">Advanced Options</div>
								<PopupBlock>
									<div>Tags</div>
									{watch("tags").length > 0 ? (
										<div className="border-2 p-2 rounded-lg flex gap-1 flex-wrap">
											{watch("tags").map(tag => (
												<Pill key={tag} className="text-sm">
													<div>{tag}</div>
													<MdClose
														className="text-zinc-400"
														onClick={() => {
															setValue(
																"tags",
																getValues("tags").filter(t => t !== tag)
															)
														}}
													/>
												</Pill>
											))}
										</div>
									) : null}
									<div className="flex gap-1 items-center">
										<input
											type="text"
											placeholder="Add Tags"
											className="w-full"
											value={tagsInputField}
											onChange={e => setTagsInputField(e.target.value)}
										/>
										<IconButton
											type="button"
											className="scale-90"
											onClick={() => {
												if (tagsInputField === "") return
												setValue("tags", [...new Set([...getValues("tags"), tagsInputField.trim()])])
												setTagsInputField("")
											}}
										>
											<MdAdd />
										</IconButton>
									</div>
									<DependenciesInputField watch={watch} getValues={getValues} setValue={setValue} />
									<label className="flex gap-2 items-center shrink-0 m-2">
										<input
											type="checkbox"
											className="scale-125"
											{...register("settings.notification.shouldNotifyAboutOverdue")}
										/>
										<div>Notify when ends</div>
									</label>
								</PopupBlock>
								<div className="font-semibold mt-5">Statistics</div>
								<PopupBlock>
									<div className="text-left">
										<table>
											<tbody>
												<tr>
													<td>Status</td>
													<td>{workingNote.status}</td>
												</tr>
												<tr>
													<td>Created At</td>
													<td>{workingNote.createdAt}</td>
												</tr>
												<tr>
													<td>Modified At</td>
													<td>{workingNote.modifiedAt}</td>
												</tr>
												{isNoteClosed(workingNote) ? (
													<tr>
														<td>Closed At</td>
														<td>{workingNote.closedAt}</td>
													</tr>
												) : null}
												{doesNoteHaveTimeBlock(workingNote) ? (
													<>
														<tr>
															<td>Instance Status</td>
															<td>{workingNote.instanceStatus}</td>
														</tr>
														<tr>
															<td>Done Streak</td>
															<td>{workingNote.doneStreak}</td>
														</tr>
														<tr>
															<td>Abandon Streak</td>
															<td>{workingNote.abandonStreak}</td>
														</tr>
													</>
												) : null}
											</tbody>
										</table>
									</div>
								</PopupBlock>
							</>
						) : null}
					</div>

					{/* Form Footer */}
					<div className="flex flex-col gap-1">
						<button className="bg-green-600 w-full text-white border-0" type="submit">
							Save
						</button>
					</div>
				</form>
			</div>
			<ActionsPopup open={actionsPopupOpen} handleClose={handleClose} handleDelete={handleDelete} />
		</>
	)
}

type PopupBlockProps = HTMLAttributes<HTMLDivElement>

function PopupBlock({ children, className, ...props }: PopupBlockProps) {
	return (
		<div
			className={twMerge("w-full p-2 rounded-2xl text-center flex flex-col gap-2 text-zinc-600 bg-white bg-opacity-60", className)}
			{...props}
		>
			{children}
		</div>
	)
}
