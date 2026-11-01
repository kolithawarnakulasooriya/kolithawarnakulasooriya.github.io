'use client';
import { Avatar, Heading, Text, Accordion } from "@/once-ui/components";
import styles from './experiancebox.module.scss';

interface ExperianceBoxProps {
    src: string;
    heading: string;
    company: string;
    subtext?: string;
    duration: string;
    items?: string[];
}
export function ExperianceBox({ src, heading, company, subtext, duration, items = [] }: ExperianceBoxProps) {
    return (
        <article className={styles.experience}>
            <div className={styles.header}>
                <Avatar src={src} size="l" alt={`${company} logo`} />
                <div className={styles.identity}>
                    <Heading as="h3" variant="heading-strong-s">{heading}</Heading>
                    <Text as="p" weight="strong">{company}</Text>
                    {subtext && <p className={styles.subtext}>{subtext}</p>}
                </div>
                <span className={styles.durationbox}>{duration}</span>
            </div>
            {items.length > 0 && <Accordion title={`Details: ${heading} at ${company}`} withoutHeader>
                <ul className={styles.listbox}>{items.map((item, index) => <li key={index}>{item}</li>)}</ul>
            </Accordion>}
        </article>
    );
}
