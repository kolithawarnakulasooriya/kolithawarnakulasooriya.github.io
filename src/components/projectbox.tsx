'use client';
import { Flex, RevealFx, Text, Heading } from "@/once-ui/components";
import Image from "next/image";
import Link from "next/link";
import React from "react"

interface ProjectBoxProps {
    key?: number
    src: string
    heading: string
    image: string
    title: string
}

const ProjectBox: React.FC<ProjectBoxProps> = ({
    key,
    src,
    heading,
    image,
    title
}) => {
    return (
        <Flex key={key} padding="12" margin="12" borderStyle="solid-1" radius="l-8" maxWidth={20}>
            <RevealFx
                speed="medium"
                delay={0}
                translateY={0}
            >
                <Flex
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    maxWidth={17}
                >
                    <Heading as="h2" marginBottom="12">
                        {title}
                    </Heading>
                    <Image
                        src={image}
                        alt=""
                        width={350}
                        height={160}
                        style={{
                            width: "-webkit - fill - available",
                            "object-fit": "scale-down"
                        }}

                    />
                    <Link href={src}>
                        <Text style={{
                            textAlign: 'center',
                            fontSize: 14,
                            marginTop: 12
                        }}>
                            {heading}
                        </Text>
                    </Link>
                </Flex>
            </RevealFx>
        </Flex>
    )
}

ProjectBox.displayName = 'ProjectBox';

export { ProjectBox };