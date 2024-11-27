"use client";

import React from 'react';

import { Text, Flex, Avatar, Button, RevealFx, LetterFx } from '@/once-ui/components';
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
			<Flex>
				<RevealFx
					speed="medium"
					delay={0}
					translateY={0}
				>
					<span
						style={{
							fontFamily: 'var(--font-family-code)'
						}}
					>
						<LetterFx
							speed="medium"
							trigger="instant"
							charset={[
								'X',
								'@',
								'$',
								'a',
								'H',
								'z',
								'o',
								'0',
								'y',
								'#',
								'?',
								'*',
								'0',
								'1',
								'+'
							]}
						>
							Spice up your landing page with special effects
						</LetterFx>
					</span>
				</RevealFx>
				<RevealFx
					speed="medium"
					delay={1}
					translateY={0}
				>
					<Flex
						direction="column"
						padding="24"
						gap="8"
					>
						<Text variant="heading-strong-m">
							Special effects in v0.3.1
						</Text>
						<Text
							onBackground="neutral-medium"
							marginBottom="16"
						>
							Great news. Been waiting for this!
						</Text>
						<Button size="s">
							Awesome!
						</Button>
					</Flex>
				</RevealFx>
			</Flex>
		</Flex>
	);
}
