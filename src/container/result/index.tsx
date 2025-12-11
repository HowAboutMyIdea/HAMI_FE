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
                // if it's a comma-separated string, try split
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
            <S.TextGroup>
                <S.Title>아이디어 분석 결과</S.Title>

                <div style={{ marginTop: '1rem' }}>
                    <strong style={{ display: 'block', marginBottom: '0.5rem' }}>원문 아이디어</strong>
                    {originalIdea ? (
                        <div style={{ padding: '0.75rem', borderRadius: '0.25rem', whiteSpace: 'pre-wrap' }}>
                            {originalIdea}
                        </div>
                    ) : (
                        <em>전달된 아이디어가 없습니다.</em>
                    )}
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <strong>핵심 주제</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                        {mainSubject ? (
                            <div style={{ padding: '0.5rem', borderRadius: '0.25rem' }}>{mainSubject}</div>
                        ) : (
                            <em>없음</em>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <strong>키워드</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                        {keywords && keywords.length > 0 ? (
                            <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                                {keywords.map((k, i) => (
                                    <li key={i} style={{ marginBottom: '0.25rem' }}>{k}</li>
                                ))}
                            </ul>
                        ) : (
                            <em>없음</em>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    <strong>요약</strong>
                    <div style={{ marginTop: '0.5rem' }}>
                        {summary ? (
                            <div style={{ padding: '0.75rem', borderRadius: '0.25rem', whiteSpace: 'pre-wrap' }}>{summary}</div>
                        ) : (
                            <em>없음</em>
                        )}
                    </div>
                </div>

                <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
                    <button onClick={() => router.back()} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
                        뒤로
                    </button>
                    <button onClick={copyAnalysis} disabled={!(originalIdea || mainSubject || summary || (keywords && keywords.length > 0))} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
                        분석 복사
                    </button>
                </div>
            </S.TextGroup>
        </S.Container>
    );
}
