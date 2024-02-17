import { Link, useParams } from "react-router-dom";
import { IconButton, Typography, styled } from "@mui/material";

import Loader from "@/components/Loader/Loader";
import PostStats from "@/components/PostStats/PostStats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";

const PostDetails = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id);
  const { user } = useUserContext();

  const handleDeletePost = () => {};

  return (
    <Container>
      {isPending ? (
        <Loader />
      ) : (
        <CardWrapper>
          <Image src={post?.imageUrl} alt="creator" />
          <InfoWrapper>
            <Row>
              <ProfileWrapper to={`/profile/${post?.creator.$id}`}>
                <ProfileImage src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="creator" />

                <ProfileTextWrapper>
                  <Typography
                    fontSize={{ xs: "16px", lg: "18px" }}
                    fontWeight={{ xs: 500, lg: 600 }}
                    lineHeight="140%"
                    color="primary.light"
                  >
                    {post?.creator.name}
                  </Typography>
                  <ProfileSubtitleWrapper>
                    <Typography
                      fontSize={{ xs: "12px", lg: "14px" }}
                      fontWeight={{ xs: 500, lg: 400 }}
                      lineHeight="140%"
                      color="violet.dark"
                    >
                      {multiFormatDateString(post?.$createdAt)} - {post?.location}
                    </Typography>
                  </ProfileSubtitleWrapper>
                </ProfileTextWrapper>
              </ProfileWrapper>

              <ActionWrapper>
                <UpdatePost to={`/update-post/${post?.$id}`} isCreator={user.id === post?.creator.$id}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                </UpdatePost>

                <DeleteButton isCreator={user.id === post?.creator.$id} onClick={handleDeletePost}>
                  <img src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
                </DeleteButton>
              </ActionWrapper>
            </Row>

            <Divider />

            <CaptionWrapper>
              <Typography
                fontSize={{ xs: "14px", lg: "16px" }}
                fontWeight={500}
                lineHeight="140%"
                color="primary.light"
              >
                {post?.caption}
              </Typography>
              <TagsWrapper>
                {post?.tags.map((tag: string) => (
                  <li key={tag}>
                    <Typography
                      fontSize={{ xs: "14px", lg: "16px" }}
                      fontWeight={500}
                      lineHeight="140%"
                      color="violet.dark"
                    >
                      #{tag}
                    </Typography>
                  </li>
                ))}
              </TagsWrapper>
            </CaptionWrapper>

            <PostStatsWrapper>
              <PostStats post={post} userId={user.id} />
            </PostStatsWrapper>
          </InfoWrapper>
        </CardWrapper>
      )}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  gap: "40px",
  overflowY: "scroll",
  padding: "40px 20px",

  [theme.breakpoints.up("md")]: {
    paddingRight: "32px",
    paddingLeft: "32px",
  },

  [theme.breakpoints.up("lg")]: {
    padding: "56px",
  },

  "&::-webkit-scrollbar": {
    width: "3px",
    height: "3px",
    borderRadius: "2px",
  },

  "&::-webkit-scrollbar-track": {
    background: "#09090a",
  },

  "&::-webkit-scrollbar-thumb": {
    background: "#5c5c7b",
    borderRadius: "50px",
  },

  "&::-webkit-scrollbar-thumb:hover": {
    background: "#7878a3",
  },
}));

const CardWrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#09090A",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: "30px",
  border: "1px solid #1F1F22",
  maxWidth: "1024px",
  padding: "24px",

  [theme.breakpoints.up("xl")]: {
    flexDirection: "row",
    borderRadius: "24px",
  },
}));

const Image = styled("img")(({ theme }) => ({
  height: "480px",
  borderRadius: "30px",
  objectFit: "cover",

  [theme.breakpoints.up("lg")]: {
    height: "480px",
  },

  [theme.breakpoints.up("xl")]: {
    width: "48%",
    borderRadius: "24px",
  },
}));

const ProfileWrapper = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const InfoWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "32px",
  borderRadius: "30px",
  gap: "20px",
  flex: 1,

  [theme.breakpoints.up("lg")]: {
    gap: "28px",
  },
}));

const Row = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

const ProfileTextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const ProfileSubtitleWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
});

const ActionWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
});

const UpdatePost = styled(Link)<{ isCreator?: boolean }>(({ isCreator }) => ({
  height: "20px",

  ...(!isCreator && {
    display: "none",
  }),
}));

const DeleteButton = styled(IconButton)<{ isCreator?: boolean }>(({ isCreator }) => ({
  padding: 0,

  ...(!isCreator && {
    display: "none",
  }),
}));

const Divider = styled("hr")({
  width: "100%",
  border: "1px solid #1F1F22",
  opacity: 0.8,
});

const ProfileImage = styled("img")(({ theme }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "50%",

  [theme.breakpoints.up("lg")]: {
    height: "48px",
    width: "48px",
  },
}));

const CaptionWrapper = styled("div")({
  padding: "20px 0",
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const TagsWrapper = styled("ul")({
  display: "flex",
  gap: "4px",
  marginTop: "8px",
});

const PostStatsWrapper = styled("div")({
  width: "100%",
  marginTop: "auto",
});

export default PostDetails;
