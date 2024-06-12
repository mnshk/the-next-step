/** @type {import('tailwindcss').Config} */
export default {
	content: ["index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			colors: {
				accentPurple: {
					100: "#F3DDE6",
					500: "#291E29",
					900: "#1B1016",
				},
				newPurple: {
					50: "#871f78",
					100: "#7a1c6c",
					200: "#6c1960",
					300: "#5f1654",
					400: "#511348",
					500: "#44103c",
					600: "#360c30",
					700: "#290924",
					800: "#1b0618",
					900: "#0d040c",
				},
			},
		},
		fontFamily: {
			Averta: ["Averta"],
			RobotoMono: ["Roboto Mono"],
			Inter: ["Inter"],
			DMSans: ["DM Sans"],
		},
	},
	plugins: [],
}
