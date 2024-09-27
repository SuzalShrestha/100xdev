import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import {GlobalProvider} from './contexts/globalProvider';
import Profile from './screens/profile/profile';
const App = () => {
  return (
    // <GlobalProvider>
    //   <AppNavigator />
    // </GlobalProvider>
    <Profile />
  );
};

export default App;
