// Primary source evidence and verification limits: docs/C25-C31-sources.md.
export interface BlogSource {
    id: string;
    title: string;
    attribution: string;
    summary: string;
    sourceUrl: string;
    previewUrl: string;
    previewKind: 'video' | 'page' | 'picture' | undefined;
}

export const blogSources: readonly BlogSource[] = [
    {
        id: 'Next Generation of AI Wave',
        title: 'Next Generation of AI Wave: Beyond Next Token Prediction',
        attribution: 'LinkedIn',
        summary: 'What if the next major breakthrough in generative AI isn\'t about building larger language models, but fundamentally changing how they generate information?',
        sourceUrl: 'https://www.linkedin.com/pulse/next-generation-ai-wave-beyond-token-prediction-warnakulasooriya-1rave/',
        previewUrl: '',
        previewKind: undefined,
    },
    {
        id: 'ai-swarming-drones',
        title: 'PhD student uses AI to control swarming drones',
        attribution: 'University of South Alabama',
        summary: 'University of South Alabama post about AI and mathematical models for autonomous drone swarms.',
        sourceUrl: 'https://www.linkedin.com/feed/update/urn:li:activity:7316119387797639168',
        previewUrl: 'https://www.linkedin.com/embed/feed/update/urn:li:share:7316119386677805060?collapsed=1',
        previewKind: 'page',
    },
    {
        id: 'vision-compass-video',
        title: 'Vision Compass for Drones: An Alternative Use of a Limitation in Vision Models for Localization',
        attribution: 'RobotiQs on YouTube',
        summary: 'Video on vision-based localization for drones.',
        sourceUrl: 'https://www.youtube.com/watch?v=43GgyUBhTDU',
        previewUrl: 'https://www.youtube.com/embed/43GgyUBhTDU?controls=1&rel=0',
        previewKind: 'video',
    },
    {
        id: 'raven-os-source',
        title: 'Raven OS',
        attribution: 'Raven OS project website',
        summary: 'An early-stage open-source Linux distribution for AI and robotics development.',
        sourceUrl: 'https://raven-os-ai-os.github.io/Web/',
        previewUrl: 'https://raven-os-ai-os.github.io/Web/',
        previewKind: 'page',
    },
    {
        id: 'cytokine-swarm-source',
        title: 'Cytokine Swarm',
        attribution: 'Cytokine Swarm project website',
        summary: 'Early-stage research into an immune-system approach to compromised agents in distributed AI swarms.',
        sourceUrl: 'https://storage.googleapis.com/research_web_page/index.html',
        previewUrl: 'https://storage.googleapis.com/research_web_page/index.html',
        previewKind: 'page',
    },
    {
        id: 'IJACSA',
        title: 'Outstanding Reviewers',
        attribution: 'Outstanding Reviewers-IJACSA',
        summary: 'Peer review is a foundational pillar of academic publishing, ensuring the integrity, rigor, and relevance of scholarly work. It relies on the dedicated service of subject-matter experts who voluntarily contribute their time and expertise to the critical evaluation of submitted manuscripts. In recognition of this essential role, the International Journal of Advanced Computer Science and Applications (IJACSA) formally acknowledges reviewer excellence through its Outstanding Reviewer Recognition.',
        sourceUrl: 'https://thesai.org/Publications/OutstandingReviewers',
        previewUrl: '',
        previewKind: undefined,
    },
];
