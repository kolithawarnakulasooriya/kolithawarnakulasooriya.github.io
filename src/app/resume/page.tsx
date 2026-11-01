import React from 'react';
import { Heading, Button } from '@/once-ui/components';
import { ExperianceBox } from '@/components/experiancebox';
import { Configs } from '@/app/config';

export const metadata = { title: 'Resume' };

export default function Resume() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Resume</Heading>
            <div className="responsive-grid">
                <section className="resume-section" aria-labelledby="employment-heading">
                    <Heading as="h2" id="employment-heading" className="resume-section-title">Employment Experience</Heading>
                    {Configs.experiance.map((data, index) => (
                        <ExperianceBox key={index} src={data.src} heading={data.title} company={data.company}
                            subtext={data.subtitle} duration={data.duration} items={data.items} />
                    ))}
                </section>
                <section className="resume-section" aria-labelledby="education-heading">
                    <Heading as="h2" id="education-heading" className="resume-section-title">Education</Heading>
                    {Configs.education.map((data, index) => (
                        <ExperianceBox key={index} src={data.src} heading={data.title} company={data.institute}
                            subtext={data.subtitle} duration={data.duration} />
                    ))}
                </section>
            </div>
            <div className="resume-actions">
                <Button href={Configs.resume}>Download Academic CV</Button>
            </div>
        </div>
    );
}
