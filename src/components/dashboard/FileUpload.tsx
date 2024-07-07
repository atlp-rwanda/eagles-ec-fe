import React, { forwardRef } from "react";
import { useDropzone } from "react-dropzone";
import { FaImages } from "react-icons/fa";

interface FileUploadProps {
  onDrop: (acceptedFiles: File[]) => void;
  remove: (file: File, event: React.MouseEvent<HTMLButtonElement>) => void;
  files: File[];
  existingImages?: string[];
  removeExistingImage: (
    index: number,
    image: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  ({
    onDrop, remove, files, existingImages, removeExistingImage,
  }, ref) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/png": [".png"],
        "image/jpeg": [".jpg"],
        "image/jpg": [".jpg"],
      },
    });

    return (
      <div
        {...getRootProps()}
        className={`border-dashed border-2 rounded-[8px] p-4 flex flex-col  bg-white text-primary justify-center items-center cursor-pointer ${
          isDragActive ? "border-primary" : "border-[#687588]"
        }`}
      >
        <input {...getInputProps()} ref={ref} />
        <div className=" max-h-80 w-full overflow-y-scroll px-3">
          {existingImages && existingImages.length > 0 && (
            <>
              {existingImages.map((image, index) => (
                <div
                  key={index}
                  className="flex items-center w-full justify-between"
                >
                  <img
                    src={image}
                    alt="Preview"
                    className="mb-2 w-16 h-16 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => removeExistingImage(index, image, e)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </>
          )}
          {files.length > 0 ? (
            files.map((file, index) => (
              <div
                key={index}
                className="flex items-center w-full justify-between"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="mb-2 w-16 h-16 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={(e) => remove(file, e)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))
          ) : existingImages && existingImages.length > 0 ? null : (
            <div className="flex items-center flex-col gap-2">
              <FaImages className="text-gray-500 text-4xl mb-2" />
              <p className="text-gray-500">Browse Images...</p>
            </div>
          )}
        </div>
      </div>
    );
  },
);

export default FileUpload;
