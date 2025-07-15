import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Link } from 'react-router-dom';
const MotionLink = motion(Link);

const navItems = [
	{ label: "Available Matches", emphasize: true },
	{ label: "Player vs AI" },
	{ label: "Player vs Player" },
	{ label: "Messages" },
	{ label: "Learn" },
	{ label: "Spectate" },
]

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false)
	const routeMap = {
	"Available Matches": "/lobby",
	"Player vs AI": "/ai",
	"Player vs Player": "/pvp",
	"Messages": "/messages",
	"Learn": "/learn",
	"Spectate": "/spectate",
	};

	return (
		<>
			{/* Top Navbar */}
			<nav className="w-full px-6 py-4 bg-black text-white shadow-md relative z-50">
				<div className="max-w-7xl mx-auto flex justify-between items-center">
					{/* Logo */}
					<motion.div
						initial={{ opacity: 0, x: -20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.6 }}
						className="text-2xl font-bold tracking-wide"
					>
						<span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
							DEBATE.ORG
						</span>
					</motion.div>

					{/* Desktop Nav */}
					<div className="hidden md:flex items-center gap-10">
						{navItems.map((item, i) =>
							item.emphasize ? (
							<MotionLink
								key={i}
								to={routeMap[item.label]}
								className="h-12 px-4 flex items-center justify-center bg-gradient-to-b from-cyan-500 to-blue-700 rounded-xl text-sm font-semibold shadow-md hover:scale-105 transition-transform duration-300"
							>
								{item.label}
							</MotionLink>
							) : (
							<MotionLink
								key={i}
								to={routeMap[item.label]}
								className="relative group text-sm"
								whileHover={{ scale: 1.05 }}
								transition={{ duration: 0.2 }}
							>
								{item.label}
								<span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
							</MotionLink>
							)
						)}
						</div>

					{/* Mobile Menu Icon */}
					<div className="md:hidden z-50">
						<button onClick={() => setMenuOpen(!menuOpen)}>
							{menuOpen ? <X size={28} /> : <Menu size={28} />}
						</button>
					</div>
				</div>

				{/* Mobile Nav Panel */}
				<AnimatePresence>
					{menuOpen && (
						<motion.div
							initial={{ x: "100%" }}
							animate={{ x: 0 }}
							exit={{ x: "100%" }}
							transition={{ type: "spring", stiffness: 80, damping: 15 }}
							className="fixed top-0 right-0 h-screen w-3/4 bg-gray-900 p-6 flex flex-col gap-6 text-white shadow-xl"
						>
							{navItems.map((item, i) => (
								<MotionLink
									key={i}
									to={routeMap[item.label]}
  									className={`text-xl ${item.emphasize ? "font-bold text-cyan-300" : ""}`}
									onClick={() => setMenuOpen(false)}
									whileHover={{ scale: 1.05, color: "#22d3ee" }}
									transition={{ duration: 0.2 }}
								>
									{item.label}
								</MotionLink>
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</nav>
		</>
	)
}
