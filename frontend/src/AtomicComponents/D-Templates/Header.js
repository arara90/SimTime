// hook> useMemo에서 menu 수정(/-> calendar, comp는 개발 후 메뉴리스트에서 삭제)
// MenuList width 반응형으로 수정할 것 

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

const Wrap = styled.header`

`;

const ContentWrap = styled.div`

  width: 100%;
  max-width: 1464px;
  margin: 0 auto;
  border-bottom: solid 1px ${ST_GRAY};
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media only screen and (max-width: 680px) {
    justify-content: space-around;
  }

  @media only screen and (max-width: 560px) {
    justify-content: center;
    height: 40px;
  }
`;

const SimtimeLogo= styled(Logo)`
  padding-left: 20px;
  @media only screen and (max-width: 680px) {
    display: none;
  }
`

const Account = styled(AccountInfo)`
  padding-right: 20px;
`


function Header(props) {

  return (
    <Wrap id="simtime-header">
      <ContentWrap>
        <SimtimeLogo />
        <MenuList/>
        <Account /> 
      </ContentWrap>
    </Wrap>
  );
}

export default Header;



//  const { isAuthenticated, user } = props.auth;

  // //ActiveMenu는 context로 하자.
  // const [activeMenu, setActiveMenu] = useState(0);

  // const handleClick = (e, menu) => {
  //   setActiveMenu(menu);
  // };

  // const ActiveMenuRender = (menuName) => {
  //   return <MenuActive>{menuName}</MenuActive>
  // };

  // const InavtiveMenuRender = (menuName) => {
  //   return <MenuInavtive>{menuName}</MenuInavtive>
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
  //         <StyledLink to={"/"} onClick={e=>handleClick(e, 0)}>{ activeMenu == 0 ? ActiveMenuRender("CALENDAR") : InavtiveMenuRender("CALENDAR") }</StyledLink>
  //         <StyledLink to={"/mysimtime"} onClick={e=>handleClick(e, 1)}>{activeMenu == 1 ? ActiveMenuRender("MY SIMTIME") : InavtiveMenuRender("MY SIMTIME") }</StyledLink>
  //         <StyledLink to={"/friends"} onClick={e=>handleClick(e, 2)}>{ activeMenu == 2 ? ActiveMenuRender("FRIENDS") : InavtiveMenuRender("FRIENDS") }</StyledLink>
  //       </MenuList>
  //       <AccountWrap>
  //         <Account username={user ? user.username : "unknown"} />
  //       </AccountWrap>
  //     </ContentWrap>
  //   </Wrap>
  // );

  