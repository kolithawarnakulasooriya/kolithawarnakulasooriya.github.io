import { routeMetadata } from '@/app/site';
import { Heading, SmartLink } from "@/once-ui/components";
import { Configs } from '@/app/config';
import { ProjectBox } from "@/components/projectbox";
import { ResponsiveImage } from '@/components/ResponsiveImage';
import styles from '@/components/projectbox.module.scss';

export const metadata = routeMetadata('/projects');

export default function Projects() {
    const projectById = new Map(Configs.projects.map(project => [project.id, project]));
    const featuredIds = new Set(Configs.selectedWork.map(work => work.projectId));
    const selectedProjects = Configs.selectedWork.map(work => {
        const project = projectById.get(work.projectId);
        if (!project) throw new Error(`Selected work references unknown project: ${work.projectId}`);
        return { work, project };
    });
    const remainingProjects = Configs.projects.filter(project => !featuredIds.has(project.id));
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Projects</Heading>
            <section aria-labelledby="selected-work-heading">
                <Heading as="h2" id="selected-work-heading" variant="heading-strong-m" marginBottom="24">Selected work</Heading>
                <div className={styles.grid}>
                    {selectedProjects.map(({ work, project }) => (
                        <article key={work.id} id={work.id} className={styles.card} data-selected-work data-project-id={project.id}>
                            <div className={styles.content}>
                                <Heading as="h3" variant="heading-strong-s">{project.title}</Heading>
                                <ResponsiveImage className={styles.image} src={project.image} alt={work.imageAlt} width={350} height={160}
                                    sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1100px) 45vw, 350px" />
                                <p>{work.problem}</p>
                                <p><strong>Role:</strong> {work.role}</p>
                                <p>{work.contribution}</p>
                                <p className={styles.status}><strong>Status:</strong> {project.status}</p>
                                {project.src ? <SmartLink href={project.src} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight"
                                    aria-label={`View ${project.title} (external site, opens in a new tab)`}>View project</SmartLink>
                                    : <span className={styles.status}>No public link supplied</span>}
                                <div className={styles.evidence} role="group" aria-label={`Evidence for ${project.title}`}>
                                    {work.evidence.map(source => <SmartLink key={source.href} href={source.href}
                                        target={source.href.startsWith('https://') ? '_blank' : undefined}
                                        rel={source.href.startsWith('https://') ? 'noopener noreferrer' : undefined}
                                        aria-label={`${source.label}: ${project.title}${source.href.startsWith('https://') ? ' (external source, opens in a new tab)' : ''}`}>{source.label}</SmartLink>)}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section aria-labelledby="more-projects-heading" style={{ marginTop: 'var(--static-space-40)' }}>
                <Heading as="h2" id="more-projects-heading" variant="heading-strong-m" marginBottom="24">More projects</Heading>
                <div className={styles.grid}>
                    {remainingProjects.map(project => <ProjectBox key={project.id} {...project} />)}
                </div>
            </section>
        </div>
    );
}
