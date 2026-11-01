import React from "react";
import { Flex, Heading } from "@/once-ui/components";
import { Configs, PublicationObject } from '@/app/config';
import { PublicationBox } from "@/components/publicationbox";

interface PublicationsProps { }

const Publications: React.FC<PublicationsProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q" direction="column" overflowY="auto">
            <Heading as="h1" variant="heading-strong-l" paddingX="32" paddingTop="24" marginBottom="24">Publications</Heading>
            {
                Configs.publications.map((pub: PublicationObject, index)=>(
                    <PublicationBox
                        key={index}
                        href={pub.href}
                        title={pub.title}
                        publisher={pub.publisher}
                        authors={pub.authors}
                    />
                ))
            }
        </Flex>
    )
}

export default Publications;