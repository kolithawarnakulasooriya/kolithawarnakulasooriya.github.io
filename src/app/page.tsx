"use client";
import React from 'react';
import { Flex, Avatar, Heading, Button } from '@/once-ui/components';
import { InfoBox } from '@/components/infobox';
import { Configs } from './config';
import styles from './page.module.scss';

export default function Home() {
    return (
        <section className={styles.hero} aria-label="Introduction">
            <Heading as="h1" className="visually-hidden">Kolitha Warnakulasooriya</Heading>
            <Avatar className={styles.portrait} size="xl" src="/images/avatar.jpg" alt="Kolitha Warnakulasooriya" priority sizes="(max-width: 440px) 75vw, 330px" />
            <div className={styles.identity}>
                <InfoBox text="I am a," fontSize={30} />
                <div className={styles.lines}>
                    <InfoBox text="Curious Scientist" fontSize={40} />
                    <InfoBox text="Motivated Researcher" fontSize={40} />
                    <InfoBox text="Results Driven Software Engineer" fontSize={40} />
                    <InfoBox text="AI & Robotics Lover" fontSize={40} />
                </div>
                <Flex className={styles.actions} gap="12">
                    <Button variant="tertiary" href={Configs.resume}>Download CV (PDF)</Button>
                    <Button variant="tertiary" href={Configs.research} target="_blank" rel="noopener noreferrer" suffixIcon="arrowUpRight" aria-label="Research (external site, opens in a new tab)">Research</Button>
                    <Button variant="tertiary" href="mailto:kolitha.warnakulasooriya@outlook.com">Contact</Button>
                </Flex>
            </div>
        </section>
    );
}
