import { routeMetadata } from '@/app/site';
import React from 'react';
import { Heading } from '@/once-ui/components';
import { Configs } from '@/app/config';
import { PublicationBox } from '@/components/publicationbox';

export const metadata = routeMetadata('/publications');

export default function Publications() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Publications</Heading>
            {Configs.publications.map((publication, index) => (
                <PublicationBox key={index} href={publication.href} title={publication.title}
                    publisher={publication.publisher} authors={publication.authors} />
            ))}
        </div>
    );
}
