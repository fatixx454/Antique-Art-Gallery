import { useQuery } from "@tanstack/react-query";
import { type Painting } from "@shared/schema";
import { useParams, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

function DetailSkeleton() {
  return (
    <div className="min-h-screen bg-[#a8906e]">
      <div className="bg-[#1a1510] p-6">
        <Skeleton className="h-8 w-32 bg-[#3a3020]" />
      </div>
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <Skeleton className="w-full max-w-md mx-auto aspect-[3/4] bg-[#c8b898]/30" />
        <Skeleton className="h-10 w-3/4 mx-auto bg-[#c8b898]/30" />
        <Skeleton className="h-4 w-full bg-[#c8b898]/30" />
        <Skeleton className="h-4 w-full bg-[#c8b898]/30" />
        <Skeleton className="h-4 w-2/3 bg-[#c8b898]/30" />
      </div>
    </div>
  );
}

export default function PaintingDetail() {
  const params = useParams<{ id: string }>();
  const id = parseInt(params.id || "0");

  const { data: painting, isLoading } = useQuery<Painting>({
    queryKey: ["/api/paintings", id],
    enabled: !!id,
  });

  if (isLoading) return <DetailSkeleton />;

  if (!painting) {
    return (
      <div className="min-h-screen bg-[#1a1510] flex items-center justify-center px-4">
        <div className="text-center text-[#e8dcc8]">
          <h2 className="font-serif text-3xl italic mb-3">Not Found</h2>
          <p className="text-[#a89878] text-sm mb-8">The painting you're looking for doesn't exist.</p>
          <Link href="/gallery">
            <span className="text-xs tracking-[0.3em] uppercase text-[#b8a88a] border-b border-[#b8a88a]/30 pb-1 cursor-pointer" data-testid="button-back-home">
              Return to Gallery
            </span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="bg-[#1a1510] sticky top-0 z-50">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/gallery">
            <span className="flex items-center gap-2 text-[#b8a88a] text-xs tracking-[0.2em] uppercase cursor-pointer" data-testid="button-back">
              <ArrowLeft className="w-4 h-4" />
              Gallery
            </span>
          </Link>
          <span className="font-serif text-sm italic text-[#e8dcc8]">Antica Art Gallery</span>
        </div>
      </header>

      <section className="bg-[#1a1510] pb-12">
        <div className="max-w-md mx-auto px-6 pt-4">
          {needsFrame(painting.imageUrl) ? (
            <div className="museum-gallery rounded-sm">
              <div className="victorian-frame-outer">
                <div className="victorian-frame-inner">
                  <img
                    src={painting.imageUrl}
                    alt={painting.title}
                    className="w-full aspect-[3/4] object-cover"
                    data-testid="img-painting-detail"
                  />
                  <div className="painting-light-overlay" />
                </div>
              </div>
            </div>
          ) : (
            <img
              src={painting.imageUrl}
              alt={painting.title}
              className="w-full aspect-[3/4] object-cover"
              data-testid="img-painting-detail"
            />
          )}
        </div>
      </section>

      <section className="bg-[#a8906e] text-[#1a1510]">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#2a1e10] mb-4">
            {painting.period}
          </p>

          <h1
            className="font-serif text-4xl md:text-5xl lg:text-6xl italic font-normal leading-[1.1] mb-6"
            data-testid="text-painting-title"
          >
            {painting.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#1a1510]/10" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Artist</p>
              <p className="text-sm font-medium" dir="rtl" data-testid="text-detail-artist">{painting.artist}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Year</p>
              <p className="text-sm font-medium" data-testid="text-detail-year">{painting.year}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Country</p>
              <p className="text-sm font-medium" dir="rtl" data-testid="text-detail-country">{getFlag(painting.country)} {painting.country}</p>
            </div>
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Medium</p>
              <p className="text-sm font-medium" dir="rtl" data-testid="text-detail-medium">{painting.medium}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1 bg-[#1a1510]/10" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Museum</p>
              <p className="text-sm font-medium" dir="rtl" data-testid="text-detail-museum">{painting.museum}</p>
            </div>
            {painting.famousDate && (
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[#2a1e10] mb-1">Rise to Fame</p>
                <p className="text-sm font-medium" dir="rtl" data-testid="text-detail-famous">{painting.famousDate}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#1a1510] text-[#e8dcc8]">
        <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
          <p className="text-[10px] tracking-[0.35em] uppercase text-[#b8a88a] mb-6">
            The Story
          </p>

          <div dir="rtl">
            <p
              className="font-serif text-base md:text-lg leading-[2] text-[#c8b898]"
              data-testid="text-painting-description"
            >
              {painting.description}
            </p>
          </div>
        </div>
      </section>

      {painting.artistBio && (
        <section className="bg-[#a8906e] text-[#1a1510]">
          <div className="max-w-3xl mx-auto px-6 py-12 md:py-16">
            <p className="text-[10px] tracking-[0.35em] uppercase text-[#2a1e10] mb-6">
              The Artist
            </p>

            <div className="flex flex-col md:flex-row gap-8 items-start mb-8">
              <div className="flex-shrink-0 mx-auto md:mx-0">
                {painting.artistImageUrl ? (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-[#1a1510]/15 shadow-lg">
                    <img
                      src={painting.artistImageUrl}
                      alt={painting.artist}
                      className="w-full h-full object-cover"
                      data-testid="img-artist-portrait"
                    />
                  </div>
                ) : (
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#1a1510]/15 bg-[#1a1510]/5 flex items-center justify-center" data-testid="no-artist-portrait">
                    <p className="text-[10px] text-center leading-relaxed text-[#2a1e10]/60 px-3" dir="rtl">لا توجد صورة شخصية منشورة عن الفنان</p>
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h2 className="font-serif text-2xl md:text-3xl italic font-normal leading-[1.2] mb-4" dir="rtl" data-testid="text-artist-name">
                  {painting.artist}
                </h2>
                <div className="h-px w-full bg-[#1a1510]/10 mb-4" />
                <div dir="rtl">
                  <p
                    className="text-sm md:text-base leading-[2.2] text-[#1a1208]"
                    data-testid="text-artist-bio"
                  >
                    {painting.artistBio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[#1a1510] py-10 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-10 bg-[#b8a88a]/20" />
          <div className="w-1 h-1 rounded-full bg-[#b8a88a]/30" />
          <div className="h-px w-10 bg-[#b8a88a]/20" />
        </div>
        <Link href="/gallery">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#a89878] cursor-pointer" data-testid="link-back-gallery">
            Back to Gallery
          </span>
        </Link>
      </footer>
    </div>
  );
}
