import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import store from './redux/store';  // Default import here

import { Provider } from 'react-redux'; // import Provider from react-redux

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>  {/* Wrap with Provider */}
      <AuthProvider>
        <App />  {/* App already includes BrowserRouter */}
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
