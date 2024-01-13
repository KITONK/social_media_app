import { useEffect } from "react";
import { IconButton, Typography, styled } from "@mui/material";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";

import { INavLink } from "@/types";
import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <Wrapper>
      <Content>
        <Logo to="/">
          <img src="/assets/images/logo.svg" alt="logo" width={170} height={36} />
        </Logo>

        <ProfileWrapper to={`/profile/${user.id}`}>
          <img src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} alt="profile" />
          <div>
            <Typography fontSize="18px" lineHeight="140%" fontWeight={600} color="primary.light">
              {user.name}
            </Typography>
            <Typography fontSize="14px" lineHeight="140%" color="violet.dark">
              @{user.username}
            </Typography>
          </div>
        </ProfileWrapper>

        <SidebarLinksWrapper>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;

            return (
              <SidebarLink key={link.label} isActive={isActive}>
                <NavLinkStyled to={link.route}>
                  <img src={link.imgURL} alt={link.label} />
                  <Typography fontSize="16px" letterSpacing="140%" fontWeight={600} color="primary.light">
                    {link.label}
                  </Typography>
                </NavLinkStyled>
              </SidebarLink>
            );
          })}
        </SidebarLinksWrapper>
      </Content>
      <IconButtonStyled onClick={() => signOut()}>
        <img src="/assets/icons/logout.svg" alt="logout" />
        <Typography fontSize="14px lg:18px" fontWeight={500} lineHeight="140%" color="primary.light">
          Logout
        </Typography>
      </IconButtonStyled>
    </Wrapper>
  );
};

const Wrapper = styled("nav")(({ theme }) => ({
  display: "none",
  padding: "40px 24px",
  flexDirection: "column",
  justifyContent: "space-between",
  minWidth: "270px",
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

const Logo = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

const ProfileWrapper = styled(Link)({
  display: "flex",
  alignItems: "center",
  gap: "12px",

  img: {
    height: "56px",
    width: "56px",
    borderRadius: "50%",
  },

  "& > div": {
    display: "flex",
    flexDirection: "column",
  },
});

const SidebarLinksWrapper = styled("ul")({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const SidebarLink = styled("li")<{ isActive?: boolean }>(({ theme, isActive }) => ({
  borderRadius: "8px",
  transitionProperty:
    "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter",
  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
  transitionDuration: "150ms",

  "&:hover": {
    backgroundColor: theme.palette.violet.light,

    img: {
      filter: "invert(100%) brightness(100)",
    },
  },

  ...(isActive && {
    backgroundColor: theme.palette.violet.light,

    img: {
      filter: "invert(100%) brightness(100)",
    },
  }),
}));

const NavLinkStyled = styled(NavLink)({
  display: "flex",
  gap: "16px",
  alignItems: "center",
  padding: "16px",
});

const IconButtonStyled = styled(IconButton)({
  display: "flex",
  justifyContent: "start",
  gap: "16px",
});

export default LeftSidebar;
