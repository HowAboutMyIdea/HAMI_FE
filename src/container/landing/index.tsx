"use client";

import * as S from './style';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Landing() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/main');
        }, 3000);

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <S.Contaienr onClick={() => router.push('/main')}>
            <S.TextGroup>
                <S.Title>당신의 아이디어를</S.Title>
                <S.Title>시험해보세요</S.Title>
                <S.SubTitle>화면을 누르면 이동합니다</S.SubTitle>
            </S.TextGroup>
        </S.Contaienr>
    );
}