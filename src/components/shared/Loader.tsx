import { styled } from "@mui/material";

const Loader = () => (
    <Wrapper className="flex-center w-full">
      <img 
        src="/assets/icons/loader.svg" 
        alt="loader"
        width={24}
        height={24}
      />
    </Wrapper>
);

const Wrapper = styled("div")({});

export default Loader;