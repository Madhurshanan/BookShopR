import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, View } from 'react-native';
import BookStackNavigation from './routes/StackNavigator';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <BookStackNavigation />
      </NavigationContainer>
    </>
  );
};

export default App;
