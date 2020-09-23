import React  from 'react'
import {connect} from 'react-redux'
import {Container,Row,Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Post from './post'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import { Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,

  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function Home (props){
	    const classes = useStyles();
	    const [state, setState] = React.useState({
		    type: '30',
		  });

		const handleChange = (event) => {
		    const name = event.target.name;
		    setState({
		      ...state,
		      [name]: event.target.value,
		    });
		  };
		const {newest,oldest,voted, categories,category} = props
		var postsList = ''
       		 if ( state.type === '10' )       
              { postsList = <ul style={{width:"100%"}}>{voted.map((key) => (<li key={key} ><Post id={key}/></li>))}</ul> } 
         else if (state.type === '20' ) 

              { postsList = <ul style={{width:"100%"}}>{oldest.map((key) => (<li key={key} ><Post id={key}/></li>))}</ul>}
         else 
              {postsList=<ul style={{width:"100%"}}>{newest.map((key) => (<li key={key} ><Post id={key}/></li>))}</ul>}  
		
		const list = [
		"https://cdn.worldvectorlogo.com/logos/react-1.svg"
		,"https://process.fs.teachablecdn.com/ADNupMnWyR7kCWRvm76Laz/resize=width:705/https://www.filepicker.io/api/file/sJCfo5xMRL6Blf9H6OSP"
		,"https://coursereport-s3-production.global.ssl.fastly.net/rich/rich_files/rich_files/5511/s300/udacity-logo.png"]
		  
		return(
             <Container>
				  <Row style={{paddingTop:"50px"}}>
				    <Col sm={8} >
				      <Row>
				       <FormControl className={classes.formControl}>
					        <InputLabel htmlFor="type-native-helper">Sort by</InputLabel>
					        <NativeSelect
					          value={state.type}
					          onChange={handleChange}
					          inputProps={{
					            name: 'type',
					            id: 'type-native-helper',
					          }}
					        >
					          <option aria-label="None" value="" />
					          <option value={10}>voteScore</option>
					          <option value={20}>Date added (oldest)</option>
					          <option value={30}>Date added (newest)</option>
					        </NativeSelect>
					   </FormControl>
					  </Row>
					  <Row>
					   {postsList}
                      </Row>
				    </Col>
				    <Col sm={4} style={{paddingTop:"50px"}}>
				     <Row>
				       <List className="root"  >
                       {
                        categories.map((category,index) => (
                        <Link to={`/${category.name}`} key={index} >	
                         <ListItem style={{marginBottom:"10px"}} style={category.name === category ? {backgroundColor:'#edeef0'}: {}}>
				          <ListItemAvatar >
				           <Avatar  src={list[index]} style={{width: "60px",height: "60px"}}>
				            <ImageIcon />
				           </Avatar>
				          </ListItemAvatar>
				          <ListItemText primary={category.name}  id="categoryName"/>
				         </ListItem>
                        </Link>
				      ))
                       }
                      
				    </List>
				     </Row>
				     <Row style={{marginTop:40}}>
				      <Link  to={'/new'} style={{width : '100%'}}>
				      <Button variant="contained" color="primary" style={{width : '100%', height:'5rem', fontSize: 'x-large'}}>
						  Add Post
					  </Button>
					  </Link>
				     </Row>
				    </Col>
				  </Row>
		     </Container>
			)
		
	}
 
function mapStateToProps ({posts , categories},props){
    const {category} = props.match.params
	const filtered = category === undefined ? Object.keys(posts):Object.keys(posts).filter((key) => (posts[key].category === category))
	let newest = filtered.sort((a,b) => (posts[b].timestamp-posts[a].timestamp))
     newest = newest.map(key => posts[key].id)
	let oldest = filtered.sort((a,b) => (posts[a].timestamp-posts[b].timestamp))
      oldest = oldest.map(key => posts[key].id)
	let voted = filtered.sort((a,b) => (posts[b].voteScore-posts[a].voteScore))
       voted = voted.map(key => posts[key].id)
  return {newest,oldest,voted , categories,category}
}
export default connect(mapStateToProps)(Home)