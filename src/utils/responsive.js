import { useMediaQuery } from "react-responsive";

export const useIsLaptopOrDesktop = () =>
  useMediaQuery({ query: "(min-width: 1024px)" });
