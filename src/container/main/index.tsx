"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as S from './style';

export default function Main() {
    const router = useRouter();
    const [idea, setIdea] = useState('');

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.push('/result');
        }
    };

    return (
        <S.Container>
            <S.TextGroup>
                <S.Title>아이디어를 적어보세요</S.Title>
                <S.SubTitle
                    placeholder="아이디어를 적은 후 Enter를 눌러주세요"
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
            </S.TextGroup>
        </S.Container>
    );
}