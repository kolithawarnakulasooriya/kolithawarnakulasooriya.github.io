

'use client';

import { Button, Flex, IconButton, Text } from '@/once-ui/components';
import React from 'react';

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <Flex
            as="footer"
            position="absolute"
            style={{
                bottom: 0,
                right: 0,
                left: 0
            }}>
            <Flex
                justifyContent="space-between"
                fillWidth
                paddingX="l"
                paddingY="m"
            >
                <Flex
                    justifyContent="center"

                    gap="12"
                >
                    <IconButton
                        href='https://www.linkedin.com/in/kolitha-warnakulasooriya/'
                        icon="linkedin"
                        size="l"
                        tooltip="Linked-in"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                    <IconButton
                        href='https://scholar.google.com/citations?user=9m-0uFYAAAAJ&hl=en'
                        icon="googlescholar"
                        size="l"
                        tooltip="Google Scholar"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                    <IconButton
                        href='https://medium.com/@warnakulasooriyakolitha'
                        icon="medium"
                        size="l"
                        tooltip="Medium"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                     <IconButton
                        href='https://github.com/kolithawarnakulasooriya'
                        icon="github"
                        size="l"
                        tooltip="Github"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                    <IconButton
                        href='https://www.researchgate.net/profile/Kolitha-Warnakulasooriya'
                        icon="researchgate"
                        size="l"
                        tooltip="ResearchGate"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                    <IconButton
                        href='https://orcid.org/0000-0002-4619-7027'
                        icon="orcid"
                        size="l"
                        tooltip="ORCID"
                        tooltipPosition="top"
                        variant="tertiary"
                    />
                </Flex>
                <Flex
                    justifyContent="center"
                    alignItems='center'
                    align='center'
                >
                    <Text
                        style={{
                            fontSize: 12,
                            marginBottom: -50,
                            marginLeft: -45,
                            letterSpacing: '0.05rem'
                        }}
                    >
                        Powered by Next.Js & once ui
                    </Text>
                </Flex>
                <Flex
                    justifyContent="center"
                    gap="12">
                    <Button variant="tertiary" href='mailto:kolitha.warnakulasooriya@outlook.com'>
                        Email Me
                    </Button>
                </Flex>
            </Flex>
        </Flex >
    );
};

export { Footer };
