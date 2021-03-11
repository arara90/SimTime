import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import { MAIN_COLOR, TEXT } from "../../Colors";
import Paragraph from "../../A-Atomics/Font/Paragraph";
import ImageUser from "../../A-Atomics/ImageUser";

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const Image = styled(ImageUser)`
  margin-right: 5px;
`;

const Name = styled(Paragraph)``;

function UserCardForList(props) {
  return (
    <Wrap {...props}>
      <Image width={props.imageSize} height={props.imageSize} url={props.url} />
      <Name fontSize="14px">{props.username}</Name>
    </Wrap>
  );
}

// const mapStateToProps = (state) => ({
//   username : state.user.username
// });

// export default connect(mapStateToProps, {})(UserCard);

export default UserCardForList;

UserCardForList.propTypes = {
  username: PropTypes.string,
  imageSize: PropTypes.string,
};

UserCardForList.defaultProps = {
  username: "unknown",
  imageSize: "40px",
};
