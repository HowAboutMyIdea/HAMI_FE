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
                <textarea
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    placeholder="아이디어를 입력하세요"
                    style={{ width: "100%", minHeight: "8rem", padding: "0.75rem", fontSize: "1rem", boxSizing: "border-box" }}
                />
                {error && <div style={{ color: "red", marginTop: "0.5rem" }}>{error}</div>}
                <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
                    <button onClick={submit} disabled={loading} style={{ padding: "0.5rem 1rem" }}>
                        {loading ? "분석 중..." : "분석하기"}
                    </button>
                    <button onClick={() => setIdea("")} style={{ padding: "0.5rem 1rem" }}>
                        초기화
                    </button>
                </div>
            </S.TextGroup>
        </S.Container>
    );
}