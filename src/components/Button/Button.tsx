import { Button as MuiButton, ButtonProps as MUIButtonProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FC } from "react";

export interface CustomButtonProps {
  size?: "medium";
  color?: "primary" | "secondary";
  variant?: "fill";
  disabled?: boolean;
}

export type ButtonProps = Omit<MUIButtonProps, "color" | "size" | "variant" | "disabled"> & CustomButtonProps;

const Button: FC<ButtonProps> = ({
  children,
  size = "medium",
  color = "primary",
  variant = "fill",
  disabled = false,
  onClick,
  ...props
}) => {
  const ButtonStyled = styled((props: MUIButtonProps) => <MuiButton disableRipple {...props} />)(({ theme }) => ({
    ...getCustomSize()[size],
    ...getCustomColor(theme)[color],
    ...getCustomVariant()[variant],
    transition: "0.3s",

    ...(disabled && {
      opacity: 0.8,
      cursor: "default",
      "&:hover": {
        opacity: 0.8,
      },
    }),

    textTransform: "none",
  }));

  return (
    <ButtonStyled disableRipple {...props} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
};

const getCustomVariant = () => ({
  fill: {
    border: "none",
  },
});

const getCustomColor = (theme: Theme) => ({
  primary: {
    backgroundColor: `${theme.palette.violet.light} !important`,
    color: theme.palette.primary.main,
  },
  secondary: {
    backgroundColor: `#1F1F22 !important`,
  },
});

const getCustomSize = () => ({
  medium: {
    padding: "8px 16px",
    maxHeight: "40px",
    borderRadius: "6px",
  },
});

export default Button;