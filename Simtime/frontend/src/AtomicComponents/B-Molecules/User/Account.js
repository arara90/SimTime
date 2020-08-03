import React, {Fragment} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import Paragraph from '../../A-Atomics/Font/Paragraph'
import MenuLink from '../../A-Atomics/Menu/MenuLink'
import ImageUser from '../../A-Atomics/ImageUser'
import {logout} from '../../../actions/auth'


const Wrap = styled.div`
    width: auto;
    display : flex;
    flex-direction : row;
    justify-content: flex-end;
    align-items: center;
`
const StyledLink = styled(MenuLink)`
    width: auto;
    display : flex;
    flex-direction : row;
    justify-content: flex-end;
    align-items: center;
`

const Image = styled(ImageUser)`
`

const Name = styled(Paragraph)`
    padding-left: 15px;
    line-height: ${props=>props.height};
    text-decoration : underline;
`

const Action = styled(Paragraph)`
    padding-left: 15px;
    text-decoration : underline;
`



function Account(props) {
    const image = props.user.profile_image ? props.user.profile_image : props.defaultUrl

    const renderUser = () => {
        return (
            <Fragment>
                <MenuLink src="/friends">
                    <Image url={image} width={props.imageSize} height={props.imageSize}/>
                </MenuLink>
                <MenuLink src="/friends">
                    <Name color= "ST_GRAY" fontSize="13px" height={props.imageSize}>{props.user.username}</Name>
                </MenuLink>
                <MenuLink src="/" handleClick={()=>props.logout()}>
                    <Action type="button" color= "ST_GRAY" fontSize="13px" >Logout</Action>
                </MenuLink>
            </Fragment>
        );
    }

    const renderLogin = () => {
        return (
            <MenuLink src="/login">
                <Action type="button" color= "ST_GRAY" fontSize="13px" >Login</Action>
            </MenuLink>
        );
    }

    return (
        <Wrap {...props}>
            {props.isAuthenticated ? renderUser() : renderLogin()}
        </Wrap>
    )
}

// import React, { Component } from "react";
// import { Route, Redirect } from "react-router-dom";
// import { connect } from "react-redux";

// const PrivateRoute = ({ component: Component, auth, ...rest }) => {
//   return (
//     <Route
//       {...rest}
//       render={props => {
//         if (auth.isLoading) {
//           return <h2> Loading </h2>;
//         } else if (!auth.isAuthenticated) {
//           return <Redirect to="/login" />;
//         } else {
//           return <Component {...props}> </Component>;
//         }
//       }}
//     />
//   );
// };

// const mapStateToProps = state => ({
//   { user, isAuthenticated } = state.auth
// });

// export default connect(mapStateToProps)(PrivateRoute);



const mapStateToProps = (state) => ({
    user : state.auth.user,
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout})(Account);


Account.propTypes = {
    url: PropTypes.string, 
    username: PropTypes.string, 
    imageSize: PropTypes.string, 
  };

Account.defaultProps = {
    defaultUrl:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/add-yellow.png",
    username: "unknown",
    imageSize: "40px"

};

