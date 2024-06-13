import { HTMLAttributes } from "react"

type PopupSeparatorProps = {
	wrapperProps: HTMLAttributes<HTMLDivElement>
	props: HTMLAttributes<HTMLDivElement>
}

export default function PopupSeparator({ wrapperProps, props }: PopupSeparatorProps) {
	return (
		<div className="p-3 px-10" {...wrapperProps}>
			<div className="border-b-2" {...props}></div>
		</div>
	)
}
