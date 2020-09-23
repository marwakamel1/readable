import React , {Component} from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {formatDate}  from '../utils/helpers'
import {TiArrowUpOutline,TiArrowDownOutline,TiTrash, TiEdit} from "react-icons/ti";
import {handleDeleteComment,handleEditComment,handleVoting} from '../actions/comments'

class Comment extends Component {
	 state = { text:this.props.comment.body,editMode: false}
	 handleChange =(event)=> {
    const {value} = event.target
      this.setState({text:value})
  }
   editMode =(event) =>{
   	event.preventDefault();
   	this.setState((prevState)=>({editMode:! prevState.editMode}))
   }
  handleSubmit =(event) => {
    event.preventDefault();
    const {id} = this.props.comment
    const {text} = this.state
    this.props.dispatch(handleEditComment(id,text))
    this.setState({editMode:false})
  }
    deleteComment = (e)=> {
	  e.preventDefault()
      const {id} = this.props.comment
      this.props.dispatch(handleDeleteComment(id))
     
	}
	vote =(option) => {
		 const {id} = this.props.comment
		 this.props.dispatch(handleVoting(id,option))
	}
	render(){
		const {text,editMode} =this.state
		const {id,timestamp,body,author,voteScore} = this.props.comment
		return(
	      <div className="tweet">
	         <div  style={{width : '100%'}}>
	          <div >
	           <Link to={`/comment/${id}`} className='tweet-info'>
	           <div>
	            <div>commented by {author}</div>
	           
	            <div>{formatDate(timestamp)}</div>
	            <p style={{wordBreak: "break-word"}}>{body}</p>
	             </div>
	            </Link>
	          </div>
	          <div className='tweet-icons' style={{position:"relative"}}>
	            <TiArrowUpOutline className='tweet-icon' onClick={() => this.vote("upVote")}/>
	            <span>{voteScore > 0 && voteScore}</span>
	            <TiArrowDownOutline className='tweet-icon' onClick={() => this.vote("downVote")}/>
	            <span>{voteScore < 0 && voteScore}</span>
	            <span style={{float: "right",position: "absolute",right: "0px" }}>
	           
	            <TiEdit className='tweet-icon pull-right' style={{marginRight:"15px"}} onClick={this.editMode}/>
	           
	            <TiTrash className='tweet-icon' onClick={this.deleteComment}/>       
	            </span>
	          </div>
	          {editMode === true && (
                  <form onSubmit={this.handleSubmit} style={{marginTop:"15px"}}>
                    <label>
			          <input type="text"  value={text} onChange={this.handleChange} className='input'/>
			        </label>
			        <input type="submit" value="Edit"  className='btn' disabled={text === '' }style={{width:"100px ",marginLeft:"10px"}}/>
                  </form>
	          	)}
	        </div>
			</div>
			)
	}
}

function mapStateToProps({comments},{id}){
	let comment = {}
    Object.keys(comments).map (key => {if(comments[key].id === id) comment= comments[key]})
  return {comment }
}
export default connect(mapStateToProps)(Comment)