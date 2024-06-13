import { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type PillProps = HTMLAttributes<HTMLDivElement>

export default function Pill({ children, className }: PillProps) {
	return (
		<div
			className={twMerge(
				"text-[12px] flex items-center justify-center cursor-pointer text-black bg-black bg-opacity-10 px-2 py-[1px] rounded-md",
				className
			)}
		>
			{children}
		</div>
	)
}
