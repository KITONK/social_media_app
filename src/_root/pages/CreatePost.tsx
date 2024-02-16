import { Typography, styled } from "@mui/material";

import PostForm from "@/components/forms/PostForm";

const CreatePost = () => (
  <Wrapper>
    <Container>
      <Header>
        <img src="/assets/icons/add-post.svg" width={36} height={36} alt="add" />
        <Typography
          fontSize={{ xs: "24px", md: "30px" }}
          fontWeight={600}
          lineHeight="140%"
          letterSpacing="-0.8px"
          width="100%"
          textAlign="left"
          color="primary.light"
        >
          Create Post
        </Typography>
      </Header>

      <PostForm />
    </Container>
  </Wrapper>
);

const Wrapper = styled("div")({
  display: "flex",
  flex: 1,
});

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

const Header = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "start",
  gap: "12px",
  width: "100%",
  maxWidth: "1024px",
});

export default CreatePost;
