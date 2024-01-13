import { useEffect } from "react";
import { IconButton, styled } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <Wrapper>
      <Content>
        <Left to="/">
          <img src="/assets/images/logo.svg" alt="logo" width={130} />
        </Left>

        <Right>
          <IconButton onClick={() => signOut()}>
            <img src="/assets/icons/logout.svg" alt="logout" />
          </IconButton>
          <Profile to={`/profile/${user.id}`}>
            <img
              src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
              alt="profile"
            />
          </Profile>
        </Right>
      </Content>
    </Wrapper>
  );
};

const Wrapper = styled("section")(({ theme }) => ({
  position: "sticky",
  top: 0,
  zIndex: 50,
  width: "100%",
  backgroundColor: theme.palette.secondary.dark,

  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

const Content = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingTop: "16px",
  paddingBottom: "16px",
  paddingLeft: "20px",
  paddingRight: "20px",
});

const Left = styled(Link)({
  display: "flex", 
  gap: "12px", 
  alignItems: "center",
});

const Right = styled("div")({
  display: "flex", 
  gap: "16px",
});

const Profile = styled(Link)({
  display: "flex", 
  alignItems: "center",
  justifyContent: "center",

  img: {
    height: "32px", 
    width: "32px", 
    borderRadius: "50%",
  },
})

export default Topbar;
