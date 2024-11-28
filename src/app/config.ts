export interface ExperianceItem {
    title: string
    company: string
    subtitle?: string
    duration: string
    src: string
    items: Array<string>
}

export interface EducationItem {
    title: string
    institute: string
    subtitle?: string
    duration: string
    src: string
}

export interface SkillObject{
    src: string
}
export interface SkillCategory {
    titile: string
    isOpen: boolean
    items: Array<SkillObject>
}
export interface ConfigProps {
    summary: string,
    name: string,
    skills: Array<SkillCategory>
    experiance: Array<ExperianceItem>
    education: Array<EducationItem>
}
export const Configs: ConfigProps = {
    summary: "A professional software engineer and developer with 5+ years of experience in full-stack application development. A researcher with 3+ years of experience in general artificial intelligence in robotic applications. Professionally collaborated with other development teams to integrate business logic and optimize the components to enhance the customer experience. Demonstrated strong leadership within an agile framework through punctual delivery and deployments, maintaining professional communication with higher management and other teams, and proficiently delegating sprint tasks.",
    name: "Kolitha Warnakulasooriya",
    skills: [
        {
            titile: "Languages",
            isOpen: true,
            items: [
                { src: '/icons/java.png' },
                { src: '/icons/js.png' },
                { src: '/icons/typescript.png' },
                { src: '/icons/python.png' },
                { src: '/icons/sql.png' },
                { src: '/icons/c-.png' },
                { src: '/icons/c-sharp.png' },
                { src: '/icons/html.png' },
                { src: '/icons/css.png' },
            ]
        },
        {
            titile: "Technologies and Frameworks",
            isOpen: true,
            items: [
                { src: '/icons/react.png' },
                { src: '/icons/react-native.png' },
                { src: '/icons/recoiljs.png' },
                { src: '/icons/redux.png' },
                { src: '/icons/expo.png' },
                { src: '/icons/express.png' },
                { src: '/icons/flask.png' },
                { src: '/icons/ROS.png' },
                { src: '/icons/springboot.png' },
                { src: '/icons/aws.png' },
                { src: '/icons/azure.png' },
            ]
        },
        {
            titile: "Project Management and Communication",
            isOpen: true,
            items: [
                { src: '/icons/jira.png' },
                { src: '/icons/confluence.png' },
                { src: '/icons/outlook.png' },
                { src: '/icons/teams.png' },
                { src: '/icons/slack.png' },
                { src: '/icons/discord.png' }
            ]
        },
        {
            titile: "Editors, IDE, and Tools",
            isOpen: true,
            items: [
                { src: '/icons/jet.png' },
                { src: '/icons/vscode.png' },
                { src: '/icons/visual-studio.png' },
                { src: '/icons/xcode.png' },
                { src: '/icons/dbever.png' },
                { src: '/icons/drawio.png' },
                { src: '/icons/figma.png' }
            ]
        },
        {
            titile: "Databases & Data Tools",
            isOpen: true,
            items: [
                { src: '/icons/mysql.png' },
                { src: '/icons/mssql.png' },
                { src: '/icons/postgres.png' },
                { src: '/icons/mongo.png' },
                { src: '/icons/dynamodb.png' },
                { src: '/icons/radis.png' },
                { src: '/icons/spark.png' }
            ]
        },
        {
            titile: "Other",
            isOpen: true,
            items: [
                { src: '/icons/torch.png' },
                { src: '/icons/sonarqube.svg' },
                { src: '/icons/datadog.avif' },
                { src: '/icons/dynatrace.svg' },
                { src: '/icons/optimizely.png' },
                { src: '/icons/google.svg' },
                { src: '/icons/copilot.png' }
            ]
        }

    ],
    experiance: [
        {
            src: "/images/usa.png",
            title: "Graduate Research Assistant",
            company: "School of Computing, University of South Alabama, United States",
            duration: "Jan 2022 – Present",
            items: [
                "Pursue research to introduce a dynamic leader election algorithm for an autonomous aerial vehicle system based on cognitive intelligence.",
                "Published three research articles in top-ranked artificial intelligence conferences and journals (AAAI-2023, ICIPRoB, Evolutionary Intelligence)",
                "Engaged as a lead researcher in Drone Systems and AI Laboratory by leading and administrating three core UAV-related research and developed a ROS-based adaptable Python flight framework to operate heterogeneous commercial UAVs such as Tello, Anafi, and Bebop, which can handle a maximum of 15 agents in the cluster."

            ]
        },
        {
            src: "/images/techila.png",
            title: "Software Developer",
            company: "Techila Software",
            duration: "Jul 2018 – Present",
            subtitle: "Self-Employed",
            items: [
                "Led frontend team to develop and maintain three multi-tenant web applications and two hybrid mobile applications"
            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Lead Software Engineer",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation office - Sysco Corporation (NYSE: SYY), United States",
            duration: "Aug 2021 – Jan 2022",
            items: [
                "Appointed as an assistant engineering manager to one of the core development teams of the Sysco Shop e-commerce platform",
                "Worked in an agile/scrum environment, planned sprints, conducted daily standups, and retrospective meetings, and kept meeting minutes",
                "Overlooked team progress in SDLC, feature development process, component testing process, deployment process, feature delivery process, and documentation",
                "Represented the team to the higher management and inter-development team meetings, demonstrated the sprint progress, and status of the feature development process"
            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Senior Software Engineer",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation office - Sysco Corporation (NYSE: SYY), United States",
            duration: "Dec 2019 – Aug 2021",
            items: [
                "Promoted as a senior software engineer to one of the Sysco Shop e-commerce platform and Sysco Delivery mobile application",
                "Utilized software engineering expertise to design and develop Sysco Shop e-commerce web application and Sysco Delivery mobile application",
                "Managed, maintained, and overlooked the overall front-end software components, BFF, relevant microservices, and databases in production and nonproduction environments that are responsible to the team",
                "Proficiently troubleshoot simple and complex issues and contributed as an on-call representative for production incidents and zero production incidents were reported related to the responsible components",
                "Enhanced the application component features by accurate development plans, using best software engineering practices, ensuring the testability and the quality of the functionality through unit tests, component tests, integration tests, regression tests, E2E testing, and sea trials, fixing bugs, and improving overall performance and efficiency",
                "Enhanced and assured system reliability by actively monitoring the overall system using Dynatrace and Datadog platforms",
                "Provided guidance and mentorships for junior engineers, provided technical, and cultural support to new engineers in the onboarding process to the organization"

            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Software Engineer",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation office - Sysco Corporation (NYSE: SYY), United States",
            duration: "Jul 2018 – Nov 2019",
            items: [
                "Utilized software engineering procedures to develop new features for the Sysco Shop web application and Sysco Delivery mobile application",
                "Implemented readable, well-crafted, maintainable new React and React-Native components with proper state management using Redux and Recoil frameworks according to test driven development.",
                "Implemented RESTful and GraphQL APIs in microservice-based architecture using Spring boot and Node Express frameworks ",
                "Ensured the testability of all the software components using unit testing, component testing, integration testing, E2E testing, and sea trials",
                "Collaboratively introduced a machine learning approach to enhance the customer experience of the application and developed a high-performance mockup API generator, which removes expenditure for third-party mock services"

            ]
        },
        {
            src: "/images/99x.png",
            title: "Associate Software Engineer",
            company: "99X Technology, Colombo, Sri Lanka",
            duration: "Dec 2016 - Jul 2017",
            items: [
                "Modified, implemented, tested, and deployed  ASP.net booking web application "
            ]
        }
    ],
    education: [
        {
            src: "/images/usa.png",
            title: "Ph.D. in Computing",
            subtitle: "Cooperative Intelligence in Robotics",
            institute: "School of Computing, University of South Alabama, United States",
            duration: "2025 May",
        },
        {
            src: "/images/uom.jpg",
            title: "B.sc (hons) in Information Technology",
            subtitle: "3.55 Second Upper Devision, Dean List (Senior Year)",
            institute: "University of Moratuwa",
            duration: "2018 Jul",
        }
    ]
}