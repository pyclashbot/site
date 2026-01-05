import type { ReactNode } from "react";

interface MarkdownHeaderProps {
	children?: ReactNode;
}

const MarkdownHeader = ({ children }: MarkdownHeaderProps) => {
	return (
		<h1 className="mb-4 font-bold text-4xl text-foreground tracking-tight">
			{children}
		</h1>
	);
};

export default MarkdownHeader;
