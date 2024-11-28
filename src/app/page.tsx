import React from 'react';
import { Flex, Avatar } from '@/once-ui/components';

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
				
			</Flex>
		</Flex>
	);
}
