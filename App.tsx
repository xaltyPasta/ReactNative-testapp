import React from 'react';
import { Provider } from 'react-redux';
import { store } from './android/app/src/store/store';
import { AppNavigator } from './android/app/src/navigation/AppNavigator';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;