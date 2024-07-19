// @ts-nocheck

import axios from "axios";

interface FormDataUploadParams {
  accountId: string;
  apiKey: string;
  requestBody: Blob | File;
  originalFileName?: string;
  metadata?: Record<string, any>;
  querystring?: Record<string, any>;
}

export async function formDataUpload(params: FormDataUploadParams) {
  const baseUrl = "https://api.bytescale.com";
  const path = `/v2/accounts/${params.accountId}/uploads/form_data`;
  const entries = (obj: Record<string, any>) =>
    Object.entries(obj).filter(([, val]) => (val ?? null) !== null);
  const query = entries(params.querystring ?? {})
    .flatMap(([k, v]) => (Array.isArray(v) ? v.map((v2) => [k, v2]) : [[k, v]]))
    .map((kv) => kv.join("="))
    .join("&"); 
  const formData = new FormData();
  formData.append(
    "file",
    params.requestBody,
    params.originalFileName || "file"
  );

  const response = await axios.post(
    `${baseUrl}${path}${query.length > 0 ? "?" : ""}${query}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${params.apiKey}`,
        "X-Upload-Metadata": JSON.stringify(params.metadata),
        ...entries({}),
      },
    }
  );

  if (Math.floor(response.status / 100) !== 2) {
    throw new Error(`Bytescale API Error: ${JSON.stringify(response.data)}`);
  }
  return response.data;
}
