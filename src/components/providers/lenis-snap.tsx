"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";
import Snap from "lenis/snap";

export function LenisSnap() {
  const lenis = useLenis();
  const snapRef = useRef<Snap | null>(null);

  useEffect(() => {
    if (!lenis) return;

    const snap = new Snap(lenis, {
      type: "proximity",
      debounce: 100,
    });

    // Register all <section> elements as snap targets
    const sections = document.querySelectorAll<HTMLElement>("section");
    const removeElements = snap.addElements([...sections], {
      align: ["start"],
    });

    snapRef.current = snap;

    return () => {
      removeElements();
      snap.destroy();
      snapRef.current = null;
    };
  }, [lenis]);

  return null;
}
