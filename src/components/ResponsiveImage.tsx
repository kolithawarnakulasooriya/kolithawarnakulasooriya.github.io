import React from 'react';
import manifest from '@/app/media-manifest.json';
import styles from './ResponsiveImage.module.scss';

type MediaAsset = {
    width: number;
    height: number;
    variants: Array<{ src: string; width: number; height: number; bytes: number }>;
};
const assets: Record<string, MediaAsset> = manifest.assets;

export interface ResponsiveImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'width' | 'height' | 'alt'> {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    priority?: boolean;
}

/** Static derivatives also work with Next's GitHub Pages export and no image server. */
export function ResponsiveImage({ src, alt, width, height, sizes = '100vw', loading = 'lazy', priority = false, className, ...props }: ResponsiveImageProps) {
    const media = assets[src];
    return (
        <picture className={styles.picture}>
            {media && <source type="image/webp" srcSet={media.variants.map(item => `${item.src} ${item.width}w`).join(', ')} sizes={sizes} />}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img {...props} src={src} alt={alt} width={media?.width ?? width} height={media?.height ?? height}
                sizes={sizes} loading={priority ? 'eager' : loading} fetchPriority={priority ? 'high' : undefined}
                decoding="async" className={[styles.image, className].filter(Boolean).join(' ')} />
        </picture>
    );
}
