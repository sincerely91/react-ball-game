import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

export const CustomButton = styled(Button)({
  position: "absolute",
  top: "25%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  fontFamily: "inherit",
  color: "#fff",
  fontSize: "50px",
  background: "#ea3b3b",
  padding: "0.5em",
  border: "1px solid #ea3b3b",
  borderRadius: "10px",
  cursor: "pointer",
  boxShadow: "-10px 10px 0 #bb1616",
  transition: "all 0.3s ease-in-out",
  lineHeight: "1",
  textShadow: "-5px 5px 0 #bb1616",
});
