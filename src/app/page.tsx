"use client";

import React, { useEffect, useState } from 'react';

import { Flex, Avatar, Toaster } from '@/once-ui/components';
import Link from 'next/link';
import { InfoBox } from '@/components/infobox';

export default function Home() {

	const [data, setdata] = useState([])

	useEffect(() => {
		const data = {
			id: '11',
			message: 'Haven\'t you found my resume yet?',
			variant: 'success',
			href: '/files/resume.pdf',
			hrefText: "Download!",
			icon: false
		}
		setTimeout(() => {
			setdata(Object.assign([], [data]))
		}, 1000);
	}, [])

	return (
		<Flex
			position="relative"
			fillWidth
			fillHeight
		>
			<Toaster
				toasts={data}
				removeToast={() => { }}
			/>
			<Flex
				fillHeight
				alignItems='center'
				marginLeft='160'
			>
				<Avatar
					style={{
						width: 330,
						height: 330,
						marginBottom: 60
					}}
					size="xl"
					src="/images/avatar.jpg"
				/>
			</Flex>
			<Flex
				direction='column'
				fillHeight
				justifyContent='center'
				paddingBottom='128'
			>
				<InfoBox text='I am a,' fontSize={30} />
				<Flex
					direction='column'
					justifyContent='flex-start'
					paddingLeft='32'
				>
					<InfoBox text='Software Engineer' fontSize={40} />
					<InfoBox text='Full-Stack Software Developer' fontSize={40} />
					<InfoBox text='Robotics & AI Researcher' fontSize={40} />
				</Flex>
			</Flex>
		</Flex>
	);
}
