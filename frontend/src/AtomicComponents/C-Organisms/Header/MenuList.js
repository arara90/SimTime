import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//context
import { MenuContext } from "../../../contexts/menuContext";

//component
import { MAIN_COLOR, ST_GRAY } from "../../Colors";
import MenuActive from "../../A-Atomics/Menu/MenuActive";
import MenuInactive from "../../A-Atomics/Menu/MenuInactive";
import MenuLink from "../../A-Atomics/Menu/MenuLink";

const Wrap = styled.div`
  // // border: solid 1px blue;
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;

  padding-left: 15px;
  padding-right: 15px;
}

`;

function MenuList(props) {
  const { menus, activeMenu, handleMenu } = useContext(MenuContext);

  const ActiveMenuRender = (name) => {
    return <MenuActive>{name}</MenuActive>;
  };

  const InavtiveMenuRender = (name) => {
    return <MenuInavtive>{name}</MenuInavtive>;
  };

  const renderMenus = (menus) => {
    return menus.map((menu) => {
      var { src, name } = menu;
      return (
        <MenuLink key={src} src={src} handleClick={() => handleMenu(src)}>
          {activeMenu == src
            ? ActiveMenuRender(name)
            : InavtiveMenuRender(name)}
        </MenuLink>
      );
    });
  };

  return <Wrap {...props}>{renderMenus(menus)}</Wrap>;
}

// export default React.memo(MenuList);
export default MenuList;

MenuList.propTypes = {};

MenuList.defaultProps = {};

// export default connect(mapStateToProps, { logout });
