import React , {Component} from 'react'
import {connect} from 'react-redux'
import {handleDeletePost,handleVoting} from '../actions/posts'
import { Link ,Redirect} from 'react-router-dom'
import {formatDate}  from '../utils/helpers'
import {TiArrowUpOutline,TiArrowDownOutline,TiTrash, TiEdit} from "react-icons/ti";
import {FaCommentDots} from "react-icons/fa"

const list = {
		react :"https://cdn.worldvectorlogo.com/logos/react-1.svg"
		,redux : "https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/sJCfo5xMRL6Blf9H6OSP"
		,udacity : "https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5511/s300/udacity-logo.png"}
		
class Post extends Component {
	state= {
		isHome : false
	}
	deletePost = (e)=> {
	  e.preventDefault()
      const {id} = this.props.post
      this.props.dispatch(handleDeletePost(id))
      this.setState({isHome : true})
	}
	vote =(option) => {
		 const {id} = this.props.post
		 this.props.dispatch(handleVoting(id,option))
	}

	render(){
		if(this.state.isHome === true){return <Redirect to='/' />}
		const {id,timestamp,title,body,author,category,voteScore,commentCount} = this.props.post
        var  tr = '' 
        switch(category){
        	case 'react' : 
              tr= "#f0f2f2"
              break ;
            case 'redux' :
             tr= "#faf0ff"
              break ;
            case 'udacity' : 
             tr =  "#f2fbff"

        }
    
        return(

			<div className="tweet" style={{position: "relative",marginLeft:this.props.flag === true?"":0,backgroundColor:this.props.flag === true?"":tr}}>
			 <div id="category" style={{backgroundImage:`url(${list[category]})`,opacity:0.6}}></div>
	         <div  style={{width : '100%'}}>
	          <div >
	           <Link to={`/${category}/${id}`} className='tweet-info' >
	           <div>
	           <span style={{wordBreak: "break-word"}}>{title}</span>
	            <div>posted by {author}</div>
	           
	            <div>{formatDate(timestamp)}</div>
	            <p style={{wordBreak: "break-word"}}>{body}</p>
	             </div>
	            </Link>
	          </div>

	          <div className='tweet-icons' style={{position:"relative",paddingLeft:"10px"}}>
	          <Link to={`/${category}/${id}`}>
	            <FaCommentDots className='tweet-icon' />
	          </Link>
	            <span>{commentCount !== 0 && commentCount}</span>
	            <TiArrowUpOutline className='tweet-icon' name="upVote" onClick={() => this.vote("upVote")}/>
	            <span>{voteScore > 0 && voteScore}</span>
	            <TiArrowDownOutline className='tweet-icon' name="downVote" onClick={()=> this.vote("downVote")}/>
	            <span>{voteScore < 0 && voteScore}</span>
	            <span style={{float: "right",position: "absolute",right: "0px" }}>
	            <Link to={`/post/edit/${id}`}>
	            <TiEdit className='tweet-icon pull-right' style={{marginRight:"15px"}} />
	            </Link>
	            <TiTrash className='tweet-icon' onClick={this.deletePost}/>       
	            </span>
	          </div>
	        </div>
			</div>
			)
	}
}

function mapStateToProps({posts},{id,flag}){
	let post = {}
    Object.keys(posts).map (key => {if(posts[key].id === id) post= posts[key]})
  return {post ,flag}
}
export default connect(mapStateToProps)(Post)