import { useEffect } from "react";

export function useButtonTap() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const b = target.closest("button, .btn-primary, .btn-ghost") as HTMLElement | null;
      if (!b) return;
      b.classList.remove("btn-tap");
      // force reflow so animation restarts
      void b.offsetWidth;
      b.classList.add("btn-tap");
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
