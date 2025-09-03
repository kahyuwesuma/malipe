import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const ImageDropzone = ({ onFileUpload, existingImage }) => {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (existingImage) {
      setFiles([{ preview: existingImage }]);
    }
  }, [existingImage]);
  useEffect(() => {
    if (!existingImage && files.length > 0) {
      setFiles([]);
    }
  }, [existingImage]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(mappedFiles);

      if (onFileUpload) {
        onFileUpload(mappedFiles);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg, image/png, image/jpg",
    multiple: false,
  });

  const dropzoneStyle =
    files.length > 0
      ? { backgroundImage: `url(${files[0].preview || existingImage})` }
      : {};

  return (
    <section className="">
      <div
        {...getRootProps()}
        className={`flex flex-col items-center justify-center px-6 border-2 border-dashed rounded-md cursor-pointer bg-cover bg-center py-20 ${
          isDragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-white"
        }`}
        style={dropzoneStyle}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500 ">Letakkan file di sini ...</p>
        ) : files.length > 0 ? (
          <p className="text-white ">
            Tarik & letakkan gambar di sini, atau klik untuk mengganti gambar
          </p>
        ) : (
          <p className="text-gray-500 ">
            Tarik & letakkan gambar di sini, atau klik untuk memilih gambar
          </p>
        )}
      </div>
      {files.length > 0 ? (
        <div className="bg-white truncate rounded-sm py-1 px-2 text-sm relative">
          <span className="">
            {files[0].preview.name ? `Nama File: ${files[0].preview.name}` : ""}
          </span>
          {files.map((file, index) => (
            <span className="" key={index}>
              {file.name ? `Nama File: ${file.name}` : ""}
            </span>
          ))}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};
export default ImageDropzone;
