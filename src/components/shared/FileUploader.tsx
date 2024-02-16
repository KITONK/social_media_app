import { useCallback, useState } from "react";
import { Typography, styled } from "@mui/material";
import { FileWithPath, useDropzone } from "react-dropzone";

import Button from "../Button/Button";

type Props = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: Props) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpeg", ".jpg", ".svg"] },
  });

  return (
    <Wrapper {...getRootProps()}>
      <input {...getInputProps()} />
      {fileUrl ? (
        <>
          <ImageWrapper>
            <img src={fileUrl} alt="image" />
          </ImageWrapper>
          <Typography
            fontSize="14px"
            fontWeight={400}
            lineHeight="140%"
            color="#5C5C7B"
            textAlign="center"
            width="100%"
            padding="16px"
            borderTop="1px solid #1F1F22"
          >
            Click or drag photo to replace
          </Typography>
        </>
      ) : (
        <FileUploaderBox>
          <img src="/assets/icons/file-upload.svg" width={96} height={77} alt="file-upload" />

          <Typography
            fontSize="16px"
            fontWeight={500}
            lineHeight="140%"
            marginBottom="8px"
            marginTop="24px"
            color="secondary.main"
          >
            Drag photo here
          </Typography>
          <Typography fontSize="14px" fontWeight={400} lineHeight="140%" color="#5C5C7B" marginBottom="24px">
            SVG, PNG, JPG
          </Typography>

          <Button style={{ pointerEvents: "none" }}>Select from computer</Button>
        </FileUploaderBox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  cursor: "pointer",
  borderRadius: "6px",
  backgroundColor: "#101012",
  width: "100%",
  zIndex: 2,

  input: {
    cursor: "pointer",
  },
});

const ImageWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  width: "100%",
  padding: "20px",

  img: {
    height: "320px",
    width: "100%",
    borderRadius: "24px",
    objectFit: "cover",
    objectPosition: "top",
  },

  [theme.breakpoints.up("lg")]: {
    padding: "40px",

    img: {
      height: "480px",
    },
  },
}));

const FileUploaderBox = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  padding: "28px",
  height: "320px",

  [theme.breakpoints.up("lg")]: {
    height: "612px",
  },
}));

export default FileUploader;
