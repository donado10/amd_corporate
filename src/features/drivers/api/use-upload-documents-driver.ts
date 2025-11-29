import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";

type RequestType = InferRequestType<
  (typeof client.api.drivers.uploadFiles)["$post"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.drivers.uploadFiles)["$post"]
>;

const useUploadDocumentDriver = () => {
  const router = useRouter();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["upload_driver_documents"],
    mutationFn: async ({ form }) => {
      console.log(form);
      const res = await client.api.drivers.uploadFiles["$post"]({ form });

      if (!res.ok) {
        throw new Error("Failed to register a new driver!");
      }

      return res.json();
    },
    onSuccess: () => {
      router.refresh();
    },
  });

  return mutation;
};

export default useUploadDocumentDriver;
