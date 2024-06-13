import { Note } from "@/types/Note"
import moment from "moment"
import { MdErrorOutline, MdOutlinePendingActions } from "react-icons/md"
import Pill from "./Pill"
import { doesNoteHaveADeadline, doesNoteHaveTimeBlock, isNoteActive, isNoteOverdue, noteDuration } from "@/helpers/noteUtils"
import { IoMdClipboard } from "react-icons/io"
import { IconButton } from "./IconButton"

type ItemBoxProps = {
	note: Note
	open: (item: Note) => void
}

export default function ItemBox({ note, open }: ItemBoxProps) {
	const isExpired = isNoteOverdue(note)

	return (
		<div className="flex items-center border" onClick={() => open(note)}>
			<div>
				<IconButton className="bg-transparent text-zinc-500">
					{doesNoteHaveTimeBlock(note) ? <MdOutlinePendingActions /> : <IoMdClipboard />}
				</IconButton>
			</div>
			<div className="flex-grow flex flex-col p-2 gap-2">
				<div className="line-clamp-1 font-semibold cursor-pointer">{note.title !== "" ? note.title : note.description}</div>
				<div className="flex gap-1">
					{isNoteActive(note) && <Pill className="bg-green-600 bg-opacity-100 text-white">Active</Pill>}
					{doesNoteHaveTimeBlock(note) && (
						<>
							<Pill className="bg-orange-200 bg-opacity-100">{note.timeBlock.starts}</Pill>
							<Pill>{noteDuration(note)}</Pill>
							{isExpired && <Pill className="bg-red-500 bg-opacity-100  text-white">Expired</Pill>}
						</>
					)}
					{doesNoteHaveADeadline(note) && (
						<Pill className={isExpired ? "bg-red-500 bg-opacity-100 text-white" : ""}>
							{isExpired ? "Expired" : moment(note.endsAt).fromNow()}
						</Pill>
					)}
				</div>
			</div>
			<div className="flex items-center justify-center shrink-0 p-4 gap-2">
				{isExpired && <MdErrorOutline className="text-red-500 text-[26px]" />}
			</div>
		</div>
	)
}
