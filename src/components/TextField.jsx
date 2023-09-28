import { TextField } from "@mui/material"
import { styled } from "@mui/material/styles"

const mainPrimary = `#04A5FF`
// const secondary = `#0AFF05`

const CssTextField = styled(TextField)({
  // "& label": { color: "#000000" },
  // "& helperText": { color: "#000000" },
  // "& .MuiInputBase-input": { color: "#000000" },

  // label color  after click
  "& label.Mui-focused": {
    transition: "all 0.3s ease-in-out",
    color: mainPrimary,
  },

  "& .MuiOutlinedInput-root": {
    // border before click
    "& fieldset": {
      transition: "all 0.3s ease-in-out",
      borderColor: "#000000",
    },

    // border after click
    "&.Mui-focused fieldset": {
      transition: "all 0.3s ease-in-out",
      color: mainPrimary,
      border: "1px solid",
    },
  },
})

export default CssTextField
