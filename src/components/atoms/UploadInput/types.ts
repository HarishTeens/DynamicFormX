import { IFileUploadResponse } from "~/services/file/upload";

export type IFileOnChange = (files: IFileUploadResponse[]) => void;