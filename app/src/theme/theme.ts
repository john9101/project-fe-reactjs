import {createTheme} from "@mui/material/styles";

const theme = createTheme({
    components: {
        MuiTabs: {
          styleOverrides: {
              indicator: {
                  backgroundColor: "#D19C97",
              }
          }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontFamily: 'Manrope',
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    letterSpacing: '-0.5px',
                    '&.Mui-selected': {
                        color: "#D19C97",
                        fontWeight: 800,
                        border: 'none',
                        outline:'none'
                    }
                }
            }
        }
    }
})

export default theme;