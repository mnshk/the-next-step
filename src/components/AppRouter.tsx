import Dashboard from "@/pages/dashboard/Dashboard"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import ImmersiveEdit from "./ImmersiveEdit"
import Settings from "@/pages/settings/Settings"

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/edit" element={<ImmersiveEdit />} />
				<Route path="/settings" element={<Settings />} />
			</Routes>
		</BrowserRouter>
	)
}
