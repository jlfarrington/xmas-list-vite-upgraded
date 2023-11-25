import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
	palette: {
		primary: {
			main: "#004000",
		},
		secondary: {
			main: "#FFFFFF",
		},
		accent: {
			main: "#400040",
		},
		error: {
			main: red.A400,
		},
	},
	typography: {
		subtitle1: {
			fontStyle: "italic",
		},
		subtitle2: {
			fontWeight: "700",
			fontSize: 16,
		},
	},
});

export default theme;
