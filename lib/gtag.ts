export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

export const pageview = (url: string) => {
    if (typeof window !== "undefined" && window.gtag) {
        if (typeof GA_MEASUREMENT_ID === "string") {
            window.gtag("config", GA_MEASUREMENT_ID, {
                page_path: url,
            });
        }
    }
};
