import { PdfViewer } from "@/src/widgets/pdfViewer";
import { Suspense } from "react";

const Page = () => {
  return (
    <Suspense>
      <PdfViewer />
    </Suspense>
  );
};

export default Page;
