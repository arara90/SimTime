import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//redux-actions
import { getGroups } from "../../redux/actions/groups";
import { getFriends, deleteFriend } from "../../redux/actions/friends";
// import { getHosts } from "../../redux/actions/invitations"

//components
import { ST_WHITE, ST_GRAY } from "../Colors";

import Header from "../A-Atomics/Font/Header";
// import Search from "../B-Molecules/Filter/Search";
import Friends from "../D-Templates/Friends/Friends";
import Groups from "../D-Templates/Friends/Groups";

const Wrap = styled.div`
  overflow: hidden;


  
`;

const Section = styled.div`
  height: auto;
  margin-bottom: ${(props) => props.bottom};
`;

const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  aling-items: flex-end;
`;

// const StyledSearch = styled(Search)`
//   border-bottom: solid 1px ${ST_GRAY};
// `;

const ContentWrap = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

function FriendsPage(props) {
  const { groups, selectedGroup,selectedGroupMembers, friendships } = props;

  useEffect(() => {
    async function getDatas() {
      var friend = await props.getFriends();
      var group = await props.getGroups();
    }
    getDatas();
  }, []);

  return (
    <Wrap>
      <Section bottom="30px">
        <SectionTitle>
          <Header type="h3" color="MAIN_COLOR">
            Friends
          </Header>
          {/* <StyledSearch width="125px" desc="Find a friend" height="25px" /> */}
        </SectionTitle>
        <ContentWrap>
          <Friends
            friendships={friendships}
            rowNum={6}
            rowHeight="45px"
            width="48%"
          />
          <Friends
            friendships={friendships}
            rowNum={6}
            rowHeight="45px"
            width="48%"
          />
        </ContentWrap>
      </Section>

      <Section bottom="0px">
        <Header type="h3" color="MAIN_COLOR">
          Group
        </Header>
        <ContentWrap>
          <Groups
            groups={groups}
            selectedGroup={selectedGroup}
            friendships={friendships}
            selectedGroupMembers = {selectedGroupMembers}
            rowNum={5}
            rowHeight="45px"
            width="100%"
          />
        </ContentWrap>
      </Section>
    </Wrap>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  groups: state.groups.groups,
  selectedGroup: state.groups.selectedGroup,
  selectedGroupMembers : state.groups.selectedGroup.members,
  friendships: state.friends.friendships,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getGroups: () => dispatch(getGroups()),
    getFriends: () => dispatch(getFriends()),
    // getHosts: () => dispatch(getHost())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);
