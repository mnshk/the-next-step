import { IconButton } from "@/components/common/IconButton"
import { ReactNode } from "react"

type SettingItemProps = {
	leadingIcon: ReactNode
	title: string
	description?: string
}

export default function SettingItem({ leadingIcon, title, description }: SettingItemProps) {
	return (
		<div className="flex items-center px-5 py-2 gap-5 duration-500 hover:brightness-90 bg-white">
			<IconButton>{leadingIcon}</IconButton>
			<div>
				<div className="font-semibold">{title}</div>
				{description ? <div className="text-zinc-500 text-[14px]">{description}</div> : null}
			</div>
		</div>
	)
}
