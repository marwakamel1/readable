import React ,{Component} from 'react';
import { BrowserRouter as Router, Route ,Switch} from 'react-router-dom'
import  {  Fragment } from 'react'
import LoadingBar from 'react-redux-loading'
import {connect} from 'react-redux'
import {handleInitialData} from '../actions/shared'
import Home from './home'
import NewPost from './addPost'
import PostDetail from './postDetail'
import '../index.css'
import Edit from './editPost'

class App extends Component {
  componentDidMount (){
   this.props.dispatch(handleInitialData())
     
   }
  render() {
    return (
      <Router>
       <Fragment>
        <LoadingBar/>
        <div className='container' >          
          {this.props.loading === true ? null :  
           <div>
            
            <Switch>
             <Route path='/' exact component={Home}/>
             <Route exact path='/new'  component={NewPost}/>
             <Route path='/:category' exact component={Home}/>
             <Route path='/post/edit/:id' component={Edit}/>
             <Route path='/:category/:id'  component={PostDetail}/>
            </Switch>           
            
            
           </div>
           } 
        </div> 
       </Fragment>
      </Router>
    );
  }
}

function mapStateToProp ({authedUser}){
  return {loading : authedUser ===null}
}

export default connect(mapStateToProp)(App);

