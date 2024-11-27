'use client';

import { Flex, SmartLink, Heading } from '@/once-ui/components';
import React from 'react';

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
                <Heading as='h1'>Kolitha Warnakulasooriya</Heading>
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
                        href="">
                        Who Am I
                    </SmartLink>
                    <SmartLink
                        href="">
                        Resume
                    </SmartLink>
                    <SmartLink
                        href="">
                        Portfolio
                    </SmartLink>
                </Flex>
            </Flex>
        </Flex>
    );
};

export { Header };