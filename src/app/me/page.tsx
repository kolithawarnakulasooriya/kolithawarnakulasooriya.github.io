import { routeMetadata } from '@/app/site';
import { Accordion, Heading } from "@/once-ui/components";
import { Configs } from '@/app/config';
import { IconBox } from "@/components/iconbox";
import styles from './page.module.scss';

export const metadata = routeMetadata('/me');

export default function Me() {
    // Reflow existing copy without changing its professional claims.
    const paragraphs = Configs.summary.split(/(?<=\.)\s*(?=My doctoral|As a Software Engineer|As an excellent|Outside of techs)/);
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Who Am I</Heading>
            <div className={styles.biography}>
                {paragraphs.map(paragraph => <p key={paragraph.slice(0, 100)}>{paragraph}</p>)}
            </div>
            <section aria-labelledby="skills-heading" className={styles.skills}>
                <Heading as="h2" id="skills-heading" variant="heading-strong-m" marginBottom="16">Skills</Heading>
                {Configs.skills.map(category => (
                    <Accordion key={category.titile} title={category.titile} open={category.isOpen}>
                        <div className={styles.skillList}>
                            {category.items.map(skill => <IconBox key={skill.src} src={skill.src} name={skill.name} size="m" />)}
                        </div>
                    </Accordion>
                ))}
            </section>
        </div>
    );
}
