import { useState, useEffect } from "react";
import { Typography, styled } from "@mui/material";
import { useInView } from "react-intersection-observer";

import useDebounce from "@/hooks/useDebounce";
import Loader from "@/components/Loader/Loader";
import Textfield from "@/components/Textfield/Textfield";
import GridPostList from "@/components/GridPostList/GridPostList";
import SearchResults from "@/components/SearchResults/SearchResults";
import { useGetPosts, useSearchPosts } from "@/lib/react-query/queriesAndMutations";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [search, setSearch] = useState("");
  const debounceValue = useDebounce(search, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } = useSearchPosts(debounceValue);

  useEffect(() => {
    if (inView && !search) fetchNextPage();
  }, [inView, search]);

  if (!posts) {
    return (
      <ExploreLoader>
        <Loader />
      </ExploreLoader>
    );
  }

  const shouldShowSearchResults = search !== "";
  const shouldShowPosts = !shouldShowSearchResults && posts.pages.every((item) => item?.documents.length === 0);

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
          Home Feed
        </Typography>
        <SearchWrapper>
          <img src="/assets/icons/search.svg" width={24} height={24} alt="search" />
          <Textfield type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
        </SearchWrapper>
      </InnerContainer>

      <FilterWrapper>
        <Typography
          fontSize={{ xs: "18px", md: "24px" }}
          fontWeight={600}
          lineHeight=" 140%"
          letterSpacing={{ md: "-0.8px" }}
          color="primary.light"
        >
          Popular Today
        </Typography>

        <DropdownWrapper>
          <Typography
            fontSize={{ xs: "14px", md: "16px" }}
            fontWeight={{ xs: 500, md: 400 }}
            lineHeight="140%"
            color="secondary.main"
          >
            All
          </Typography>
          <img src="/assets/icons/filter.svg" width={20} height={20} alt="filter" />
        </DropdownWrapper>
      </FilterWrapper>

      <Content>
        {shouldShowSearchResults ? (
          <SearchResults isSearchFetching={isSearchFetching} searchedPosts={searchedPosts} />
        ) : shouldShowPosts ? (
          <Typography color="#5C5C7B" marginTop="40px" textAlign="center" width="100%">
            End of posts
          </Typography>
        ) : (
          posts.pages.map((item, index) => <GridPostList key={`page-${index}`} posts={item?.documents} />)
        )}
      </Content>

      {hasNextPage && !search && (
        <LoaderWrapper ref={ref}>
          <Loader />
        </LoaderWrapper>
      )}
    </Wrapper>
  );
};

const ExploreLoader = styled("div")({
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

const SearchWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "0 16px",
  width: "100%",
  borderRadius: "8px",
  backgroundColor: "#1F1F22",

  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
    border: "none !important",
  },
});

const FilterWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  maxWidth: "1024px",
  marginTop: "64px",
  marginBottom: "28px",
});

const DropdownWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  borderRadius: "12px",
  padding: "8px 16px",
  cursor: "pointer",
  backgroundColor: "#101012",
});

const Content = styled("div")({
  display: "flex",
  flexWrap: "wrap",
  gap: "36px",
  width: "100%",
  maxWidth: "1024px",
});

const LoaderWrapper = styled("div")({
  marginTop: "40px",
});

export default Explore;
