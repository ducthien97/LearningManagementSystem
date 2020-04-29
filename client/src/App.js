import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';
import AppNavBar from './component/AppNavBar';
import ShoppingList from "./component/StudentsList";
import {Switch, Route, BrowserRouter} from 'react-router-dom'
import {Provider} from "react-redux"
import store from "./store"
import {Container} from "reactstrap"
import {loadUser} from './actions/authActions'
import StudentsList from './component/StudentsList';
import StudentInfo from './component/StudentInfo'


class App extends React.Component {
  componentDidMount(){
    store.dispatch(loadUser());
  }
  
  render(){
  return (
    <Provider store = {store}>
    <div className="App">
    <AppNavBar></AppNavBar>
          
      <BrowserRouter>
          <Switch>
            <Route exact path = "/" component = {StudentsList}/> 
              
            
            <Route path = "/:id" component = {StudentInfo}/>

           
          </Switch>
          
      
      
      </BrowserRouter>
      
    </div>
    </Provider>
  );}
}

export default App;