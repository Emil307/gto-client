"use client";

import { PdfViewer } from "@/src/widgets/pdfViewer";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");
  const origin = searchParams.get("origin");

  return <>{url && origin && <PdfViewer url={url} origin={origin} />}</>;
};

export default Page;
