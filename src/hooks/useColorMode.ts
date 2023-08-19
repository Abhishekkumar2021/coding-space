import { ColorModeContext } from "../contexts/ColorModeContext";
import { useContext } from "react";

const useColorMode = () => {
    return useContext(ColorModeContext);
}

export default useColorMode;