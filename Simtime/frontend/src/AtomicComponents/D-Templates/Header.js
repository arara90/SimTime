import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

import { MAIN_COLOR, ST_GRAY } from "../Colors";
// import LOGO from "../A-Atomics/Logo";
import MenuList from "../C-Organisms/Header/MenuList"
import Logo from "../C-Organisms/Header/Logo"
import AccountInfo from "../C-Organisms/Header/AccountInfo"
//import Account from "../B-Molecules/User/Account";

const Wrap = styled.header`
  display: flex;
  flex-direction: column;
                                      
  margin-bottom: 15px;
  @media only screen and (max-width: 680px) {
    margin-bottom: 0px;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 62px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 1px ${ST_GRAY};

  @media only screen and (max-width: 680px) {
    justify-content: space-around;
  }

  @media only screen and (max-width: 560px) {
    justify-content: center;
    height: 40px;
  }
`;

// const LogoWrap = styled.div`
//   @media only screen and (max-width: 680px) {
//     display: none;
//   }
// `;

// const MenuList = styled.div`
//   // border: solid 1px blue;
//   display: flex;
//   flex-direction: row;
//   align-items: flex-end;
//   justify-content: space-around;
//   width: 300px;
// `;

const AccountWrap = styled.div`
  width: 150px;

  display: flex;
  flex-direction: row;
  align-items: center;
  @media only screen and (max-width: 560px) {
    display: none;
  }
`;

// const StyledLink = styled(Link)`
//   text-decoration: none;

//   &:focus,
//   &:hover,
//   &:visited,
//   &:link,
//   &:active {
//     text-decoration: none;
//   }
// `;

function Header(props) {
//  const { isAuthenticated, user } = props.auth;

  // //ActiveMenu는 context로 하자.
  // const [activeMenu, setActiveMenu] = useState(0);

  // const handleClick = (e, menu) => {
  //   setActiveMenu(menu);
  // };

  // const ActiveMenuRender = (menuName) => {
  //   return <MenuActive>{menuName}</MenuActive>
  // };

  // const InActiveMenuRender = (menuName) => {
  //   return <MenuInActive>{menuName}</MenuInActive>
  //   }

  // return (
  //   <Wrap>
  //     <ContentWrap>
  //       <LogoWrap>
  //         <StyledLink to={"/"} onClick={e=>handleClick(e, 0)}>
  //         <LOGO />
  //         </StyledLink>
  //       </LogoWrap>
  //       <MenuList>
  //         <StyledLink to={"/"} onClick={e=>handleClick(e, 0)}>{ activeMenu == 0 ? ActiveMenuRender("CALENDAR") : InActiveMenuRender("CALENDAR") }</StyledLink>
  //         <StyledLink to={"/mysimtime"} onClick={e=>handleClick(e, 1)}>{activeMenu == 1 ? ActiveMenuRender("MY SIMTIME") : InActiveMenuRender("MY SIMTIME") }</StyledLink>
  //         <StyledLink to={"/friends"} onClick={e=>handleClick(e, 2)}>{ activeMenu == 2 ? ActiveMenuRender("FRIENDS") : InActiveMenuRender("FRIENDS") }</StyledLink>
  //       </MenuList>
  //       <AccountWrap>
  //         <Account username={user ? user.username : "unknown"} />
  //       </AccountWrap>
  //     </ContentWrap>
  //   </Wrap>
  // );

  
  return (
    <Wrap>
      <ContentWrap>
        <Logo />
        <MenuList/>
        <AccountInfo /> 
      </ContentWrap>
    </Wrap>
  );
}

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, {})(Header);

// export default connect(mapStateToProps, { logout });

export default Header;
