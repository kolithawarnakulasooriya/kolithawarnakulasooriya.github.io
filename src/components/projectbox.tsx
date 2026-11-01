'use client';
import { RevealFx, Heading, SmartLink } from "@/once-ui/components";
import { ResponsiveImage } from '@/components/ResponsiveImage';
import type { ProjectObject } from '@/app/config';
import styles from './projectbox.module.scss';

export function ProjectBox({ id, src, heading, image, title, status }: ProjectObject) {
    return (
        <article className={styles.card} data-project-id={id}>
            <RevealFx speed="medium" delay={0} translateY={0}>
                <div className={styles.content}>
                    <Heading as="h3" variant="heading-strong-s">{title}</Heading>
                    <ResponsiveImage className={styles.image} src={image} alt="" width={350} height={160}
                        sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1100px) 45vw, 350px" />
                    <p>{heading}</p>
                    <p className={styles.status}><strong>Status:</strong> {status}</p>
                    {src ? <SmartLink href={src} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight"
                        aria-label={`View ${title} (external site, opens in a new tab)`}>View project</SmartLink>
                        : <span className={styles.status}>No public link supplied</span>}
                </div>
            </RevealFx>
        </article>
    );
}
