import React from "react";
import { Flex, Heading, SmartLink } from "@/once-ui/components";
import { Configs } from '@/app/config';

interface Blog { }

const ResearchPage: React.FC<Blog> = ({ }) => {

    return (
        <Flex direction="column">
            <Heading as="h1" variant="heading-strong-l" paddingX="32" paddingTop="24" marginBottom="24">Research</Heading>
            <Flex paddingX="32" marginBottom="16">
                <SmartLink
                    href={Configs.research}
                    target="_blank"
                    rel="noopener noreferrer"
                    suffixIcon="arrowUpRight"
                    aria-label="Open Research site (external site, opens in a new tab)"
                >
                    Open Research site
                </SmartLink>
            </Flex>
            <iframe src={`${Configs.research}`} height="1000" width="1000" title="Research"></iframe>
        </Flex>
    )
}

export default ResearchPage;
