import { Link } from "@tanstack/react-router";
import { useState } from "react";
import logo from "@/assets/pixel-pycb.png";

const linkClass =
	"md:text-sm text-2xl text-muted-foreground transition-colors hover:text-foreground";

const hamburgerLine =
	"h-0.5 w-6 bg-foreground transition-all duration-300 ease-in-out";

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const closeMenu = () => setIsOpen(false);

	return (
		<header className="sticky top-0 z-50 border-border border-b bg-background/80 backdrop-blur-sm">
			<nav className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6 md:px-8">
				<Link to="/" className="flex items-center gap-2">
					<img src={logo} alt="" width={32} height={32} />
					<span className="font-semibold text-foreground">py-clash-bot</span>
				</Link>

				{/* Desktop navigation */}
				<div className="hidden items-center gap-6 md:flex">
					<Link
						to="/"
						className={linkClass}
						activeProps={{ className: "text-foreground" }}
					>
						Home
					</Link>
					<Link
						to="/releases"
						search={{ tab: "stable", page: 1 }}
						className={linkClass}
						activeOptions={{ includeSearch: false }}
						activeProps={{ className: "text-foreground" }}
					>
						Downloads
					</Link>
					<Link
						to="/contributing"
						className={linkClass}
						activeProps={{ className: "text-foreground" }}
					>
						Contributing
					</Link>
					<a
						href="https://github.com/pyclashbot/py-clash-bot"
						target="_blank"
						rel="noopener noreferrer"
						className={linkClass}
					>
						GitHub
					</a>
				</div>

				{/* Mobile hamburger button */}
				<button
					type="button"
					className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
					onClick={() => setIsOpen(!isOpen)}
					aria-label="Toggle menu"
					aria-expanded={isOpen}
				>
					<div
						className={`${hamburgerLine} ${isOpen ? "translate-y-2 rotate-45" : ""}`}
					/>
					<div className={`${hamburgerLine} ${isOpen ? "opacity-0" : ""}`} />
					<div
						className={`${hamburgerLine} ${isOpen ? "-translate-y-2 -rotate-45" : ""}`}
					/>
				</button>
			</nav>

			{/* Mobile menu dropdown */}
			<div
				className={`absolute right-0 left-0 overflow-hidden border-border border-b bg-background/98 backdrop-blur-lg transition-all duration-300 ease-in-out md:hidden ${
					isOpen
						? "max-h-64 opacity-100"
						: "max-h-0 border-transparent opacity-0"
				}`}
			>
				<div className="flex flex-col items-end gap-4 px-6 py-4">
					<Link
						to="/"
						className={linkClass}
						activeProps={{ className: "text-foreground" }}
						onClick={closeMenu}
					>
						Home
					</Link>
					<Link
						to="/releases"
						search={{ tab: "stable", page: 1 }}
						className={linkClass}
						activeOptions={{ includeSearch: false }}
						activeProps={{ className: "text-foreground" }}
						onClick={closeMenu}
					>
						Downloads
					</Link>
					<Link
						to="/contributing"
						className={linkClass}
						activeProps={{ className: "text-foreground" }}
						onClick={closeMenu}
					>
						Contributing
					</Link>
					<a
						href="https://github.com/pyclashbot/py-clash-bot"
						target="_blank"
						rel="noopener noreferrer"
						className={linkClass}
					>
						GitHub
					</a>
				</div>
			</div>
		</header>
	);
}
