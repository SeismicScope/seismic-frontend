"use client";

import { useRouter } from "next/navigation";

import { Modal } from "@/shared/ui/modal";

function ModalWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return <Modal handleOpenChange={() => router.back()}>{children}</Modal>;
}

export default ModalWrapper;
