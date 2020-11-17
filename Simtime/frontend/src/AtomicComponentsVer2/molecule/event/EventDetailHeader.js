// import React from 'react';
// import styled from "styled-components";
// import PropTypes from "prop-types";

// import StatusButton from "../../atom/buttons/StatusButton"
// import IconButton from "../../atom/buttons/IconButton"
// import ChevronIcon from "../../atom/icons/ChevronIcon"
// import HeartIcon from "../../atom/icons/HeartIcon"
// import Tag from "../../atom/fonts/Tag"

// import UserCard from "../UserCard"

// import {MAIN_COLOR, TEXT} from "../../Colors";

// const Wrap = styled.header`
//   width: 100%;
//   min-width: 245px;
//   border-bottom: solid 1px ${MAIN_COLOR};
//   height: 100px;
//   padding: 0.5em;

//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
// `

// const EventTitle = styled.div`
//   color: ${MAIN_COLOR};
//   margin-top: 0.5em;
//   font-size: 1.2em;

//   display: flex;
//   flex-direction: row;
//   justify-content: space-around;
//   align-items: flex-start;

//   cursor: default;
// `

// const BackButton = styled(IconButton)`
//   padding-left: 1px;
//   padding-top: 0;
// `

// const LikeButton = styled(StatusButton)`
//   padding-right: 1px;
//   padding-top: 0;
// `

// const BackIcon = styled(ChevronIcon)`
//   transform: rotate(-90deg);
// `

// const Title = styled.div`
//   flex:1;
//   width: 100%;
//   min-width: 0;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: flex-start;
// `
// const TitleText = styled.strong`
//   line-height: 1em;
// `

// const StyledTag = styled(Tag)`
//   width: 100%;
// `

// const User = styled(UserCard)`
//   margin-right: 0.5em;
//   justify-content: flex-end;
// `



// const UserCard = styled(UserCard)`
// `


// function EventDetailHeader(props) {
//   const {title, tags } = props;

//     return (
//         <Wrap>
//           <EventTitle>
//             <BackButton><BackIcon /></BackButton>
//             <Title>
//               <TitleText className="event-title">{title}</TitleText>
//               <StyledTag> {tags.map((tag)=> {return '#'+ tag+" "})}</StyledTag>
//             </Title>
//             <LikeButton color="ST_PINK"><HeartIcon /></LikeButton>
//           </EventTitle>
//           <User reverse/>
//         </Wrap>
//     )
// }


/////////

import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";


import IconButton from "../../atom/buttons/IconButton"
import ChevronIcon from "../../atom/icons/ChevronIcon"
import ImageUser from "../../atom/ImageUser"

import {MAIN_COLOR, TEXT} from "../../Colors";

const Wrap = styled.header`
  width: 100%;
  height: 4rem;
  min-width: 245px;

  padding: 0.5em;  
  border-bottom: solid 1px ${MAIN_COLOR};
  color: ${MAIN_COLOR};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const BackButton = styled(IconButton)`
  padding: 0;
`

const BackIcon = styled(ChevronIcon)`
  transform: rotate(-90deg);
`

const TitleText = styled.h5`
  font-weight: bold;
  padding: 0 0.5em;
  margin: 0;
  flex:1;
`

const User = styled(ImageUser)`
  margin-right: 0.5em;
`

function EventDetailHeader(props) {
  const { event_name, host, tags, backHandler } = props;

    return (
        <Wrap>
            <BackButton onClick={backHandler}><BackIcon /></BackButton>
            <TitleText className="event-title">{event_name}</TitleText>
            <User url={host ? host.profile_image : null } width="2.5em" height="2.5em"/>
        </Wrap>
    )
}

export default EventDetailHeader

EventDetailHeader.propTypes = {
  event_name: PropTypes.string,
  tags: PropTypes.array
};

EventDetailHeader.defaultProps = {
  event_name: "Tremblant In Canada",
  tags: ["tag", "한강", "맥주", "나들이", "tag1", "한강1", "맥1주", "나1들이"]
};
  