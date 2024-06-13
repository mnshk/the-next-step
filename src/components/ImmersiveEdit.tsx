import RootContext from "@/context"
import { saveNote } from "@/helpers/noteUtils"
import { Note } from "@/types/Note"
import { useContext } from "react"
import { useForm } from "react-hook-form"
import { MdArrowBack } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { IconButton } from "./common/IconButton"

export default function ImmersiveEdit() {
	const { workingNote } = useContext(RootContext)

	const { register, getValues } = useForm<Note>({
		defaultValues: workingNote,
	})

	const navigate = useNavigate()

	function handleSave() {
		saveNote(getValues())
		navigate("/")
	}

	return (
		<form className="overflow-auto h-full w-full bg-white dark:bg-accentPurple-900 text-accentPurple-900 dark:text-accentPurple-100 p-5 flex flex-col gap-5">
			<div className="flex items-center gap-3">
				<IconButton type="button" onClick={handleSave}>
					<MdArrowBack />
				</IconButton>
				<input
					type="text"
					className="text-[22px] bg-transparent overflow-ellipsis flex-grow w-full border-0 p-0 outline-none"
					placeholder="Title"
					{...register("title")}
				/>
			</div>
			<textarea className="border-0 p-0 resize-none bg-transparent h-full outline-none rounded-none" {...register("description")} />
			<div className="flex gap-2 items-center justify-center"></div>
		</form>
	)
}
