'use client';
import { Flex, Avatar, Heading, Text, Accordion } from "@/once-ui/components"
import Link from "next/link";
import React from "react"

interface PublicationBoxProps {
    key?: number
    href: string,
    title: string,
    authors: string,
    publisher: string,
}

const PublicationBox: React.FC<PublicationBoxProps> = ({
    key, href, title, authors, publisher
}) => {
    return (
        <Flex key={key} fillWidth direction="column" padding="20">
            <Link href={href}>
                <Text style={{fontSize: 22, color: 'var(--brand-on-background-weak)'}}> {title} </Text>
            </Link>
            <Text style={{fontSize: 14}}> {authors} </Text>
            <Text style={{fontSize: 14}}> {publisher} </Text>
        </Flex>
    )
}

PublicationBox.displayName = 'PublicationBox';

export { PublicationBox };