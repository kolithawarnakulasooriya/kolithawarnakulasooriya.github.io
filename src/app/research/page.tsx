import React from 'react';
import { Heading, SmartLink } from '@/once-ui/components';
import { Configs } from '@/app/config';

export const metadata = { title: 'Research' };

export default function ResearchPage() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Research</Heading>
            <div className="embed-source">
                <SmartLink href={Configs.research} target="_blank" rel="noopener noreferrer"
                    suffixIcon="arrowUpRight" aria-label="Open Research site (external site, opens in a new tab)">
                    Open Research site
                </SmartLink>
            </div>
            <iframe src={Configs.research} className="fluid-embed" height="1000" width="1000" title="Research" />
        </div>
    );
}
