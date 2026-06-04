export async function SendEmbed(
	webhookUrl: string,
	data: {
		title?: string;
		description?: string;
		url?: string;
		timestamp?: Date;
		color?: number;
	},
) {
	const embed = {
		title: data.title,
		description: data.description,
		url: data.url,
		timestamp: data.timestamp,
		color: data.color,
	};
	const body = {
		embeds: [embed],
		content: "@here",
		// `@here` only pings when "everyone" is in the parse list, even though
		// the mention text itself is `@here` rather than `@everyone`.
		allowed_mentions: { parse: ["everyone"] },
	};

	await fetch(webhookUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});
}
