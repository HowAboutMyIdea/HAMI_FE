"use client";

import { useRouter } from 'next/navigation';
import * as S from './style';
import { useIdeaResult } from '@/hooks/result';

export default function Result() {
    const router = useRouter();
    const { originalIdea, mainSubject, keywords, summary, feedback } = useIdeaResult();

    const copyAnalysis = async () => {
        const parts = [
            originalIdea ? `아이디어:\n${originalIdea}\n` : '',
            mainSubject ? `핵심 주제: ${mainSubject}\n` : '',
            keywords ? `키워드: ${keywords.join(', ')}\n` : '',
            summary ? `요약:\n${summary}\n` : '',
            feedback ? `피드백:\n${feedback}\n` : ''
        ];

        const text = parts.filter(Boolean).join('\n');
        if (!text) return;
        await navigator.clipboard.writeText(text);
    };

    return (
        <S.Container>
            <S.Wrapper>
                <S.Title>아이디어 분석 결과</S.Title>
                <S.TextGroup>
                    <S.SubTitle>원문 아이디어</S.SubTitle>
                    <S.Value>{originalIdea ?? <em>없음</em>}</S.Value>
                </S.TextGroup>
                <S.TextGroup>
                    <S.SubTitle>핵심 주제</S.SubTitle>
                    <S.Value>{mainSubject ?? <em>없음</em>}</S.Value>
                </S.TextGroup>
                <S.TextGroup>
                    <S.SubTitle>키워드</S.SubTitle>
                    <S.Value>
                        {keywords && keywords.length > 0
                            ? keywords.join(', ')
                            : <em>없음</em>}
                    </S.Value>
                </S.TextGroup>
                <S.TextGroup>
                    <S.SubTitle>요약</S.SubTitle>
                    <S.Value>{summary ?? <em>없음</em>}</S.Value>
                </S.TextGroup>
                <S.TextGroup>
                    <S.SubTitle>피드백</S.SubTitle>
                    <S.Value>{feedback ?? <em>없음</em>}</S.Value>
                </S.TextGroup>
                <S.ButtonGroup>
                    <S.Button onClick={() => router.back()}>뒤로</S.Button>
                    <S.Button
                        onClick={copyAnalysis}
                        disabled={
                            !(originalIdea || mainSubject || summary || feedback || (keywords && keywords.length > 0))
                        }
                    >
                        분석 복사
                    </S.Button>
                </S.ButtonGroup>
            </S.Wrapper>
        </S.Container>
    );
}