import { $api } from "@/src/shared/api";
import { AxiosResponse } from "axios";
import { RequestDTO } from "./types";
import { $apiFile } from "@/src/shared/api/default";

export async function sendRequest(data: RequestDTO): Promise<AxiosResponse> {
  return await $api.post(`/api/applications/create`, data);
}

export async function sendRecording(
  application_id: number,
  blob: Blob
): Promise<AxiosResponse> {
  return await $apiFile.post(`/api/applications/chunk/upload`, {
    application_id: application_id,
    chunk_number: 1,
    total_chunks: 1,
    file: blob,
  });
}

export async function sendChunk(
  application_id: number,
  chunkNumber: number,
  totalChunks: number,
  blob: Blob
): Promise<AxiosResponse> {
  return await $apiFile.post(`/api/applications/chunk/upload`, {
    application_id: application_id,
    chunk_number: chunkNumber,
    total_chunks: totalChunks,
    file: blob,
  });
}
