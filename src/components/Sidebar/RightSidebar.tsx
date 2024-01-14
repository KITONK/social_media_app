import { Typography, styled } from "@mui/material";

import Loader from "../Loader/Loader";
import UserCard from "../UserCard/UserCard";
import { useGetTopCreators } from "@/lib/react-query/queriesAndMutations";

const RightSidebar = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetTopCreators(); 

  return !isErrorCreators && (
    <Wrapper>
      <Content>
      <Typography fontSize={{ xs: "18px", md: "24px" }} lineHeight="140%" fontWeight={600} color="primary.light" letterSpacing={{ md: "-0.8px" }}>Top Creators</Typography>

        <UserCardWrapper>
          {isUserLoading ? (
            <LoaderWrapper>
              <Loader />
            </LoaderWrapper>
          ) : (
            creators && !!creators.documents.length && creators?.documents.map((creator) => (
              <UserCard key={creator.$id} name={creator.name} image={creator.imageUrl} onClick={() => null} />
          )))}
        </UserCardWrapper>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled("div")(({ theme }) => ({
  display: "none",
  padding: "40px 24px",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: "270px",
  maxWidth: "270px",
  overflow: "hidden auto",
  backgroundColor: theme.palette.secondary.dark,

  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const Content = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "44px",
});

const UserCardWrapper = styled("div")({
  display: "flex",
  flexFlow: "row wrap",
  gap: "24px",
});

const LoaderWrapper = styled("div")({
  margin: "auto",
})

export default RightSidebar;
