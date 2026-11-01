import { routeMetadata } from '@/app/site';
import { Heading } from '@/once-ui/components';
import { publications } from './data';
import { PublicationBox } from '@/components/publicationbox';

export const metadata = routeMetadata('/publications');

export default function Publications() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Publications</Heading>
            {publications.map(publication => <PublicationBox key={publication.id} {...publication} />)}
        </div>
    );
}
