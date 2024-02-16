import { styled } from "@mui/material";
import { Outlet } from "react-router-dom";

import Topbar from "@/components/Topbar/Topbar";
import Bottombar from "@/components/Bottombar/Bottombar";
import LeftSidebar from "@/components/Sidebar/LeftSidebar";
import RightSidebar from "@/components/Sidebar/RightSidebar";

const RootLayout = () => (
  <Wrapper>
    <Topbar />
    <LeftSidebar />

    <Section>
      <Outlet />
    </Section>

    <RightSidebar />
    <Bottombar />
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
