import type { ReactNode } from "react";

interface MarkdownSubheaderProps {
	children?: ReactNode;
}

const MarkdownSubheader = ({ children }: MarkdownSubheaderProps) => {
	return (
		<h2 className="mt-8 mb-3 border-primary border-l-2 pl-4 font-semibold text-2xl text-foreground">
			{children}
		</h2>
	);
};

export default MarkdownSubheader;
