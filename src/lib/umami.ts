const UMAMI_ENDPOINT = "https://analytics.pyclashbot.app/api/send";
const UMAMI_HOSTNAME = "pyclashbot.app";
const UMAMI_TIMEOUT_MS = 1000;

interface TrackEventArgs {
	/** Event name, e.g. "discord-redirect". */
	name: string;
	/** Path the event is attributed to, e.g. "/discord/invite". */
	url: string;
	/** Arbitrary event data. */
	data?: Record<string, unknown>;
	/** The incoming request, used to forward User-Agent and client IP. */
	request: Request;
}

/**
 * Best-effort server-side umami event. Failures and slowness are swallowed so the
 * caller's response is never blocked or broken. No-op when ANALYTICS_ID is unset.
 *
 * Awaited rather than detached: AWS Lambda freezes execution once a response is
 * returned, so a fire-and-forget promise may never complete. The timeout keeps the
 * added latency negligible.
 */
export async function trackEvent({
	name,
	url,
	data,
	request,
}: TrackEventArgs): Promise<void> {
	const website = process.env.ANALYTICS_ID;
	if (!website) {
		return;
	}

	const controller = new AbortController();
	const timeout = setTimeout(() => controller.abort(), UMAMI_TIMEOUT_MS);

	try {
		const headers: Record<string, string> = {
			"Content-Type": "application/json",
			// umami rejects requests without a User-Agent.
			"User-Agent":
				request.headers.get("user-agent") ?? "pyclashbot-site-server",
		};
		const forwardedFor = request.headers.get("x-forwarded-for");
		if (forwardedFor) {
			headers["X-Forwarded-For"] = forwardedFor;
		}

		await fetch(UMAMI_ENDPOINT, {
			method: "POST",
			headers,
			body: JSON.stringify({
				type: "event",
				payload: { website, hostname: UMAMI_HOSTNAME, url, name, data },
			}),
			signal: controller.signal,
		});
	} catch (err) {
		console.warn("[umami] failed to send event:", err);
	} finally {
		clearTimeout(timeout);
	}
}
