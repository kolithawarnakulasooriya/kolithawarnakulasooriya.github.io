import React from 'react';
import { Heading, SmartLink } from '@/once-ui/components';
import { Configs } from '@/app/config';

export const metadata = { title: 'Blog' };

export default function Blog() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Blog</Heading>
            <div className="embed-list">
                {Configs.blog.map((source, index) => (
                    <div key={source}>
                        <div className="embed-source">
                            <SmartLink href={source} suffixIcon="arrowUpRight" target="_blank" rel="noopener noreferrer"
                                aria-label={`Open blog source ${index + 1} (external site, opens in a new tab)`}>
                                Open blog source {index + 1}
                            </SmartLink>
                        </div>
                        <iframe src={source} className="fluid-embed" height="1000" width="1000"
                            loading="lazy" title={`Blog source ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
