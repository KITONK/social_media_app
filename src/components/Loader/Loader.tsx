import { styled } from "@mui/material";

const Loader = () => (
    <Wrapper>
      <img 
        src="/assets/icons/loader.svg" 
        alt="loader"
        width={24}
        height={24}
      />
    </Wrapper>
);

const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
});

export default Loader;