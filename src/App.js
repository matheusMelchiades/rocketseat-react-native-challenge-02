import './config/Reactotron';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Repositories from './screens/Repositories';
import Issues from './screens/Issues';

const AppNavigator = createStackNavigator({
   Repositories: {
      screen: Repositories
   },
   Issues: {
      screen: Issues
   }
}, { initialRouteName: "Repositories" });

export default createAppContainer(AppNavigator);
