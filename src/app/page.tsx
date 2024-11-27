"use client";

import React from 'react';

import { Heading, Text, Flex, Avatar, Button, Grid, Icon, InlineCode, Logo, LetterFx, Arrow } from '@/once-ui/components';
import Link from 'next/link';

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
		</Flex>
	);
}
