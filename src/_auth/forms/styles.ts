import { Typography, styled } from "@mui/material";

export const Wrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  width: "100%",
  maxWidth: "420px",

  img: {
    width: "171px",
    height: "36px",
  },
});

export const Title = styled(Typography)(({ theme }) => ({
  paddingTop: "48px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    paddingTop: "24px",
  },
}));

export const Description = styled(Typography)(({ theme }) => ({
  fontFamily: "Inter",

  [theme.breakpoints.down(768)]: {
    fontSize: "14px",
  },
}));

export const Form = styled("form")({
  marginTop: "32px",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: "24px",
});

export const TextfieldWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "42px",
});

export const BottomText = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "24px",
  textAlign: "center",
  color: theme.palette.secondary.main,
}));

export const LoaderWrapper = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px;"
});
