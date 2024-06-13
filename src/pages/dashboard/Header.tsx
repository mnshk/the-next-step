import defaultNote from "@/common/defaultNote"
import { IconButton } from "@/components/common/IconButton"
import SearchItem from "@/components/common/SearchItem"
import RootContext from "@/context"
import { Note } from "@/types/Note"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { MdAdd, MdMenu } from "react-icons/md"
import { Link } from "react-router-dom"
import { twMerge } from "tailwind-merge"

type HeaderProps = {
	onOpenNote: (note: Note) => void
}

export default function Header({ onOpenNote }: HeaderProps) {
	const { notes } = useContext(RootContext)
	const [searchTerm, setSearchTerm] = useState("")
	const [showResults, setShowResults] = useState(false)
	const [results, setResults] = useState<Note[]>([])

	useEffect(() => {
		setResults([])
		setShowResults(false)
	}, [notes])

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const newSearchTerm = e.target.value
		setSearchTerm(newSearchTerm)
		setResults(
			notes.filter(note => {
				const term = newSearchTerm.toLowerCase()
				return (
					note.title.toLowerCase().includes(term) ||
					note.description.toLowerCase().includes(term) ||
					note.tags.toString().toLowerCase().includes(term)
				)
			})
		)
	}

	return (
		<>
			<div className="w-full p-4 flex items-center justify-center z-10 bg-zinc-100 pb-0">
				<div className="flex flex-grow border-2 border-zinc-300 bg-white focus:drop-shadow-lg rounded-lg">
					<Link to="/settings">
						<IconButton className="bg-transparent text-[24px]">
							<MdMenu />
						</IconButton>
					</Link>
					<input
						type="text"
						className="flex-grow py-2 px-2 text-[18px] outline-none border-0 bg-transparent"
						placeholder="Search notes..."
						value={searchTerm}
						onChange={handleSearch}
						onFocus={() => {
							setShowResults(true)
							setResults(notes)
						}}
					/>
					<IconButton className="bg-transparent text-[24px]" onClick={() => onOpenNote(defaultNote)}>
						<MdAdd />
					</IconButton>
				</div>
			</div>

			<div
				onClick={() => setShowResults(false)}
				className={twMerge(
					"absolute w-full bottom-0 top-[70px] px-4 duration-300 origin-top",
					showResults ? "translate-y-0" : "translate-y-[-100vh]"
				)}
			>
				<div
					onClick={e => e.stopPropagation()}
					className="backdrop-blur-lg max-h-[500px] overflow-auto bg-white bg-opacity-25 border-2 border-opacity-15 border-black shadow-xl rounded-xl"
				>
					{results.length < 1 ? (
						<div className="p-5 text-center">{searchTerm.length == 0 ? "Start typing to search..." : "No results found"}</div>
					) : (
						results.map(note => <SearchItem key={note._id} note={note} handleOpenNote={onOpenNote} />)
					)}
				</div>
			</div>
		</>
	)
}
