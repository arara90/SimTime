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


function AccountInfo(props) {

  return (
        <AccountWrap {...props}>
            <Account />
        </AccountWrap>
    );
}

export default AccountInfo;
