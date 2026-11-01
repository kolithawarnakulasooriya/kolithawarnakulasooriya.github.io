'use client';

import { Button, IconButton, Text } from '@/once-ui/components';
import React from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div className={styles.social} role="group" aria-label="Professional profiles">
            <IconButton href="https://www.linkedin.com/in/kolitha-warnakulasooriya/" icon="linkedin" size="l" tooltip="LinkedIn" tooltipPosition="top" variant="tertiary" />
            <IconButton href="https://scholar.google.com/citations?user=9m-0uFYAAAAJ&hl=en" icon="googlescholar" size="l" tooltip="Google Scholar" tooltipPosition="top" variant="tertiary" />
            <IconButton href="https://medium.com/@warnakulasooriyakolitha" icon="medium" size="l" tooltip="Medium" tooltipPosition="top" variant="tertiary" />
            <IconButton href="https://github.com/kolithawarnakulasooriya" icon="github" size="l" tooltip="GitHub" tooltipPosition="top" variant="tertiary" />
            <IconButton href="https://www.researchgate.net/profile/Kolitha-Warnakulasooriya" icon="researchgate" size="l" tooltip="ResearchGate" tooltipPosition="top" variant="tertiary" />
            <IconButton href="https://orcid.org/0000-0002-4619-7027" icon="orcid" size="l" tooltip="ORCID" tooltipPosition="top" variant="tertiary" />
        </div>
        <Text variant="label-default-s" className={styles.credit}>Powered by Next.js &amp; Once UI</Text>
        <Button variant="tertiary" href="mailto:kolitha.warnakulasooriya@outlook.com">Email Me</Button>
    </footer>
);

export { Footer };
