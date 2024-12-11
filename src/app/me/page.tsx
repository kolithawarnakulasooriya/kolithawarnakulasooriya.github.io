import React from "react";
import { Flex, Grid, Text, Accordion } from "@/once-ui/components";
import { Configs, SkillCategory, SkillObject } from '@/app/config';
import { IconBox } from "@/components/iconbox";

interface MeProps { }

const Me: React.FC<MeProps> = ({ }) => {

    return (
        <Flex fillHeight className="window3q">
            <Grid
                columns="repeat(1, 2fr)"
                fillHeight
                fillWidth
                padding="12"
            >
                <Grid
                    columns="repeat(1, 2)"
                    fillWidth
                >
                    
                    <Text
                        variant="body-default-s"
                        align="justify"
                        paddingTop="12"
                        paddingLeft="64"
                        paddingRight="64"
                    >
                        {Configs.summary}
                    </Text>
                </Grid>
                <Flex direction="column" fillWidth overflowY="auto">
                    {
                        Configs.skills.map((skillcategory: SkillCategory, index) => (
                            <Accordion
                                key={index}
                                title={skillcategory.titile}
                                open={skillcategory.isOpen}
                            >
                                <Flex
                                    fillWidth
                                    justifyContent="center"
                                >
                                    {
                                        skillcategory.items.map((skill: SkillObject, index1) => (<IconBox key={index1} src={skill.src} size="m" />))
                                    }
                                </Flex>
                            </Accordion>
                        ))
                    }
                </Flex>
            </Grid>
        </Flex>
    )
}

export default Me;
