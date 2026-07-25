import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, ArrowLeft, ArrowRight, X, Sun, Moon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Line — منصة النقل الذكي" },
      { name: "description", content: "سمارت لاين - منصة النقل الذكي. حمّل تطبيق العميل أو الكابتن وابدأ الآن." },
      { property: "og:title", content: "Smart Line — منصة النقل الذكي" },
      { property: "og:description", content: "سمارت لاين - منصة النقل الذكي. حمّل تطبيق العميل أو الكابتن." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Lang = "ar" | "en";
type Theme = "light" | "dark";
type AppKey = "client" | "captain";

const STORE_LINKS: Record<AppKey, { android: string; ios: string }> = {
  client: {
    android: "https://play.google.com/store/apps/details?id=com.smartlineuser.app&hl=ar",
    ios: "https://apps.apple.com/eg/app/smart-line-%D8%A7%D9%84%D8%B9%D9%85%D9%8A%D9%84/id6761615232?l=ar",
  },
  captain: {
    android: "https://play.google.com/store/apps/details?id=com.smartlinecaptin.app&hl=ar",
    ios: "https://apps.apple.com/eg/app/smart-line-%D9%83%D8%A7%D8%A8%D8%AA%D9%86/id6761488432",
  },
};

const LOGO_URLS: Record<AppKey, string> = {
  client: "https://play-lh.googleusercontent.com/nOGi8FrVP1jE8VR835jjPj9osYnyjN5aNnmqueCdCZ_jpauDimOu9sQhUpwWqvBXk5UeynHjEm4H6YmQQzeE4Q=w480-h960-rw",
  captain: "https://play-lh.googleusercontent.com/4qk_HedXWct90WWnYm7p9RmbLO96tJ1kmnt5oCZnhhBRPdo4yz_d2YvBbI1LejdEcz5b8c46qBUBAeS9ptOYWA=w480-h960-rw",
};

function detectStoreLink(app: AppKey): string {
  if (typeof navigator === "undefined") return STORE_LINKS[app].android;
  const ua = navigator.userAgent || "";
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (ua.includes("Mac") && "ontouchend" in document);
  return isIOS ? STORE_LINKS[app].ios : STORE_LINKS[app].android;
}

const t = {
  ar: {
    dir: "rtl" as const,
    tag: "منصة النقل الذكي",
    title: "أهلاً بك في سمارت لاين",
    subtitle: "اختر التطبيق للتحميل",
    hint: "اضغط للتحميل فوراً",
    captain: "كابتن",
    captainDesc: "سوّق مع سمارت لاين وابدأ الكسب.",
    client: "عميل",
    clientDesc: "احجز رحلتك في ثوانٍ.",
    download: "تحميل",
    scan: "امسح الكود للتحميل",
    close: "إغلاق",
    android: "جوجل بلاي",
    ios: "آب ستور",
    rights: "© Smart Line 2026. جميع الحقوق محفوظة.",
  },
  en: {
    dir: "ltr" as const,
    tag: "Smart mobility platform",
    title: "Welcome to Smart Line",
    subtitle: "Choose the app to download",
    hint: "Tap to download instantly",
    captain: "Captain",
    captainDesc: "Drive with Smart Line and start earning.",
    client: "Client",
    clientDesc: "Book your ride in seconds.",
    download: "Download",
    scan: "Scan the code to download",
    close: "Close",
    android: "Google Play",
    ios: "App Store",
    rights: "© Smart Line 2026. All rights reserved.",
  },
};

function Index() {
  const [lang, setLang] = useState<Lang>("ar");
  const [theme, setTheme] = useState<Theme>("light");
  const [qrOpen, setQrOpen] = useState<null | AppKey>(null);
  const c = t[lang];
  const Arrow = lang === "ar" ? ArrowLeft : ArrowRight;
  const isDark = theme === "dark";

  const handleDownload = (app: AppKey) => {
    window.open(detectStoreLink(app), "_blank", "noopener,noreferrer");
  };

  return (
    <div
      dir={c.dir}
      className={`min-h-screen font-sans transition-colors duration-500 ${
        isDark
          ? "bg-gradient-to-br from-[#0d0620] via-[#150a2e] to-[#1e0f3d] text-white"
          : "bg-gradient-to-br from-[#faf7ff] via-white to-[#f3ecff] text-[#1a1030]"
      }`}
    >
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === "ar" ? "en" : "ar")}
            className={`relative inline-flex h-10 w-20 items-center rounded-full shadow-sm ring-1 transition ${
              isDark ? "bg-white/10 ring-white/15" : "bg-white ring-black/5"
            }`}
            aria-label="Toggle language"
          >
            <span
              className={`absolute top-1 h-8 w-8 rounded-full bg-[#6b21d9] text-white text-sm font-semibold grid place-items-center transition-all ${
                lang === "ar" ? "right-1" : "left-1"
              }`}
            >
              {lang === "ar" ? "ع" : "EN"}
            </span>
            <span
              className={`w-full text-center text-xs font-medium ${
                isDark ? "text-white/60" : "text-muted-foreground"
              } ${lang === "ar" ? "pr-10" : "pl-10"}`}
            >
              {lang === "ar" ? "EN" : "ع"}
            </span>
          </button>

          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`grid h-10 w-10 place-items-center rounded-full shadow-sm ring-1 transition ${
              isDark
                ? "bg-white/10 text-yellow-300 ring-white/15 hover:bg-white/15"
                : "bg-white text-[#6b21d9] ring-black/5 hover:bg-[#f5efff]"
            }`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="grid h-11 w-11 place-items-center rounded-xl bg-[#6b21d9] text-white font-bold shadow-md">
            SL
          </div>
          <span className={`text-sm font-semibold ${isDark ? "text-white" : "text-[#6b21d9]"}`}>
            Smart Line
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16">
        <div className="mt-8 text-center">
          <p className={`text-sm font-medium ${isDark ? "text-[#c4a8ff]" : "text-[#6b21d9]/80"}`}>{c.tag}</p>
          <h1 className={`mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl ${isDark ? "text-white" : "text-[#1a1030]"}`}>
            {c.title}
          </h1>
          <p className={`mt-4 text-base ${isDark ? "text-white/70" : "text-muted-foreground"}`}>{c.subtitle}</p>
          <p className={`mt-1 text-xs ${isDark ? "text-white/50" : "text-muted-foreground/70"}`}>{c.hint}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          <AppCard
            isDark={isDark}
            logoUrl={LOGO_URLS.client}
            logoBg="bg-[#6b21d9]"
            title={c.client}
            desc={c.clientDesc}
            cta={c.download}
            Arrow={Arrow}
            onDownload={() => handleDownload("client")}
            onQr={() => setQrOpen("client")}
          />
          <AppCard
            isDark={isDark}
            logoUrl={LOGO_URLS.captain}
            logoBg={isDark ? "bg-white" : "bg-white ring-1 ring-[#6b21d9]/15"}
            title={c.captain}
            desc={c.captainDesc}
            cta={c.download}
            Arrow={Arrow}
            onDownload={() => handleDownload("captain")}
            onQr={() => setQrOpen("captain")}
          />
        </div>

        <footer className="mt-20 flex flex-col items-center gap-3 text-center">
          <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#6b21d9] text-white text-xs font-bold shadow">
            SL
          </div>
          <p className={`text-xs ${isDark ? "text-white/50" : "text-muted-foreground"}`}>{c.rights}</p>
        </footer>
      </main>

      {qrOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6 backdrop-blur-sm"
          onClick={() => setQrOpen(null)}
        >
          <div
            className={`relative w-full max-w-sm rounded-3xl p-8 shadow-2xl ${
              isDark ? "bg-[#1a1030] ring-1 ring-white/10" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQrOpen(null)}
              className={`absolute top-4 end-4 grid h-9 w-9 place-items-center rounded-full transition ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-[#f5efff] text-[#6b21d9] hover:bg-[#ebe0ff]"
              }`}
              aria-label={c.close}
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className={`text-center text-xl font-bold ${isDark ? "text-white" : "text-[#1a1030]"}`}>
              {qrOpen === "client" ? c.client : c.captain}
            </h3>
            <p className={`mt-1 text-center text-sm ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
              {c.scan}
            </p>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <QrTile isDark={isDark} label={c.android} value={STORE_LINKS[qrOpen].android} />
              <QrTile isDark={isDark} label={c.ios} value={STORE_LINKS[qrOpen].ios} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function QrTile({ label, value, isDark }: { label: string; value: string; isDark: boolean }) {
  return (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex flex-col items-center gap-3 rounded-2xl p-4 ring-1 transition ${
        isDark
          ? "bg-white/5 ring-white/10 hover:ring-white/25"
          : "bg-[#faf7ff] ring-[#6b21d9]/10 hover:ring-[#6b21d9]/30"
      }`}
    >
      <div className="rounded-xl bg-white p-3 ring-1 ring-black/5">
        <QRCodeSVG value={value} size={128} level="M" fgColor="#1a1030" bgColor="#ffffff" />
      </div>
      <span className={`text-xs font-semibold ${isDark ? "text-[#c4a8ff]" : "text-[#6b21d9]"}`}>
        {label}
      </span>
    </a>
  );
}

function AppCard({
  isDark,
  logoUrl,
  logoBg,
  title,
  desc,
  cta,
  Arrow,
  onDownload,
  onQr,
}: {
  isDark: boolean;
  logoUrl: string;
  logoBg: string;
  title: string;
  desc: string;
  cta: string;
  Arrow: typeof ArrowLeft;
  onDownload: () => void;
  onQr: () => void;
}) {
  return (
    <div
      className={`group rounded-3xl p-8 ring-1 transition hover:-translate-y-1 ${
        isDark
          ? "bg-white/[0.04] ring-white/10 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)] hover:bg-white/[0.06] hover:shadow-[0_20px_50px_-15px_rgba(107,33,217,0.6)]"
          : "bg-white ring-black/5 shadow-[0_10px_40px_-15px_rgba(107,33,217,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(107,33,217,0.35)]"
      }`}
    >
      <div className="flex flex-col items-center text-center">
        <div className={`grid h-24 w-24 place-items-center overflow-hidden rounded-3xl shadow-lg shadow-[#6b21d9]/30 ${logoBg}`}>
          <img src={logoUrl} alt={title} className="h-full w-full object-contain" />
        </div>
        <h3 className={`mt-6 text-2xl font-bold ${isDark ? "text-white" : "text-[#1a1030]"}`}>{title}</h3>
        <p className={`mt-2 text-sm ${isDark ? "text-white/60" : "text-muted-foreground"}`}>{desc}</p>
      </div>

      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={onQr}
          className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl transition ${
            isDark
              ? "bg-white/10 text-[#c4a8ff] hover:bg-white/15"
              : "bg-[#f5efff] text-[#6b21d9] hover:bg-[#ebe0ff]"
          }`}
          aria-label="QR code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <button
          onClick={onDownload}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#6b21d9] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-[#6b21d9]/25 transition hover:bg-[#5a17bd]"
        >
          <span>{cta}</span>
          <Arrow className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
