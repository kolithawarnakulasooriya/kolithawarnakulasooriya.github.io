import { Heading, SmartLink } from "@/once-ui/components";
import { Configs } from '@/app/config';
import { ProjectBox } from "@/components/projectbox";
import Image from 'next/image';
import styles from '@/components/projectbox.module.scss';

export const metadata = { title: 'Projects' };

export default function Projects() {
    const featuredTitles = new Set(Configs.selectedWork.map(work => work.projectTitle));
    const remainingProjects = Configs.projects.flat().filter(project => !featuredTitles.has(project.title));
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Projects</Heading>
            <section aria-labelledby="selected-work-heading">
                <Heading as="h2" id="selected-work-heading" variant="heading-strong-m" marginBottom="24">Selected work</Heading>
                <div className={styles.grid}>
                    {Configs.selectedWork.map(work => (
                        <article key={work.id} id={work.id} className={styles.card} data-selected-work>
                            <div className={styles.content}>
                                <Heading as="h3" variant="heading-strong-s">{work.title}</Heading>
                                <Image className={styles.image} src={work.image} alt={work.imageAlt} width={350} height={160} />
                                <p>{work.problem}</p>
                                <p><strong>Role:</strong> {work.role}</p>
                                <p>{work.contribution}</p>
                                <p className={styles.status}><strong>Status:</strong> {work.status}</p>
                                {work.href && <SmartLink href={work.href} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight"
                                    aria-label={`View ${work.title} (external site, opens in a new tab)`}>View project</SmartLink>}
                                <div className={styles.evidence} role="group" aria-label={`Evidence for ${work.title}`}>
                                    {work.evidence.map(source => <SmartLink key={source.href} href={source.href}
                                        target={source.href.startsWith('https://') ? '_blank' : undefined}
                                        rel={source.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                                        aria-label={`${source.label}: ${work.title}${source.href.startsWith('https://') ? ' (external source, opens in a new tab)' : ''}`}>{source.label}</SmartLink>)}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section aria-labelledby="more-projects-heading" style={{ marginTop: 'var(--static-space-40)' }}>
                <Heading as="h2" id="more-projects-heading" variant="heading-strong-m" marginBottom="24">More projects</Heading>
                <div className={styles.grid}>
                    {remainingProjects.map((project, index) => <ProjectBox key={`${project.title}-${index}`} {...project} />)}
                </div>
            </section>
        </div>
    );
}
