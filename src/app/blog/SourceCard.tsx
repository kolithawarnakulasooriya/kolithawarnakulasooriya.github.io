'use client';

import { useState } from 'react';
import { Button, Heading, SmartLink } from '@/once-ui/components';
import type { BlogSource } from './sources';
import styles from './page.module.scss';

export function SourceCard({ source }: { source: BlogSource }) {
    const [expanded, setExpanded] = useState(true);
    const titleId = `blog-title-${source.id}`;
    const panelId = `blog-preview-${source.id}`;
    const previewClassName = source.previewKind === 'video'
        ? styles.video
        : source.previewKind === 'picture'
            ? styles.picture
            : styles.preview;

    return (
        <article className={styles.card} aria-labelledby={titleId}>
            <p className={styles.attribution}>{source.attribution}</p>
            <Heading as="h2" id={titleId} variant="heading-strong-m">{source.title}</Heading>
            <p>{source.summary}</p>
            <div className={styles.actions}>
                <SmartLink href={source.sourceUrl} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight"
                    aria-label={`Open source: ${source.title} (external site, opens in a new tab)`}>Open source</SmartLink>
                {source.previewKind && <Button type="button" variant="tertiary" className={styles.toggle}
                    aria-expanded={expanded} aria-controls={panelId}
                    aria-label={`${expanded ? 'Hide' : 'Load'} preview: ${source.title}`}
                    onClick={() => setExpanded(value => !value)}>
                    {expanded ? 'Hide preview' : 'Load preview'}
                </Button>}
            </div>
            <div id={panelId} role="region" aria-labelledby={titleId} hidden={!expanded}>
                {source.previewKind && expanded && (
                    source.previewKind === 'picture'
                        ? <img src={source.previewUrl} alt={`${source.title} preview`} className={previewClassName} loading="lazy" decoding="async" />
                        : <iframe src={source.previewUrl} title={`${source.title} — preview`}
                            className={previewClassName}
                            loading="lazy" allow={source.previewKind === 'video' ? 'fullscreen; picture-in-picture' : undefined}
                            allowFullScreen={source.previewKind === 'video'} />
                )}
            </div>
        </article>
    );
}
