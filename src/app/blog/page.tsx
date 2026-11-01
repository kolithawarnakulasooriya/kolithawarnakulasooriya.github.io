import React from "react";
import { Flex, RevealFx, Heading } from "@/once-ui/components";
import Image from "next/image";
import { Configs } from '@/app/config';

interface Blog { }

const Projects: React.FC<Blog> = ({ }) => {

    return (
        <Flex fillHeight className="window3q1" direction="column" overflowY="auto" alignItems="center" style={{margin: 20}}>
            <Heading as="h1" variant="heading-strong-l" paddingX="32" paddingTop="24" marginBottom="24">Blog</Heading>
            {
                Configs.blog.map((row, i)=>
                    <Flex key={i} style={{marginBottom: 20}}>
                        <iframe src={`${row}`} height="1000" width="1000" title="Embedded post"></iframe>
                    </Flex>
                )
            }
        </Flex>
    )
}

export default Projects;
