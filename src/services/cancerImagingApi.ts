import { apiClient } from "../lib/apiClient";
import { ENDPOINTS } from "../lib/endpoints";

/** Request body for creating a cancer imaging submission (matches API spec). */
export type CancerImagingCreatePayload = {
  applicant_info: {
    name: string;
    email: string;
    phone: string;
    title: string;
    institution: string;
    department: string;
    status: boolean;
    pub_date: string;
  };
  dataset_info: {
    title: string;
    description: string;
    primary_cancer_type: string;
    primary_modality: string;
    no_of_images: string;
    dataset_size: string;
    data_acquisition_period: string;
    licience: string;
    status: boolean;
    pub_date: string;
  };
  compliance_info: {
    title: string;
    ethics_committee_approval: boolean;
    patient_consent: boolean;
    ndpr_compliance: boolean;
    institutional_authorization: boolean;
    pub_date: string;
  };
  additional_info: {
    funding_source: string;
    intended_research_se: string;
    note: string;
    pub_date: string;
  };
  title: string;
  description: string;
  keywords: string;
  institution: string;
  cancer_type: string;
  modality: string;
  licience: string;
  file_size: string;
  images: number;
  downloads: number;
  citations: number;
  status: boolean;
  verified: boolean;
  pub_date: string;
};

/** Item returned from the cancer-imaging list/detail API. */
export type CancerImagingItem = {
  id: string;
  title?: string | null;
  description?: string | null;
  keywords?: string | null;
  institution?: string | null;
  cancer_type?: string | null;
  modality?: string | null;
  licience?: string | null;
  file_size?: string | null;
  images?: number | null;
  downloads?: number | null;
  citations?: number | null;
  status?: boolean | null;
  verified?: boolean | null;
  pub_date?: string | null;
  applicant_info?: string | null;
  dataset_info?: string | null;
  compliance_info?: string | null;
  additional_info?: string | null;
};

export async function createCancerImaging(
  payload: CancerImagingCreatePayload
): Promise<CancerImagingItem> {
  const { data } = await apiClient.post<CancerImagingItem>(
    ENDPOINTS.CANCER_IMAGING.CREATE,
    payload
  );
  return data;
}

export async function listCancerImaging(): Promise<CancerImagingItem[]> {
  const { data } = await apiClient.get<CancerImagingItem[]>(
    ENDPOINTS.CANCER_IMAGING.LIST
  );
  return Array.isArray(data) ? data : [];
}

export async function getCancerImaging(
  id: string | number
): Promise<CancerImagingItem> {
  const { data } = await apiClient.get<CancerImagingItem>(
    ENDPOINTS.CANCER_IMAGING.DETAIL(id)
  );
  return data;
}
