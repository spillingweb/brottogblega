import React from "react";

// Standard mobile, tablet, and desktop layout width parameters for Vercel
const DEFAULT_WIDTHS = [384, 640, 750, 828, 1080, 1200, 1920, 2048];

function shouldUseVercelImageOptimization(): boolean {
  const explicitlyEnabled =
    process.env.NEXT_PUBLIC_ENABLE_VERCEL_IMAGE_OPTIMIZATION === "true" ||
    process.env.VERCEL_ENABLE_IMAGE_OPTIMIZATION === "true";

  if (explicitlyEnabled) {
    return true;
  }

  // Vercel's image optimization is a paid feature on some plans, and remote CMS assets
  // like Tina Cloud can hit the 402 Payment Required limit even when the site itself works.
  // In those cases we should bypass the Vercel proxy and load the original source directly.
  if (typeof window !== "undefined") {
    return false;
  }

  return process.env.NODE_ENV === "development" && process.env.VERCEL === "1";
}

/**
 * Core utility to format and route paths through Vercel's Edge Optimization proxy.
 * When optimization is disabled (for example on a Hobby plan with a hit quota or in local dev),
 * we return the original asset URL to avoid 402 responses from /_vercel/image.
 */
export function getOptimizedImageUrl(src: string | undefined | null, width: number, quality = 75): string {
  if (!src) return "";

  let cleanSrc = src.trim();

  if (!shouldUseVercelImageOptimization()) {
    return cleanSrc;
  }

  if (cleanSrc.startsWith("http")) {
    if (cleanSrc.includes("assets.tina.io")) {
      return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
    }
    return cleanSrc;
  }

  if (!cleanSrc.startsWith("/")) {
    cleanSrc = "/" + cleanSrc;
  }

  return `/_vercel/image?url=${encodeURIComponent(cleanSrc)}&w=${width}&q=${quality}`;
}

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  widths?: number[];
  defaultWidth?: number;
}

export function OptimizedImage({
  src,
  fallbackSrc,
  widths = DEFAULT_WIDTHS,
  defaultWidth = 640,
  sizes = "100vw",
  ...props
}: OptimizedImageProps) {
  const finalSrc = src || fallbackSrc || "";

  if (!finalSrc) return null;

  const useOptimization = shouldUseVercelImageOptimization();
  const srcSetString = useOptimization
    ? widths.map((w) => `${getOptimizedImageUrl(finalSrc, w)} ${w}w`).join(", ")
    : undefined;

  return (
    <img
      src={useOptimization ? getOptimizedImageUrl(finalSrc, defaultWidth) : finalSrc}
      srcSet={srcSetString}
      sizes={sizes}
      {...props}
    />
  );
}
