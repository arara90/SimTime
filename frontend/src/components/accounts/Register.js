import React, { Component } from "react";
import { Link,Redirect } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { register } from "../../redux/actions/auth";
import { createMessage } from "../../redux/actions/messages";
import InputProfile from "../../AtomicComponentsVer2/atom/forms/InputProfile"

const Image = styled(InputProfile)`

`

export class Register extends Component {

  state = {
    username: "",
    email: "",
    password: "",
    password2: "",
    profile_image: null,
    isDone: false
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticates: PropTypes.bool
  };


  onSubmit = async e => {
    e.preventDefault();
    const { username, email, password, password2, profile_image} = this.state;
    if (password != password2) {
      this.props.createMessage({ passwordsNotMatch: "Passwords do not match" });
    } 

    else {
      const newUser = {
        username,
        email,
        password,
        profile_image
      };
      var res = await this.props.register(newUser);
      if(res=='201') this.setState({ isDone: true})
    }
  };

  onChange = e => {
    console.log(this.state)
    this.setState({ [e.target.name]: e.target.value })
  };

  handleImageFile = img => {
    console.log(img)
    this.setState({ ...this.state, profile_image : img })
  }

  render() {
    const { username, email, password, password2, profile_image } = this.state;
    const isEdit = this.props.isAuthenticated;

    if (this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    if(this.state.isDone){
      return <Redirect to="/login" />
    }
  
    return (
        <div className="col-md-6 m-auto">
          <div className="card card-body mt-5">
            <h2 className="text-center" style={{marginBottom: "10px"}}>Register</h2>
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
                  onChange={this.onChange}
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
                  Register
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
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register, createMessage })(Register);
