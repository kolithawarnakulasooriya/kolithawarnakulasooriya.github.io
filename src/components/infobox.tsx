import { LetterFx } from "@/once-ui/components";
import React from "react";
import styles from './infobox.module.scss';

interface InfoBoxProps {
    text: string;
    fontSize?: number;
}

const scrambleCharacters = ['A','B','C','D','E','F','1','2','3','4','5','6','7','8','9','0'];

const InfoBox: React.FC<InfoBoxProps> = ({ text, fontSize = 40 }) => (
    <div className={styles.boxcontainer} style={{ '--identity-size': `${fontSize / 16}rem` } as React.CSSProperties}>
        <LetterFx speed="medium" trigger="instant" charset={scrambleCharacters}>{text}</LetterFx>
    </div>
);

InfoBox.displayName = 'InfoBox';
export { InfoBox };
