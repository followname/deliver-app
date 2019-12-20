import React, { Component } from "react";
import AppNavbar from "./components/AppNavbar";
import DeliverModal from "./components/DeliverModal";
import DeliverList from "./components/DeliverList";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <DeliverModal />
            <DeliverList />
          </Container>
        </div>
        <div></div>
      </Provider>
    );
  }
}

export default App;
