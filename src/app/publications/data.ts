export interface Publication {
    id: string;
    href?: string;
    title: string;
    authors: string[];
    venue: string;
    year?: number;
    kind?: 'journal' | 'conference' | 'workshop' | 'report';
    verification: {
        state: 'verified' | 'partial' | 'unverified';
        sources: string[];
        checkedAt: string;
        note?: string;
    };
}

const checkedAt = '2026-11-01';
const workshopProgram = 'https://idm-lab.org/wiki/AAAI23-MAPF/index.php/Main/HomePage';
const workshopPaper = `${workshopProgram}?action=download&upname=Paper_7.pdf`;
const novelManuscript = 'https://www.researchgate.net/profile/Kolitha-Warnakulasooriya/publication/324792598_A_Novel_Approach_of_Color_Detection_Technique_for_the_Enhancement_of_Robotic_Navigation/links/5ae288380f7e9b28594a2c1a/A-Novel-Approach-of-Color-Detection-Technique-for-the-Enhancement-of-Robotic-Navigation.pdf';

// Verified refers to core citation/destination identity, not guaranteed landing-page access.
function verifiedDOI(doi: string, note?: string, sources: string[] = []): Publication['verification'] {
    return {
        state: 'verified',
        sources: [`https://api.crossref.org/works/${doi}`, ...sources],
        checkedAt,
        ...(note ? { note } : {}),
    };
}

// Published spelling and initials follow the primary citation/byline, including variants.
// Source details and unresolved proceedings checks: docs/C01-C08-publication-sources.md.
export const publications: Publication[] = [
    {
        id: 'cooperative-optimized-leader-selection',
        href: 'https://arc.aiaa.org/doi/abs/10.2514/6.2026-1996',
        title: 'Cooperative Optimized Leader Selection in Large UAV Swarms by Maximizing the Average Controllability in a Hierarchical Control Structure',
        authors: ['Kolitha Warnakulasooriya', 'Hakki Erhan Sevil', 'Aviv Segev'],
        venue: 'AIAA SCITECH 2026 Forum',
        year: 2026,
        kind: 'conference',
        verification: verifiedDOI('10.2514/6.2026-1996'),
    },
    {
        id: 'comparative-swarm-intelligence-algorithms',
        href: 'https://doi.org/10.1007/s12065-024-00997-6',
        title: 'Comparative analysis of accuracy and computational complexity across 21 swarm intelligence algorithms',
        authors: ['Kolitha Warnakulasooriya', 'Aviv Segev'],
        venue: 'Evolutionary Intelligence',
        year: 2025,
        kind: 'journal',
        verification: verifiedDOI('10.1007/s12065-024-00997-6',
            'Citation year follows the publisher’s 2025 volume citation; first published online on 5 December 2024.',
            ['https://link.springer.com/article/10.1007/s12065-024-00997-6']),
    },
    {
        id: 'embodied-conversation-telehealth',
        href: 'https://doi.org/10.1109/BigData62323.2024.10824996',
        title: 'Exploring an Embodied Conversation Agent to Act as an Empathetic Doctor for use in Telehealth',
        authors: ['William Starling', 'Kolitha Warnakulasooriya', 'Aviv Segev'],
        venue: '2024 IEEE International Conference on Big Data (BigData)',
        year: 2024,
        kind: 'conference',
        verification: verifiedDOI('10.1109/BigData62323.2024.10824996'),
    },
    {
        id: 'commercial-drone-security-review',
        href: 'https://ieeexplore.ieee.org/abstract/document/10543316',
        title: 'Attacks, Detection, and Prevention on Commercial Drones: A Review',
        authors: ['Kolitha Warnakulasooriya', 'Aviv Segev'],
        venue: '2024 International Conference on Image Processing and Robotics (ICIPRoB)',
        year: 2024,
        kind: 'conference',
        verification: verifiedDOI('10.1109/iciprob62548.2024.10543316'),
    },
    {
        id: 'priority-basis-drone-task-allocation',
        href: workshopPaper,
        title: 'Priority Basis Task Allocation for Drone Swarms',
        authors: ['Kolitha Warnakulasooriya', 'Ryan G Benton', 'Aviv Segev'],
        venue: 'Workshop on Multi-Agent Path Finding (WOMAPF), held with AAAI 2023',
        year: 2023,
        kind: 'workshop',
        verification: {
            state: 'verified',
            sources: [workshopPaper, workshopProgram,
                'https://schoolofcomputing.southalabama.edu/~segev/publications/2023_AAAI_Priority_Basis_Task_Allocation.pdf'],
            checkedAt,
            note: 'Author order follows the paper byline; the workshop schedule lists the same authors in a different order. This is a workshop contribution, not an AAAI main-conference paper.',
        },
    },
    {
        id: 'iot-greenhouse-climate-monitoring',
        href: 'https://ieeexplore.ieee.org/abstract/document/8519997',
        title: 'Low Cost and IoT Based Greenhouse with Climate Monitoring and Controlling System for Tropical Countries',
        authors: ['Yasas Pansilu Jayasuriya', 'Chanuka Sandaru Elvitigala', 'Kolitha Wamakulasooriya', 'BH Sudantha'],
        venue: '2018 International Conference on System Science and Engineering (ICSSE)',
        year: 2018,
        kind: 'conference',
        verification: verifiedDOI('10.1109/icsse.2018.8519997',
            'The author spelling “Wamakulasooriya” is preserved from the publisher-deposited citation.'),
    },
    {
        id: 'portable-iot-weather-station',
        href: 'https://ieeexplore.ieee.org/abstract/document/8520238',
        title: 'Generic IoT Framework for Environmental Sensing Researches: Portable IoT Enabled Weather Station',
        authors: ['Kolitha Warnakulasooriya', 'Yasas Pansilu Jayasuriya', 'BH Sudantha'],
        venue: '2018 International Conference on System Science and Engineering (ICSSE)',
        year: 2018,
        kind: 'conference',
        verification: verifiedDOI('10.1109/icsse.2018.8520238'),
    },
    {
        id: 'open-source-environmental-monitoring-system',
        href: 'https://doi.org/10.4038/bhumi.v6i1.36',
        title: 'Open-Source Implementation of an Integrated, Low-Cost Environmental Monitoring System (EMS) for developing countries',
        authors: ['B. H. Sudantha', 'K. M. H. K. Warnakulasooriya', 'Y. P. Jayasuriya', 'G. R. Ratnayaka',
            'P. K. S. Mahanama', 'E. J. Warusavitharana', 'S. N. Weerasinghe'],
        venue: 'Bhumi, The Planning Research Journal',
        year: 2018,
        kind: 'journal',
        verification: verifiedDOI('10.4038/bhumi.v6i1.36'),
    },
    {
        id: 'iot-gesture-recognition',
        href: 'https://ieeexplore.ieee.org/abstract/document/8520044',
        title: 'IoT Empowered Gesture Recognition System for Life Style Enhancement of Differently Abled People',
        authors: ['Kolitha Warnakulasooriya', 'Chinthaka Premachandra', 'BH Sudantha', 'Sagara Sumathipala'],
        venue: '2018 International Conference on System Science and Engineering (ICSSE)',
        year: 2018,
        kind: 'conference',
        verification: verifiedDOI('10.1109/icsse.2018.8520044'),
    },
    {
        id: 'sensory-food-evaluation-brain-waves',
        href: 'https://ieeexplore.ieee.org/abstract/document/9367340',
        title: 'Sensory Evaluation of Foods using Modern AI Techniques and Brain Wave Analysis',
        authors: ['KMHK Warnakulasooriya', 'JDSACS Bandara', 'BH Sudantha'],
        venue: '2020 International Conference on Image Processing and Robotics (ICIP)',
        year: 2020,
        kind: 'conference',
        verification: verifiedDOI('10.1109/icip48927.2020.9367340'),
    },
    {
        id: 'color-mask-indoor-navigation',
        href: 'https://ieeexplore.ieee.org/abstract/document/8736147',
        title: 'A Color Mask and Trained Image Set for the Creation of New Technique for Indoor Robotic Navigation',
        authors: ['KMHK Warnakulasooriya', 'BH Sudantha', 'C Premachandra'],
        venue: '2018 3rd International Conference on Information Technology Research (ICITR)',
        year: 2018,
        kind: 'conference',
        verification: verifiedDOI('10.1109/icitr.2018.8736147'),
    },
    {
        id: 'adaptive-mobile-track-robot-navigation',
        href: 'https://ieeexplore.ieee.org/abstract/document/8023304',
        title: 'Adaptive navigation and motion planning for a mobile track robot',
        authors: ['B H Sudantha', 'K A S N Sumathipala', 'C Premachandra', 'K M H K Warnakulasooriya',
            'C S Elvitigala', 'Y P Jayasuriya'],
        venue: '2017 Joint 17th World Congress of International Fuzzy Systems Association and 9th International Conference on Soft Computing and Intelligent Systems (IFSA-SCIS)',
        year: 2017,
        kind: 'conference',
        verification: verifiedDOI('10.1109/ifsa-scis.2017.8023304'),
    },
    {
        id: '4onse-open-environmental-monitoring',
        href: 'https://uom.lk/staff/Warusavitharana.EJ',
        title: '4ONSE – 4 times Open and Non-conventional technology for Sensing the Environment: An integrated low cost Environmental Monitoring System (EMS) for Developing Countries',
        authors: ['R. Ratnayake', 'P. K. S. Mahanama', 'E. J. Warusavitharana', 'S. N. Weerasinghe',
            'K. M. H. K. Warnakulasooriya', 'B. H. Sudantha', 'Y. P. Jayasuriya'],
        venue: '2nd International Conference on Information Technology Research (ICITR), University of Moratuwa',
        year: 2017,
        kind: 'conference',
        verification: {
            state: 'partial',
            sources: ['https://uom.lk/staff/Warusavitharana.EJ', 'https://lms.uom.lk/mis_staff_attach/14472_CV.pdf'],
            checkedAt,
            note: 'Two university-hosted coauthor records support this 2017 conference citation. Original proceedings and the exact published byline remain unverified. Retained separately from the 2018 Bhumi journal article; excluded from verified-publication counts.',
        },
    },
    {
        id: 'novel-color-detection-robotic-navigation',
        href: novelManuscript,
        title: 'A Novel Approach of Color Detection Technique for the Enhancement of Robotic Navigation',
        authors: ['K.M.H.K. Warnakulasooriya', 'B.H. Sudantha', 'K.A.S.N. Sumathipala'],
        venue: '18th International Symposium on Advanced Intelligent Systems (ISIS2017)',
        year: 2017,
        kind: 'conference',
        verification: {
            state: 'partial',
            sources: [novelManuscript, 'https://uom.lk/staff/Sumathipala.KASN.php'],
            checkedAt,
            note: 'Author manuscript confirms title and byline; a university-hosted coauthor record identifies ISIS2017. Original proceedings remain unverified. The 2018 repository upload date is not used as the publication year; excluded from verified-publication counts.',
        },
    },
];
