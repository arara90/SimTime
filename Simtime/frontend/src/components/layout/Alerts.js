import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };
  componentDidUpdate(prevProps) {
    // this.props.alert.show("It works");

    const { error, alert, message } = this.props;

    if (error !== prevProps.error) {
      if (error.msg.username)
        alert.error(`username: ${error.msg.username.join()}`);
      if (error.msg.email) alert.error(`email: ${error.msg.email.join()}`);
      if (error.msg.password)
        alert.error(`password: ${error.msg.password.join()}`);
      if (error.msg.groupname)
        alert.error(`groupname: ${error.msg.groupname.join()}`);
      if (error.msg.non_field_errors)
        alert.error(error.msg.non_field_errors.join());
    }

    if (message !== prevProps.message) {

      //auth
      if (message.logout) alert.success(message.logout);

      //event
      if (message.deleteEvent) alert.success(message.deleteEvent);
      if (message.addEvent) alert.success(message.addEvent);
      if (message.editEvent) alert.success(message.editEvent);

      //invitation
      if (message.deleteInvitation) alert.success(message.deleteInvitation);
      if (message.addInvitation) alert.success(message.addInvitation);
      if (message.passwordsNotMatch) alert.error(message.passwordsNotMatch);
      //friend
      if (message.addFriend) alert.success(message.addFriend);
      if (message.deleteFriend) alert.success(message.deleteFriend);
      if (message.editFriend) alert.success(message.editFriend);

      //group
      if (message.addGroup) alert.success(message.addGroup);
      if (message.editGroup) alert.success(message.editGroup);
      if (message.deleteGroup) alert.success(message.deleteGroup);

      //members
      if (message.addToGroup) alert.success(message.addToGroup);

      //else
      if (message.emptyField) alert.error(message.emptyField);
    }
  }

  render() {
    return <Fragment />;
  }
}

const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
