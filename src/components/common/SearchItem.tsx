import { doesNoteHaveTimeBlock } from "@/helpers/noteUtils"
import { Note } from "@/types/Note"
import { HTMLAttributes } from "react"
import { IoMdClipboard } from "react-icons/io"
import {
	MdClose,
	MdDone,
	MdErrorOutline,
	MdOutlineAccessTime,
	MdOutlinePendingActions
} from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { IconButton } from "./IconButton"

type SearchItemProps = {
	note: Note
	handleOpenNote: (note: Note) => void
} & HTMLAttributes<HTMLDivElement>

export default function SearchItem({ note, handleOpenNote, className, ...props }: SearchItemProps) {
	return (
		<div
			className={twMerge("p-2 px-3 border-b cursor-pointer flex items-center gap-1 hover:bg-black hover:bg-opacity-5", className)}
			onClick={() => handleOpenNote(note)}
			{...props}
		>
			<div>
				<IconButton className="bg-transparent text-zinc-500">
					{doesNoteHaveTimeBlock(note) ? <MdOutlinePendingActions /> : <IoMdClipboard />}
				</IconButton>
			</div>
			<div className="flex flex-col gap-1 flex-grow">
				<div className="font-semibold">{note.title}</div>
				<div className="text-zinc-500 text-sm line-clamp-1 overflow-ellipsis">{note.description}</div>
				<div className="flex gap-1">
					{note.tags.map(tag => (
						<div key={tag} className="bg-black bg-opacity-10 rounded-md text-[12px] px-1">
							{tag}
						</div>
					))}
				</div>
			</div>
			<div>
				<IconButton className="bg-transparent text-zinc-500">
					{note.status == "PENDING" && <MdOutlineAccessTime className="text-orange-400" />}
					{note.status == "OVERDUE" && <MdErrorOutline className="text-red-500" />}
					{note.status == "DONE" && <MdDone className="text-green-600" />}
					{note.status == "ABANDONED" && <MdClose className="text-red-500" />}
				</IconButton>
			</div>
		</div>
	)
}
