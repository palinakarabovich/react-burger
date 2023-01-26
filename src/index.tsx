import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/app/app';
import { Provider } from 'react-redux'
import { store } from './services';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
<<<<<<< HEAD
  </React.StrictMode>,
  document.getElementById('root')
=======
  </React.StrictMode>
>>>>>>> main
);
