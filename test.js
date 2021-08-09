import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import { withAuth0 } from '@auth0/auth0-react';
import axios from "axios";
import MyFavBooks from './MyFavBooks';
class BestBooks extends React.Component {
  constructor(props){
    super(props);
    this.state={
      booksArr:[],
    }
  }
RenderBestBooks = async () => {
  const { user } = this.props.auth0;
  try{
    let URL=`http://localhost:4444/books?email=farahsarese@gmail.com`;
  let data = await axios.get(URL)
  //console.log(weatherData);
  await this.setState({
    booksArr:data.data
  })
}
     catch (e) {
      if (e.response && e.response.data) {
       
          console.log('error');
      }
  }
}
componentDidMount=()=>{
  this.RenderBestBooks();
}
render() {
    return(
      <>
   
        <MyFavBooks arr={this.state.booksArr}/>
        </>
    )
  }
}
export default withAuth0(BestBooks);
componentDidMount=()=>{
  this.RenderBestBooks();
}