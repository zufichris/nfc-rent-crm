/**
 * Calculate the estimated reading time for a given text
 * @param text The text content to calculate reading time for
 * @param wordsPerMinute The average reading speed in words per minute
 * @returns The estimated reading time in minutes
 */
export function calculateReadTime(text: string, wordsPerMinute = 200): number {
    // Strip HTML tags
    const plainText = text.replace(/<[^>]*>/g, "")

    // Count words (split by spaces and filter out empty strings)
    const words = plainText.split(/\s+/).filter(Boolean)

    // Calculate reading time in minutes
    const readingTime = Math.ceil(words.length / wordsPerMinute)

    // Return at least 1 minute for very short content
    return Math.max(1, readingTime)
}

/**
 * Format the reading time into a human-readable string
 * @param minutes The reading time in minutes
 * @returns A formatted string (e.g., "5 min read")
 */
export function formatReadTime(minutes: number): string {
    return `${minutes} min read`
}

/**
 * Generate a slug from a title
 * @param title The title to convert to a slug
 * @returns A URL-friendly slug
 */
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with a single one
        .trim()
}

