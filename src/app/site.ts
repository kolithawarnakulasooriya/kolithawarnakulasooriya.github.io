import type { Metadata } from 'next';

export const site = {
    name: 'Kolitha Warnakulasooriya',
    origin: 'https://kolithawarnakulasooriya.github.io',
    description: 'Research, software projects and professional experience of Kolitha Warnakulasooriya in artificial intelligence, robotics and distributed systems.',
    email: 'kolitha.warnakulasooriya@outlook.com',
    portrait: '/images/avatar.jpg',
    // Identity supported by the primary records in the destination evidence ledger.
    profiles: [
        'https://github.com/kolithawarnakulasooriya',
        'https://orcid.org/0000-0002-4619-7027',
        'https://www.researchgate.net/profile/Kolitha-Warnakulasooriya',
    ],
} as const;

const routes = {
    '/': { title: site.name, description: site.description },
    '/me': {
        title: 'Who Am I',
        description: 'Biography, interests and technical skills of Kolitha Warnakulasooriya.',
    },
    '/resume': {
        title: 'Resume',
        description: 'Professional experience, education and downloadable CV of Kolitha Warnakulasooriya.',
    },
    '/projects': {
        title: 'Projects',
        description: 'Selected research and software engineering projects by Kolitha Warnakulasooriya.',
    },
    '/publications': {
        title: 'Publications',
        description: 'Publications and source links listed by Kolitha Warnakulasooriya.',
    },
    '/research': {
        title: 'Research',
        description: 'Research information and an external research site shared by Kolitha Warnakulasooriya.',
    },
    '/blog': {
        title: 'Blog',
        description: 'Posts, videos and project sources shared by Kolitha Warnakulasooriya.',
    },
    '/gallery': {
        title: 'Gallery',
        description: 'A photographic gallery shared by Kolitha Warnakulasooriya.',
    },
} as const;

export type SiteRoute = keyof typeof routes;

export function routeMetadata(route: SiteRoute): Metadata {
    const { title, description } = routes[route];
    const url = new URL(route === '/' ? '/' : `${route}/`, site.origin).href;
    const fullTitle = route === '/' ? title : `${title} | ${site.name}`;
    const portrait = new URL(site.portrait, site.origin).href;

    return {
        title,
        description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            siteName: site.name,
            title: fullTitle,
            description,
            url,
            images: [{ url: portrait, width: 993, height: 955, alt: site.name }],
        },
        twitter: {
            card: 'summary',
            title: fullTitle,
            description,
            images: [{ url: portrait, alt: site.name }],
        },
    };
}

export const rootMetadata: Metadata = {
    ...routeMetadata('/'),
    metadataBase: new URL(site.origin),
    title: { default: site.name, template: `%s | ${site.name}` },
    authors: [{ name: site.name, url: site.origin }],
    creator: site.name,
    robots: { index: true, follow: true },
};

export const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.origin}/#person`,
    name: site.name,
    url: `${site.origin}/`,
    image: new URL(site.portrait, site.origin).href,
    description: site.description,
    email: site.email,
    sameAs: [...site.profiles],
};
