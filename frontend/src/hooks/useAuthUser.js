import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
    const { data, isLoading } = useQuery({
        queryKey: ["authUserId"],
        queryFn: getAuthUser,
        retry: false,
    });

    return {
        isLoading,
        authUser: data?.user ?? null,
    };
};

export default useAuthUser;
