'use client'

import React, {useState, useEffect} from 'react';
import { createPortal } from 'react-dom';
import { Flex, Toast } from '.';
import styles from './Toaster.module.scss';

interface ToasterProps {
    toasts: { 
        id: string; 
        variant: 'success' | 'danger'; 
        message: string; 
        action?: React.ReactNode;
        href: string | undefined;
        hrefText: string | undefined;
        icon?:boolean;
    }[];
    removeToast: (id: string) => void;
}

const Toaster: React.FC<ToasterProps> = ({
    toasts,
    removeToast }) => {

    const [documentMouned, setDocumentMounted] = useState(false);

    useEffect(() => {
        setDocumentMounted(true)
     }, []);

    if(documentMouned){
        return createPortal(
            <Flex
                zIndex={11}
                fillWidth
                direction="column"
                maxWidth={32}
                className={styles.toastContainer}>
                {toasts.map((toast, index, array) => (
                    <Flex
                        padding="4"
                        fillWidth
                        position="absolute"
                        key={toast.id}
                        className={styles.toastWrapper}
                        style={{
                            transformOrigin: 'bottom center',
                            transform: `scale(${1 - (array.length - 1 - index) * 0.05}) translateY(${1 - (array.length - 1 - index) * 10}%)`,
                            opacity: array.length - 1 - index === 0 ? 1 : 0.9
                        }}>
                        <Toast
                            className={styles.toastAnimation}
                            variant={toast.variant}
                            onClose={() => removeToast(toast.id)}
                            action={toast.action}
                            href={toast.href}
                            hrefText={toast.hrefText}
                            icon={toast.icon}
                            >
                            {toast.message}
                        </Toast>
                    </Flex>
                ))}
            </Flex>,
            document.body
        );
    }else{
        return <></>
    }
};

Toaster.displayName = 'Toaster';

export { Toaster };