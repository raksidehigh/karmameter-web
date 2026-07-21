"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Activates .reveal elements as they scroll into view. Progressive enhancement:
 * if JS never runs, a <noscript> style in the layout keeps everything visible.
 */
export function SolidarityInteractions() {
  useEffect(() => {
    const reveals = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal")
    );

    if (!("IntersectionObserver" in window)) {
      reveals.forEach((el) => el.classList.add("active"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -150px 0px" }
    );

    reveals.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

const HLS_SRC = "/protest/hls/breaking-point.m3u8";
const MP4_FALLBACK = "/protest/breaking-point.mp4";

/**
 * Lag-free, streamed video. Nothing loads until the visitor clicks play; then
 * the clip is streamed as HLS in ~6s chunks (hls.js on Chrome/Firefox/Edge,
 * native HLS on Safari/iOS), falling back to the progressive MP4 if needed. The
 * hls.js bundle is dynamically imported, so it never touches initial page load.
 */
export function BreakingPointVideo() {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!playing) return;
    const video = videoRef.current;
    if (!video) return;

    let hls: import("hls.js").default | null = null;
    let cancelled = false;

    const playMp4 = () => {
      video.src = MP4_FALLBACK;
      void video.play().catch(() => {});
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // Safari / iOS play HLS natively.
      video.src = HLS_SRC;
      void video.play().catch(() => {});
    } else {
      import("hls.js")
        .then(({ default: Hls }) => {
          if (cancelled) return;
          if (Hls.isSupported()) {
            hls = new Hls({ maxBufferLength: 15 });
            hls.loadSource(HLS_SRC);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              void video.play().catch(() => {});
            });
            hls.on(Hls.Events.ERROR, (_event, data) => {
              if (data.fatal) {
                hls?.destroy();
                hls = null;
                playMp4();
              }
            });
          } else {
            playMp4();
          }
        })
        .catch(() => playMp4());
    }

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [playing]);

  return (
    <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-950 shadow-2xl">
      {playing ? (
        <video
          ref={videoRef}
          poster="/protest/hero.jpg"
          controls
          playsInline
          preload="none"
          className="h-full w-full object-cover"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label="Play video"
          className="group absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-white/80 bg-red-600 text-white transition-transform group-hover:scale-110">
            <span className="material-symbols-outlined text-4xl">play_arrow</span>
          </span>
          <span className="font-body text-xs font-bold uppercase tracking-widest text-slate-300">
            Play footage
          </span>
        </button>
      )}
    </div>
  );
}

/** Native share where available, otherwise copy the page URL. */
export function ShareButton() {
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const data = {
      title: "We stand with India's youth — Karmameter.in",
      text: "Solidarity with the students and citizens demanding accountability.",
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* user dismissed the share sheet — nothing to do */
    }
  };

  return (
    <button
      type="button"
      onClick={onShare}
      aria-label="Share this page"
      className="flex items-center gap-1 text-slate-50 transition-colors duration-200 hover:text-red-600"
    >
      <span
        className="material-symbols-outlined"
        style={{ fontVariationSettings: "'FILL' 0" }}
      >
        {copied ? "check" : "share"}
      </span>
    </button>
  );
}
