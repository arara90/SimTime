import React, { useState, useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
//context
import { MenuContext } from "../../../contexts/menuContext";

//component
import { MAIN_COLOR, ST_GRAY } from "../../Colors";
import MenuActive from "../../A-Atomics/Menu/MenuActive";
import MenuInActive from "../../A-Atomics/Menu/MenuInActive";
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

  const InActiveMenuRender = (name) => {
    return <MenuInActive>{name}</MenuInActive>;
  };

  const renderMenus = (menus) => {
    return menus.map((menu) => {
      var { src, name } = menu;
      return (
        <MenuLink key={src} src={src} handleClick={() => handleMenu(src)}>
          {activeMenu == src
            ? ActiveMenuRender(name)
            : InActiveMenuRender(name)}
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
