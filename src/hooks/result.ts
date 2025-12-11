import { useEffect, useState } from "react";

export function useIdeaResult() {
    const [originalIdea, setOriginalIdea] = useState<string | null>(null);
    const [mainSubject, setMainSubject] = useState<string | null>(null);
    const [keywords, setKeywords] = useState<string[] | null>(null);
    const [summary, setSummary] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const getStored = (key: string) =>
            sessionStorage.getItem(key) ??
            localStorage.getItem(key) ??
            params.get(key);

        const tryDecode = (val: string | null) => {
            if (!val) return null;
            try {
                return decodeURIComponent(val);
            } catch {
                return val;
            }
        };

        const rawIdea = tryDecode(getStored("original_idea"));
        const rawMain = tryDecode(getStored("extracted_main_subject"));
        const rawKeywords = tryDecode(getStored("extracted_keywords"));
        const rawSummary = tryDecode(getStored("extracted_summary"));
        const rawFeedback = tryDecode(getStored("extracted_feedback"));

        setOriginalIdea(rawIdea);
        setMainSubject(rawMain);
        setSummary(rawSummary);
        setFeedback(rawFeedback);

        if (rawKeywords) {
            try {
                const parsed = JSON.parse(rawKeywords);
                if (Array.isArray(parsed)) setKeywords(parsed.map(String));
                else setKeywords(null);
            } catch {
                setKeywords(
                    rawKeywords
                        .split(",")
                        .map((s) => s.trim())
                        .filter(Boolean)
                );
            }
        } else {
            setKeywords(null);
        }
    }, []);

    return {
        originalIdea,
        mainSubject,
        keywords,
        summary,
        feedback,
    };
}