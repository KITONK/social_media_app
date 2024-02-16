import { Models } from "appwrite";
import { Link } from "react-router-dom";
import { Typography, styled } from "@mui/material";

import PostStats from "../PostStats/PostStats";
import { useUserContext } from "@/context/AuthContext";

type Props = {
  posts?: Models.Document[];
  showUser?: boolean;
  showStats?: boolean;
};

const GridPostList = ({ posts, showUser = true, showStats = true }: Props) => {
  const { user } = useUserContext();

  return (
    <Wrapper>
      {posts?.map((post) => (
        <Post key={post.$id}>
          <ImageWrapper to={`/posts/${post.$id}`} className="grid-post_link">
            <img src={post.imageUrl} alt="post" />
          </ImageWrapper>

          <InformationWrapper>
            {showUser && (
              <CreatorInfoWrapper>
                <img src={post.creator.imageUrl} alt="creator" />
                <Typography fontSize="16px" lineHeight="140%" fontWeight={500} color="primary.light">
                  {post.creator.name}
                </Typography>
              </CreatorInfoWrapper>
            )}
            {showStats && <PostStats post={post} userId={user.id} />}
          </InformationWrapper>
        </Post>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled("ul")(({ theme }) => ({
  width: "100%",
  display: "grid",
  gap: "28px",
  maxWidth: "1024px",
  gridTemplateColumns: "repeat(1, minmax(0, 1fr))",

  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(1, minmax(0, 1fr))",
  },

  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  },

  [theme.breakpoints.up("xl")]: {
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  },
}));

const Post = styled("li")({
  position: "relative",
  minWidth: "320px",
  height: "320px",
});

const ImageWrapper = styled(Link)({
  display: "flex",
  borderRadius: "24px",
  border: "1px solid #1F1F22",
  overflow: "hidden",
  cursor: "pointer",
  width: "100%",
  height: "100%",

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
});

const InformationWrapper = styled("div")({
  position: "absolute",
  bottom: 0,
  padding: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  backgroundImage: "linear-gradient(to top, #101012, transparent)",
  borderBottomRightRadius: "24px",
  borderBottomLeftRadius: "24px",
  gap: "4px",
});

const CreatorInfoWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "4px",
  flex: 1,

  img: {
    height: "32px",
    width: "32px",
    borderRadius: "50%",
  },
});

export default GridPostList;
