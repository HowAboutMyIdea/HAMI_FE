"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./style";
import { extractIdea } from "@/service";

export default function Main() {
    const router = useRouter();
    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);
        if (!idea.trim()) return setError("아이디어를 입력하세요.");

        setLoading(true);
        try {
            const data = await extractIdea(idea);
            sessionStorage.setItem("extracted_main_subject", encodeURIComponent(data.main_subject));
            sessionStorage.setItem("extracted_keywords", encodeURIComponent(JSON.stringify(data.keywords)));
            sessionStorage.setItem("extracted_summary", encodeURIComponent(data.summary));
            sessionStorage.setItem("extracted_feedback", encodeURIComponent(data.feedback));
            sessionStorage.setItem("original_idea", encodeURIComponent(idea));

            router.push("/result");
        } catch (e: any) {
            console.error(e);
            setError(e?.message ?? "서버 호출 실패");
        } finally {
            setLoading(false);
        }
    };

    return (
        <S.Container>
            <S.TextGroup>
                <S.Title>아이디어 입력</S.Title>
                <S.SubTitle
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="아이디어를 입력하세요"
                />
                {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
                <S.ButtonGroup>
                    <S.Button onClick={submit} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
                        {loading ? "분석 중..." : "분석하기"}
                    </S.Button>
                    <S.Button onClick={() => setIdea("")} style={{ padding: "0.5rem 1rem" }}>
                        초기화
                    </S.Button>
                </S.ButtonGroup>
            </S.TextGroup>
        </S.Container>
    );
}