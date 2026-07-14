import { useState, useCallback, type ChangeEvent, type DragEvent } from "react";
import { CloudUpload, FileCheck2 } from "lucide-react";
import Spin from "./spinner";
import { cn } from "../lib/cn";

type Props = {
  handleFileUpload: (
    e: ChangeEvent<HTMLInputElement>,
  ) => Promise<string | undefined>;
};

const DragAndDropUpload = ({ handleFileUpload }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    if (droppedFiles.length > 0) setFile(droppedFiles[0]);
  }, []);

  const onFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setUploading(true);
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const img = await handleFileUpload(e);
      if (img) setImage(img);
      setFile(selectedFiles[0]);
    }
    setUploading(false);
  };

  return (
    <div className="mx-auto flex w-full flex-col items-center gap-4 py-2">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        role="group"
        className={cn(
          "relative flex h-56 w-full cursor-pointer items-center justify-center border border-dashed transition-all",
          isDragging
            ? "border-gold bg-gold/5"
            : "border-hairline bg-noir-2 hover:border-gold/60",
        )}
      >
        <input
          type="file"
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-hidden="true"
          accept="image/*"
          onChange={onFileInputChange}
        />

        <div className="pointer-events-none flex flex-col items-center gap-2 text-center">
          {image ? (
            <img
              src={image}
              alt="uploaded preview"
              className="max-h-44 w-auto border border-hairline object-contain"
            />
          ) : uploading ? (
            <>
              <Spin />
              <p className="text-xs uppercase tracking-widest text-gold">
                Uploading...
              </p>
            </>
          ) : (
            <>
              <CloudUpload
                strokeWidth={1.2}
                className={cn(
                  "size-10 transition-colors",
                  isDragging ? "text-gold" : "text-mute",
                )}
              />
              <p
                className={cn(
                  "text-sm font-medium",
                  isDragging ? "text-gold" : "text-ivory",
                )}
              >
                Drag &amp; drop to upload
              </p>
              <p className="text-[11px] uppercase tracking-widest text-mute">
                or click to browse files
              </p>
            </>
          )}
        </div>
      </div>

      {file && (
        <ul className="w-full space-y-1 text-left">
          <li className="flex items-center gap-2 text-xs text-mute">
            <FileCheck2 className="size-4 text-[color:var(--color-success)]" />
            <span className="truncate">
              {file.name} ({(file.size / 1024).toFixed(1)} KB)
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default DragAndDropUpload;
