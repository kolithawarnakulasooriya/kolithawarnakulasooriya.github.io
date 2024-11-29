import React from "react";
import { Flex } from "@/once-ui/components";
import { Configs, ProjectObject } from '@/app/config';
import { ProjectBox } from "@/components/projectbox";

interface ProjectProps { }

const Projects: React.FC<ProjectProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q" direction="column" overflowY="auto" alignItems="center">
            {Configs.projects.map((row, i)=>(
                <Flex key={i}>
                    {
                        row.map((data: ProjectObject, j)=><ProjectBox
                            key={i+j}
                            src={data.src}
                            heading={data.heading}
                            image={data.image}
                            title={data.title}
                        />)
                    }
                </Flex>
            ))}
        </Flex>
    )
}

export default Projects;