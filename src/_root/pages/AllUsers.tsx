import { useEffect } from "react";
import { Typography, styled } from "@mui/material";
import { useInView } from "react-intersection-observer";

import Loader from "@/components/Loader/Loader";
import { multiFormatDateString } from "@/lib/utils";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";

const AllUsers = () => {
  const { ref, inView } = useInView();
  const { data: users, fetchNextPage, hasNextPage } = useGetUsers();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  if (!users) {
    return (
      <UserLoaderWrapper>
        <Loader />
      </UserLoaderWrapper>
    );
  }

  return (
    <Wrapper>
      <InnerContainer>
        <Typography
          fontSize={{ xs: "24px", md: "30px" }}
          fontWeight={600}
          lineHeight="140%"
          letterSpacing="-0.8px"
          width="100%"
          textAlign="left"
          color="primary.light"
        >
          All Users
        </Typography>
      </InnerContainer>

      <Content>
        {users &&
          users.pages.map((item, index) => (
            <UserWrapper key={`user-${index}`}>
              {item?.documents?.map((creator) => (
                <UserInnerWrapper key={creator.$id}>
                  <ImageNTextWrapper>
                    <Image src={creator.imageUrl} alt={creator.name} />
                    <TextWrapper>
                      <Typography fontSize="18px" fontWeight={600} lineHeight="140%" color="primary.light">
                        {creator.name}
                      </Typography>
                      <Typography fontSize="14px" fontWeight={400} lineHeight="140%" color="#7878A3">
                        @{creator.username}
                      </Typography>
                    </TextWrapper>
                  </ImageNTextWrapper>
                  <Typography fontSize="14px" fontWeight={400} lineHeight="140%" color="primary.light">
                    Joined {multiFormatDateString(creator.$createdAt)}
                  </Typography>
                </UserInnerWrapper>
              ))}
            </UserWrapper>
          ))}
      </Content>

      {hasNextPage && (
        <LoaderWrapper ref={ref}>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

const UserLoaderWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
});

const Wrapper = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  alignItems: "center",
  overflowY: "scroll",
  padding: "40px 20px",

  [theme.breakpoints.up("md")]: {
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

const InnerContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  gap: "24px",
  maxWidth: "1024px",
});

const Content = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "36px",
  width: "100%",
  maxWidth: "1024px",
  marginTop: "24px",
});

const UserWrapper = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  width: "100%",
  gap: "24px",
});

const UserInnerWrapper = styled("div")({
  display: "flex",
  width: "100%",
  alignItems: "center",
  justifyContent: "space-between",
});

const ImageNTextWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const Image = styled("img")({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  objectFit: "contain",
});

const TextWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
});

const LoaderWrapper = styled("div")({
  marginTop: "40px",
});

export default AllUsers;
