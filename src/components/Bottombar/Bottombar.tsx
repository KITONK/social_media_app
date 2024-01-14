import { Typography, styled } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import { bottombarLinks } from "@/constants";

const Bottombar = () => {
  const { pathname } = useLocation();

  return (
    <Wrapper>
      {bottombarLinks.map((link) => {
        const isActive = pathname === link.route;

        return (
          <BottombarLink key={link.label} to={link.route} isActive={isActive}>
            <img src={link.imgURL} alt={link.label} width={16} height={16} />
            <Typography fontSize="10px" lineHeight="140%" fontWeight={500} color="secondary.main">
              {link.label}
            </Typography>
          </BottombarLink>
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled("section")(({ theme }) => ({
  position: "sticky",
  bottom: 0,
  zIndex: 50,
  width: "100%",
  padding: "16px 20px",
  backgroundColor: theme.palette.secondary.dark,
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "12px",

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const BottombarLink = styled(Link)<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  padding: "12px",
  width: "calc(25% - 12px)",
  transitionrPoperty:
    "color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter",
  transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
  transitionDuration: ".15s",

  ...(isActive && {
    backgroundColor: theme.palette.violet.light,
    borderRadius: "10px",

    img: {
      filter: "invert(100%) brightness(100)",
    },
  }),
}));

export default Bottombar;
