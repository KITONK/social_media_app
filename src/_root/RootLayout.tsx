import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "@/components/Topbar/Topbar";
// import Bottombar from "@/components/shared/Bottombar";
// import LeftSidebar from "@/components/shared/LeftSidebar";
// import RightSidebar from "@/components/shared/RightSidebar";

const RootLayout = () => (
  <Wrapper>
    <Topbar />
    {/* <LeftSidebar /> */}

    <Section>
      <Outlet />
    </Section>

    {/* <RightSidebar />
    <Bottombar /> */}
  </Wrapper>
);

const Wrapper = styled("div")(({ theme }) => ({
  width: "100%",

  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const Section = styled("section")({
  display: "flex",
  flex: 1,
  height: "100%",
});

export default RootLayout;
