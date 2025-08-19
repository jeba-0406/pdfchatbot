import { useRef, useState } from "react";
import { useFileStore } from "@/store/useFileStore";
import { UploadIcon } from "lucide-react";
import { useChatStore } from "@/store/useChatStore";
import DocumentIcon from "@/app/atoms/pdf";

export default function PdfUpload({ goToAI }: { goToAI: () => void }) {
    const fileInputRef = useRef(null);
    const { file, processed, lastProcessedFile,  setFile, setProcessed, setLastProcessedFile } = useFileStore();
    const {resetMessages,addMessage}=useChatStore()
    const [isDragging, setIsDragging] = useState(false);
    const MAX_SIZE = 200 * 1024 * 1024; 
    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_SIZE) {
                alert("File size must be under 200 MB");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setIsDragging(false);

        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.size > MAX_SIZE) {
                alert("File size must be under 200 MB");
                return;
            }
            setFile(droppedFile);
        }
    };

    return (
        <div className="flex justify-center">
            <div >
                <div className="text-left bg-white p-6 rounded-2xl w-full max-w-[600px]">
                    <p className="text-black font-medium">Menu:</p>
                    <p className="mt-2 text-gray-400 font-light text-sm">
                        Upload your PDF Files and Click on the Submit & Process Button
                    </p>
                    <div
                        className={`flex flex-col justify-center items-center max-w-[500px] py-6 rounded-2xl border-2 border-dashed ${isDragging ? "border-gray-500 bg-gray-200" : "border-[#AAAAAA]"
                            } mt-1.5 gap-2 transition-all`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <UploadIcon size={30} color={"#AAAAAA"} />
                        <p className="text-gray-400">
                            {isDragging ? "Drop your file here" : "Drag and drop files here"}
                        </p>
                        <p className="text-gray-400 text-[12px]">Limit 200MB per file</p>
                        <button
                            onClick={handleButtonClick}
                            className="px-2 py-1 text-[15px] border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-200 cursor-pointer"
                        >
                            Browse Files
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </div>
                    {file && !processed && (
                        <div className="mt-4">
                            <div className="bg-gray-200 max-w-[500px] rounded-[8px] flex items-center justify-between p-2">
                                <div className="flex items-center gap-2">
                                    <DocumentIcon height={30} width={40} />
                                    <div className="flex flex-col">
                                        <p className="text-gray-500 text-[14px] truncate  max-w-[200px] overflow-hidden whitespace-nowrap">{file.name}</p>
                                        <p className="text-gray-400 text-[12px]">
                                            {(file.size / (1024 * 1024)).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-gray-500 cursor-pointer text-sm font-bold px-2"
                                    title="Remove file"
                                >
                                    ✕
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    setProcessed(true);
                                    setLastProcessedFile(file);
                                    setFile(null);
                                    goToAI();
                                    resetMessages();
                                    addMessage({
                                        id: Date.now(),
                                        sender: "ai",
                                        text: `Great question! You can ask for my help with the following:\n
                                               1. Anything to do with your reports in our software e.g. What is the last report we exported?\n
                                               2. Anything to do with your organisation e.g. how many employees are using our software?\n
                                               3. Anything to do with the features we have in our software e.g. how can I change the colours of my report?`
                                      });

                                }}
                                className="w-full max-w-[500px] mt-2 p-2 rounded-2xl hover:bg-gray-100 flex items-center justify-center border-2 border-gray-300 text-gray-400 cursor-pointer">
                                Submit & Process
                            </button>
                        </div>
                    )}
                </div>
                {
                    !lastProcessedFile && (
                        <div className="text-gray-400 flex items-start mt-3 lg:text-[18px] ">
                            Start by uploading your PDF files to begin chatting with the AI
                        </div>
                    )
                }

            </div>
        </div>
    );
}
