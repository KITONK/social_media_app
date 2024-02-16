import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Typography, styled } from "@mui/material";

import PostStats from "../PostStats/PostStats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";

type Props = {
  post: Models.Document;
};

const PostCard = ({ post }: Props) => {
  const { user } = useUserContext();

  if (!post.creator) return;

  return (
    <Wrapper>
      <Header>
        <ProfileWrapper>
          <Link to={`/profile/${post.creator.$id}`}>
            <img src={post?.creator?.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="creator" />
          </Link>

          <ProfileTextWrapper>
            <Typography
              fontSize={{ xs: "16px", lg: "18px" }}
              fontWeight={{ xs: 500, lg: 600 }}
              lineHeight="140%"
              color="primary.light"
            >
              {post.creator.name}
            </Typography>
            <ProfileSubtitleWrapper>
              <Typography
                fontSize={{ xs: "12px", lg: "14px" }}
                fontWeight={{ xs: 500, lg: 400 }}
                lineHeight="140%"
                color="violet.dark"
              >
                {multiFormatDateString(post.$createdAt)} - {post.location}
              </Typography>
            </ProfileSubtitleWrapper>
          </ProfileTextWrapper>
        </ProfileWrapper>

        <UpdatePost to={`/update-post/${post.$id}`} isCreator={user.id == post.creator.$id}>
          <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
        </UpdatePost>
      </Header>

      <Link to={`/posts/${post.$id}`}>
        <CaptionWrapper>
          <Typography fontSize={{ xs: "14px", lg: "16px" }} fontWeight={500} lineHeight="140%" color="primary.light">
            {post.caption}
          </Typography>
          <TagsWrapper>
            {post.tags.map((tag: string) => (
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

        <PostCardImage
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          className="post-card_img"
          alt="post image"
        />
      </Link>

      <PostStats post={post} userId={user.id} />
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  backgroundColor: "#09090A",
  borderRadius: "24px",
  border: "1px solid #1F1F22",
  padding: "20px",
  width: "100%",
  maxWidth: "640px",

  [theme.breakpoints.up("lg")]: {
    padding: "28px",
  },
}));

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const ProfileWrapper = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  img: {
    width: "48px",
    borderRadius: "50%",

    [theme.breakpoints.up("lg")]: {
      height: "48px",
    },
  },
}));

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

const UpdatePost = styled(Link)<{ isCreator?: boolean }>(({ isCreator }) => ({
  ...(!isCreator && {
    display: "none",
  }),
}));

const CaptionWrapper = styled("div")({
  padding: "20px 0",
});

const TagsWrapper = styled("ul")({
  display: "flex",
  gap: "4px",
  marginTop: "8px",
});

const PostCardImage = styled("img")(({ theme }) => ({
  height: "256px",
  width: "100%",
  borderRadius: "24px",
  objectFit: "cover",
  marginBottom: "20px",

  [theme.breakpoints.up("xs")]: {
    height: "400px",
  },

  [theme.breakpoints.up("lg")]: {
    height: "450px",
  },
}));

export default PostCard;
