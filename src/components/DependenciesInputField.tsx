import RootContext from "@/context"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { MdClose } from "react-icons/md"
import Pill from "./common/Pill"
import SearchItem from "./common/SearchItem"
import { UseFormGetValues, UseFormSetValue, UseFormWatch } from "react-hook-form"
import { Note } from "@/types/Note"
import { getDependencyTitle } from "@/helpers/noteUtils"

type DependenciesInputProps = {
	watch: UseFormWatch<Note>
	setValue: UseFormSetValue<Note>
	getValues: UseFormGetValues<Note>
}

export default function DependenciesInputField({ watch, setValue, getValues }: DependenciesInputProps) {
	const [searchTerm, setSearchTerm] = useState("")
	const [searchResults, setSearchResults] = useState<Note[]>([])
	const [showResults, setShowResults] = useState(false)
	const { notes } = useContext(RootContext)
	const dependencies = watch("dependencies")

	function handleSearch(e: ChangeEvent<HTMLInputElement>) {
		const newSearchTerm = e.target.value
		setSearchTerm(newSearchTerm)
		setSearchResults(
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

	function handleDelete(dependency: string) {
		setValue(
			"dependencies",
			getValues("dependencies").filter(currentDependency => currentDependency !== dependency)
		)
	}

	useEffect(() => {
		setSearchResults([])
		setShowResults(false)
	}, [dependencies])

	return (
		<>
			<div>Dependencies</div>
			{dependencies.length > 0 && (
				<div className="border-2 p-2 rounded-lg flex gap-1 flex-wrap">
					{dependencies.map(dependency => {
						const title = getDependencyTitle(dependency, notes)
						if (title) {
							return (
								<Pill key={dependency} className="text-sm">
									<div>{title}</div>
									<MdClose
										className="text-zinc-400"
										onClick={() => {
											handleDelete(dependency)
										}}
									/>
								</Pill>
							)
						}
					})}
				</div>
			)}
			<input
				type="text"
				placeholder="Add dependencies"
				className="w-full"
				value={searchTerm}
				onChange={handleSearch}
				onFocus={() => {
					setSearchResults(notes)
					setShowResults(true)
				}}
				onBlur={() => setTimeout(() => setShowResults(false), 500)}
			/>
			<div className="relative">
				{showResults && (
					<div className="backdrop-blur-lg bg-white bg-opacity-75 z-20 absolute border-2 rounded-lg w-full max-h-[200px] overflow-auto shadow-2xl flex flex-col">
						{searchResults.length === 0 && <div className="w-full h-full py-5">No results</div>}
						{searchResults.map(note => (
							<SearchItem
								key={note._id}
								className="text-left"
								note={note}
								handleOpenNote={note => {
									setValue("dependencies", [...new Set([...getValues("dependencies"), note._id!])])
									setSearchTerm("")
								}}
							/>
						))}
					</div>
				)}
			</div>
		</>
	)
}
