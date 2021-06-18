import { useState } from "react";
import DropZone from "@components/DropZone";
import RenderFile from "@components/RenderFile";
import axios from "axios";
import DownloadFile from "@components/DownloadFile";
import EmailForm from "@components/EmailForm";

export default function Home() {
  const [file, setFile] = useState(null);
  const [id, setId] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [uploadState, setUploadState] =
    useState<"Uploading" | "Upload failed" | "Uploaded" | "Upload">("Upload");

  const onClick = async () => {
    if (uploadState === "Uploading") return;
    setUploadState("Uploading");
    let formData = new FormData();

    formData.append("myFile", file);

    try {
      const { data } = await axios({
        method: "post",
        data: formData,
        url: "/api/files/upload",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setId(data.id);
      setDownloadLink(data.downloadPageLink);
    } catch (error) {
      console.log(error.response.data);
      setUploadState("Upload failed");
    }
  };

  const resetComponent = () => {
    setFile(null);
    setDownloadLink(null);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="my-4 text-3xl font-medium">
        Got a File? Share It Like Fake News
      </h1>
      <div className="flex flex-col items-center justify-center bg-gray-800 shadow-xl w-96 rounded-xl">
        {!downloadLink && <DropZone setFile={setFile} />}

        {/* Render the file */}

        {file && (
          <RenderFile
            file={{
              format: file.type.split("/")[1],
              name: file.name,
              sizeInBytes: file.size,
            }}
          />
        )}

        {/* upload button */}

        {file && !downloadLink && (
          <button
            onClick={onClick}
            className="button px-5 py-2 my-2 bg-gray-900 rounded button w-44 focus:outline-none"
          >
            {uploadState}
          </button>
        )}

        {downloadLink && (
          <div className="p-2 text-center">
            <DownloadFile downloadLink={downloadLink} />
            <EmailForm id={id} />
            <button
              onClick={resetComponent}
              className="button px-5 py-2 my-2 bg-gray-900 rounded button w-44 focus:outline-none"
            >
              Upload New File
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
