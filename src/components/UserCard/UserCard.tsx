import { Typography, styled } from "@mui/material";

import Button from "../Button/Button";

interface Props {
  name: string;
  image: string;
  onClick: () => void;
}

const UserCard = ({ name, image, onClick }: Props) => (
  <Wrapper>
    <img src={image} alt={name} />
    <Typography fontSize="14px" lineHeight="140%" fontWeight={600} color="primary.light">
      {name}
    </Typography>
    <Button onClick={onClick}>Follow</Button>
  </Wrapper>
);

const Wrapper = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.secondary.dark}`,
  padding: "34px 24px",
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  flex: 1,
  columnGap: "12px",
  rowGap: "18px",
  borderRadius: "20px",

  img: {
    width: "54px",
    height: "54px",
    borderRadius: "50%",
  },

  button: {
    width: "100%",
  },
}));

export default UserCard;
