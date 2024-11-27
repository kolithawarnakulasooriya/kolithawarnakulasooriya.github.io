import React from "react";
import { Flex, Grid, Text, Accordion, Scroller } from "@/once-ui/components";
import { Configs } from '@/app/config';
import Image, { ImageProps } from 'next/image';
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
                 <Flex direction="column" fillWidth overflowY="auto">
                        <Accordion
                            title="Languages"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/java.png" size="m" tooltip="Java" />
                                <IconBox src="/icons/js.png" size="m" tooltip="Javascript" />
                                <IconBox src="/icons/typescript.png" size="m" tooltip="Java" />
                                <IconBox src="/icons/python.png" size="m" tooltip="Python" />
                                <IconBox src="/icons/sql.png" size="m" tooltip="SQL" />
                                <IconBox src="/icons/c-.png" size="m" tooltip="C++" />
                                <IconBox src="/icons/c-sharp.png" size="m" tooltip="C#" />
                                <IconBox src="/icons/html.png" size="m" tooltip="HTML" />
                                <IconBox src="/icons/css.png" size="m" tooltip="CSS/SCSS" />
                            </Flex>
                        </Accordion>
                        <Accordion
                            title="Technologies & Frameworks"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/react.png" size="m" tooltip="React" />
                                <IconBox src="/icons/react-native.png" size="m" tooltip="React Native" />
                                <IconBox src="/icons/recoiljs.png" size="m" tooltip="Recoil JS" />
                                <IconBox src="/icons/redux.png" size="m" tooltip="Redux" />
                                <IconBox src="/icons/expo.png" size="m" tooltip="Expo" />
                                <IconBox src="/icons/express.png" size="m" tooltip="Express Js" />
                                <IconBox src="/icons/flask.png" size="m" tooltip="Flask" />
                                <IconBox src="/icons/ROS.png" size="m" tooltip="ROS" />
                                <IconBox src="/icons/springboot.png" size="m" tooltip="Spring Boot" />
                                <IconBox src="/icons/aws.png" size="m" tooltip="AWS" />
                                <IconBox src="/icons/azure.png" size="m" tooltip="Azure" />
                            </Flex>
                        </Accordion>
                        <Accordion
                            title="Project Management and Communication"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/jira.png" size="m" tooltip="Jira" />
                                <IconBox src="/icons/confluence.png" size="m" tooltip="Confluence" />
                                <IconBox src="/icons/outlook.png" size="m" tooltip="Outlook" />
                                <IconBox src="/icons/teams.png" size="m" tooltip="Teams" />
                                <IconBox src="/icons/slack.png" size="m" tooltip="Slack" />
                                <IconBox src="/icons/discord.png" size="m" tooltip="Discord" />
                            </Flex>
                        </Accordion>
                        <Accordion
                            title="Editors, IDE, and Tools"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/jet.png" size="m" tooltip="JetBrains" />
                                <IconBox src="/icons/vscode.png" size="m" tooltip="VS Code" />
                                <IconBox src="/icons/visual-studio.png" size="m" tooltip="Visual Studio" />
                                <IconBox src="/icons/xcode.png" size="m" tooltip="X Code" />
                                <IconBox src="/icons/dbever.png" size="m" tooltip="Dbever" />
                                <IconBox src="/icons/drawio.png" size="m" tooltip="Draw.Io" />
                                <IconBox src="/icons/figma.png" size="m" tooltip="Figma" />
                            </Flex>
                        </Accordion>
                        <Accordion
                            title="Databases & Data Tools"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/mysql.png" size="m" tooltip="MySQL" />
                                <IconBox src="/icons/mssql.png" size="m" tooltip="SQL Server" />
                                <IconBox src="/icons/postgres.png" size="m" tooltip="Postgres" />
                                <IconBox src="/icons/mongo.png" size="m" tooltip="Mongo DB" />
                                <IconBox src="/icons/dynamodb.png" size="m" tooltip="DynamoDB" />
                                <IconBox src="/icons/radis.png" size="m" tooltip="Redis" />
                                <IconBox src="/icons/spark.png" size="m" tooltip="Apache Spark" />
                            </Flex>
                        </Accordion>
                        <Accordion
                            title="Other"
                            open
                        >
                            <Flex
                                fillWidth
                                justifyContent="center"
                            >
                                <IconBox src="/icons/torch.png" size="m" tooltip="PyTorch" />
                                <IconBox src="/icons/sonarqube.svg" size="m" tooltip="SonarQube" />
                                <IconBox src="/icons/datadog.avif" size="m" tooltip="Datadog" />
                                <IconBox src="/icons/dynatrace.svg" size="m" tooltip="Dynatrace" />
                                <IconBox src="/icons/optimizely.png" size="m" tooltip="Optimizely" />
                                <IconBox src="/icons/google.svg" size="m" tooltip="Google" />
                                <IconBox src="/icons/copilot.png" size="m" tooltip="Copilot" />
                            </Flex>
                        </Accordion>
                    </Flex>
            </Grid>
        </Flex>
    )
}

export default Me;