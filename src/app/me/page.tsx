import React from "react";
import { Flex, Grid, Text, Accordion } from "@/once-ui/components";
import { Configs } from '@/app/config';
import Image, { ImageProps } from 'next/image';
import { IconBox } from "@/components/iconbox";
interface MeProps { }

const Me: React.FC<MeProps> = ({ }) => {
    return (
        <Flex>
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
                        align="left"
                        size="s"
                        onBackground="neutral-strong"
                    >
                        {Configs.name} is a,
                    </Text>
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
                <Flex
                    padding="32"
                >
                    <Grid
                        columns="repeat(1, 1)"
                        fillWidth
                    >
                        <Accordion
                            title="Languages"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/java.png" size="m" tooltip="Java"/>
                                <IconBox src="/icons/js.png" size="m" tooltip="Javascript"/>
                                <IconBox src="/icons/typescript.png" size="m" tooltip="Java"/>
                                <IconBox src="/icons/python.png" size="m" tooltip="Python"/>
                                <IconBox src="/icons/sql.png" size="m" tooltip="SQL"/>
                                <IconBox src="/icons/c-.png" size="m" tooltip="C++"/>
                                <IconBox src="/icons/c-sharp.png" size="m" tooltip="C#"/>
                                <IconBox src="/icons/html.png" size="m" tooltip="HTML"/>
                                <IconBox src="/icons/css.png" size="m" tooltip="CSS/SCSS"/>
                            </Flex>
                        </Accordion>
                    </Grid>
                </Flex>
            </Grid>
        </Flex>
    )
}

export default Me;