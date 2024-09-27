import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {GlobalProvider} from './contexts/globalProvider';

const App = () => {
  return (
    <GlobalProvider>
      <AppNavigator />
    </GlobalProvider>
  );
};

export default App;
