import React, { Component } from "react";
import { connect } from "react-redux";
import { addEvent, getEvent } from "../../actions/events";
import PropTypes from "prop-types";

export class EventForm extends Component {
  state = {
    id: null,
    event_name: "",
    event_at: "",
    status: "CLOSED",
    message: "",
    host_id: this.props.user.id
  };

  //functions
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    const { event_name, event_at, status, message } = this.state;
    const host_id = this.props.user.id;
    const event = { host_id, event_name, event_at, status, message };
    this.props.addEvent(event);

    //초기화
    this.setState({
      id: null,
      event_name: "",
      event_at: "",
      status: "CLOSED",
      message: "",
      host_id: this.props.user.id
    });
  };

  componentDidMount() {
    if (this.props.event.id) {
      console.log("componentDidMount props: ", this.props);
    }
  }

  render() {
    const { user, event } = this.props;
    const { event_name, event_at, status, message } = this.state;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>{this.props.event ? "Edit" : "Add"} Event</h2>
        <br />
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Host </label>
            <input
              type="text"
              name="host"
              value={user.username ? user.username : "unknown"}
              readOnly
            />{" "}
          </div>
          <div className="form-group">
            <label>Event Name </label>
            <input
              type="text"
              name="event_name"
              onChange={this.onChange}
              value={event_name}
            />
          </div>
          <div className="form-group">
            <label>Date </label>
            <input
              type="datetime-local"
              name="event_at"
              onChange={this.onChange}
              value={event.event_at}
            />
          </div>

          {/* status - 전역에서 공통으로 사용하도록 설정하기 (db화?)*/}
          <div className="form-group">
            <label>Status</label>
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="OPEN"
            />
            OPEN
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="CLOSED"
              checked
            />
            CLOSED
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="PENDING"
            />
            PENDING
          </div>

          <div className="form-group">
            <label>Message</label>
            <input
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={event.message}
            />
          </div>

          {/* <div className="form-group">
            <label>Select Friends</label>
            <select multiple className="form-control" name="guests">
              {guests.map(guest => (
                <option key={guest}>{guest}</option>
              ))}
            </select>
          </div> */}

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }

  static propTypes = {
    user: PropTypes.object,
    event: PropTypes.shape({
      host_id: PropTypes.number,
      event_name: PropTypes.string,
      event_at: PropTypes.string,
      status: PropTypes.string,
      message: PropTypes.string
    })
  };

  static defaultProps = {
    user: { id: null, username: null, email: null },
    event: {
      host_id: null,
      event_name: "",
      event_at: "",
      status: "CLOSED",
      message: ""
    }
  };
}

const mapStateToProps = state => ({
  event: state.events.selectedEvent[0],
  modal: state.modal,
  user: state.auth.user
});

export default connect(mapStateToProps, {
  addEvent,
  getEvent
})(EventForm);
