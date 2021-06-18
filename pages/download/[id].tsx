import axios from "axios";
import { IFile } from "libs/types";
import { GetServerSidePropsContext, NextPage } from "next";
import RenderFile from "@components/RenderFile";
import fileDownload from "js-file-download";
import React from "react";

const Download: NextPage<{ file: IFile }> = ({
  file: { format, name, sizeInBytes, id },
}) => {
  const handleDownload = async () => {
    const { data } = await axios.get(`/api/files/${id}/download`, {
      responseType: "blob",
    });

    fileDownload(data, name);
  };

  return (
    <div className="flex flex-col items-center justify-center px-3 py-4 space-y-4 bg-gray-800 rounded-md shadow-sm w-96 ">
      {!id ? (
        <span>Oops! File does not exist! Check the URL</span>
      ) : (
        <>
          <img
            src="/images/file-download.png"
            alt="Download"
            className="h-6 w-6"
          />

          <h1 className="text-xl ">Your File is ready to be downloaded</h1>

          <RenderFile
            file={{
              format,
              name,
              sizeInBytes,
            }}
          />

          <button
            onClick={handleDownload}
            className="button px-5 py-2 my-2 bg-gray-900 rounded button w-44 focus:outline-none"
          >
            Download
          </button>
        </>
      )}
    </div>
  );
};

export default Download;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { id } = context.query;

  let file: any;

  try {
    const { data } = await axios.get<IFile>(
      `${process.env.API_BASE_ENDPOINT}/api/files/${id}`
    );

    file = data;
  } catch (error) {
    console.log(error.response.data);

    file = {};
  }

  return {
    props: {
      file,
    }, // will be passed to the page component as props
  };
}
