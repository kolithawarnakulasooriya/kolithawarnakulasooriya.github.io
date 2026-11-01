'use client';

import React, { useState, useRef, useCallback, useEffect, forwardRef, ReactNode } from 'react';

const defaultAllowedCharacters = ['X', '$', '@', 'a', 'H', 'z', 'o', '0', 'y', '#', '?', '*', '0', '1', '+'];
const timings = {
    fast: { delay: 10, initial: 100 },
    medium: { delay: 30, initial: 300 },
    slow: { delay: 60, initial: 600 },
};

type LetterFxProps = {
    children: ReactNode;
    trigger?: 'hover' | 'instant' | 'custom';
    speed?: 'fast' | 'medium' | 'slow';
    charset?: string[];
    onTrigger?: (triggerFn: () => void) => void;
    className?: string;
    style?: React.CSSProperties;
};

const LetterFx = forwardRef<HTMLSpanElement, LetterFxProps>(({ children, trigger = 'hover', speed = 'medium', charset = defaultAllowedCharacters, onTrigger, className, style }, ref) => {
    const original = typeof children === 'string' ? children : '';
    const [text, setText] = useState(original);
    const timer = useRef<ReturnType<typeof setTimeout>>();
    const running = useRef(false);
    const reduced = useRef(true);
    const mounted = useRef(false);

    const cancel = useCallback(() => {
        clearTimeout(timer.current);
        running.current = false;
    }, []);

    const animate = useCallback(() => {
        if (!mounted.current || running.current || reduced.current || !original) return;
        running.current = true;
        const { delay, initial } = timings[speed];
        const characters = charset.length ? charset : defaultAllowedCharacters;
        const randomText = () => original.split('').map(char => char === ' ' ? char : characters[Math.floor(Math.random() * characters.length)]).join('');
        const started = Date.now();
        let randomized = randomText();
        let revealed = 0;
        const tick = () => {
            if (!mounted.current || reduced.current) return;
            if (Date.now() - started < initial) {
                setText(randomized);
                randomized = randomText();
            } else {
                revealed += 1;
                setText(original.slice(0, revealed) + randomized.slice(revealed));
                if (revealed >= original.length) {
                    running.current = false;
                    return;
                }
            }
            timer.current = setTimeout(tick, delay);
        };
        tick();
    }, [original, speed, charset]);

    useEffect(() => {
        mounted.current = true;
        setText(original);
        const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const updatePreference = () => {
            reduced.current = preference.matches;
            cancel();
            setText(original);
            if (!reduced.current && trigger === 'instant') animate();
        };
        updatePreference();
        preference.addEventListener('change', updatePreference);
        return () => {
            mounted.current = false;
            cancel();
            preference.removeEventListener('change', updatePreference);
        };
    }, [original, trigger, animate, cancel]);

    useEffect(() => {
        if (trigger === 'custom' && onTrigger) onTrigger(animate);
    }, [trigger, onTrigger, animate]);

    return (
        <span ref={ref} className={className} style={style} onMouseEnter={trigger === 'hover' ? animate : undefined}>
            {typeof children === 'string' ? <><span className="visually-hidden">{original}</span><span aria-hidden="true">{text}</span></> : children}
        </span>
    );
});

LetterFx.displayName = 'LetterFx';
export { LetterFx };
