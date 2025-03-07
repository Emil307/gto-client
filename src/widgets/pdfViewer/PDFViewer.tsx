"use client";

import React from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import Link from "next/link";

interface IPdfViewerProps {
  url: string;
  origin: string;
}

export const PdfViewer: React.FC<IPdfViewerProps> = ({ url, origin }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="h-screen w-screen bg-white">
      <div>
        <Link href={origin} className="p-2">
          Назад
        </Link>
      </div>
      <div className="flex-1">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.10.111/build/pdf.worker.min.js">
          <Viewer fileUrl={url} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
};
