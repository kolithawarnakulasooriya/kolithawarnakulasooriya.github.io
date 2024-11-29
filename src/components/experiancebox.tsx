'use client';
import { Flex, Avatar, Heading, Text, Accordion } from "@/once-ui/components"
import React from "react"
import styles from './experiancebox.module.scss';

interface ExperianceBoxProps {
    key?:number
    src: string
    heading: string
    company: string
    subtext?: string
    duration: string
    items?: Array<string>
}

const ExperianceBox: React.FC<ExperianceBoxProps> = ({
    key,
    src,
    heading,
    company,
    subtext,
    duration,
    items=[]
}) => {
    return (
        <Flex key={key} fillWidth direction="column" paddingBottom="20">
            <Flex fillWidth>
                <Flex fillHeight paddingTop="8">
                    <Avatar src={src} size="l"></Avatar>
                </Flex>
                <Flex
                    margin="4"
                    marginLeft="16"
                    fillWidth
                    direction="column"
                >
                    <Heading as="h3"> {heading} </Heading>
                    <Heading as="h5">
                        {company}
                    </Heading>
                    {subtext && (
                        <Text style={{ fontSize: 12 }}>
                            {subtext}
                        </Text>
                    )}
                </Flex>
                <Flex
                    borderStyle="solid-1"
                    radius="m-8"
                    marginTop="8"
                    paddingLeft="12"
                    paddingRight="12"
                    paddingTop="4"
                    className={styles.durationbox}
                >
                    {duration}
                </Flex>
            </Flex>
            <Accordion title="" withoutHeader style={{
                marginTop: -30
            }}>
                <Flex className={styles.listbox}>
                    <ul>
                        {items.map((element, index) => (<li style={{lineHeight: 1.5}} key={index}>{element}</li>))}
                    </ul>
                </Flex>
            </Accordion>
            
        </Flex>
    )
}

ExperianceBox.displayName = 'ExperianceBox';

export { ExperianceBox };