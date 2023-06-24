import "github-markdown-css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GA_TRACKING_ID, pageview } from "../lib/gtag";
import "../styles/globals.scss";

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        if (!GA_TRACKING_ID) {
            return;
        }

        const handleRouteChange = (path: string) => {
            pageview(path);
        };

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return <Component {...pageProps} />;
}
