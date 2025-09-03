import { ourFileRouter } from "@/app/api/uploadthing/core";
import {
    generateReactHelpers,
    generateUploadButton,
    generateUploadDropzone,
} from "@uploadthing/react";

export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();  
export const { useUploadThing } = generateReactHelpers(ourFileRouter);