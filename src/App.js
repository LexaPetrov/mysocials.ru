import { Switch, Route } from 'react-router-dom';
import Layout from './components/Layout'
import ProfileScreen from './components/ProfileScreen'
import MainScreen from './components/MainScreen'

const App = (props) => {
  return (
    <Switch>
      <Layout>
        <Route path={process.env.PUBLIC_URL + '/'} exact component={MainScreen} />
        <Route path={process.env.PUBLIC_URL + '/:publiclink'} component={ProfileScreen} />
      </Layout>
    </Switch>

  )
}

export default App;
