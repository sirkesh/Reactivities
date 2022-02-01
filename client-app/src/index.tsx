import React from 'react';
import ReactDOM from 'react-dom';

import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css"
import App from './app/layout/App';
import "./app/layout/styles.css";
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { BrowserRouter } from 'react-router-dom';
// import { createBrowserHistory,History  } from 'history';
// import history from 'history';

// interface ChildComponentProps {
//   history : History
//   /* other props for ChildComponent */
// }
//https://github.com/remix-run/history/issues/805 - to fix issue
// export const history: History | any =  createBrowserHistory();
// export const storya: ChildComponentProps = history.createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    <BrowserRouter>
    {/* <Router history={storya}> */}
      <App />
    {/* </Router> */}
    </BrowserRouter>
  </StoreContext.Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
