import { Heading } from '@/once-ui/components';
import { routeMetadata } from '@/app/site';
import { blogSources } from './sources';
import { SourceCard } from './SourceCard';
import styles from './page.module.scss';

export const metadata = routeMetadata('/blog');

export default function Blog() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Blog</Heading>
            <div className={styles.grid}>
                {blogSources.map(source => <SourceCard key={source.id} source={source} />)}
            </div>
        </div>
    );
}
