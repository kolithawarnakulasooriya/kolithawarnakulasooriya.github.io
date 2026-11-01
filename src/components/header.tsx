'use client';

import { Heading, SmartLink } from '@/once-ui/components';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Configs } from '@/app/config';
import styles from './header.module.scss';

const routes = [
    ['/me', 'Who Am I'],
    ['/resume', 'Resume'],
    ['/publications', 'Publications'],
    ['/projects', 'Projects'],
    ['/gallery', 'Gallery'],
    ['/blog', 'Blog'],
];

const Header: React.FC = () => {
    const pathname = usePathname().replace(/\/+$/, '') || '/';
    const [isOpen, setIsOpen] = useState(false);
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => setIsOpen(false), [pathname]);

    useEffect(() => {
        const desktop = window.matchMedia('(min-width: 1025px)');
        const resetMenu = () => setIsOpen(false);
        desktop.addEventListener('change', resetMenu);
        return () => desktop.removeEventListener('change', resetMenu);
    }, []);

    useEffect(() => {
        if (!isOpen) return;
        const closeOnEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener('keydown', closeOnEscape);
        return () => document.removeEventListener('keydown', closeOnEscape);
    }, [isOpen]);

    return (
        <header className={styles.header}>
            <Link href="/" className={styles.brand} aria-current={pathname === '/' ? 'page' : undefined}>
                <Heading as="span" style={{ display: 'block', fontSize: '2em', fontWeight: 'var(--font-weight-bold)' }}>
                    Kolitha Warnakulasooriya
                </Heading>
            </Link>
            <button
                ref={toggleRef}
                type="button"
                className={styles.toggle}
                aria-expanded={isOpen}
                aria-controls="primary-navigation"
                onClick={() => setIsOpen(value => !value)}
            >
                {isOpen ? 'Close menu' : 'Menu'}
            </button>
            <nav id="primary-navigation" aria-label="Main navigation" className={`${styles.navigation} ${isOpen ? styles.open : ''}`}>
                {routes.map(([href, label]) => (
                    <SmartLink
                        key={href}
                        href={href}
                        aria-current={pathname === href ? 'page' : undefined}
                        selected={pathname === href}
                        onClick={() => setIsOpen(false)}
                    >
                        {label}
                    </SmartLink>
                ))}
                <SmartLink
                    href={Configs.research}
                    target="_blank"
                    rel="noopener noreferrer"
                    suffixIcon="arrowUpRight"
                    aria-label="Research (external site, opens in a new tab)"
                    onClick={() => setIsOpen(false)}
                >
                    Research
                </SmartLink>
            </nav>
        </header>
    );
};

export { Header };
