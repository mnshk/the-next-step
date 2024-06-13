import { Note } from "@/types/Note"
import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type SearchItemProps = {
	note: Note
	handleOpenNote: (note: Note) => void
} & HTMLAttributes<HTMLDivElement>

export default function SearchItem({ note, handleOpenNote, className, ...props }: SearchItemProps) {
	return (
		<div
			className={twMerge("p-2 px-3 border-b cursor-pointer flex flex-col gap-1 hover:bg-black hover:bg-opacity-5", className)}
			onClick={() => handleOpenNote(note)}
			{...props}
		>
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
	)
}
