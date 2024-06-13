import { PropsWithChildren } from "react"

type TaskContainer = {
	title: string
} & PropsWithChildren

export default function NotesListContainer({ title, children }: TaskContainer) {
	return (
		<div className="flex-grow flex flex-col p-2 min-h-[300px]">
			<div className="text-xl py-2 font-semibold ml-1 text-center">{title}</div>
			<div className="bg-white flex-grow flex flex-col rounded-xl border-2 border-zinc-300">{children}</div>
		</div>
	)
}
