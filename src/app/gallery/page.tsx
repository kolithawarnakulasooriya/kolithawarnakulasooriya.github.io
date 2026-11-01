import React from 'react';
import { RevealFx, Heading } from '@/once-ui/components';
import Image from 'next/image';
import { Configs } from '@/app/config';

// Descriptions reflect only visible subjects; event, date and role captions remain unverified.
const imageDescriptions: Record<string, string> = {
    'p44.jpg': 'Two men in suits standing beneath a projected presentation slide.',
    'p55.jpg': 'A man seated on a carpeted floor with several quadcopter drones arranged around him.',
    'p1.jpeg': 'A man standing beside a technical poster on an easel.',
    'c1.jpg': 'A presenter beside two projected screens in a classroom.',
    'p33.jpg': 'Two men standing together in front of a glass display cabinet.',
    'p7.jpeg': 'A driver seated in a red open-wheel race car on pavement.',
    'p2.jpeg': 'A group of people standing outside a building near palm trees.',
    't112.jpeg': 'A man standing on a raised outdoor platform beside an American flag.',
    'p5.jpeg': 'Orange graphic showing four men and the text “Disrupt 2.0 - FutureX Top 30” and “ExplorAR”.',
    'vexpo.jpeg': 'An exhibition booth with illuminated displays and people seated at a table.',
    'sci112.jpeg': 'A man inside a greenhouse with rows of leafy plants.',
    'cc2.jpeg': 'Two people holding certificates in front of a projection screen.',
    'graduation.jpeg': 'A man wearing a gown and medal standing beside two flags.',
    'p11.JPG': 'Three people posing together in an indoor corridor.',
    'p22.JPG': 'Two people standing together beside a wood-framed glass display.',
};

export const metadata = { title: 'Gallery' };

export default function Gallery() {
    return (
        <div className="page-content">
            <Heading as="h1" variant="heading-strong-l" className="page-title">Gallery</Heading>
            <div className="gallery-grid">
                {Configs.gallery.flat().map((image, index) => (
                    <figure className="gallery-item" key={`${image}-${index}`}>
                        <RevealFx speed="medium" delay={0} translateY={0}>
                            <Image src={`/gallery/${image}`} alt={imageDescriptions[image]} width={1020} height={765}
                                className="gallery-image" />
                        </RevealFx>
                    </figure>
                ))}
            </div>
        </div>
    );
}
