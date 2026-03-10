import { useQuery } from "@tanstack/react-query";
import { type Painting } from "@shared/schema";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

const countryFlags: Record<string, string> = {
  "هولندا": "🇳🇱",
  "إيطاليا": "🇮🇹",
  "اليابان": "🇯🇵",
  "إسبانيا": "🇪🇸",
  "النرويج": "🇳🇴",
  "فرنسا": "🇫🇷",
  "الصين": "🇨🇳",
  "إيران": "🇮🇷",
  "مصر القديمة": "🇪🇬",
  "روسيا": "🇷🇺",
  "المكسيك": "🇲🇽",
  "الهند": "🇮🇳",
  "جنوب أفريقيا": "🇿🇦",
  "ألمانيا": "🇩🇪",
  "المملكة العربية السعودية": "🇸🇦",
  "الجزائر": "🇩🇿",
};

function getFlag(country: string) {
  return countryFlags[country] || "";
}

function needsFrame(url: string) {
  return url.endsWith(".jpeg") || url.endsWith(".jpg");
}

function PaintingImage({ src, alt, className, testId }: { src: string; alt: string; className: string; testId?: string }) {
  if (needsFrame(src)) {
    return (
      <div className="museum-gallery rounded-sm">
        <div className="victorian-frame-outer">
          <div className="victorian-frame-inner">
            <img src={src} alt={alt} className={className} data-testid={testId} />
            <div className="painting-light-overlay" />
          </div>
        </div>
      </div>
    );
  }
  return <img src={src} alt={alt} className={className} data-testid={testId} />;
}

function HeroStars() {
  const stars = useMemo(() => Array.from({ length: 50 }, (_, i) => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    width: `${1.5 + Math.random() * 3}px`,
    height: `${1.5 + Math.random() * 3}px`,
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

function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a1510] text-[#e8dcc8] py-20 px-6 md:px-12">
      <HeroStars />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <p className="text-xs tracking-[0.4em] uppercase text-[#b8a88a] mb-6" data-testid="text-hero-subtitle">
          A Curated Collection
        </p>
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-normal italic leading-[1.1] mb-6" data-testid="text-hero-title">
          Antica<br />
          <span className="not-italic font-bold">Art Gallery</span>
        </h1>
        <p className="max-w-xl mx-auto text-sm text-[#a89878] leading-relaxed">
          Timeless masterpieces from the world's greatest artists.
          Discover the stories behind paintings that shaped history.
        </p>
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="h-px w-16 bg-[#b8a88a]/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#b8a88a]/50" />
          <div className="h-px w-16 bg-[#b8a88a]/30" />
        </div>
      </div>
    </section>
  );
}

function SideBySide({ painting, flip, dark }: { painting: Painting; flip?: boolean; dark?: boolean }) {
  const bg = dark ? "bg-[#1a1510] text-[#e8dcc8]" : "bg-[#a8906e] text-[#1a1510]";
  const sub = dark ? "text-[#b8a88a]" : "text-[#2a1e10]";
  const artist = dark ? "text-[#c8b898]" : "text-[#1a1208]";
  const meta = dark ? "text-[#a89878]" : "text-[#2a1e10]";

  return (
    <Link href={`/painting/${painting.id}`}>
      <section className={`cursor-pointer transition-opacity hover:opacity-90 ${bg}`} data-testid={`card-painting-${painting.id}`}>
        <div className="max-w-6xl mx-auto">
          <div className={`flex flex-col ${flip ? "md:flex-row-reverse" : "md:flex-row"} items-center`}>
            <div className="w-full md:w-1/2 p-6 md:p-10">
              <PaintingImage src={painting.imageUrl} alt={painting.title} className="w-full max-w-sm mx-auto aspect-[3/4] object-cover" testId={`img-painting-${painting.id}`} />
            </div>
            <div className="w-full md:w-1/2 p-6 md:p-10">
              <p className={`text-[10px] tracking-[0.35em] uppercase mb-4 ${sub}`}>{painting.period}</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl italic font-normal leading-[1.15] mb-4" data-testid={`text-title-${painting.id}`}>{painting.title}</h2>
              <p className={`text-sm mb-3 ${artist}`} dir="rtl" data-testid={`text-artist-${painting.id}`}>{painting.artist} — {getFlag(painting.country)} {painting.country}</p>
              <p className={`text-xs leading-relaxed ${meta}`}>{painting.year} · {painting.medium}</p>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}

function FullWidthHero({ painting, dark }: { painting: Painting; dark?: boolean }) {
  const bg = dark ? "bg-[#1a1510]" : "bg-[#a8906e]";
  const textColor = dark ? "text-[#e8dcc8]" : "text-[#1a1510]";
  const sub = dark ? "text-[#b8a88a]" : "text-[#2a1e10]";
  const meta = dark ? "text-[#a89878]" : "text-[#2a1e10]";

  return (
    <Link href={`/painting/${painting.id}`}>
      <section className={`cursor-pointer transition-opacity hover:opacity-90 ${bg} ${textColor}`} data-testid={`card-painting-${painting.id}`}>
        <div className="max-w-5xl mx-auto px-6 py-12 md:py-16">
          <div className="text-center mb-8">
            <p className={`text-[10px] tracking-[0.35em] uppercase mb-4 ${sub}`}>{painting.period}</p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-normal leading-[1.1] mb-3" data-testid={`text-title-${painting.id}`}>{painting.title}</h2>
            <p className={`text-sm ${meta}`} dir="rtl" data-testid={`text-artist-${painting.id}`}>{painting.artist} — {getFlag(painting.country)} {painting.country}</p>
          </div>
          <PaintingImage src={painting.imageUrl} alt={painting.title} className="w-full max-w-md mx-auto aspect-[3/4] object-cover" testId={`img-painting-${painting.id}`} />
          <p className={`text-center text-xs mt-6 ${meta}`}>{painting.year} · {painting.medium}</p>
        </div>
      </section>
    </Link>
  );
}

function PaintingGrid({ paintings, dark }: { paintings: Painting[]; dark?: boolean }) {
  const bg = dark ? "bg-[#1a1510]" : "bg-[#a8906e]";
  const textColor = dark ? "text-[#e8dcc8]" : "text-[#1a1510]";
  const sub = dark ? "text-[#b8a88a]" : "text-[#2a1e10]";
  const meta = dark ? "text-[#a89878]" : "text-[#2a1e10]";

  return (
    <section className={`${bg} ${textColor} px-6 py-12 md:py-16`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {paintings.map((painting) => (
            <Link key={painting.id} href={`/painting/${painting.id}`}>
              <div className="cursor-pointer group" data-testid={`card-painting-${painting.id}`}>
                <div className="overflow-hidden">
                  <PaintingImage
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                    testId={`img-painting-${painting.id}`}
                  />
                </div>
                <div className="mt-4">
                  <p className={`text-[9px] tracking-[0.35em] uppercase mb-2 ${sub}`}>{painting.period}</p>
                  <h3 className="font-serif text-xl md:text-2xl italic font-normal leading-[1.2] mb-2" data-testid={`text-title-${painting.id}`}>{painting.title}</h3>
                  <p className={`text-xs mb-1 ${meta}`} dir="rtl" data-testid={`text-artist-${painting.id}`}>{painting.artist}</p>
                  <p className={`text-[10px] ${meta}`}>{painting.year} · {getFlag(painting.country)} {painting.country}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionDivider({ title, dark }: { title: string; dark?: boolean }) {
  const bg = dark ? "bg-[#1a1510]" : "bg-[#a8906e]";
  const line = dark ? "bg-[#b8a88a]/20" : "bg-[#1a1510]/10";
  const text = dark ? "text-[#b8a88a]" : "text-[#2a1e10]";

  return (
    <div className={`${bg} px-6 py-10`}>
      <div className="max-w-5xl mx-auto flex items-center gap-6">
        <div className={`h-px flex-1 ${line}`} />
        <p className={`text-[10px] tracking-[0.5em] uppercase ${text}`}>{title}</p>
        <div className={`h-px flex-1 ${line}`} />
      </div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="bg-[#a8906e] p-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <Skeleton className="w-full md:w-1/2 aspect-[3/4] max-w-sm mx-auto bg-[#c8b898]/30" />
        <div className="w-full md:w-1/2 space-y-4">
          <Skeleton className="h-3 w-20 bg-[#c8b898]/30" />
          <Skeleton className="h-12 w-3/4 bg-[#c8b898]/30" />
          <Skeleton className="h-4 w-1/2 bg-[#c8b898]/30" />
          <Skeleton className="h-3 w-1/3 bg-[#c8b898]/30" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const { data: paintings, isLoading } = useQuery<Painting[]>({
    queryKey: ["/api/paintings"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#a8906e]">
        <HeroSection />
        {Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} />)}
      </div>
    );
  }

  const p = paintings || [];

  return (
    <div className="min-h-screen bg-[#a8906e]">
      <HeroSection />

      {p[0] && <SideBySide painting={p[0]} dark={false} />}
      {p[1] && <SideBySide painting={p[1]} flip dark />}

      {p[2] && <FullWidthHero painting={p[2]} dark={false} />}

      {p[3] && <SideBySide painting={p[3]} dark />}
      {p[4] && <SideBySide painting={p[4]} flip dark={false} />}

      {p[5] && <FullWidthHero painting={p[5]} dark />}

      {p[6] && <SideBySide painting={p[6]} dark={false} />}
      {p[7] && <SideBySide painting={p[7]} flip dark />}

      <SectionDivider title="From Around the World" dark={false} />

      {p[8] && <FullWidthHero painting={p[8]} dark={false} />}

      {p[9] && <SideBySide painting={p[9]} dark />}
      {p[10] && <SideBySide painting={p[10]} flip dark={false} />}

      {p.length > 11 && (
        <PaintingGrid paintings={p.slice(11, 14)} dark />
      )}

      {p[14] && <FullWidthHero painting={p[14]} dark={false} />}

      {p[15] && <SideBySide painting={p[15]} dark />}

      {p[16] && <FullWidthHero painting={p[16]} dark={false} />}

      {p[17] && <SideBySide painting={p[17]} flip dark />}

      {p[18] && <FullWidthHero painting={p[18]} dark={false} />}

      <footer className="bg-[#1a1510] text-[#a89878] py-12 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#b8a88a]/20" />
          <div className="w-1 h-1 rounded-full bg-[#b8a88a]/30" />
          <div className="h-px w-10 bg-[#b8a88a]/20" />
        </div>
        <p className="font-serif text-sm italic" data-testid="text-footer">
          Antica Art Gallery
        </p>
        <p className="text-[10px] tracking-[0.3em] uppercase mt-1">
          Timeless Masterpieces
        </p>
      </footer>
    </div>
  );
}
