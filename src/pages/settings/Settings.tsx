import { IconButton } from "@/components/common/IconButton"
import { MdArrowBack, MdHelpOutline, MdOutlineAccountCircle, MdOutlineAppSettingsAlt } from "react-icons/md"
import { Link } from "react-router-dom"
import SettingItem from "./SettingItem"

export default function Settings() {
	return (
		<div className="w-full h-full overflow-auto animate-page-load">
			<div className="flex px-5 py-3 items-center gap-5">
				<Link to="/">
					<IconButton className="bg-transparent hover:bg-zinc-900">
						<MdArrowBack />
					</IconButton>
				</Link>
				<div className="font-semibold text-xl">Settings</div>
			</div>
			<div className="flex flex-col">
				<SettingItem leadingIcon={<MdOutlineAccountCircle />} title="Developer Info" description="Munish Kumar (22204040066)" />
				<SettingItem leadingIcon={<MdHelpOutline />} title="Help & Feedback" description="send2munish@gmail.com" />
				<SettingItem leadingIcon={<MdOutlineAppSettingsAlt />} title="Version" description="v0.1" />
			</div>
		</div>
	)
}
