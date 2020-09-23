import {GET_POST_COMMENTS,ADD_COMMENT,DELETE_COMMENT,EDIT_COMMENT,VOTE_COMMENT} from '../actions/comments'
export  function comments (state={},action) {
  switch(action.type){

  	case GET_POST_COMMENTS : 
  	  return {...state,...action.comments}
    case ADD_COMMENT : 
      return {...state,
      	[Object.keys(state).length + 1]:action.comment}
    case DELETE_COMMENT : 
        let removedId =''
		 Object.keys(state).map(key => {if (state[key].id === action.id) removedId=key}) 
		 const {[removedId]:value,...rest} = state
		 return rest
	case EDIT_COMMENT : 
		var id = ''
		Object.keys(state).map(key => {if (state[key].id === action.comment.id) id=key}) 
		  return {...state , 
		          [id]: action.comment}
    case VOTE_COMMENT :
		  var id = ''
		Object.keys(state).map(key => {if (state[key].id === action.comment.id) id=key}) 
		  return {...state , 
		          [id]: action.comment}
  	default : 
		  return state
  }
}