import type { ReleaseAsset } from "@/lib/github";
import DownloadButton from "./DownloadButton";

interface HeroProps {
	assets: ReleaseAsset[];
	version?: string;
	publishedAt?: string;
	tagName?: string;
	showDetails?: boolean;
	children?: React.ReactNode;
}

export default function Hero({
	assets,
	version,
	publishedAt,
	tagName,
	showDetails = false,
	children,
}: HeroProps) {
	return (
		<div className="flex flex-col items-center gap-8 py-12">
			<p className="text-balance text-center font-black text-5xl text-foreground/90 leading-[1.1] tracking-tight sm:text-6xl">
				Skip the Grind Keep the Progress
			</p>
			<DownloadButton
				assets={assets}
				version={version}
				publishedAt={publishedAt}
				tagName={tagName}
				showDetails={showDetails}
			/>
			{children}
		</div>
	);
}
