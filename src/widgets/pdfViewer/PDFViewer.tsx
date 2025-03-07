"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useSearchParams } from "next/navigation";

export const PdfViewer: React.FC = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const searchParams = useSearchParams();

  const url = searchParams.get("url");

  return (
    <div className="h-screen w-screen bg-white">
      <div className="flex-1">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
          {url && (
            <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
          )}
        </Worker>
      </div>
    </div>
  );
};
