'use client';

import React, { useState, useEffect, forwardRef, useImperativeHandle, useId } from 'react';
import { Icon, Heading } from '.';
import styles from './Accordion.module.scss';
import classNames from 'classnames';

interface AccordionProps {
    title: React.ReactNode;
    children: React.ReactNode;
    style?: React.CSSProperties;
    className?: string;
    open?: boolean;
    withoutHeader?: boolean;
}

interface AccordionHandle {
    toggle: () => void;
    open: () => void;
    close: () => void;
}

const Accordion = forwardRef<AccordionHandle, AccordionProps>(({
    title,
    children,
    style,
    className,
    open = false,
    withoutHeader = false,
}, ref) => {
    const [isOpen, setIsOpen] = useState(open);
    const id = useId();
    const triggerId = `accordion-trigger-${id}`;
    const panelId = `accordion-panel-${id}`;

    useEffect(() => setIsOpen(open), [open]);

    useImperativeHandle(ref, () => ({
        toggle: () => setIsOpen(value => !value),
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }), []);

    const trigger = (
        <button
            id={triggerId}
            type="button"
            className={classNames(styles.trigger, withoutHeader && styles.details)}
            onClick={() => setIsOpen(value => !value)}
            aria-expanded={isOpen}
            aria-controls={panelId}
        >
            <span>{withoutHeader ? (title || 'Details') : title}</span>
            <Icon name="chevronDown" size="m" className={isOpen ? styles.expanded : undefined} />
        </button>
    );

    return (
        <div style={style} className={classNames(styles.accordion, !withoutHeader && styles.border, className)}>
            {withoutHeader ? trigger : (
                <Heading as="h3" variant="heading-strong-s">{trigger}</Heading>
            )}
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!isOpen} className={styles.panel}>
                {children}
            </div>
        </div>
    );
});

Accordion.displayName = 'Accordion';

export { Accordion };
