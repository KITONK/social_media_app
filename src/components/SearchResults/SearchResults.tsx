import { Models } from "appwrite";
import { Typography, styled } from "@mui/material";

import Loader from "../Loader/Loader";
import GridPostList from "../GridPostList/GridPostList";

type Props = {
  isSearchFetching: boolean;
  searchedPosts?: Models.DocumentList<Models.Document>;
};

const SearchResults = ({ isSearchFetching, searchedPosts }: Props) => {
  if (isSearchFetching)
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );

  if (searchedPosts && searchedPosts.documents.length > 0) return <GridPostList posts={searchedPosts.documents} />;

  return (
    <Typography color="#5C5C7B" marginTop="40px" textAlign="center" width="100%">
      No results found
    </Typography>
  );
};

const LoaderWrapper = styled("div")({
  margin: "auto",
});

export default SearchResults;
