import React from 'react';
import styled from "styled-components";
import PropTypes from "prop-types";
import * as Colors from "../../../Colors";

import EventDetailHeader from "../../../molecule/event/EventDetailHeader"
import EventDetailContent from "../../../molecule/event/EventDetailContent"
import SolidButton from "../../../atom/buttons/SolidButton"
import TextButton from "../../../atom/buttons/TextButton"

const Wrap = styled.article`
  width: 100%;
  min-width: 245px;
  border : solid 1px ${Colors.MAIN_COLOR};

  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 0;

`

const Buttons = styled.footer`
  width: 96%;
  padding: 0.5em 1em 1em 1em;
  text-align: center;
`

const JoinButton = styled(SolidButton)`
  font-size: 1.5em;
  font-weight: bold;
  padding: 0;
`

const DeleteButton = styled(TextButton)``

function EventDetail() {
    return (
        <Wrap>
          <EventDetailHeader />
          <EventDetailContent />
          <Buttons>
            <JoinButton color="ST_BLUE">Join</JoinButton>
            <DeleteButton color="ST_GRAY">delete</DeleteButton>
          </Buttons>
        </Wrap>
    )
}

export default EventDetail

EventDetail.propTypes = {
  };

EventDetail.defaultProps = {

  };
  