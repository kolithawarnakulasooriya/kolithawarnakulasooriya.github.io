import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { baseURL, style, schema, social } from "@/once-ui/resources/config"

import { Background, Flex } from '@/once-ui/components'
import { Header } from "@/components/header";

import { Inter } from 'next/font/google'
import { Roboto_Mono } from 'next/font/google';
import { Footer } from "@/components/footer";

const primary = Inter({
	variable: '--font-primary',
	subsets: ['latin'],
	display: 'swap',
})

const code = Roboto_Mono({
	variable: '--font-code',
	subsets: ['latin'],
	display: 'swap',
});

type FontConfig = {
	variable: string;
};

/*
	Replace with code for secondary and tertiary fonts
	from https://once-ui.com/customize
*/
const secondary: FontConfig | undefined = undefined;
const tertiary: FontConfig | undefined = undefined;
/*
*/

const schemaData = {
	"@context": "https://schema.org",
	"@type": schema.type,
	"url": "https://" + baseURL,
	"logo": schema.logo,
	"name": schema.name,
	"description": schema.description,
	"email": schema.email,
	"sameAs": Object.values(social).filter(Boolean)
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) 
{
	return (
		<>
		<Flex as="html" lang="en"
			fillHeight background="page"
			data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
			data-border={style.border} data-theme={style.theme}
			data-solid={style.solid} data-solid-style={style.solidStyle}
			data-surface={style.surface} data-transition={style.transition}
			data-scaling={style.scaling}
			className={classNames(
				primary.variable, code.variable,
				secondary ? secondary.variable : '',
				tertiary ? tertiary.variable : ''
			)}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
				/>
				<meta name="google-site-verification" content="IqZCUyLl-_LBpJpigQ52Uji9R7P6Z-ABkO-T6mlOzmI" />
				<meta name="title" content="https://kolithawarnakulasooriya.github.io/"/>
				<meta name="description" content="Kolitha warnakulasooriya, PhD, s personal web site"/>
				<meta name="keywords" content="kolitha warnakulasooriya,kolitha@warnakulasooriya.outlook.com,kolitha,warnakulasooriya,multi-robot systems,swarm intelligence,drone systems,UAV,artificial intelligence,intelligence robotics"/>
				<meta name="robots" content="index, follow"/>
				<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
				<meta name="language" content="English"/>
				<meta name="author" content="Kolitha Warnakulasooriya"/>

			</head>
			<Flex as="body" fillWidth fillHeight margin="0" padding="0">
				<Background
					style={{ zIndex: '-1' }}
					position="fixed"
					mask="cursor"
					/>
				<Flex flex={1} direction="column">
					<Header/>
					{children}
					<Footer/>
				</Flex>
			</Flex>
		</Flex>
		</>
	);
}
