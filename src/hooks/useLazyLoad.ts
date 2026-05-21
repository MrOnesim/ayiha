import { useState, useEffect, useRef } from "react";

interface LazyLoadOptions {
    rootMargin?: string;
    threshold?: number;
    placeholder?: string;
}

export function useLazyLoad<T extends HTMLElement>(
    options: LazyLoadOptions = {},
) {
    const {
        rootMargin = "50px",
        threshold = 0.1,
        placeholder = "blur",
    } = options;

    const [isVisible, setIsVisible] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            {
                rootMargin,
                threshold,
            },
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [rootMargin, threshold]);

    const handleLoad = () => {
        setIsLoaded(true);
    };

    return { ref, isVisible, isLoaded, handleLoad, placeholder };
}

// Utility function to get optimized image source
export function getOptimizedImageSrc(
    src: string,
    sizes: { small?: string; medium?: string; large?: string } = {},
): string {
    // Check if WebP is supported
    const supportsWebP = (() => {
        try {
            const canvas = document.createElement("canvas");
            return (
                canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
            );
        } catch {
            return false;
        }
    })();

    // Return WebP version if supported
    if (supportsWebP) {
        const ext = src.split(".").pop();
        const base = src.slice(0, -(ext?.length || 1) - 1);
        return `${base}.webp`;
    }

    return src;
}

// Generate srcset for responsive images
export function generateSrcSet(
    basePath: string,
    extensions: string[] = [".jpg", ".webp"],
): string {
    const sizes = [
        { width: 320, descriptor: "320w" },
        { width: 640, descriptor: "640w" },
        { width: 1024, descriptor: "1024w" },
        { width: 1920, descriptor: "1920w" },
    ];

    return sizes
        .map(({ width, descriptor }) => {
            const ext = extensions.includes(".webp") ? ".webp" : extensions[0];
            return `${basePath}-${width}${ext} ${descriptor}`;
        })
        .join(", ");
}
