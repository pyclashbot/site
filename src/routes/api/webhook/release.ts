import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { SendEmbed } from "@/lib/discord";

const envSchema = z.object({
	API_ROUTE_SECRET: z.string().min(1),
	DISCORD_WEBHOOK_RELEASE: z.string().url(),
});

export const Route = createFileRoute("/api/webhook/release")({
	// @ts-expect-error TanStack Start server handlers - types provided by Vite plugin at build time
	server: {
		handlers: {
			POST: async ({ request }: { request: Request }) => {
				// Validate environment configuration
				const envResult = envSchema.safeParse(process.env);
				if (!envResult.success) {
					const missing = envResult.error.issues
						.map((i) => i.path.join("."))
						.join(", ");
					console.error(
						`[webhook/release] Environment configuration error: missing or invalid: ${missing}`,
					);
					return new Response("Internal server error", { status: 500 });
				}
				const env = envResult.data;

				// Authorization
				const { searchParams } = new URL(request.url);
				const code = searchParams.get("code");

				if (!code) {
					console.warn(
						"[webhook/release] Authorization failed: no code parameter provided",
					);
					return new Response("Unauthorized", { status: 401 });
				}

				if (code !== env.API_ROUTE_SECRET) {
					console.warn(
						"[webhook/release] Authorization failed: invalid code parameter",
					);
					return new Response("Unauthorized", { status: 401 });
				}

				// Parse body
				const reqBody = await request.text();
				if (reqBody === "") {
					console.warn("[webhook/release] Bad request: empty body");
					return new Response("Bad request", { status: 400 });
				}

				let data: {
					title?: string;
					description?: string;
					url?: string;
					timestamp?: Date;
					color?: number;
				};

				try {
					data = JSON.parse(reqBody);
				} catch {
					console.warn("[webhook/release] Bad request: invalid JSON body");
					return new Response("Bad request", { status: 400 });
				}

				console.log("[webhook/release] Processing embed:", data);

				if (data.title) {
					data.title = `📦 | ${data.title}`;
				}

				// Send embed
				try {
					await SendEmbed(env.DISCORD_WEBHOOK_RELEASE, {
						title: "🎁 | New Release",
						url: "https://github.com/pyclashbot/py-clash-bot/releases/latest",
						color: 0x03fc49,
						tagId: "1128136563201671221",
						...data,
					});
				} catch (err) {
					console.error(
						"[webhook/release] Failed to send Discord embed:",
						err,
					);
					return new Response("Internal server error", { status: 500 });
				}

				console.log("[webhook/release] Embed sent successfully");
				return new Response("OK", { status: 200 });
			},
		},
	},
});
