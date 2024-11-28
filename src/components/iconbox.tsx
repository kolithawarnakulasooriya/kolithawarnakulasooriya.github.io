'use client';
import React, { useState, useEffect } from "react"
import Image from "next/image";
import { Tooltip } from "@/once-ui/components";
import styles from "./iconbox.module.scss"

interface IconBoxProps {
    src: string
    size?: 'xs' | 's' | 'm' | 'l' | 'xl';
    tooltip?: string;
}

const sizeMapping: Record<'xs' | 's' | 'm' | 'l' | 'xl', number> = {
    xs: 20,
    s: 36,
    m: 48,
    l: 68,
    xl: 160,
};

const IconBox: React.FC<IconBoxProps> = ({
    src,
    size = 'm',
    tooltip
}) => {
    const [isTooltipVisible, setTooltipVisible] = useState(false)
    const [isHover, setIsHover] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isHover) {
            timer = setTimeout(() => {
                setTooltipVisible(true);
            }, 400);
        } else {
            setTooltipVisible(false);
        }

        return () => clearTimeout(timer);
    }, [isHover]);

    const commonProps = {
        onMouseEnter: () => setIsHover(true),
        onMouseLeave: () => setIsHover(false),
    };

    return (
        <div
            {...commonProps}

        >
            {tooltip && isTooltipVisible && (<div style={{position: 'absolute'}} className={styles.top}>
                <Tooltip label={tooltip} />
            </div>)}
            <Image
                src={src}
                alt=""
                width={sizeMapping[size]}
                height={sizeMapping[size]}
                style={{
                    border: 'solid 1px',
                    borderColor: 'var(--static-white-medium)',
                    borderRadius: 10,
                    padding: 3,
                    cursor: 'auto',
                    margin: 5,
                    backgroundColor: '#FFF'
                }}
            />

        </div>
    )
}

IconBox.displayName = 'IconBox';

export { IconBox };