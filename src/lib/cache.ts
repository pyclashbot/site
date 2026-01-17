// Cache durations in seconds
export const CACHE_DURATIONS = {
	SHORT: 300, // 5 minutes - frequently changing content
	MEDIUM: 900, // 15 minutes - moderately dynamic content
	LONG: 86400, // 24 hours - rarely changing content
} as const;

// Pre-built Cache-Control headers for CloudFront
export const CACHE_HEADERS = {
	// For dynamic pages (home, releases list, contributing)
	// Browser: always revalidate, CDN: cache 15 min
	DYNAMIC: `public, max-age=0, s-maxage=${CACHE_DURATIONS.MEDIUM}, stale-while-revalidate=60`,

	// For frequently updated pages (releases list with pagination)
	// Browser: always revalidate, CDN: cache 5 min
	FREQUENT: `public, max-age=0, s-maxage=${CACHE_DURATIONS.SHORT}, stale-while-revalidate=60`,

	// For immutable content (specific release pages, license)
	// Browser: 1 hour, CDN: 24 hours
	IMMUTABLE: `public, max-age=3600, s-maxage=${CACHE_DURATIONS.LONG}, stale-while-revalidate=3600`,

	// For redirects - don't cache
	NO_CACHE: "private, no-cache, no-store, must-revalidate",
} as const;
