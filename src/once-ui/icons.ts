import { IconType } from 'react-icons';

import {
	HiChevronUp,
	HiChevronDown,
	HiChevronRight,
	HiChevronLeft,
	HiOutlineArrowPath,
	HiCheck,
	HiMiniQuestionMarkCircle,
	HiMiniMinus,
	HiMiniPlus,
	HiMiniUser,
	HiMiniXMark,
	HiEyeDropper,
	HiOutlineLink,
	HiExclamationTriangle,
	HiArrowUpRight,
	HiInformationCircle,
	HiExclamationCircle,
	HiCheckCircle,
} from "react-icons/hi2";

import {
	FaDiscord,
	FaGithub,
	FaLinkedin,
	FaGoogleScholar,
	FaMedium,
	FaResearchgate,
	FaOrcid
} from "react-icons/fa6";

import { MdOutlineWork } from "react-icons/md";

export const iconLibrary: Record<string, IconType> = {
	chevronUp: HiChevronUp,
    chevronDown: HiChevronDown,
	chevronRight: HiChevronRight,
	chevronLeft: HiChevronLeft,
	refresh: HiOutlineArrowPath,
	check: HiCheck,
	helpCircle: HiMiniQuestionMarkCircle,
	infoCircle: HiInformationCircle,
	warningTriangle: HiExclamationTriangle,
	errorCircle: HiExclamationCircle,
	checkCircle: HiCheckCircle,
	eyeDropper: HiEyeDropper,
	person: HiMiniUser,
	close: HiMiniXMark,
	openLink: HiOutlineLink,
	discord: FaDiscord,
	github: FaGithub,
	arrowUpRight: HiArrowUpRight,
	minus: HiMiniMinus,
	plus: HiMiniPlus,
	linkedin: FaLinkedin,
	googlescholar: FaGoogleScholar,
	medium:FaMedium,
	researchgate: FaResearchgate,
	orcid:FaOrcid,
	work: MdOutlineWork
};