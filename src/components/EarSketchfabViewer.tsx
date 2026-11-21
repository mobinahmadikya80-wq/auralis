import React, { useEffect, useRef, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';

/**
 * Realistic 3D ear cross-section embedded from Sketchfab via the Viewer API.
 * Model: "Ear cross-section" by Ebers — https://sketchfab.com/Ebers
 * The credit line under the viewer is required and must stay.
 */

const MODEL_UID = '4f5438fc9337454587ec4a2c30c8c42f';
const MODEL_URL =
  'https://sketchfab.com/3d-models/ear-cross-section-4f5438fc9337454587ec4a2c30c8c42f';
const API_SRC = 'https://static.sketchfab.com/api/sketchfab-viewer-1.12.1.js';

type Vec3 = [number, number, number];

export interface EarCameraView {
  label: string;
  description?: string;
  position: Vec3;
  target: Vec3;
}

// Fill these using the dev-only "ذخیره‌ی زاویه" button (visible in `npm run dev`).
export const EAR_CAMERA_VIEWS: EarCameraView[] = [];

interface SketchfabApi {
  start: () => void;
  addEventListener: (name: string, cb: () => void) => void;
  setCameraLookAt: (pos: Vec3, target: Vec3, duration?: number) => void;
  getCameraLookAt: (cb: (err: unknown, cam: unknown) => void) => void;
  getNodeMap: (cb: (err: unknown, nodes: Record<string, unknown>) => void) => void;
}

declare global {
  interface Window {
    Sketchfab?: new (iframe: HTMLIFrameElement) => {
      init: (uid: string, opts: Record<string, unknown>) => void;
    };
  }
}

let scriptPromise: Promise<void> | null = null;
function loadSketchfabApi(): Promise<void> {
  if (window.Sketchfab) return Promise.resolve();
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = API_SRC;
      s.async = true;
      s.onload = () => resolve();
      s.onerror = () => {
        scriptPromise = null;
        reject(new Error('Sketchfab API failed to load'));
      };
      document.head.appendChild(s);
    });
  }
  return scriptPromise;
}

export const EarSketchfabViewer: React.FC<{ views?: EarCameraView[] }> = ({
  views = EAR_CAMERA_VIEWS,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const apiRef = useRef<SketchfabApi | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadSketchfabApi()
      .then(() => {
        if (cancelled || !iframeRef.current || !window.Sketchfab) return;
        new window.Sketchfab(iframeRef.current).init(MODEL_UID, {
          autostart: 1,
          ui_infos: 0,
          ui_watermark: 0,
          success: (api: SketchfabApi) => {
            apiRef.current = api;
            api.start();
            api.addEventListener('viewerready', () => {
              if (cancelled) return;
              setReady(true);
              if (import.meta.env.DEV) {
                api.getNodeMap((err, nodes) => {
                  if (!err) console.info('[EarSketchfabViewer] nodes:', nodes);
                });
              }
            });
          },
          error: () => !cancelled && setFailed(true),
        });
      })
      .catch(() => !cancelled && setFailed(true));
    return () => {
      cancelled = true;
    };
  }, []);

  const goTo = (i: number) => {
    const v = views[i];
    if (!apiRef.current || !v) return;
    apiRef.current.setCameraLookAt(v.position, v.target, 1.5);
    setActive(i);
  };

  const logCamera = () => {
    apiRef.current?.getCameraLookAt((err, cam) => {
      if (!err) console.info('[EarSketchfabViewer] camera:', JSON.stringify(cam));
    });
  };

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
        <iframe
          ref={iframeRef}
          title="Ear cross-section"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          className="absolute inset-0 w-full h-full border-0"
        />
        {!ready && !failed && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-zinc-300 text-xs pointer-events-none">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>در حال بارگذاری مدل سه‌بعدی…</span>
          </div>
        )}
        {failed && (
          <div className="absolute inset-0 flex items-center justify-center gap-2 text-zinc-300 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400" />
            <span>بارگذاری مدل ناموفق بود. اتصال اینترنت را بررسی کنید.</span>
          </div>
        )}
      </div>

      {views.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {views.map((v, i) => (
            <button
              key={v.label}
              onClick={() => goTo(i)}
              disabled={!ready}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all disabled:opacity-50 ${
                active === i
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/40'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border-zinc-300 dark:border-zinc-700 hover:border-cyan-500/50'
              }`}
            >
              {v.label}
            </button>
          ))}
        </div>
      )}

      {active !== null && views[active]?.description && (
        <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
          {views[active].description}
        </p>
      )}

      {import.meta.env.DEV && (
        <button
          onClick={logCamera}
          className="px-3 py-1.5 rounded-lg border border-dashed border-zinc-400 text-[11px] text-zinc-500"
        >
          (dev) ذخیره‌ی زاویه‌ی دوربین در کنسول
        </button>
      )}

      <p className="text-[11px] text-zinc-500">
        مدل:{' '}
        <a
          href={MODEL_URL}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          Ear cross-section
        </a>{' '}
        اثر{' '}
        <a
          href="https://sketchfab.com/Ebers"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          Ebers
        </a>{' '}
        در{' '}
        <a
          href="https://sketchfab.com"
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          Sketchfab
        </a>
      </p>
    </div>
  );
};
