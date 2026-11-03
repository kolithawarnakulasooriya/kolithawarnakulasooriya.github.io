import "@/once-ui/styles/index.scss";
import "@/once-ui/tokens/index.scss";

import classNames from 'classnames';

import { style } from "@/once-ui/resources/config"
import { rootMetadata, personSchema } from '@/app/site';

import { Background } from '@/once-ui/components'
import { Header } from "@/components/header";
import GoogleAnalytics from '@/components/GoogleAnalytics';

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

export const metadata = rootMetadata;

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) 
{
	return (
		<>
		<html lang="en"
			data-neutral={style.neutral} data-brand={style.brand} data-accent={style.accent}
			data-border={style.border} data-theme={style.theme}
			data-solid={style.solid} data-solid-style={style.solidStyle}
			data-surface={style.surface} data-transition={style.transition}
			data-scaling={style.scaling}
			className={classNames(
				primary.variable, code.variable, 'site-document',
				secondary ? secondary.variable : '',
				tertiary ? tertiary.variable : ''
			)}>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema).replace(/</g, '\\u003c') }}
				/>
				<meta name="google-site-verification" content="IqZCUyLl-_LBpJpigQ52Uji9R7P6Z-ABkO-T6mlOzmI" />

			</head>
			<body className="site-body">
				<GoogleAnalytics />
				<Background
					style={{ zIndex: '-1' }}
					position="fixed"
					mask="cursor"
					gradient={{ display: true, opacity: 0.15 }}
					/>
				<div className="site-shell">
					<a href="#main-content" className="skip-link">Skip to main content</a>
					<Header/>
					<main id="main-content" tabIndex={-1} className="site-main">{children}</main>
					<Footer/>
				</div>
			</body>
		</html>
		</>
	);
}
