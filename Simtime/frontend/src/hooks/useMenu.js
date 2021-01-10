import React from "react";

export default () => {
  //후에 DB로 관리
  let menus = [
    { src: "/", name: "COMP" },
    { src: "/calendar", name: "CALENDAR" },
    { src: "/mysimtime", name: "MY SIMTIME" },
    { src: "/friends", name: "FRIENDS" },
  ];

  let [activeMenu, setActiveMenu] = React.useState("/");
  // let [menus, setMenus] = React.useState(initialMenu);

  let handleMenu = (src = "/") => {
    setActiveMenu(src);
  };

  return { menus, activeMenu, handleMenu };
  // return { activeMenu, handleMenu };
};
