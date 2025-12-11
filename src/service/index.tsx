import customAxios from "@/lib/customAxios";

export type ExtractedIdeaResponse = {
    main_subject: string;
    keywords: string[];
    summary: string;
};

export const upsertNickname = async (payload?: { nickname?: string; idea?: string }) => {
    const response = await customAxios.post("/idea", payload ?? {});
    return response.data;
};

export const extractIdea = async (text: string) => {
    const response = await customAxios.post<ExtractedIdeaResponse>("/idea", { text });
    return response.data;
};