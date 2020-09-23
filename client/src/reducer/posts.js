import {RECIEVE_POSTS,DELETE_POST,EDIT_POST,ADD_POST,VOTE_POST} from '../actions/posts'

export function posts (state= {},action) {
	switch(action.type) {
		case RECIEVE_POSTS : 
		 return {...state,
            ...action.posts
		 }
		case ADD_POST : 
         return {...state,
      	 [Object.keys(state).length + 1]:action.post}
		case DELETE_POST :
		 let removedId =''
		 Object.keys(state).map(key => {if (state[key].id === action.id) removedId=key}) 
		 const {[removedId]:value,...rest} = state
		 return rest
		case EDIT_POST : 
		var id = ''
		Object.keys(state).map(key => {if (state[key].id === action.post.id) id=key}) 
		  return {...state , 
		          [id]: action.post}
		case VOTE_POST :
		  var id = ''
		Object.keys(state).map(key => {if (state[key].id === action.post.id) id=key}) 
		  return {...state , 
		          [id]: action.post}
		default : 
		  return state
	}

}