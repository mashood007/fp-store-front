"use client";

import { useEffect, useRef } from "react";

export default function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Try to play again after hydration
        const playVideo = () => {
            video.play().catch(() => { });
        };

        // try immediately
        playVideo();

        // try again after slight delay (Safari fix)
        const timer = setTimeout(playVideo, 200);

        return () => clearTimeout(timer);
    }, []);

    return (
        <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline

            // preload="auto"
            className="h-full w-full object-cover"
            webkit-playsinline="true"
            preload="metadata"
        >
            <source src="https://kvrayugaswnnzrlb.public.blob.vercel-storage.com/hero_1080.mp4" type="video/mp4" media="(max-width: 768px)" />
            <source src="https://kvrayugaswnnzrlb.public.blob.vercel-storage.com/hero.mp4" type="video/mp4" media="(min-width: 769px)" />
        </video>
    );
}
