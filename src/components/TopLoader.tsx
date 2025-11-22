"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function TopLoadingBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      startLoading();
    }
  }, [pathname]);

  const startLoading = () => {
    setVisible(true);
    progressRef.current = 0.05;
    animate();

    // Auto complete in 10 sec in case route stuck
    setTimeout(() => finishLoading(), 10000);
  };

  const animate = () => {
    progressRef.current = Math.min(
      0.9,
      progressRef.current + (1 - progressRef.current) * 0.1
    );

    updateBar();

    rafRef.current = requestAnimationFrame(animate);
  };

  const updateBar = () => {
    const bar = document.getElementById("loading-bar-inner");
    if (bar) bar.style.transform = `scaleX(${progressRef.current})`;
  };

  const finishLoading = React.useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    progressRef.current = 1;
    updateBar();

    setTimeout(() => {
      setVisible(false);
      progressRef.current = 0;
      updateBar();
    }, 300);
  }, []);

  // Hide bar after route load settles
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => finishLoading(), 500);
      return () => clearTimeout(timer);
    }
  }, [visible, finishLoading]);

  return (
    <div
      className={`fixed top-0 left-0 w-full z-[9999] transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      style={{ height: 3 }}
    >
      <div className="relative h-full w-full bg-transparent overflow-hidden">
        <div
          id="loading-bar-inner"
          className="h-full w-full origin-left scale-x-0 transition-transform duration-150"
        >
          <div className="h-full w-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>
    </div>
  );
}
