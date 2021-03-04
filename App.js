import React from 'react';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';

import SignInScreen from './screens/SignInScreen';
import RootDrawer from './screens/RootDrawer';

// Redux //
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
// const store = createStore(rootReducer, applyMiddleware(thunk))
// Redux //

// Dev Tools //
import { composeWithDevTools } from 'redux-devtools-extension';
const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk),
  // other store enhancers if any
));
// Dev Tools //

const Stack = createStackNavigator()

const App = () => {
  const theme= {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <NavigationContainer theme={theme}>
          <Stack.Navigator initialRouteName="SignIn" screenOptions={{
            headerShown: false,
          }}>
            <Stack.Screen name="RootDrawer" component={RootDrawer}/>
            <Stack.Screen name="SignIn" component={SignInScreen}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </PaperProvider>
  );
}

export default App;
