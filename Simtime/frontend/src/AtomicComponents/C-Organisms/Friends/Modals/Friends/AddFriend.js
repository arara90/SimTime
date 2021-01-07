import "babel-polyfill";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";
import DefaultModal from "../../../../B-Molecules/Modal/DefaultModal";
import ResultTable from "../../../../C-Organisms/Friends/ResultTable";

//redux-actions
import { addfriend, addToGroup } from "../../../../../redux/actions/friends";
import { searchUsers } from "../../../../../redux/actions/account";

const SearchWrap = styled.div`
  width: 100%;
  padding-bottom: 15px;
`;
const ResultWrap = styled.div`
  width: 100%;
`;
const Result = styled(ResultTable)``;
const Groups = styled(ResultTable)``;

function AddFriend(props) {
  const { closeModal } = props;

  const [users, setUsers] = useState([]);
  const [friend, setFriend] = useState([]);
  const [groups, setGroups] = useState([]);


  const handleSubmit = async () => {
    try {
      //친구 등록
      var friendship = await props.addfriend( {account: props.user.id, friend: friend[0],});
      console.log(friendship)
      if(groups.length){
        var groupData = groups.map((group) => {
          return { friendship: friendship.data.friendshipId, group: group };
        });
        await props.addToGroup(groupData);
      }

      props.closeModal();
    } catch (err) {
      console.log("friendshipError", err);
    }
  };


  const searchFriends = async (field, keyword) => {
    var res = await props.searchUsers(field, keyword)
    setUsers(res)
    console.log("res", res)
  }

  const renderPage = () => {
    return (
      <Fragment>
        <SearchWrap>
          <SearchBar searchFriends={searchFriends} />
        </SearchWrap>
        <ResultWrap>
          <Result
            datas={users}
            title="Result"
            titleColor="MAIN_COLOR"
            width="100%"
            rowNum={3}
            selectHandler={(res) => {
              setFriend(res);
            }}
          />
        </ResultWrap>
        <ResultWrap>
          {friend.length > 0 && (
            <Groups
              datas={props.groups}
              title="Group"
              titleColor="MAIN_COLOR"
              width="100%"
              rowNum={3}
              selectHandler={(res) => {
                setGroups(res);
              }}
              multiple
            />
          )}
        </ResultWrap>
      </Fragment>
    );
  };

  return (
    <DefaultModal
      title="Add Friend"
      pages={[renderPage()]}
      totalPage={1}
      handleSubmit={handleSubmit}
      height="500px"
      closeModal={closeModal}
    ></DefaultModal>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups.groups,
});
// export default AddFriend;
export default connect(mapStateToProps, { addfriend, addToGroup, searchUsers })(AddFriend);

AddFriend.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  closeModal: PropTypes.func,
};

AddFriend.defaultProps = {
  height: "520px",
  width: "320px",
  closeModal: () => {
    console.log("Warning clsModal");
  },
};
