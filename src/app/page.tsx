import React from 'react';
import { Flex, Avatar } from '@/once-ui/components';
import { InfoBox } from '@/components/infobox';

export default function Home() {

	return (
		<Flex
			position="relative"
			fillWidth
			fillHeight
		>
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
