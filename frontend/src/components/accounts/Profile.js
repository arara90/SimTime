import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { editProfile } from "../../redux/actions/auth";
import { createMessage } from "../../redux/actions/messages";
import InputProfile from "../../AtomicComponentsVer2/atom/forms/InputProfile"


const Image = styled(InputProfile)`
`
export class Profile extends Component {
  state = {
    username: this.props.user.username,
    email: this.props.user.email,
    password: "",
    password2: "",
    profile_image: this.props.user.profile_image
  };

  static propTypes = {
    editProfile: PropTypes.func.isRequired,
    isAuthenticates: PropTypes.bool
  };


  onSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2, profile_image} = this.state;
    if (password != password2) {
      this.props.createMessage({ passwordsNotMatch: "Passwords do not match" });
    } else {
      const newUser = {
        username,
        email,
        password,
        profile_image
      };

      this.props.editProfile(newUser);
    }
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });
  handleImageFile = img => this.setState({ profile_image : img })

  render() {
    const { username, email, password, password2,profile_image } = this.state;
    const user = this.props.user;
    if (!this.props.isAuthenticated) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center" style={{marginBottom: "10px"}}>My Info</h2>
          <form onSubmit={this.onSubmit}>
          <div className="form-group">
          <label>Profile Image</label>
             <Image src={profile_image} handleImageFile={this.handleImageFile}/>
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                readOnly 
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={this.onChange}
                readOnly 
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={this.onChange}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={this.onChange}
                value={password2}
              />
            </div>



            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Confirm
              </button>
            </div>
          </form>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user : state.auth.user,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { editProfile, createMessage })(Profile);
