import { Switch, Route } from 'react-router-dom';
import Layout from './components/hoc/Layout'
import ProfileScreen from './components/screens/ProfileScreen'
import MainScreen from './components/screens/MainScreen'
import SettingsScreen from './components/screens/SettingsScreen'
import PrivacyScreen from './components/screens/PrivacyScreen';

const App = (props) => {
  return (
    <Layout>
      <Switch>
        <Route path={process.env.PUBLIC_URL + '/settings'} exact component={SettingsScreen} />
        <Route path={process.env.PUBLIC_URL + '/privacy'} exact component={PrivacyScreen} />
        <Route path={process.env.PUBLIC_URL + '/'} exact component={MainScreen} />
        <Route path={process.env.PUBLIC_URL + '/:username'} component={ProfileScreen} />
      </Switch>
    </Layout>
  )
}

export default App;
