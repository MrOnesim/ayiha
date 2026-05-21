import { useState, useRef, useEffect } from "react";
import { useLazyLoad, getOptimizedImageSrc } from "../../hooks/useLazyLoad";

interface LazyImageProps {
    src: string;
    alt: string;
    className?: string;
    placeholderClassName?: string;
    width?: number | string;
    height?: number | string;
    priority?: boolean;
    sizes?: string;
    objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

export default function LazyImage({
    src,
    alt,
    className = "",
    placeholderClassName = "",
    width,
    height,
    priority = false,
    sizes,
    objectFit = "cover",
}: LazyImageProps) {
    const { ref, isVisible, isLoaded, handleLoad } =
        useLazyLoad<HTMLImageElement>({
            rootMargin: "100px",
            threshold: 0.1,
        });

    const [error, setError] = useState(false);
    const optimizedSrc = getOptimizedImageSrc(src);

    const handleError = () => {
        setError(true);
    };

    // For priority images (above the fold), load immediately
    if (priority) {
        return (
            <div
                className={`relative overflow-hidden ${className}`}
                style={{ width, height }}
            >
                {!isLoaded && (
                    <div
                        className={`absolute inset-0 bg-bg-muted animate-pulse ${placeholderClassName}`}
                    />
                )}
                <img
                    src={optimizedSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    loading="eager"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                    style={{ objectFit }}
                />
                {error && (
                    <div className="absolute inset-0 flex items-center justify-center bg-bg-muted">
                        <span className="text-text-faint text-sm">
                            Image non disponible
                        </span>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div
            className={`relative overflow-hidden ${className}`}
            style={{ width, height }}
        >
            {isVisible && !isLoaded && (
                <div
                    className={`absolute inset-0 bg-bg-muted animate-pulse ${placeholderClassName}`}
                />
            )}
            {isVisible ? (
                <img
                    ref={ref as React.RefObject<HTMLImageElement>}
                    src={optimizedSrc}
                    alt={alt}
                    width={width}
                    height={height}
                    sizes={sizes}
                    loading="lazy"
                    onLoad={handleLoad}
                    onError={handleError}
                    className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
                    style={{ objectFit }}
                />
            ) : (
                <div
                    ref={ref as React.RefObject<HTMLDivElement>}
                    className={`absolute inset-0 bg-bg-muted ${placeholderClassName}`}
                    style={{ width, height }}
                />
            )}
            {error && isVisible && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-muted">
                    <span className="text-text-faint text-sm">
                        Image non disponible
                    </span>
                </div>
            )}
        </div>
    );
}

// Background image component with lazy loading
interface LazyBackgroundProps {
    src: string;
    alt?: string;
    className?: string;
    children?: React.ReactNode;
    overlay?: boolean;
    overlayColor?: string;
}

export function LazyBackground({
    src,
    alt = "",
    className = "",
    children,
    overlay = true,
    overlayColor = "rgba(0,0,0,0.4)",
}: LazyBackgroundProps) {
    const { ref, isVisible, isLoaded } = useLazyLoad<HTMLDivElement>({
        rootMargin: "200px",
        threshold: 0.1,
    });

    const optimizedSrc = getOptimizedImageSrc(src);
    const [error, setError] = useState(false);

    return (
        <div
            ref={ref}
            className={`relative ${className}`}
            style={{
                backgroundImage: isVisible
                    ? error
                        ? "none"
                        : `url(${optimizedSrc})`
                    : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {!isLoaded && isVisible && (
                <div className="absolute inset-0 bg-bg-muted animate-pulse" />
            )}
            {overlay && (
                <div
                    className="absolute inset-0"
                    style={{ backgroundColor: overlayColor }}
                />
            )}
            {children && <div className="relative z-10">{children}</div>}
            {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-bg-muted">
                    <span className="text-text-faint text-sm">
                        Image de fond non disponible
                    </span>
                </div>
            )}
        </div>
    );
}
