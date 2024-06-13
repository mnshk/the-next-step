import { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export function IconButton({ children, className, ...props }: IconButtonProps) {
	return (
		<button
			className={twMerge(
				"text-accentPurple-500 dark:text-accentPurple-100 text-[22px] flex-grow-0 flex-shrink-0 bg-black dark:bg-white bg-opacity-10 dark:bg-opacity-10 rounded-full w-[45px] h-[45px] flex items-center justify-center cursor-pointer hover:bg-opacity-20 border-0 p-0",
				className
			)}
			{...props}
		>
			{children}
		</button>
	)
}
