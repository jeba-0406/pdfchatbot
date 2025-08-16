
"use client";
import DocumentIcon from "@/app/atoms/pdf"
import { useState } from "react";
import { useFileStore } from "@/store/useFileStore";
import PdfUpload from "./pdfupload";
import { Upload, MessageCircle } from "lucide-react"; // icon library
import Ai from "./ai";
export default function Pdf() {
  const [active, setActive] = useState("pdfs");
  const { file, lastProcessedFile } = useFileStore();

  return (
    <div className="container mx-auto px-3 sm:px-4 py-3  ">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-4 sm:mb-8 flex flex-col">
          <div className="flex items-center justify-center gap-2 mb-1 sm:mb-4">
            <div className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className=" flex flex-row justify-center items-center   text-gray-600"> <DocumentIcon />PDF AI Assistant</h1>
          </div>
          <p className="text-muted-foreground text-sm sm:text-base px-4 text-gray-400">
            Upload your PDF documents and chat with AI to get insights and answers
          </p>
          {lastProcessedFile&& (
          <div>
            <div className="text-gray-400 flex flex-row items-center mt-2 bg-white rounded-2xl min-h-16 text-[15px]">
              <div className="flex flex-col items-start gap-1">
                <p className="text-green-300 flex items-center"><DocumentIcon height={22} width={25} color="#86EFAC" />1 file(s) processed</p>
                <p className="ml-5 bg-gray-300 p-1 rounded-2xl text-[11px] text-black truncate max-w-[200px] overflow-hidden whitespace-nowrap">{lastProcessedFile?.name} ({(lastProcessedFile?.size / (1024 * 1024)).toFixed(2)} MB)</p>
              </div>
            </div>
          </div>
          )}

          <div className="flex flex-wrap sm:flex-nowrap items-center bg-gray-100 p-1 rounded-full w-full  shadow-sm mt-5 justify-between mx-auto">
            {/* PDFs Button */}
            <button
              onClick={() => setActive("pdfs")}
              className={`flex flex-1 items-center justify-center gap-2  sm:px-6 py-0.5 rounded-full transition-colors ${active === "pdfs"
                ? "bg-white text-black shadow"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              <Upload size={16} />
              <span className="font-medium">PDFs</span>
            </button>

            {/* AI Button */}
            <button
              onClick={() => {
                if (lastProcessedFile) {
                  setActive("ai");
                }
              }}
              className={`flex flex-1 items-center justify-center gap-2 px-4 sm:px-6 py-0.5 rounded-full transition-colors ${active === "ai"
                ? "bg-white text-black shadow"
                : "bg-gray-100 text-gray-500"
                }`}
            >
              <MessageCircle size={16} />
              <span className="font-medium">AI</span>
            </button>
          </div>
          <div className="mt-8 ">
          {active === "pdfs" && <PdfUpload goToAI={() => setActive("ai")} />}
          {active === "ai" &&  <Ai />}
          </div>
        </div>
      </div>
    </div>
  )
}