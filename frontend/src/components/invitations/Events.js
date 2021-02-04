import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { getEvents, deleteEvent, getEvent } from "../../redux/actions/events";
import { connect } from "react-redux";
// import { openModal, closeModal } from "../../redux/actions/modal";
import ModalPortal from "../layout//ModalPortal";
import { EventForm } from "./EventForm";

import Modal from "../layout/Modal";

const EventModal = Modal;

export class Events extends Component {
  static propTypes = {
    events: PropTypes.array.isRequired,
    getEvents: PropTypes.func.isRequired,
    deleteEvent: PropTypes.func.isRequired,
  };

  //Modal
  state = {
    modal: false,
    eventId: null,
  };

  handleOpenModal = (id) => {
    if (id) {
      this.props.getEvent(id);
    }

    this.setState({
      modal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({
      modal: false,
    });
  };

  componentDidMount() {
    console.log("getEvents Mount props : ", this.props);
    this.props.getEvents();
  }

  render() {
    return (
      <Fragment>
        <h2> My Events </h2>
        <button
          className="btn btn-sm"
          onClick={() => {
            this.handleOpenModal(null);
          }}
        >
          Create
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
              <th>Todo</th>
              <th>Invite</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.events.map((event) => (
              <tr key={event.id}>
                <td> {event.id}</td>
                <td> {event.event_name}</td>
                <td> {event.status}</td>
                <td> {event.event_at}</td>
                <td> {event.message}</td>
                <td>
                  <button className="btn  btn-success btn-sm">Invite</button>
                </td>
                <td>
                  <button
                    className="btn btn-sm"
                    onClick={this.props.deleteEvent.bind(this, event.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      this.handleOpenModal(event.id);
                    }}
                  >
                    edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {this.state.modal && (
          <ModalPortal
            children={<EventModal onClose={this.handleCloseModal}></EventModal>}
          ></ModalPortal>
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  events: state.events.events,
  modal: state.modal,
});

export default connect(mapStateToProps, {
  getEvents,
  deleteEvent,
  getEvent,
})(Events);
