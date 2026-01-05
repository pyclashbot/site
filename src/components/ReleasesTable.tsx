import { Link } from "@tanstack/react-router";
import { FlaskConical, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import type { Release } from "@/lib/github";

interface ReleasesTableProps {
	releases: Release[];
	onReleaseClick: (tag: string) => void;
}

export function ReleasesTable({
	releases,
	onReleaseClick,
}: ReleasesTableProps) {
	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead>Version</TableHead>
					<TableHead>Date</TableHead>
					<TableHead>Downloads</TableHead>
					<TableHead className="w-10"></TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{releases.map((release) => {
					const totalDownloads = release.assets.reduce(
						(sum, asset) => sum + asset.download_count,
						0,
					);
					return (
						<TableRow
							key={release.tag_name}
							className="cursor-pointer"
							onClick={() => onReleaseClick(release.tag_name)}
						>
							<TableCell>
								<div className="flex items-center gap-2">
									<span className="font-medium">{release.name}</span>
									{release.prerelease && (
										<span className="flex items-center gap-1 rounded bg-accent/20 px-2 py-0.5 text-accent text-xs">
											<FlaskConical className="h-3 w-3" />
											Pre-release
										</span>
									)}
								</div>
							</TableCell>
							<TableCell className="text-muted-foreground">
								{release.published_at
									? new Date(release.published_at).toLocaleDateString()
									: "—"}
							</TableCell>
							<TableCell className="text-muted-foreground">
								{totalDownloads.toLocaleString()}
							</TableCell>
							<TableCell>
								<Button variant="ghost" size="icon" asChild>
									<Link
										to="/releases/$tag"
										params={{ tag: release.tag_name }}
										onClick={(e) => e.stopPropagation()}
									>
										<MoreHorizontal className="h-5 w-5" />
									</Link>
								</Button>
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
		</Table>
	);
}
