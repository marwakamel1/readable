import React  from 'react'
import {connect} from 'react-redux'
import Post from './post'
import {handleComments} from '../actions/comments'
import Comment from './comment'
import NewComment from './addComment'
import ErrorPage from './404error'

class PostDetail extends React.Component {
    	componentDidMount () {
		 const {id} = this.props
		 this.props.dispatch(handleComments(id))
	}
	render(){
		if(this.props.id === null) {return <ErrorPage/>}
		const {id,filtered} = this.props
		return (
               <div className="container" style={{margin:"0 auto"}}>
                <Post id={id} flag={true}/>
                <NewComment id={id} /> 
                {filtered.length !== 0 && (<h3 className='center'>Comments</h3>)}
	              <ul>
	               {filtered.map((reply)=>(<li key={reply}><Comment id={reply}/></li>))}
	              </ul>
               </div>
			)
	}
}
function mapStateToProps({posts,comments},props){
  const {id} = props.match.params
  let filtered = Object.keys(comments).filter(key => comments[key].parentId === id)
   filtered= filtered.map(key => comments[key].id)
  let flag = false
  Object.keys(posts).map(key => {if (posts[key].id===id) flag=true ;})
  return {id:flag === true ? id : null ,filtered}
}
export default connect(mapStateToProps)(PostDetail)