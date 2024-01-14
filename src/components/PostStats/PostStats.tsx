import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Typography, styled } from "@mui/material";

import Loader from "../Loader/Loader";
import { checkIsLiked } from "@/lib/utils";
import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";

type Props = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: Props) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find((record: Models.Document) => record.post.$id === post?.$id);

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    }

    savePost({ postId: post?.$id || "", userId });
    setIsSaved(true);
  };

  return (
    <Wrapper>
      <IconWrapper marginRight={20}>
        <img
          src={`${checkIsLiked(likes, userId) ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}`}
          alt="like"
          width={20}
          height={20}
          onClick={handleLikePost}
        />
        <Typography fontSize={{ xs: "14px", lg: "16px" }} fontWeight={500} lineHeight="140%" color="primary.light">
          {likes.length}
        </Typography>
      </IconWrapper>

      <IconWrapper>
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <img
            src={`${isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}`}
            alt="like"
            width={20}
            height={20}
            onClick={handleSavePost}
          />
        )}
      </IconWrapper>
    </Wrapper>
  );
};

const Wrapper = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  zIndex: 20,
});

const IconWrapper = styled("div")<{ marginRight?: number }>(({ marginRight }) => ({
  display: "flex",
  gap: "8px",
  marginRight: `${marginRight || 0}px`,

  img: {
    cursor: "pointer",
  },
}));

export default PostStats;
