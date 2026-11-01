import Image from "next/image";
import styles from "./iconbox.module.scss";

interface IconBoxProps {
    src: string;
    name: string;
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
}
const sizes = { xs: 20, s: 36, m: 48, l: 68, xl: 160 };

export function IconBox({ src, name, size = 'm' }: IconBoxProps) {
    return (
        <div className={styles.skill}>
            <Image className={styles.image} src={src} alt="" width={sizes[size]} height={sizes[size]} />
            <span>{name}</span>
        </div>
    );
}
