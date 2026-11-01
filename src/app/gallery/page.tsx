import React from 'react';
import { RevealFx, Heading } from '@/once-ui/components';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import mediaSources from '@/app/media-sources.json';
import { routeMetadata } from '@/app/site';

// Descriptions cover visible subjects; exact event, date and role captions remain unverified.
export const metadata = routeMetadata('/gallery');

export default function Gallery() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Gallery</Heading>
            <div className="gallery-grid">
                {mediaSources.gallery.map(image => (
                    <figure className="gallery-item" key={image.src}>
                        <RevealFx speed="medium" delay={0} translateY={0}>
                            <ResponsiveImage src={image.src} alt={image.alt} className="gallery-image"
                                sizes="(max-width: 767px) calc(100vw - 4rem), (max-width: 1100px) 45vw, 400px" />
                        </RevealFx>
                    </figure>
                ))}
            </div>
        </div>
    );
}
