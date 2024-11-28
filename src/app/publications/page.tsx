import React from "react";
import { Flex, Grid, Text, Accordion } from "@/once-ui/components";
import { Configs, PublicationObject } from '@/app/config';
import { IconBox } from "@/components/iconbox";
import { PublicationBox } from "@/components/publicationbox";

interface PublicationsProps { }

const Publications: React.FC<PublicationsProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q" direction="column" overflowY="auto">
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