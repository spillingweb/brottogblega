import { Button } from "#/components/ui/button";
import { cn } from "#/lib/utils";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

const SCROLL_SHOW_THRESHOLD = 280;

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const viewport = document.querySelector<HTMLElement>("[data-slot='scroll-area-viewport']");
    const target = viewport ?? window;
    
    const getScrollTop = () => (viewport ? viewport.scrollTop : window.scrollY);
    const onScroll = () => {
      setIsVisible(getScrollTop() > SCROLL_SHOW_THRESHOLD);
    };

    target.addEventListener("scroll", onScroll, { passive: true });

    // Check after hydration completes
    const frameId = requestAnimationFrame(() => onScroll());

    return () => {
      cancelAnimationFrame(frameId);
      target.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const viewport = document.querySelector<HTMLElement>("[data-slot='scroll-area-viewport']");
    if (viewport) {
      viewport.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      className={cn(
        "fixed right-5 bottom-5 z-50 transition-all duration-300",
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-2 opacity-0 pointer-events-none",
      )}
    >
      <Button
        type="button"
        size="icon"
        onClick={scrollToTop}
        className="rounded-full shadow-lg"
        aria-label="Scroll til toppen"
      >
        <ChevronUp />
      </Button>
    </div>
  );
};

export default ScrollToTopButton;
