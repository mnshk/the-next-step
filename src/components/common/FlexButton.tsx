import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type FlexButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function FlexButton({ ...props }: FlexButtonProps) {
	return (
		<button className={twMerge("w-full border-0 flex items-center justify-center gap-2", props.className)} {...props}>
			{props.children}
		</button>
	)
}
