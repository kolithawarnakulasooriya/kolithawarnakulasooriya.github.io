'use client';

import React, { CSSProperties, forwardRef, useEffect, useRef } from 'react';
import { SpacingToken } from '../types';

function setRef<T>(ref: React.Ref<T> | undefined, value: T | null) {
    if (typeof ref === 'function') {
        ref(value);
    } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<T | null>).current = value;
    }
}

interface MaskOptions {
    none: 'none';
    cursor: 'cursor';
    topLeft: 'topLeft';
    topRight: 'topRight';
    bottomLeft: 'bottomLeft';
    bottomRight: 'bottomRight';
}

type MaskType = keyof MaskOptions;

interface BackgroundProps {
    position?: CSSProperties['position'];
    gradient?: GradientProps;
    dots?: DotsProps;
    lines?: LinesProps;
    mask?: MaskType;
    className?: string;
    style?: React.CSSProperties;
}

interface GradientProps {
    display?: boolean;
    opacity?: number;
}

interface DotsProps {
    display?: boolean;
    opacity?: number;
    color?: string;
    size?: SpacingToken;
}

interface LinesProps {
    display?: boolean;
    opacity?: number;
    size?: SpacingToken;
}

const Background = forwardRef<HTMLDivElement, BackgroundProps>(
    ({
        position = 'fixed',
        gradient = {},
        dots = {},
        lines = {},
        mask = 'none',
        className,
        style
    }, forwardedRef) => {
        const dotsColor = dots.color ?? 'brand-on-background-weak';
        const dotsSize = dots.size ?? '16';

        const maskSize = 1200;
        const backgroundRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            setRef(forwardedRef, backgroundRef.current);
            return () => setRef(forwardedRef, null);
        }, [forwardedRef]);

        useEffect(() => {
            const element = backgroundRef.current;
            if (!element || mask !== 'cursor') return;
            const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
            let frame = 0;
            let current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
            let target = { ...current };
            const paint = () => {
                element.style.setProperty('--cursor-x', `${current.x}px`);
                element.style.setProperty('--cursor-y', `${current.y}px`);
            };
            const step = () => {
                const dx = target.x - current.x;
                const dy = target.y - current.y;
                if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                    current = { ...target };
                    paint();
                    frame = 0;
                    return;
                }
                current = { x: current.x + dx * 0.05, y: current.y + dy * 0.05 };
                paint();
                frame = requestAnimationFrame(step);
            };
            const reset = () => {
                cancelAnimationFrame(frame);
                frame = 0;
                const rect = element.getBoundingClientRect();
                current = { x: rect.width / 2, y: rect.height / 2 };
                target = { ...current };
                paint();
            };
            const move = (event: MouseEvent) => {
                if (preference.matches) return;
                const rect = element.getBoundingClientRect();
                target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
                if (!frame) frame = requestAnimationFrame(step);
            };
            reset();
            preference.addEventListener('change', reset);
            window.addEventListener('resize', reset);
            document.addEventListener('mousemove', move);
            return () => {
                cancelAnimationFrame(frame);
                preference.removeEventListener('change', reset);
                window.removeEventListener('resize', reset);
                document.removeEventListener('mousemove', move);
            };
        }, [mask]);

        const commonStyles: CSSProperties = {
            position,
            top: '0',
            left: '0',
            zIndex: '0',
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            ...style,
        };

        const maskStyle = (): CSSProperties => {
            switch (mask) {
                case 'none':
                    return { maskImage: 'none' };
                case 'cursor':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'topLeft':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'topRight':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 0%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'bottomLeft':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 0% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                case 'bottomRight':
                    return {
                        maskImage: `radial-gradient(circle ${maskSize / 2}px at 100% 100%, rgba(0, 0, 0, 1) 20%, rgba(0, 0, 0, 0) 100%)`,
                        maskSize: '100% 100%',
                    };
                default:
                    return {};
            }
        };

        return (
            <div ref={backgroundRef} aria-hidden="true" style={commonStyles}>
                {gradient.display && (
                    <div
                        className={className}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: gradient.opacity,
                            background: 'radial-gradient(100% 100% at 49.99% 0%, var(--static-transparent) 0%, var(--page-background) 100%), radial-gradient(87.4% 84.04% at 6.82% 16.24%, var(--brand-background-medium) 0%, var(--static-transparent) 100%), radial-gradient(217.89% 126.62% at 48.04% 0%, var(--accent-solid-medium) 0%, var(--static-transparent) 100%)',
                            ...maskStyle(),
                        }}
                    />
                )}
                {dots.display && (
                    <div
                        className={className}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: dots.opacity,
                            backgroundImage: `radial-gradient(var(--${dotsColor}) 0.5px, var(--static-transparent) 0.5px)`,
                            backgroundSize: `var(--static-space-${dotsSize}) var(--static-space-${dotsSize})`,
                            ...maskStyle(),
                        }}
                    />
                )}
                {lines.display && (
                    <div
                        className={className}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            opacity: lines.opacity,
                            backgroundImage: `repeating-linear-gradient(45deg, var(--brand-on-background-weak) 0, var(--brand-on-background-weak) 0.5px, var(--static-transparent) 0.5px, var(--static-transparent) ${lines.size ? `var(--static-space-${lines.size})` : 'var(--static-space-16)'})`,
                            ...maskStyle(),
                        }}
                    />
                )}
            </div>
        );
    }
);

Background.displayName = 'Background';

export { Background };