import {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import { PageSpinner } from "./PageSpinner";

const SHOW_DELAY_MS = 200;
const SHOW_DELAY_REDUCED_MS = 0;
const MAX_VISIBLE_MS = 2500;
const MAX_VISIBLE_REDUCED_MS = 400;

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Fires after the suspended route tree has committed (page is ready). */
function RouteReadySignal({ onReady }: { onReady: () => void }) {
  const [location] = useLocation();
  useLayoutEffect(() => {
    onReady();
  }, [location, onReady]);
  return null;
}

/**
 * Shows PageSpinner on wouter navigations only if the new route takes
 * longer than ~200ms (skipped / shorter under prefers-reduced-motion).
 * Always clears when the route commits or when MAX_VISIBLE_MS elapses.
 */
export function RouteLoadingProvider({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const reducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);
  const showTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const genRef = useRef(0);

  const clearTimers = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
    if (maxTimerRef.current) {
      clearTimeout(maxTimerRef.current);
      maxTimerRef.current = null;
    }
  }, []);

  const onReady = useCallback(() => {
    clearTimers();
    setVisible(false);
  }, [clearTimers]);

  useEffect(() => {
    const gen = ++genRef.current;
    clearTimers();
    setVisible(false);

    const delay = reducedMotion ? SHOW_DELAY_REDUCED_MS : SHOW_DELAY_MS;
    const maxMs = reducedMotion ? MAX_VISIBLE_REDUCED_MS : MAX_VISIBLE_MS;

    showTimerRef.current = setTimeout(() => {
      if (genRef.current === gen) setVisible(true);
    }, delay);

    maxTimerRef.current = setTimeout(() => {
      if (genRef.current === gen) setVisible(false);
    }, maxMs);

    return () => {
      clearTimers();
    };
  }, [location, reducedMotion, clearTimers]);

  return (
    <>
      <PageSpinner visible={visible} />
      <Suspense fallback={null}>
        <RouteReadySignal onReady={onReady} />
        {children}
      </Suspense>
    </>
  );
}

/** Lazy page helper — named export → default for React.lazy. */
export function lazyPage<T extends Record<string, unknown>>(
  loader: () => Promise<T>,
  exportName: keyof T & string,
) {
  return lazy(async () => {
    const mod = await loader();
    return { default: mod[exportName] as React.ComponentType };
  });
}
