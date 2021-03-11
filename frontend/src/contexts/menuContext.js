import React from "react";
import useMenu from "../hooks/useMenu";

let MenuContext;
let { Provider } = (MenuContext = React.createContext());
let MenuProvider = ({ children }) => {
  let { menus, activeMenu, handleMenu } = useMenu();

  return (
    <Provider value={{ menus, activeMenu, handleMenu}}>
      {children}
    </Provider>
  );
};

export { MenuContext, MenuProvider };
