"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import * as S from './style';

export default function Result() {
    const router = useRouter();
    const [originalIdea, setOriginalIdea] = useState<string | null>(null);
    const [mainSubject, setMainSubject] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string[] | null>(null);
    const [summary, setSummary] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const getStored = (key: string) =>
            sessionStorage.getItem(key) ?? localStorage.getItem(key) ?? params.get(key);

        const tryDecode = (val: string | null) => {
            if (!val) return null;
            try {
                return decodeURIComponent(val);
            } catch {
                return val;
            }
        };

        const rawIdea = tryDecode(getStored('original_idea'));
        const rawMain = tryDecode(getStored('extracted_main_subject'));
        const rawKeywords = tryDecode(getStored('extracted_keywords'));
        const rawSummary = tryDecode(getStored('extracted_summary'));

        setOriginalIdea(rawIdea);
        setMainSubject(rawMain);
        setSummary(rawSummary);

        if (rawKeywords) {
            try {
                const parsed = JSON.parse(rawKeywords);
                if (Array.isArray(parsed)) setKeywords(parsed.map(String));
                else setKeywords(null);
            } catch {
                setKeywords(rawKeywords.split(',').map(s => s.trim()).filter(Boolean));
            }
        } else {
            setKeywords(null);
        }
    }, []);

    const copyAnalysis = async () => {
        const parts = [
            originalIdea ? `아이디어:\n${originalIdea}\n` : '',
            mainSubject ? `핵심 주제: ${mainSubject}\n` : '',
            keywords ? `키워드: ${keywords.join(', ')}\n` : '',
            summary ? `요약:\n${summary}\n` : ''
        ];
        const text = parts.filter(Boolean).join('\n');
        if (!text) return;
        await navigator.clipboard?.writeText(text);
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
                        {keywords && keywords.length > 0 ? (
                            <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                {keywords.map((k, i) => (
                                    <li key={i} style={{ marginBottom: '0.25rem' }}>{k}</li>
                                ))}
                            </ul>
                        ) : (
                            <em>없음</em>
                        )}
                    </S.Value>
                </S.TextGroup>
                <S.TextGroup>
                    <S.SubTitle>요약</S.SubTitle>
                    <S.Value>{summary ?? <em>없음</em>}</S.Value>
                </S.TextGroup>

                <S.ButtonGroup>
                    <S.Button onClick={() => router.back()}>
                        뒤로
                    </S.Button>
                    <S.Button
                        onClick={copyAnalysis}
                        disabled={!(originalIdea || mainSubject || summary || (keywords && keywords.length > 0))}
                    >
                        분석 복사
                    </S.Button>
                </S.ButtonGroup>
            </S.Wrapper>
        </S.Container>
    );
}