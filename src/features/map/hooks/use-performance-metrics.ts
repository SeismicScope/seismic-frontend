import { useEffect, useState } from "react";

export function usePerformanceMetrics() {
  const [fps, setFps] = useState(0);
  const [heap, setHeap] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    let lastTime = performance.now();

    let rafId: number;

    function measure() {
      frame++;
      const now = performance.now();

      if (now - lastTime >= 1000) {
        setFps(frame);
        frame = 0;
        lastTime = now;

        if ("memory" in performance) {
          const memory = performance.memory;
          if (memory) {
            setHeap(memory.usedJSHeapSize / 1024 / 1024);
          }
        }
      }

      rafId = requestAnimationFrame(measure);
    }

    rafId = requestAnimationFrame(measure);

    return () => cancelAnimationFrame(rafId);
  }, []);

  return { fps, heap };
}
