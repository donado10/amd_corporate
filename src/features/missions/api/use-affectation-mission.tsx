import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ToastSuccess } from "@/components/ToastComponents";

type RequestType = InferRequestType<
	(typeof client.api.missions.affectationMission)["$post"]
>;
type ResponseType = InferResponseType<
	(typeof client.api.missions.affectationMission)["$post"]
>;

const useAffectationMission = () => {
	const router = useRouter();
	const queryClient = useQueryClient();

	const mutation = useMutation<ResponseType, Error, RequestType>({
		mutationKey: ["affectation_mission"],
		mutationFn: async ({ json }) => {
			const res = await client.api.missions.affectationMission["$post"]({
				json,
			});

			if (!res.ok) {
				throw new Error("Failed to affect a new mission!");
			}

			return res.json();
		},
		onSuccess: () => {
			toast(<ToastSuccess toastTitle="Affectation affectée !" />, {
				style: {
					backgroundColor: "green",
				},
			});
			queryClient.invalidateQueries({ queryKey: ["Missions_info_table"] });
			router.refresh();
		},
	});

	return mutation;
};

export default useAffectationMission;
