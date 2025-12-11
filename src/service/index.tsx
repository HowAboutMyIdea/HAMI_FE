import customAxios from "@/lib/customAxios";
import { ExtractedIdeaResponse } from "@/type";

export const upsertNickname = async (payload?: { nickname?: string; idea?: string }) => {
    const response = await customAxios.post("/idea", payload ?? {});
    return response.data;
};

export const extractIdea = async (text: string) => {
    const response = await customAxios.post<ExtractedIdeaResponse>("/idea", { text });
    return response.data;
};