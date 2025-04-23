import { UploadFormData } from "@/components/sadmin/uploadForm";
import { useStore } from "zustand";
import { createWithEqualityFn } from "zustand/traditional";

interface Props {
  uploadRecordForm: (UploadFormData & { id: string }) | null;
  setUploadRecordForm: (
    value: (UploadFormData & { id: string }) | null
  ) => void;
}

const recordsStore = createWithEqualityFn<Props>((set) => ({
  // DEFAULT STATE
  uploadRecordForm: null,

  setUploadRecordForm: (uploadRecordForm) => set(() => ({ uploadRecordForm })),
}));

export const useRecordsStore = () => {
  return useStore(recordsStore);
};
