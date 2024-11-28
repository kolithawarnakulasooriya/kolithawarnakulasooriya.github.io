'use client';

import { Flex, SmartLink, Heading } from '@/once-ui/components';
import React from 'react';
import Link from 'next/link';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {

    return (
        <Flex
            style={{
                borderBottom: '1px solid var(--neutral-border-medium)'
            }}
            as="header"
            fillWidth
            paddingX="m"
            paddingY="xs"
            alignItems="center"
            justifyContent='space-between'
            background="neutral-medium">
            <Flex>
                <Link href='/'  style={{textDecoration: 'none'}}>             
                    <Heading as='h1'>Kolitha Warnakulasooriya</Heading>    
                </Link>                                                       
            </Flex>
            <Flex
                fillWidth
                alignItems="right" justifyContent="right">
                <Flex
                    hide="s"
                    textVariant="label-default-s"
                    gap="4" 
                    paddingX="l"
                    alignItems="center">
                    <SmartLink
                        href="/me">
                        Who Am I
                    </SmartLink>
                    <SmartLink
                        href="/resume">
                        Resume
                    </SmartLink>
                    <SmartLink
                        href="/publications">
                        Publications
                    </SmartLink>
                    <SmartLink
                        href="/projects">
                        Projects
                    </SmartLink>
                </Flex>
            </Flex>
        </Flex>
    );
};

export { Header };