import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";

export async function sendRecording(base64: string): Promise<AxiosResponse> {
  return await $api.post(`/api/application/chunk/upload`, {
    upload_id: "EmilUID",
    application_id: 1,
    chunk_number: 1,
    total_chunks: 1,
    file: base64,
  });
}
