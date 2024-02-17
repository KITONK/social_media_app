import { styled } from "@mui/material";
import { Outlet, Navigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";

const AuthLayout = () => {
  const { isAuthenticated } = useUserContext();

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <Section>
            <Outlet />
          </Section>

          <Image 
            src="/assets/images/side-img.svg"
            alt="logo"
          />
        </>
      )}
    </>
  )
}

const Section = styled("section")(({ theme }) => ({
  display: "flex",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  flexDirection: "column",

  [theme.breakpoints.down("md")]: {
    paddingRight: "16px",
    paddingLeft: "16px",
  },
}));

const Image = styled("img")(({ theme }) => ({
  display: "none",
  height: "100vh",
  width: "50%",
  objectFit: "cover",
  backgroundRepeat: "no-repeat",

  [theme.breakpoints.up("md")]: {
    display: "block",
  },
}));

export default AuthLayout;