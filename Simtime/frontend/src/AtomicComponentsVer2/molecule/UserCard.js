import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";

import * as Colors from "../Colors";
import ImageUser from "../atom/ImageUser"


const Wrap = styled.div`
    color: ${(props)=>Colors[props.color]};
    
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    cursor: default;
`

const StyledImageUser= styled(ImageUser)`
    width: ${({size})=>size};
    height: ${({size})=>size};
    ${({reverse})=> reverse ? "margin-left: 0.2em;" : "margin-right: 0.2em;"};
`

function UserCard(props) {
    const {color, size, reverse, user}=props;

    if(reverse){
        return (
            <Wrap {...props}>
                {user.id}
                <StyledImageUser reverse size={size}></StyledImageUser>
            </Wrap>
        )
    }else{
        return (
            <Wrap {...props}>
                <StyledImageUser url={user.imageUrl} size={size}></StyledImageUser>
                {user.id}
            </Wrap>
        )
    }

}

export default UserCard

UserCard.propTypes = {
    color: PropTypes.string,
    size: PropTypes.string,
    reverse: PropTypes.bool,
    user: PropTypes.object
  };

UserCard.defaultProps = {
    color: "TEXT",
    size: "2em",
    reverse: null,
    user: {id:"admin", imageUrl:"https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/wink2.png"}
  };
  