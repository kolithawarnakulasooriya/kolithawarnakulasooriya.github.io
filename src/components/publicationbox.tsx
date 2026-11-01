import { Heading } from "@/once-ui/components";
import type { Publication } from '@/app/publications/data';
import styles from './publicationbox.module.scss';

export function PublicationBox({ id, href, title, authors, venue, year, verification }: Publication) {
    return (
        <article className={styles.publication} data-publication-id={id}>
            <Heading as="h2" variant="heading-default-m">
                {href ? <a href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={`${title} (external source, opens in a new tab)`}>{title}</a> : title}
            </Heading>
            <p data-citation-authors>{authors.join(', ')}</p>
            <p data-citation-venue>
                {venue || 'Venue awaiting verification'}
                {year && <> · <time dateTime={String(year)}>{year}</time></>}
            </p>
            {verification.state !== 'verified' && <p className={styles.status}>Citation details awaiting verification</p>}
            {!href && <p className={styles.status}>Source link awaiting verification</p>}
        </article>
    );
}
