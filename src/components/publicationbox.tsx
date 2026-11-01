import { Heading } from "@/once-ui/components";
import styles from './publicationbox.module.scss';

interface PublicationBoxProps {
    href: string;
    title: string;
    authors: string;
    publisher: string;
}
export function PublicationBox({ href, title, authors, publisher }: PublicationBoxProps) {
    return (
        <article className={styles.publication}>
            <Heading as="h2" variant="heading-default-m">
                {href ? <a href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={`${title} (external source, opens in a new tab)`}>{title}</a> : title}
            </Heading>
            <p>{authors}</p>
            <p>{publisher}</p>
            {!href && <p className={styles.status}>Source link awaiting verification</p>}
        </article>
    );
}
