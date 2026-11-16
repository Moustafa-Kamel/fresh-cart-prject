"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  direction: "up" | "left" | "right";
  delay?: number;
  once?: boolean;
  className?: string;
  visibleClassName?: string;
};

const slides = {
  up: "slide-in-from-bottom-8",
  left: "slide-in-from-left-8",
  right: "slide-in-from-right-8",
};

export function Reveal({
  children,
  direction,
  delay = 0,
  once = true,
  className,
  visibleClassName,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        setVisible(inView);
        if (inView && once) observer.disconnect();
      },
      { threshold: 0.2 },
    );

    const updateMotion = () => {
      setReducedMotion(motion.matches);
      observer.disconnect();
      if (!motion.matches) observer.observe(element);
    };

    updateMotion();
    motion.addEventListener("change", updateMotion);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
    };
  }, [once]);

  return (
    <div
      ref={ref}
      style={{ animationDelay: `${delay}ms` }}
      className={cn(
        className,
        "motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:transition-none",
        reducedMotion
          ? visibleClassName
          : visible
            ? cn(
                "animate-in fade-in duration-700 fill-mode-both",
                slides[direction],
                visibleClassName,
              )
            : "opacity-0",
      )}
    >
      {children}
    </div>
  );
}
