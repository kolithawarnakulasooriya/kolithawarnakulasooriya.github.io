'use client';
import { RevealFx, Heading, SmartLink } from "@/once-ui/components";
import Image from "next/image";
import styles from './projectbox.module.scss';

interface ProjectBoxProps {
    src: string;
    heading: string;
    image: string;
    title: string;
}
export function ProjectBox({ src, heading, image, title }: ProjectBoxProps) {
    return (
        <article className={styles.card}>
            <RevealFx speed="medium" delay={0} translateY={0}>
                <div className={styles.content}>
                    <Heading as="h3" variant="heading-strong-s">{title}</Heading>
                    <Image className={styles.image} src={image} alt="" width={350} height={160} />
                    <p>{heading}</p>
                    {src ? <SmartLink href={src} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight"
                        aria-label={`View ${title} (external site, opens in a new tab)`}>View project</SmartLink>
                        : <span className={styles.status}>No public link supplied</span>}
                </div>
            </RevealFx>
        </article>
    );
}
