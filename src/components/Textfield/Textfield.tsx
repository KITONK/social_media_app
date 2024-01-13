import {
    FormControl,
    styled,
    TextField as MuiTextField,
    TextFieldProps as MUITextFieldProps,
    Theme,
    InputLabel,
    Typography,
  } from "@mui/material";
  import { FC, ReactElement } from "react";
//   import { ErrorIcon } from "../Icons/Icons";
  
  type CustomTextFieldColor = "primary";
  type CustomTextFieldSize = "medium";
  
  export interface CustomTextFieldProps {
    color?: CustomTextFieldColor;
    size?: CustomTextFieldSize;
    labelText?: string;
    errorText?: string | null;
  }
  
  export type TextFieldProps = Omit<MUITextFieldProps, "color" | "size"> & CustomTextFieldProps;
  
  const Textfield: FC<TextFieldProps> = ({
    color = "primary",
    size = "medium",
    labelText,
    errorText,
    ...props
  }): ReactElement => {
    return (
      <FormControlStyled>
        {labelText && <InputLabelStyled>{labelText}</InputLabelStyled>}
        <TextFieldStyled color={color} size={size} autoComplete="off" {...props} />
        {errorText && (
          <ErrorText>
            <Typography fontSize="12px" color="error.main" lineHeight="18px">
              {errorText}
            </Typography>
          </ErrorText>
        )}
      </FormControlStyled>
    );
  };
  
  const FormControlStyled = styled(FormControl)({
    width: "100%",
    position: "relative",
  });
  
  const TextFieldStyled = styled(({ color, size, ...props }: TextFieldProps) => <MuiTextField color={color} size={size} {...props} />)(
    ({ theme, color, size }) => ({

      "input:-webkit-autofill": {
        "&, &:hover, &:focus, &:active": {
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": theme.palette.primary.main,
          transition: "background-color 9999s ease-in-out 0s",
          boxShadow: `inset 0 0 0px 0px ${theme.palette.secondary.dark}`,
        }
      },

      "& .Mui-error fieldset": {
        borderColor: `red !important`,
        borderWidth: "1px !important",
      },
  
      "& .MuiOutlinedInput-root.Mui-focused.Mui-error fieldset": {
        boxShadow: `0 0 0 3px red !important`,
      },
  
      ...getCustomColor(theme)[color as CustomTextFieldColor],
      ...getCustomSize()[size as CustomTextFieldSize],
    }),
  );
  
  const getCustomColor = (theme: Theme) => ({
    primary: {
      "& fieldset": {
        backgroundColor: `${theme.palette.secondary.dark} !important`,
        borderColor: "transparent",
        borderRadius: "6px",
        borderWidth: "0px",
        transition: "0.3s",
      },
  
      "& .MuiOutlinedInput-root:hover fieldset": {
        borderColor: `${theme.palette.violet.dark} !important`,
      },
  
      "& .MuiOutlinedInput-root.Mui-focused fieldset": {
        borderColor: `${theme.palette.violet.dark} !important`,
        borderWidth: "1px",
      },
  
      "& input.MuiOutlinedInput-input, .MuiSelect-outlined": {
        zIndex: 1,
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        color: theme.palette.primary.main,
      },

      "& .MuiInputAdornment-root": {
        "svg > path": {
            fill: theme.palette.violet.dark,
        },
      },
    },
  });
  
  const getCustomSize = () => ({
    medium: {
      width: "100%",
      "& .MuiOutlinedInput-root": {
        height: "auto",
        maxHeight: "48px",
      },
    },
  });

  const InputLabelStyled = styled(InputLabel)(({ theme }) => ({
    fontSize: "14px",
    lineHeight: "18px",
    textTransform: "capitalize",
    color: theme.palette.violet.dark,
    top: "-4px",
    transform: "translate(1px, -16px)",
  }));

  const ErrorText = styled("div")({
    position: "absolute",
    bottom: "-10px",
    transform: "translate(1px, 10px)",
  });
  
  export default Textfield;