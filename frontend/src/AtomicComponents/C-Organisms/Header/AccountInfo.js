import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MAIN_COLOR, ST_GRAY } from "../../Colors";
import Account from "../../B-Molecules/User/Account";

const AccountWrap = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    @media only screen and (max-width: 560px) {
        display: none;
    }
`;


// function Account(props) {
//   const { isAuthenticated, user } = props.auth;
//   console.log(props.auth)
// const {  user } = props.auth;
//   return (
//         <AccountWrap>
//           {/* <Account username={user ? user.username : "unknown"} /> */}
//           <Account username="hello" />
//         </AccountWrap>
//     );
// }



function AccountInfo(props) {

  return (
        <AccountWrap {...props}>
            <Account />
        </AccountWrap>
    );
}

export default AccountInfo;
