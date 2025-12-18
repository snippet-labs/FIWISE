import { useState, useEffect } from "react";

export const useScreenSize = () => {
  const [viewport, setViewport] = useState({
    height: globalThis.innerHeight,
    width: globalThis.innerWidth,
  });

  useEffect(() => {
    const handleViewportResizeEffect = () => {
      setViewport({
        height: globalThis.innerHeight,
        width: globalThis.innerWidth,
      });
    };
    globalThis.addEventListener("resize", handleViewportResizeEffect);
    return () =>
      globalThis.removeEventListener("resize", handleViewportResizeEffect);
  });

  return viewport;
};
