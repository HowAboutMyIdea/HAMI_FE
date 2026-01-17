"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as S from "./style";
import { extractIdea } from "@/service";

export default function Main() {
    const router = useRouter();
    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const submit = async () => {
        if (loading) return;

        const trimmed = idea.trim();
        if (!trimmed) {
            setError("아이디어를 입력하세요.");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const data = await extractIdea(trimmed);

            const save = (key: string, value: string) =>
                sessionStorage.setItem(key, encodeURIComponent(value));

            save("extracted_main_subject", data.main_subject);
            save("extracted_keywords", JSON.stringify(data.keywords));
            save("extracted_summary", data.summary);
            save("extracted_feedback", data.feedback);
            save("original_idea", trimmed);

            router.push("/result");
        } catch (e) {
            setError(e instanceof Error ? e.message : "서버 호출 실패");
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
                    onKeyDown={(e) =>
                        e.key === "Enter" &&
                        (e.ctrlKey || e.metaKey) &&
                        submit()
                    }
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