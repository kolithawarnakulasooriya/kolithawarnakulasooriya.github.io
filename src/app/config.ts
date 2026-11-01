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
    src: string,
    title: string,
    heading: string,
    image: string
}
export interface SelectedWorkObject {
    id: string
    title: string
    projectTitle: string
    problem: string
    role: string
    contribution: string
    status: string
    image: string
    imageAlt: string
    href?: string
    evidence: Array<{ label: string; href: string }>
}
export interface ConfigProps {
    summary: string,
    name: string,
    resume: string,
    skills: Array<SkillCategory>,
    experiance: Array<ExperianceItem>,
    education: Array<EducationItem>,
    publications: Array<PublicationObject>,
    projects: Array<Array<ProjectObject>>,
    selectedWork: Array<SelectedWorkObject>,
    gallery: Array<Array<string>>,
    blog: Array<string>,
    research: string
}


export const Configs: ConfigProps = {
    summary: "As a professional software engineer and doctoral candidate in artificial intelligence, I am driven by the intersection of advanced algorithms, machine learning, deep learning, and collective intelligence. Over the past 3+ years, I have mastered my technical skills in cutting-edge frameworks such as Pytorch in artificial intelligence technologies. I have developed cutting-edge solutions to complex challenges, from designing intelligent aerial robotic systems to implementing scalable software architectures that enable innovation. My doctoral research focused on solving the distributed leader selection problem in large-scale heterogeneous multi-UAV systems based on the collective behavior of biological entities, which proactively support the aerial robotics industry. This led to six first-authored articles published in AAAI and Evolutionary Intelligence and an open-source framework in swarm intelligence for Java developers. Outside, I have enjoyed my time with the SAE team by developing the Formula 1 automotive for the SAE formula competitions.As a Software Engineer with 3.5+ years of experience, I am passionate about designing and delivering robust, scalable, and innovative software solutions that empower businesses to thrive in a fast-paced, tech-driven world. My expertise spans React and React Native, Javascript, and Typescript frameworks with Node JS and Java Springboot back-end from 3-tier to microservices architectures. Further, my technical skills include SQL NoSQL, memory, time series databases, and AWS and Azure cloud services. As an excellent team player and manager, I championed agile development practices to improve team efficiency, product quality, and timely deliverables. Outside of techs, I am an intense knowledge seeker in techs and finance, spirituality, nature, and science. Socrates once said, \"The only true wisdom is knowing you know nothing\". Besides that, I am a tennis player and mostly workout every day. I like long-distance driving, enjoying the company of friends, and being pleasant to everybody.",
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
                "Conducting research related to intelligent UAV systems, safety measurements from a UAV threat, and teaching related to computer engineering subjects. Collaborating with research teams from other faculties.",
                "Teaching, Digital Computer Architecture, Digital Logic Design, Introduction to Robotics, Microprocessor System Interfacing.",
            ]
        },
        {
            src: "/images/usa.png",
            title: "Graduate Research Assistant",
            company: "School of Computing, University of South Alabama, United States",
            duration: "Jan 2022 – May 2025",
            items: [
                "Pursue research to introduce a dynamic leader election algorithm for an autonomous aerial vehicle system based on cognitive intelligence.",
                "Published three research articles in top-ranked artificial intelligence conferences and journals (AAAI-2023, ICIPRoB, Evolutionary Intelligence)",
                "Engaged as a lead researcher in Drone Systems and AI Laboratory by leading and administrating three core UAV-related research and developed a ROS-based adaptable Python flight framework to operate heterogeneous commercial UAVs such as Tello, Anafi, and Bebop, which can handle a maximum of 15 agents in the cluster."

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
            title: "Associate Software Engineer (Intern)",
            company: "99X Technology, Colombo, Sri Lanka",
            duration: "Dec 2016 - Jul 2017",
            items: [
                "Modified, implemented, tested, and deployed  ASP.net booking web application "
            ]
        },
        {
            src: "/images/4onse.jpg",
            title: "Volunteer Research Assistant",
            company: "University of Moratuwa, Colombo, Sri Lanka",
            duration: "Dec 2016 - Jul 2017",
            items: [
                "Modified, implemented, tested, and deployed  ASP.net booking web application "
            ]
        }
    ],
    education: [
        {
            src: "/images/usa.png",
            title: "PhD in Computing",
            subtitle: "Cooperative Intelligence in Robotics",
            institute: "School of Computing, University of South Alabama, United States",
            duration: "2025 May",
        },
        {
            src: "/images/uom.jpg",
            title: "B.sc (hons) in Information Technology",
            subtitle: "3.55 Second Upper Devision, Dean's List (Senior Year)",
            institute: "University of Moratuwa",
            duration: "2018 Jul",
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
            title: 'Heterogeneous UAV Framework',
            projectTitle: 'Multi-Het UAV Library',
            problem: 'Coordinating autonomous UAVs with different capabilities requires shared control and communication.',
            role: 'Research Assistant, University of South Alabama',
            contribution: 'Engineered a distributed robotics framework integrating leader selection, formation control, sensor streams and multi-agent decision-making; validated the work through physical experiments.',
            status: 'Research framework; public release status unconfirmed.',
            image: '/images/drone.png',
            imageAlt: 'Illustration of a yellow quadcopter viewed from the front.',
            evidence: [{ label: 'Resume: Research Assistant experience (PDF, page 1)', href: '/files/Kolitha_AI_Engineer.pdf#page=1' }]
        },
        {
            id: 'codex-autocomplete',
            title: 'CODEX-Autocomplete',
            projectTitle: 'Codex AutoComplete VSCode Plugin',
            problem: 'Inline code completion needs context from the cursor and responsive handling of streamed suggestions.',
            role: 'Extension developer',
            contribution: 'Built a VS Code extension with cursor-aware completions, streaming responses, cancellation and authentication.',
            status: 'Public community extension; repository available.',
            image: '/images/autocomplete-codex-thumbnail.png',
            imageAlt: 'Glowing blue text cursor and blue and purple completion lines on a dark background.',
            href: 'https://github.com/kolithawarnakulasooriya/CODEX-Autocomplete',
            evidence: [
                { label: 'Resume: Selected AI / ML Projects (PDF, page 2)', href: '/files/Kolitha_AI_Engineer.pdf#page=2' },
                { label: 'Project repository', href: 'https://github.com/kolithawarnakulasooriya/CODEX-Autocomplete' }
            ]
        },
        {
            id: 'mockable-express',
            title: 'MockableExpress',
            projectTitle: 'MockableExpress',
            problem: 'Developers need configurable mock services while building and testing applications.',
            role: 'Software developer',
            contribution: 'Developed an open-source in-memory mock API service to support testing and application development.',
            status: 'Public open-source project; current maintenance status unconfirmed.',
            image: '/images/me.png',
            imageAlt: 'Mockable Express wordmark with large black M and pale purple E letters.',
            href: 'https://github.com/kwar0715/mockableExpress',
            evidence: [
                { label: 'Resume: Software Engineer experience (PDF, page 2)', href: '/files/Kolitha_AI_Engineer.pdf#page=2' },
                { label: 'Project repository', href: 'https://github.com/kwar0715/mockableExpress' }
            ]
        }
    ],
    projects: [
        [
            {
                src: 'https://storage.googleapis.com/research_web_page/index.html',
                title: 'Cytokine Swarm',
                heading: 'An immune system for distributed ai swarms',
                image: '/images/CytokineSwarm.png',
            },
            {
                src: 'https://raven-os-ai-os.github.io/Web/',
                title: 'Ravan OS',
                heading: 'Raven OS is a community-driven, Debian-family Linux distribution being built for people who create intelligent machines.',
                image: '/images/raven-logo.png',
            },
            {
                src: 'https://github.com/kolithawarnakulasooriya/CODEX-Autocomplete',
                title: 'Codex AutoComplete VSCode Plugin',
                heading: 'Complete VS Code extension that generates inline code suggestions as ghost text. It signs in with your ChatGPT account through the Codex OAuth PKCE flow by default, with OpenAI API-key authentication available as a fallback.',
                image: '/images/autocomplete-codex-thumbnail.png',
            },
            {
                src: 'https://github.com/kolithawarnakulasooriya/SwarmX',
                title: 'Swarm X',
                heading: 'SwarmX is the java based natural inspired optimization library.',
                image: '/images/swarmx.png',
            } 
        ],
        [
            {
                src: '',
                title: 'Multi-Het UAV Library',
                heading: 'ROS framework for adaptable control of heterogenious UAS',
                image: '/images/drone.png',
            },
             {
                src: "https://shop.sysco.com/",
                title: "Sysco Shop",
                heading: "The CRM tool for the Sysco customers, Associated with SyscoLabs Technologies",
                image: "/images/syscoshop.png"
            },
            {
                src: "https://github.com/kwar0715/mockableExpress",
                title: "MockableExpress",
                heading: "An open source inmemory mock api management tool",
                image: "/images/me.png"
            },
            {
                src: "https://minearc.com/serviceapp/",
                title: "MineArc Service App",
                heading: "Service Application for MineArc Systems Customers, Associated with Techila Softwares",
                image: "/images/minearc.jpeg"
            }
        ],
        [
            {
                src: "https://4onse.org/",
                title: "4ONSE",
                heading: "Developing non-conventional, sustainable and effective climate monitoring system",
                image: "/images/4onse.jpg"
            },
            {
                src: "",
                title: "LIS Middleware",
                heading: "Developed a cooperative communication middleware between Hitachi 911, 912 and LIS systems",
                image: "/images/defproject.png"
            },
            {
                src: "",
                title: "LIS Middleware",
                heading: "Developed a cooperative communication middleware between Mythic18, Mythic22 and LIS systems",
                image: "/images/defproject.png"
            },
            {
                src: "https://www.linkedin.com/in/kolitha-warnakulasooriya/details/projects/",
                title: "Virtual Expo",
                heading: "Virtual Exhibition is giving a marvelous experience rather than traditional exhibition experiance",
                image: "/images/defproject.png"
            }
        ]
    ],
    gallery: [
        [
            "p44.jpg",
            "p55.jpg",
            "p1.jpeg",
        ],
        [
            "c1.jpg",
            "p33.jpg",
            "p7.jpeg",
        ],
        [
            "p2.jpeg",
            "t112.jpeg",
            "p5.jpeg",
        ],
        [
            "vexpo.jpeg",
            "sci112.jpeg",
            "cc2.jpeg"
        ],
        [
            "graduation.jpeg",
            "p11.JPG",
            "p22.JPG",
        ]
    ],
    blog: [
            "https://www.linkedin.com/embed/feed/update/urn:li:share:7316119386677805060?collapsed=1",
            "https://www.youtube.com/embed/43GgyUBhTDU?si=dG2Z-QBSYrQIiDmu&amp;controls=0",
            "https://raven-os-ai-os.github.io/Web/",
            "https://storage.googleapis.com/research_web_page/index.html"
    ],
    research: "https://kolitha-warnakulasooriya.kwarnakulasooriya.chatgpt.site"
}
