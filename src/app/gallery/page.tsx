import React from "react";
import { Flex, RevealFx, Heading } from "@/once-ui/components";
import Image from "next/image";
import { Configs } from '@/app/config';

interface ProjectProps { }

const Projects: React.FC<ProjectProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q1" direction="column" overflowY="auto" alignItems="center">
            <Heading as="h1" variant="heading-strong-l" paddingX="32" paddingTop="24" marginBottom="24">Gallery</Heading>
            {Configs.gallery.map((row, i)=>(
                <Flex key={i}>
                    {
                        row.map((data: string, j)=>  
                         <Flex key={i+j} padding="12" margin="12" borderStyle="solid-1" radius="l-8" maxWidth={25}>

                        <RevealFx
                            speed="medium"
                            delay={0}
                            translateY={0}
                        >
                            <Flex
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                maxWidth={50}
                            >
                                <Image
                                    src={`/gallery/${data}`}
                                    alt=""
                                    width={1020}
                                    height={320}
                                    style={{
                                        width: "-webkit - fill - available",
                                        objectFit: "scale-down",
                                    }}
            
                                />
                            </Flex>
                        </RevealFx >
                    </Flex >)
                    }
                </Flex>
            ))}
        </Flex>
    )
}

export default Projects;