"use client";
import React, { useEffect, useState } from 'react';
import { Flex, Avatar, Toaster } from '@/once-ui/components';
import { InfoBox } from '@/components/infobox';
import { Configs } from './config';

export default function Home() {

	const [data, setdata] = useState([])

	useEffect(() => {
		const data = {
			id: Date.now().valueOf(),
			message: 'Haven\'t you found my resume yet?',
			variant: 'success',
			href: Configs.resume,
			hrefText: "Download!",
			icon: false,
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
				removeToast={() => {
					setdata([])
				}}
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
					<InfoBox text='Curious Scientist' fontSize={40} />
					<InfoBox text='Motivated Researcher' fontSize={40} />
					<InfoBox text='Result Driven Software Engineer' fontSize={40} />
					<InfoBox text='AI & Robotics Lover' fontSize={40} />
				</Flex>
			</Flex>
		</Flex>
	);
}
