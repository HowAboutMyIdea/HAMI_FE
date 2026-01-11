"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import * as S from "./style";
import { extractIdea } from "@/service";

export default function Main() {
    const router = useRouter();

    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = useCallback(async () => {
        if (loading) return;

        const trimmedIdea = idea.trim();
        if (!trimmedIdea) {
            setError("아이디어를 입력하세요.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const data = await extractIdea(trimmedIdea);

            sessionStorage.setItem(
                "extracted_main_subject",
                encodeURIComponent(data.main_subject)
            );
            sessionStorage.setItem(
                "extracted_keywords",
                encodeURIComponent(JSON.stringify(data.keywords))
            );
            sessionStorage.setItem(
                "extracted_summary",
                encodeURIComponent(data.summary)
            );
            sessionStorage.setItem(
                "extracted_feedback",
                encodeURIComponent(data.feedback)
            );
            sessionStorage.setItem(
                "original_idea",
                encodeURIComponent(trimmedIdea)
            );

            router.push("/result");
        } catch (e) {
            setError(
                e instanceof Error ? e.message : "서버 호출 실패"
            );
        } finally {
            setLoading(false);
        }
    }, [idea, loading, router]);

    return (
        <S.Container>
            <S.TextGroup>
                <S.Title>아이디어 입력</S.Title>
                <S.SubTitle
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="아이디어를 입력하세요"
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                            submit();
                        }
                    }}
                />
                {error && <S.Error>{error}</S.Error>}
                <S.ButtonGroup>
                    <S.Button onClick={submit} disabled={loading}>
                        {loading ? "분석 중..." : "분석하기"}
                    </S.Button>
                    <S.Button
                        onClick={() => setIdea("")}
                        disabled={loading}
                    >
                        초기화
                    </S.Button>
                </S.ButtonGroup>
            </S.TextGroup>
        </S.Container>
    );
}