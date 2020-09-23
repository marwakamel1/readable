import {RECIEVE_CATEGORIES} from '../actions/categories'

export function categories (state= [],action) {
	switch(action.type) {
		case RECIEVE_CATEGORIES : 
		 return state.concat(action.categories)
		default : 
		  return state
	}

}