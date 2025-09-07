import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["authUserId"],
        queryFn: getAuthUser,
        retry: false,
    });

    return {
        isLoading,
        error,
        authUser: data?.user,
    };
};

export default useAuthUser;
