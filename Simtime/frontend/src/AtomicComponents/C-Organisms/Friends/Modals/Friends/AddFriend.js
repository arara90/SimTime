import "babel-polyfill";
import React, { Fragment, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//Components
import { MAIN_COLOR } from "../../../../Colors";
import SearchBar from "../../../../C-Organisms/Friends/SearchFriend/SearchBar";
import DefaultModal from "../../../../B-Molecules/Modal/DefaultModal";
import ResultTable from "../../../../C-Organisms/Friends/ResultTable";

//redux-actions
import { addfriend, addToGroup } from "../../../../../actions/friends";

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
  const [friend, setFriend] = useState([]);
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSubmit = async () => {
    try {
      const relationship = await props.addfriend({
        account: props.user.id,
        friend: friend[0],
      });


      var groupData = groups.map((group) => {
        return { relationship: relationship.data.relationshipId, group: group };
      });


      const group = await props.addToGroup(groupData);
      props.onClose();
    } catch (err) {
      console.log("relationshipError", err);
    }
  };

  const renderChild = () => {
    return (
      <Fragment>
        <SearchWrap>
          <SearchBar newFriends afterSearch={(users) => setUsers(users)} />
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
      children={renderChild()}
      totalPage={0}
      handleSubmit={() => handleSubmit()}
      height="500px"
    ></DefaultModal>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups.groups,
});
// export default AddFriend;
export default connect(mapStateToProps, { addfriend, addToGroup })(AddFriend);

AddFriend.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

AddFriend.defaultProps = {
  height: "520px",
  width: "320px",
};
