import React, { Component, Fragment } from "react";
import ReactDom from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import Alerts from "./layout/Alerts";
import Login from "./accounts/Login";
import Register from "./accounts/Register";
import PrivateRoute from "./common/privateRoute";

//redux
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import GlobalStyle from "../AtomicComponents/GlobalStyle";
import Header from "../AtomicComponents/D-Templates/Header";

//Page
import CalendarPage from "../AtomicComponents/E-Pages/CalendarPage";
import FriendsPage from "../AtomicComponents/E-Pages/FriendsPage";
import MySimtimePage from "../AtomicComponents/E-Pages/MySimtimePage";
import TestPage from "../AtomicComponents/E-Pages/TestPage";
import { ModalProvider } from "../contexts/modalContext";
import { MenuProvider } from "../contexts/menuContext";

const alertOptions = {
  timeout: 3000,
  position: "top center",
  //expected one of ["top left","top center","top right","middle left","middle","middle right","bottom left","bottom center","bottom right"]
};

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    // return (
    //   <Fragment>
    //     <GlobalStyle />
    //     <AppContents>
    //       <Header />
    //       <CalendarPage />
    //     </AppContents>
    //   </Fragment>
    // );
    // return (
    //   <Provider store={store}>
    //     <AlertProvider template={AlertTemplate} {...alertOptions}>
    //       <HashRouter>
    //         <Fragment>
    //           <Header />
    //           <Alerts />
    //           <div id="app-contents">
    //             <Switch>
    //               <PrivateRoute exact path="/" component={Dashboard} />
    //               <Route exact path="/register" component={Register} />
    //               <Route exact path="/login" component={Login} />
    //             </Switch>
    //           </div>
    //         </Fragment>
    //       </HashRouter>
    //     </AlertProvider>
    //   </Provider>
    // );

    return (
      <Provider store={store}>
        <ModalProvider>
          <MenuProvider>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
              <HashRouter>
                <Fragment>
                  <GlobalStyle />
                  <div className="app-contents">
                    <Header />
                    <Alerts />
                    <Switch>
                      <PrivateRoute exact path="/" component={CalendarPage} />
                      <PrivateRoute
                        exact
                        path="/friends"
                        component={TestPage}
                      />
                      <PrivateRoute
                        exact
                        path="/mysimtime"
                        component={MySimtimePage}
                      />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                    </Switch>
                  </div>
                </Fragment>
              </HashRouter>
            </AlertProvider>
          </MenuProvider>
        </ModalProvider>
      </Provider>
    );
  }
}

ReactDom.render(<App />, document.getElementById("app"));
