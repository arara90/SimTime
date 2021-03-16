import React, {useEffect, useState} from 'react';
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { getEvents } from "../../redux/actions/events"
// import {} from "../../util/calendar/"


const Wrap = styled.button`
  width: 100%;
  height: 100%;
  background-color: pink;
`

function GetEventButton(props) {
  const { getEvents, clickHandler } = props;

  const clickEventHandler = () =>{
    var date = new Date();

    //async
    getEvents();
  }
  return <Wrap onClick={clickHandler} />;
}

const mapStateToProps = (state) => ({
  events: state.events,
});

export default connect(mapStateToProps, {getEvents})(GetEventButton);


GetEventButton.propTypes = {};

GetEventButton.defaultProps = {};
  