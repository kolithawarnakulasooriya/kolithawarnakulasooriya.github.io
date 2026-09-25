import React from "react";
import { Flex, RevealFx } from "@/once-ui/components";
import Image from "next/image";
import { Configs } from '@/app/config';

interface Blog { }

const ResearchPage: React.FC<Blog> = ({ }) => {

    return (
        <iframe src={`${Configs.research}`} height="1000" width="1000" title="Research"></iframe>
    )
}

export default ResearchPage;
