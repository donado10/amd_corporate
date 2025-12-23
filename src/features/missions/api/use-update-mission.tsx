import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<(typeof client.api.missions)["$put"]>;
type ResponseType = InferResponseType<(typeof client.api.missions)["$put"]>;

const useUpdateMission = () => {
    const router = useRouter();
    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationKey: ["update_car"],
        mutationFn: async ({ json }) => {
            const res = await client.api.missions["$put"]({ json });

            if (!res.ok) {
                throw new Error("Failed to update a mission!");
            }

            return res.json();
        },
        onSuccess: () => {
            router.refresh();
        },
    });

    return mutation;
};

export default useUpdateMission;
