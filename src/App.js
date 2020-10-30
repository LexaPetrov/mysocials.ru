import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'
import ProfileScreen from './components/ProfileScreen'
import MainScreen from './components/MainScreen'
import SettingsScreen from './components/SettingsScreen'
import PrivacyScreen from './components/PrivacyScreen';

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
