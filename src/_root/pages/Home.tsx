import { useEffect } from "react";
import { Typography, styled } from "@mui/material";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/Loader/Loader";
import PostCard from "@/components/PostCard/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";

const Home = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetRecentPosts();

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (!posts) {
    return (
      <PostsLoader>
        <Loader />
      </PostsLoader>
    );
  }

  return (
    <Wrapper>
      <HomeContainer>
        <HomePosts>
          <Typography
            fontSize={{ xs: "24px", md: "30px" }}
            fontWeight={600}
            lineHeight="140%"
            letterSpacing="-0.8px"
            width="100%"
            textAlign="left"
            color="primary.light"
          >
            Home Feed
          </Typography>
          {posts?.pages.map((item) => (
            <PostCardWrapper>
              {item?.documents.map((post) => (
                <PostCard key={post.$id} post={post} />
              ))}
            </PostCardWrapper>
          ))}
        </HomePosts>
      </HomeContainer>

      {!hasNextPage && (
        <LoaderWrapper ref={ref}>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

const PostsLoader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const Wrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
});

const HomeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  gap: "40px",
  padding: "40px 20px",
  overflowY: "scroll",

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

const HomePosts = styled("div")({
  maxWidth: "640px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "24px",
});

const PostCardWrapper = styled("ul")({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  gap: "36px",
  width: "100%",
});

const LoaderWrapper = styled("div")({
  marginTop: "40px",
});

export default Home;
