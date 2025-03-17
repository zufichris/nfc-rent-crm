import NextTopLoader from "nextjs-toploader"
export function TopLoader() {
    const color = "hsl(262.1 83.3% 57.8%)"
    return <NextTopLoader
        color={color}
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}
        crawl={true}
        showSpinner={true}
        easing="ease"
        speed={200}
        shadow={`0 0 10px ${color},0 0 5px ${color}`}
        zIndex={1600}
        showAtBottom={false}
    />
}

