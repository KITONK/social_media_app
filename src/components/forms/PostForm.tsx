import { Models } from "appwrite";
import { useFormik } from "formik";
import { styled } from "@mui/material";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../Button/Button";
import FileUploader from "../shared/FileUploader";
import Textfield from "../Textfield/Textfield";
import { useUserContext } from "@/context/AuthContext";
import { PostInitialValues, PostValidation } from "@/lib/validations";
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations";

type Props = {
  post?: Models.Document;
  action?: "Create" | "Update";
};

const PostForm = ({ post, action = "Create" }: Props) => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
  const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();

  const [files, setFiles] = useState<File[]>();

  const { values, errors, isValid, touched, setValues, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: PostInitialValues,
    validationSchema: PostValidation,
    onSubmit,
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(values: any) {
    if (files && !files?.length) return;

    if (post && action === "Update") {
      const updatedPost = await updatePost({
        ...values,
        file: files,
        postId: post.$id,
        imageId: post?.imageId,
        imageUrl: post?.imageUrl,
      });

      if (!updatedPost) {
        return toast.error("Please try again!");
      }

      return navigate(`/posts/${post.$id}}`);
    }

    const newPost = await createPost({
      ...values,
      file: files,
      userId: user.id,
    });

    if (!newPost) return toast.error("Please try again!");

    navigate("/");
  }

  useEffect(() => {
    setValues({
      caption: post?.caption,
      location: post?.location,
      tags: post?.tags,
    });
  }, []);

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Textfield
        id="caption"
        name="caption"
        type="text"
        value={values.caption}
        labelText="Caption*"
        placeholder="Tell us a little about the post"
        size="medium"
        required
        multiline
        rows={4}
        errorText={errors.caption && touched.caption ? errors.caption : null}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FileUploader fieldChange={setFiles} mediaUrl={post?.imageUrl} />
      <Textfield
        id="location"
        name="location"
        type="text"
        value={values.location}
        labelText="Location*"
        placeholder="New York"
        required
        errorText={errors.location && touched.location ? errors.location : null}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Textfield
        id="tags"
        name="tags"
        type="text"
        value={values.tags}
        labelText='Add Tags (separated by comma " , ") *'
        placeholder="JS, React, NextJS"
        required
        errorText={errors.tags && touched.tags ? errors.tags : null}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <ButtonWrapper>
        <Button type="button" color="secondary">Cancel</Button>
        <Button type="submit" disabled={!isValid || isLoadingCreate || isLoadingUpdate}>
          {isLoadingCreate || (isLoadingUpdate && "Loading...")}
          {action} Post
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "48px",
  width: "100%",
  maxWidth: "1024px",
});

const ButtonWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "end",
  gap: "16px",
});

export default PostForm;
