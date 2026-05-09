"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface VisibleLoggerProps {
  message?: string;
  onVisible: () => Promise<void>; // Permite funciones async
  data: any[];
  hasMore: boolean;
}

const VisibleLogger = ({
  message = "Cargando...",
  onVisible,
  data,
  hasMore,
}: VisibleLoggerProps) => {
  const elementRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const loadingRef = useRef(false); // Nuevo ref para controlar el loading

  useLayoutEffect(() => {
    const targetElement = elementRef.current;

    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (
          entry.isIntersecting &&
          !hasLoadedRef.current &&
          !loadingRef.current &&
          hasMore
        ) {
          hasLoadedRef.current = true;
          loadingRef.current = true;
          try {
            await onVisible();
          } finally {
            loadingRef.current = false;
          }
        }
      },
      { threshold: 0.5 },
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [onVisible]);

  useLayoutEffect(() => {
    hasLoadedRef.current = false;
  }, [data]);

  return (
    <div ref={elementRef}>
      {hasMore && <p>Cargando...</p>}
      {!hasMore && data.length === 0 && <p>No hay datos que mostrar</p>}
    </div>
  );
};

export default VisibleLogger;
