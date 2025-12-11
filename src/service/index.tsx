import customAxios from "@/lib/customAxios";

export const upsertNickname = async () => {
    const response = await customAxios.post("/idea");
    return response.data;
};