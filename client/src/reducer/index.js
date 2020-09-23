import {combineReducers} from 'redux'
import {posts}           from './posts'
import {categories}          from './categories'
import {authedUser}      from './authedUser'
import {loadingBarReducer}  from 'react-redux-loading'
import {comments} from './comments'

export default combineReducers({
	posts,
	categories,
	authedUser,
	comments,
	loadingBar :loadingBarReducer,
})