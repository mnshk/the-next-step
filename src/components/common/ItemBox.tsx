import { Note } from "@/types/Note"
import moment from "moment"
import { MdErrorOutline } from "react-icons/md"
import Pill from "./Pill"
import { doesNoteHaveADeadline, doesNoteHaveTimeBlock, isNoteOverdue, noteDuration } from "@/helpers/noteUtils"

type ItemBoxProps = {
	note: Note
	open: (item: Note) => void
}

export default function ItemBox({ note, open }: ItemBoxProps) {
	const isExpired = isNoteOverdue(note)

	return (
		<div className="flex border" onClick={() => open(note)}>
			<div className="flex-grow flex flex-col p-2 gap-2">
				<div className="line-clamp-1 font-semibold cursor-pointer">{note.title !== "" ? note.title : note.description}</div>
				<div className="flex gap-1">
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
