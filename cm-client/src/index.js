import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";
import 'antd/dist/antd.css';

import { Provider } from "react-redux";
import { setUser } from "./action/a-users";
import { setContact } from "./action/a-contacts";

import configureStore from "./store/configstore";

const store = configureStore();

store.subscribe(() => {
  console.log("redux store state", store.getState());
});

if (localStorage.getItem("userAuthToken")) {
  axios
    .get(`http://localhost:3005/users/account`, {
      headers: {
        "x-auth": localStorage.getItem("userAuthToken")
      }
    })
    .then(response => {
      store.dispatch(setUser(response.data));
    });

  axios
    .get('http://localhost:3005/contacts', {
      headers: {
        "x-auth":localStorage.getItem("userAuthToken")
      }
    })
    .then(response => {
      console.log(response);
      const contact = response.data;
      store.dispatch(setContact(contact));
    });
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
