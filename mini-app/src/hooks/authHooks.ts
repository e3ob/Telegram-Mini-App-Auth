import { useQuery } from "@tanstack/react-query";
import { apiHandler } from "@/api";

export const useAuthUser = (initData: string | undefined) => {
    return useQuery<{}, {}, string>({
        queryKey: ['authUser'],
        queryFn: async () => {
            if (initData) {
                const { data } = await apiHandler.get('/user', {
                    headers: { "Authorization": `tma ${initData}` },
                });
                return data;
            }
        },
    });
};