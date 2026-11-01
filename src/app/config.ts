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

export interface SkillObject {
    name: string
    src: string
}
export interface SkillCategory {
    titile: string
    isOpen: boolean
    items: Array<SkillObject>
}

export interface PublicationObject {
    href: string,
    title: string,
    authors: string,
    publisher: string
}

export interface ProjectObject {
    id: string
    src?: string
    title: string
    heading: string
    image: string
    status: string
}
export interface SelectedWorkObject {
    id: string
    projectId: string
    problem: string
    role: string
    contribution: string
    imageAlt: string
    evidence: Array<{ label: string; href: string }>
}
export interface ConfigProps {
    biographyParagraphs: string[],
    name: string,
    resume: string,
    skills: Array<SkillCategory>,
    experiance: Array<ExperianceItem>,
    education: Array<EducationItem>,
    publications: Array<PublicationObject>,
    projects: Array<ProjectObject>,
    selectedWork: Array<SelectedWorkObject>,
    research: string
}


export const biographyParagraphs = [
    'I completed my Ph.D. in Computing at the University of South Alabama in May 2025. I am a Visiting Assistant Professor at the University of South Alabama, an appointment I began in August 2025.',
    'My research focuses on multi-agent UAV systems, including distributed leader selection, formation control, sensor streams and multi-agent decision-making. I developed a framework for heterogeneous UAVs and validated the work through physical experiments.',
    'My software engineering experience includes web and mobile applications, RESTful and GraphQL APIs, and services built with React, React Native, Spring Boot and Node.js. My work has included testing, production monitoring and incident response, and mentoring engineers.',
    'Outside work, I enjoy tennis, working out, long-distance driving, spending time with friends, and learning about science, nature and finance.',
];

export const Configs: ConfigProps = {
    biographyParagraphs,
    name: "Kolitha Warnakulasooriya",
    resume: '/files/Kolitha_AI_Engineer.pdf',
    skills: [
        {
            titile: "Languages",
            isOpen: true,
            items: [
                { name: 'Java', src: '/icons/java.png' },
                { name: 'JavaScript', src: '/icons/js.png' },
                { name: 'TypeScript', src: '/icons/typescript.png' },
                { name: 'Python', src: '/icons/python.png' },
                { name: 'SQL', src: '/icons/sql.png' },
                { name: 'C++', src: '/icons/c-.png' },
                { name: 'C#', src: '/icons/c-sharp.png' },
                { name: 'HTML', src: '/icons/html.png' },
                { name: 'CSS', src: '/icons/css.png' },
            ]
        },
        {
            titile: "Technologies and Frameworks",
            isOpen: true,
            items: [
                { name: 'React', src: '/icons/react.png' },
                { name: 'React Native', src: '/icons/react-native.png' },
                { name: 'Recoil', src: '/icons/recoiljs.png' },
                { name: 'Redux', src: '/icons/redux.png' },
                { name: 'Expo', src: '/icons/expo.png' },
                { name: 'Express', src: '/icons/express.png' },
                { name: 'Flask', src: '/icons/flask.png' },
                { name: 'ROS', src: '/icons/ROS.png' },
                { name: 'Spring Boot', src: '/icons/springboot.png' },
                { name: 'AWS', src: '/icons/aws.png' },
                { name: 'Azure', src: '/icons/azure.png' },
            ]
        },
        {
            titile: "Project Management and Communication",
            isOpen: true,
            items: [
                { name: 'Jira', src: '/icons/jira.png' },
                { name: 'Confluence', src: '/icons/confluence.png' },
                { name: 'Outlook', src: '/icons/outlook.png' },
                { name: 'Microsoft Teams', src: '/icons/teams.png' },
                { name: 'Slack', src: '/icons/slack.png' },
                { name: 'Discord', src: '/icons/discord.png' }
            ]
        },
        {
            titile: "Editors, IDE, and Tools",
            isOpen: true,
            items: [
                { name: 'JetBrains', src: '/icons/jet.png' },
                { name: 'Visual Studio Code', src: '/icons/vscode.png' },
                { name: 'Visual Studio', src: '/icons/visual-studio.png' },
                { name: 'Xcode', src: '/icons/xcode.png' },
                { name: 'DBeaver', src: '/icons/dbever.png' },
                { name: 'draw.io', src: '/icons/drawio.png' },
                { name: 'Figma', src: '/icons/figma.png' }
            ]
        },
        {
            titile: "Databases & Data Tools",
            isOpen: true,
            items: [
                { name: 'MySQL', src: '/icons/mysql.png' },
                { name: 'Microsoft SQL Server', src: '/icons/mssql.png' },
                { name: 'PostgreSQL', src: '/icons/postgres.png' },
                { name: 'MongoDB', src: '/icons/mongo.png' },
                { name: 'DynamoDB', src: '/icons/dynamodb.png' },
                { name: 'Redis', src: '/icons/radis.png' },
                { name: 'Apache Spark', src: '/icons/spark.png' }
            ]
        },
        {
            titile: "Continuous Integration & Delivery",
            isOpen: true,
            items: [
                { name: 'Docker', src: '/icons/docker-96.png' },
                { name: 'Jenkins', src: '/icons/jenkins.png' },
                { name: 'Git', src: '/icons/git.png' },
                { name: 'GitHub', src: '/icons/github.png' },
                { name: 'Argo', src: '/icons/argo.png' },
                { name: 'GitHub Actions', src: '/icons/github-actions.png' }
            ]
        },
        {
            titile: "Other",
            isOpen: true,
            items: [
                { name: 'PyTorch', src: '/icons/torch.png' },
                { name: 'SonarQube', src: '/icons/sonarqube.svg' },
                { name: 'Datadog', src: '/icons/datadog.avif' },
                { name: 'Dynatrace', src: '/icons/dynatrace.svg' },
                { name: 'Optimizely', src: '/icons/optimizely.png' },
                { name: 'Google', src: '/icons/google.svg' },
                { name: 'GitHub Copilot', src: '/icons/copilot.png' },
                { name: 'Postman', src: '/icons/postman.png' }
            ]
        }

    ],
    experiance: [
        {
            src: "/images/usa.png",
            title: "Visiting Assistant Professor",
            company: "College of Engineering, University of South Alabama, United States",
            duration: "Aug 2025 – Present",
            items: [
                "Conduct research on intelligent UAV systems, autonomous systems and robotic perception, and collaborate with researchers across faculties.",
                "Teach Digital Computer Architecture, Digital Logic Design, Introduction to Robotics, and Microprocessor System Interfacing.",
            ]
        },
        {
            src: "/images/usa.png",
            title: "Research Assistant",
            company: "School of Computing, University of South Alabama, United States",
            duration: "Jan 2022 – May 2025",
            items: [
                "Developed a distributed robotics framework for heterogeneous UAVs, integrating leader selection, formation control, real-time sensor streams, communications and multi-agent decision-making.",
                "Validated research through simulation, algorithm implementation, physical experiments and field testing.",
                "Built reproducible experimentation and analysis workflows using Python, MLflow and ZenML.",
            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Lead Engineer (Associate)",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation Office — Sysco Corporation (NYSE: SYY), United States",
            duration: "Aug 2021 – Dec 2021",
            items: [
                "Led system design, sprint planning, code reviews and engineering-quality practices.",
                "Coordinated feature development, testing, deployment and documentation with cross-functional teams.",
                "Represented the team in management and cross-team meetings, and communicated sprint progress.",
                "Contributed to production incident diagnosis, troubleshooting and recovery with other engineering teams.",
            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Senior Software Engineer",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation Office — Sysco Corporation (NYSE: SYY), United States",
            duration: "Dec 2019 – Aug 2021",
            items: [
                "Designed and developed the Sysco Shop web application and Sysco Delivery mobile application.",
                "Developed and maintained front-end components, BFF services, microservices and databases in production and non-production environments.",
                "Investigated production issues and participated in on-call incident response.",
                "Improved testability and software quality through unit, component, integration, regression and end-to-end testing.",
                "Monitored application behavior using Dynatrace and Datadog.",
                "Mentored junior engineers and supported onboarding.",
            ]
        },
        {
            src: "/images/Sysco_LABS_Logo.avif",
            title: "Software Engineer",
            company: "SyscoLabs Technologies, Colombo, Sri Lanka",
            subtitle: "Innovation Office — Sysco Corporation (NYSE: SYY), United States",
            duration: "Jul 2018 – Nov 2019",
            items: [
                "Developed features for the Sysco Shop web application and Sysco Delivery mobile application.",
                "Built React and React Native components with Redux and Recoil state management using test-driven development.",
                "Implemented RESTful and GraphQL APIs using Spring Boot and Express in a microservices architecture.",
                "Tested software through unit, component, integration and end-to-end tests.",
                "Developed an open-source in-memory mock API service for testing and application development.",
            ]
        },
        {
            src: "/images/99x.png",
            title: "Associate Software Engineer (Intern)",
            company: "99X Technology, Colombo, Sri Lanka",
            duration: "Dec 2016 – Jul 2017",
            items: [
                "Modified, implemented, tested and deployed an ASP.NET booking web application.",
            ]
        },
        {
            src: "/images/4onse.jpg",
            title: "Research Assistant",
            company: "4ONSE — University of Moratuwa / SUPSI",
            duration: "Oct 2016 – Jan 2018",
            items: [
                "Contributed to embedded systems research for environmental monitoring in the 4ONSE project.",
            ]
        }
    ],
    education: [
        {
            src: "/images/usa.png",
            title: "Ph.D. in Computing",
            subtitle: "Cooperative Intelligence in Robotics",
            institute: "School of Computing, University of South Alabama, United States",
            duration: "May 2025",
        },
        {
            src: "/images/uom.jpg",
            title: "B.Sc. (Hons.) in Information Technology",
            subtitle: "GPA 3.55; Second Class Upper Division; Dean's List (Senior Year)",
            institute: "University of Moratuwa",
            duration: "July 2018",
        }
    ],
    publications: [
        {
            href: "https://arc.aiaa.org/doi/abs/10.2514/6.2026-1996",
            title: "Cooperative Optimized Leader Selection in Large UAV Swarms by Maximizing the Average Controllability in a Hierarchical Control Structure",
            authors: "Kolitha Warnakulasooriya, Hakki Erhan Sevil, Aviv Segev",
            publisher: "AIAA Scitech"
        },
        {
            href: "https://doi.org/10.1007/s12065-024-00997-6",
            title: "Comparative analysis of accuracy and computational complexity across 21 swarm intelligence algorithms",
            authors: "Kolitha Warnakulasooriya, Aviv Segev",
            publisher: "Evolutionary Intelligence"
        },
        {
            href: "https://doi.org/10.1109/BigData62323.2024.10824996",
            title: "Exploring an Embodied Conversation Agent to Act as an Empathetic Doctor for use in Telehealth",
            authors: "William Starling, Kolitha Warnakulasooriya, Aviv Segev",
            publisher: "2024 IEEE International Conference on Big Data (BigData)"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/10543316",
            title: "Attacks, Detection, and Prevention on Commercial Drones: A Review",
            authors: "Kolitha Warnakulasooriya, Aviv Segev",
            publisher: "2024 International Conference on Image Processing and Robotics (ICIPRoB)"
        },
        {
            href: "https://www.researchgate.net/profile/Kolitha-Warnakulasooriya/publication/370211288_Priority_Basis_Task_Allocation_for_Drone_Swarms/links/65409960ff8d8f507cda0590/Priority-Basis-Task-Allocation-for-Drone-Swarms.pdf",
            title: "Priority Basis Task Allocation for Drone Swarms",
            authors: "Kolitha Warnakulasooriya, Ryan G Benton, Aviv Segev",
            publisher: "AAAI Association for the Advancement of Artificial Intelligence 2023-WoMapf"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/8519997",
            title: "Low Cost and IoT Based Greenhouse with Climate Monitoring and Controlling System for Tropical Countries",
            authors: "Yasas Pansilu Jayasuriya; Chanuka Sandaru Elvitigala; Kolitha Wamakulasooriya; BH Sudantha",
            publisher: "2018 International Conference on System Science and Engineering (ICSSE)"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/8520238",
            title: "Generic IoT framework for environmental sensing researches: Portable IoT enabled weather station",
            authors: "K Warnakulasooriya, YP Jayasuriya, BH Sudantha",
            publisher: "2018 International Conference on System Science and Engineering (ICSSE), 1-5"
        },
        {
            href: "https://doi.org/10.4038/bhumi.v6i1.36",
            title: "Open-source implementation of an integrated low-cost environmental monitoring system (EMS) for developing countries",
            authors: "BH Sudantha, KMHK Warnakulasooriya, YP Jayasuriya, GR Ratnayaka, PKS Mahanama, EJ Warusavitharana, SN Weerasinghe",
            publisher: "Bhumi, The Planning Research Journal"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/8520044",
            title: "IoT Empowered Gesture Recognition System for Life Style Enhancement of Differently Abled People",
            authors: "Kolitha Warnakulasooriya, Chinthaka Premachandra, BH Sudantha, Sagara Sumathipala",
            publisher: "2018 International Conference on System Science and Engineering (ICSSE)"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/9367340",
            title: "Sensory Evaluation of Foods using Modern AI Techniques and Brain Wave Analysis",
            authors: "KMHK Warnakulasooriya, JDSACS Bandara, BH Sudantha",
            publisher: "2020 International Conference on Image Processing and Robotics (ICIP)"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/8736147",
            title: "A color mask and trained image set for the creation of new technique for indoor robotic navigation",
            authors: "KMHK Warnakulasooriya, BH Sudantha, C Premachandra",
            publisher: "2018 3rd International Conference on Information Technology Research (ICITR)"
        },
        {
            href: "https://ieeexplore.ieee.org/abstract/document/8023304",
            title: "Adaptive navigation and motion planning for a mobile track robot",
            authors: "BH Sudantha, KASN Sumathipala, Chinthaka Premachandra, KMHK Warnakulasooriya, CS Elvitigala, YP Jayasuriya",
            publisher: "2017 Joint 17th World Congress of International Fuzzy Systems Association and 9th International Conference on Soft Computing and Intelligent Systems (IFSA-SCIS)"
        },
        {
            href: "https://scholar.google.com/citations?view_op=view_citation&hl=en&user=9m-0uFYAAAAJ&citation_for_view=9m-0uFYAAAAJ:Y0pCki6q_DkC",
            title: "4onse–4 times open and non-conventional technology for sensing the environment: an integrated low-cost environmental monitoring system (ems) for developing countries",
            authors: "GR Ratnayake, PKS Mahanama, EJ Warusavitharana, SN Weerasinghe, KMHK Warnakulasooriya, BH Sudantha, YP Jayasuriya",
            publisher: "Information Technology Research Unit, Faculty of Information Technology, University of Moratuwa, Sri Lanka"
        },
        {
            href: "https://www.researchgate.net/profile/Kolitha-Warnakulasooriya/publication/324792598_A_Novel_Approach_of_Color_Detection_Technique_for_the_Enhancement_of_Robotic_Navigation/links/5ae288380f7e9b28594a2c1a/A-Novel-Approach-of-Color-Detection-Technique-for-the-Enhancement-of-Robotic-Navigation.pdf",
            title: "A Novel Approach of Color Detection Technique for the Enhancement of Robotic Navigation",
            authors: "KMHK Warnakulasooriya, BH Sudantha, KASN Sumathipala",
            publisher: "Faculty of Information Technology, University of Moratuwa, Katubedda, Sri Lanka"
        }
    ],
    selectedWork: [
        {
            id: 'heterogeneous-uav-framework',
            projectId: 'heterogeneous-uav-framework',
            problem: 'Coordinating autonomous UAVs with different capabilities requires shared control and communication.',
            role: 'Research Assistant, University of South Alabama',
            contribution: 'Engineered a distributed robotics framework integrating leader selection, formation control, sensor streams and multi-agent decision-making; validated the work through physical experiments.',
            imageAlt: 'Illustration of a yellow quadcopter viewed from the front.',
            evidence: [{ label: 'Resume: Research Assistant experience (PDF, page 1)', href: '/files/Kolitha_AI_Engineer.pdf#page=1' }]
        },
        {
            id: 'codex-autocomplete',
            projectId: 'codex-autocomplete',
            problem: 'Inline code completion needs context from the cursor and responsive handling of streamed suggestions.',
            role: 'Extension developer',
            contribution: 'Built a VS Code extension with cursor-aware completions, streaming responses, cancellation and authentication.',
            imageAlt: 'Glowing blue text cursor and blue and purple completion lines on a dark background.',
            evidence: [
                { label: 'Resume: Selected AI / ML Projects (PDF, page 2)', href: '/files/Kolitha_AI_Engineer.pdf#page=2' },
                { label: 'Project repository', href: 'https://github.com/kolithawarnakulasooriya/CODEX-Autocomplete' }
            ]
        },
        {
            id: 'mockable-express',
            projectId: 'mockable-express',
            problem: 'Developers need configurable mock services while building and testing applications.',
            role: 'Software developer',
            contribution: 'Developed an open-source in-memory mock API service to support testing and application development.',
            imageAlt: 'Mockable Express wordmark with large black M and pale purple E letters.',
            evidence: [
                { label: 'Resume: Software Engineer experience (PDF, page 2)', href: '/files/Kolitha_AI_Engineer.pdf#page=2' },
                { label: 'Project repository', href: 'https://github.com/kwar0715/mockableExpress' }
            ]
        }
    ],
    projects: [
        {
            id: 'cytokine-swarm',
            src: 'https://storage.googleapis.com/research_web_page/index.html',
            title: 'Cytokine Swarm',
            heading: 'An immune system for distributed AI swarms.',
            image: '/images/CytokineSwarm.png',
            status: 'Early-stage research program.'
        },
        {
            id: 'raven-os',
            src: 'https://raven-os-ai-os.github.io/Web/',
            title: 'Raven OS',
            heading: 'A community-driven, Debian-family Linux distribution being built for people who create intelligent machines.',
            image: '/images/raven-logo.png',
            status: 'Pre-alpha community project.'
        },
        {
            id: 'codex-autocomplete',
            src: 'https://github.com/kolithawarnakulasooriya/CODEX-Autocomplete',
            title: 'CODEX-Autocomplete',
            heading: 'A community VS Code extension that generates inline code suggestions with streaming responses and authentication.',
            image: '/images/autocomplete-codex-thumbnail.png',
            status: 'Public community extension; repository available.'
        },
        {
            id: 'swarmx',
            src: 'https://github.com/kolithawarnakulasooriya/SwarmX',
            title: 'SwarmX',
            heading: 'An open-source Java framework for swarm intelligence and optimization.',
            image: '/images/swarmx.png',
            status: 'Public open-source framework; current maintenance status unconfirmed.'
        },
        {
            id: 'heterogeneous-uav-framework',
            title: 'Heterogeneous UAV Framework',
            heading: 'ROS framework for adaptable control of heterogeneous UAS.',
            image: '/images/drone.png',
            status: 'Research framework; public release status unconfirmed.'
        },
        {
            id: 'sysco-shop',
            src: 'https://shop.sysco.com/',
            title: 'Sysco Shop',
            heading: 'Customer application associated with SyscoLabs Technologies.',
            image: '/images/syscoshop.png',
            status: 'Current project status unconfirmed.'
        },
        {
            id: 'mockable-express',
            src: 'https://github.com/kwar0715/mockableExpress',
            title: 'MockableExpress',
            heading: 'An open-source in-memory mock API management tool.',
            image: '/images/me.png',
            status: 'Public open-source project; current maintenance status unconfirmed.'
        },
        {
            id: 'minearc-service-app',
            src: 'https://minearc.com/serviceapp/',
            title: 'MineArc Service App',
            heading: 'Service application for MineArc Systems customers, associated with Techila Softwares.',
            image: '/images/minearc.jpeg',
            status: 'Current project status unconfirmed.'
        },
        {
            id: '4onse',
            src: 'https://4onse.org/',
            title: '4ONSE',
            heading: 'Non-conventional, sustainable climate monitoring system.',
            image: '/images/4onse.jpg',
            status: 'Current project status unconfirmed.'
        },
        {
            id: 'lis-middleware',
            title: 'LIS Middleware',
            heading: 'Communication middleware between LIS systems and Hitachi 911/912 and Mythic18/Mythic22 analyzers.',
            image: '/images/defproject.png',
            status: 'Current project status unconfirmed.'
        },
        {
            id: 'virtual-expo',
            src: 'https://www.linkedin.com/in/kolitha-warnakulasooriya/details/projects/',
            title: 'Virtual Expo',
            heading: 'Virtual exhibition experience.',
            image: '/images/defproject.png',
            status: 'Current project status unconfirmed.'
        }
    ],
    research: "https://kolitha-warnakulasooriya.kwarnakulasooriya.chatgpt.site"
}
