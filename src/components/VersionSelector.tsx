import { Check, ChevronsUpDown, FlaskConical } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import type { AllReleasesResponse } from "@/lib/github";
import { cn } from "@/lib/utils";

interface VersionSelectorProps {
	releases: AllReleasesResponse;
	currentRef: string;
	onVersionChange: (ref: string) => void;
}

export function VersionSelector({
	releases,
	currentRef,
	onVersionChange,
}: VersionSelectorProps) {
	const [open, setOpen] = useState(false);

	const { latestStable, latestPrerelease, allReleases } = releases;

	// Filter out latest stable and prerelease from "Other Versions"
	const otherReleases = allReleases.filter(
		(release) =>
			release.tag_name !== latestStable?.tag_name &&
			release.tag_name !== latestPrerelease?.tag_name,
	);

	const handleSelect = (ref: string) => {
		if (ref !== currentRef) {
			onVersionChange(ref);
		}
		setOpen(false);
	};

	return (
		<div className="my-8 flex items-center justify-end gap-2">
			<span className="text-muted-foreground text-sm">Viewing version:</span>
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="w-[200px] justify-between"
					>
						{currentRef}
						<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0">
					<Command>
						<CommandInput placeholder="Search version..." />
						<CommandList>
							<CommandEmpty>No version found.</CommandEmpty>

							{latestStable && (
								<CommandGroup heading="Latest Stable">
									<CommandItem
										value={latestStable.tag_name}
										onSelect={() => handleSelect(latestStable.tag_name)}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												currentRef === latestStable.tag_name
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										{latestStable.tag_name}
									</CommandItem>
								</CommandGroup>
							)}

							{latestPrerelease && (
								<CommandGroup heading="Latest Pre-release">
									<CommandItem
										value={latestPrerelease.tag_name}
										onSelect={() => handleSelect(latestPrerelease.tag_name)}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												currentRef === latestPrerelease.tag_name
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										<span className="flex-1">{latestPrerelease.tag_name}</span>
										<FlaskConical className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
									</CommandItem>
								</CommandGroup>
							)}

							{(latestStable || latestPrerelease) && <CommandSeparator />}

							<CommandGroup heading="Other Versions">
								<CommandItem
									value="master"
									onSelect={() => handleSelect("master")}
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											currentRef === "master" ? "opacity-100" : "opacity-0",
										)}
									/>
									<span className="flex-1">master</span>
									<FlaskConical className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
								</CommandItem>
								{otherReleases.map((release) => (
									<CommandItem
										key={release.tag_name}
										value={release.tag_name}
										onSelect={() => handleSelect(release.tag_name)}
									>
										<Check
											className={cn(
												"mr-2 h-4 w-4",
												currentRef === release.tag_name
													? "opacity-100"
													: "opacity-0",
											)}
										/>
										<span className="flex-1">{release.tag_name}</span>
										{release.prerelease && (
											<FlaskConical className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
										)}
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		</div>
	);
}
