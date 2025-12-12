export default function HeroVideo() {
    return (
        <div className="relative h-full w-full">
            <video
                playsInline
                autoPlay
                loop
                muted
                className="absolute inset-0 h-full w-full object-cover"
                preload="metadata"
                poster="/bottle.png"
            >
                <source src="https://kvrayugaswnnzrlb.public.blob.vercel-storage.com/hero_1080.mp4" type="video/mp4" />
            </video>
        </div>
    );
}