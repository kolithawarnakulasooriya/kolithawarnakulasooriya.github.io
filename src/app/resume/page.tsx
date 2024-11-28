
import React from "react";
import { Flex, Grid, Heading, Button } from "@/once-ui/components";
import { ExperianceBox } from "@/components/experiancebox";
import { Configs, ExperianceItem, EducationItem } from '@/app/config';
interface ResumeProps { }

const Resume: React.FC<ResumeProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q" direction="column">
            <Grid
                columns="repeat(2, 1fr)"
                fillHeight
                fillWidth
                paddingTop="48"
            >
                <Flex fillHeight fillWidth direction="column" paddingLeft="32" paddingRight="32" paddingTop="12" overflowY="auto">
                    <Heading as="h2" style={{
                        borderBottom:"solid 1px",
                        paddingBottom: 10,
                        marginBottom: 24
                    }}>
                        Employement Experiance
                    </Heading>
                    {
                        Configs.experiance.map((data: ExperianceItem, index) => (<ExperianceBox
                            key={index}
                            src={data.src}
                            heading={data.title}
                            company={data.company}
                            subtext={data.subtitle}
                            duration={data.duration}
                            items={data.items}
                        />))
                    }
                </Flex>
                <Flex fillHeight fillWidth direction="column" paddingLeft="32" paddingRight="32" paddingTop="12" overflowY="auto">
                    <Heading as="h2" style={{
                        borderBottom:"solid 1px",
                        paddingBottom: 10,
                        marginBottom: 24
                    }}>
                        Education
                    </Heading>
                    {
                        Configs.education.map((data: EducationItem, index) => (<ExperianceBox 
                            key={index}
                            src={data.src}
                            heading={data.title}
                            company={data.institute}
                            subtext={data.subtitle}
                            duration={data.duration}
                        />))
                    }
                </Flex>
            </Grid>
            

            <Flex fillWidth justifyContent="center">
                <Button href="/files/resume.pdf">
                    Download My Resume Here!
                </Button>
            </Flex>
        </Flex>
    )
}

export default Resume;