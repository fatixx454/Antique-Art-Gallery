import { Link } from "wouter";
import { useMemo } from "react";

function Stars() {
  const stars = useMemo(() => Array.from({ length: 70 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${1.5 + Math.random() * 3.5}px`,
    height: `${1.5 + Math.random() * 3.5}px`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2 + Math.random() * 3}s`,
    opacity: 0.3 + Math.random() * 0.7,
  })), []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((s, i) => (
        <div key={i} className="welcome-star" style={s} />
      ))}
    </div>
  );
}

export default function Welcome() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative"
      style={{ background: "linear-gradient(170deg, #060d1a 0%, #0b1a30 25%, #102040 50%, #0d1830 75%, #070e1c 100%)" }}
    >
      <Stars />
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 30%, rgba(140, 160, 220, 0.04) 0%, transparent 60%)" }} />

      <div className="relative z-10 max-w-lg w-full flex flex-col items-center">
        <img
          src="/images/welcome-painting.png"
          alt="Dreamy starry night landscape"
          className="w-full max-w-sm aspect-[3/4] object-cover"
          data-testid="img-welcome-painting"
        />

        <div className="mt-10 text-center">
          <h1 className="font-serif leading-[1.0] mb-8" data-testid="text-welcome-title">
            <span className="text-5xl md:text-6xl lg:text-7xl font-light italic text-[#e8dcc8]">
              Antica
            </span>
            {" "}
            <span className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#c8a96e] not-italic">
              Gallery
            </span>
          </h1>

          <div className="max-w-md mx-auto" dir="rtl">
            <p className="text-sm md:text-base leading-[2.6] text-[#a89878]" data-testid="text-welcome-description">
              معرض أنتيكا الفني هو معرض إلكتروني يأخذك في رحلة عبر أعظم الأعمال الفنية التي عرفتها البشرية
              يضم مجموعة مختارة من أشهر اللوحات من جميع أنحاء العالم مع قصصها وفنانيها ونشأتهم
              كل لوحة تحمل حكاية فريدة تنتظر من يرويها
            </p>
          </div>

          <Link href="/gallery">
            <span
              className="inline-block mt-10 text-[10px] tracking-[0.4em] uppercase text-[#b8a88a] border border-[#b8a88a]/25 px-8 py-3 cursor-pointer hover:bg-[#b8a88a]/10 hover:border-[#b8a88a]/40 transition-all"
              data-testid="button-enter-gallery"
            >
              Enter the Gallery
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
