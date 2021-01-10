import React, { useCallback, useContext, Fragment } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import TableRow from "../../../A-Atomics/Table/TableRow";
import Paragraph from "../../../A-Atomics/Font/Paragraph";
import UserCardForList from "../../../B-Molecules/User/UserCardForList";
import ButtonWithImage from "../../../B-Molecules/Button/ButtonWithImage";

// import { deleteFriend } from "../../../../redux/actions/friends";
import { deleteFriend, editFriend } from "../../../../redux/actions/friends";

const buttonMargin = 10;
const buttonsWidth = 160 + 8; //"삭제"-26px, "수신차단" or 차단-52 , bittonMargin * 버튼수 => 26 +104 + 30
const buttonDefaultSize = 13 * 4 + 2; //4글자기준

const UserCard = styled(UserCardForList)`
  cursor: pointer;
`;

const Buttons = styled.div`
  width: ${buttonsWidth}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

const ButtonWrap = styled.div`
  ${(props) => (props.width ? "width: " + props.width : "")};
`;

const TextButton = styled(Paragraph)`
  // border: solid 1px red;
  margin-left: ${buttonMargin}px;
  cursor: pointer;
`;

const StyledButtonWithImage = styled(ButtonWithImage)`
  // border: solid 1px red;
  margin-left: ${buttonMargin}px;
`;

function FriendList(props) {
  const renderButton = useCallback(
    (fn, status, content = "차단", color = "TEXT_LINK") => {
      if (status) {
        return (
          <ButtonWrap>
            <TextButton
              color={color}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                fn();
              }}
            >
              {content}
            </TextButton>
          </ButtonWrap>
        );
      } else {
        return (
          <ButtonWrap width={buttonDefaultSize + buttonMargin + 2 + "px"}>
            <StyledButtonWithImage
              width="auto"
              button = {{
                content: "차단",
                url: "https://bucket-simtime.s3.ap-northeast-2.amazonaws.com/static/assets/img/icons/check.png"}
              }
              imgLocation="right"
              onClick={(e) => {
                e.preventDefault();
                fn();
              }}
            />

          </ButtonWrap>
        );
      }
    },
    []
  );

  const renderRows = (friendships = []) => {
    return friendships.map((friendship, index) => {
      return (
        <TableRow rowNum={index} key={friendship.friend.username}>
          <UserCard
            username={friendship.friend.username}
            imageSize="32px"
            url={friendship.friend.profile_image}
          ></UserCard>
          <Buttons>
            {renderButton(
              () => {
                props.editFriend({
                  id: friendship.id,
                  key: 'subscribe',
                  value: !friendship.subscribe,
                });
              },
              friendship.subscribe,
              "수신차단"
            )}
            {renderButton(
              () => {
                props.editFriend({
                  id: friendship.id,
                  key: 'dispatch',
                  value: !friendship.dispatch,
                });
              },
              friendship.dispatch,

              "발신차단"
            )}
            {renderButton(
              () => {
                props.deleteFriend(friendship.id);
              },
              1,
              "삭제",
              "TEXT_WARNING"
            )}
          </Buttons>
        </TableRow>
      );
    });
  };

  return <Fragment>{renderRows(props.friendships)}</Fragment>;
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFriend: (id) => dispatch(deleteFriend(id)),
    editFriend: (data) => dispatch(editFriend(data)),
  };
};
// export default AddGroup;
export default connect(null, mapDispatchToProps)(FriendList);

FriendList.propTypes = {
  title: PropTypes.string,
  headers: PropTypes.array,
  friendships: PropTypes.array
};

FriendList.defaultProps = {
  title: "Table Title",
  headers: null,
  friendships: []
};
