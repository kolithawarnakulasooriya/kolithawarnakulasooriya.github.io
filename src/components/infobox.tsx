import { Flex, LetterFx } from "@/once-ui/components"
import React from "react"
import classNames from 'classnames';
import styles from './infobox.module.scss';

interface InfoBoxProps { 
    text: string
    fontSize?: number
}

const InfoBox: React.FC<InfoBoxProps> = ({
    text,
    fontSize
}) => {
    return (
        <Flex
            className={styles.boxcontainer}
        >
            <LetterFx
                speed="medium"
                trigger="instant"
                charset={['A','B','C','D','E','F','1','2','3','4','5','6','7','8','9','0']}
                style={{fontSize: fontSize}}
            >
                {text}
            </LetterFx>
        </Flex>
    )
}

InfoBox.displayName = 'InfoBox';

export { InfoBox };