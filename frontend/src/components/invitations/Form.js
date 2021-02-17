import React, { Component } from "react";
import { connect } from "react-redux";
import { addInvitation } from "../../redux/actions/invitations";
import PropTypes from "prop-types";

export class Form extends Component {
  state = {
    host: "",
    event_date: "",
    event_time: "",
    status: "",
    message: "",
    guests: ["ara", "ara2", "ara11", "guest2", "guest3", "guest4"],
    created_at: ""
  };

  static propTypes = {
    addInvitation: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  onSubmit = e => {
    e.preventDefault();
    const {
      host,
      event_date,
      event_time,
      status,
      message,
      guests
    } = this.state;

    const invitation = {
      host,
      event_date,
      event_time,
      status,
      message,
      guests
    };

    this.props.addInvitation(invitation);

    this.setState({
      host: "unknown",
      event_date: "",
      event_time: "",
      status: "",
      message: "",
      guests: ["ara", "ara2", "ara11", "guest2", "guest3", "guest4"],
      created_at: ""
    });
    // ,guests,    created_at}
    console.log("submit");
  };

  render() {
    const {
      host,
      event_date,
      event_time,
      status,
      message,
      guests
    } = this.state;

    const { isAuthenticated, user } = this.props.auth;

    return (
      <div className="card card-body mt-4 mb-4">
        <h2>ADD Invitation</h2>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <p>Host : {user.username} </p>
            <label>Date :</label>
            <input
              type="date"
              name="event_date"
              onChange={this.onChange}
              value={event_date}
            />
            <label> Time :</label>
            <input
              type="time"
              name="event_time"
              onChange={this.onChange}
              value={event_time}
            />
          </div>

          <div className="form-group">
            <label>Status :</label>
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="OPEN"
              checked
            />{" "}
            OPEN
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="CLOSED"
            />{" "}
            CLOSED
            <input
              type="radio"
              name="status"
              onChange={this.onChange}
              value="PENDING"
            />{" "}
            PENDING
          </div>

          <div className="form-group">
            <label>Message</label>
            <input
              className="form-control"
              type="text"
              name="message"
              onChange={this.onChange}
              value={message}
            />
          </div>

          <div className="form-group">
            <label>Select Friends</label>
            <select multiple className="form-control" name="guests">
              {guests.map(guest => (
                <option key={guest}>{guest}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
});
//후에 친구 목록 getFriends 만들어야함!
export default connect(mapStateToProps, { addInvitation })(Form);
