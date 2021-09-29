import React from 'react';
import '../Styles/Wallpaper.css';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

class Wallpaper extends React.Component{

   constructor() {
      super();
      this.state = {
          restaurants: [],
          suggestions: []
          
      }
  }

    handlelocationChange = (event) => {
       const locationId = event.target.value;
       sessionStorage.setItem('locationId',locationId);

       axios({
         method: 'GET',
         url: `https://stormy-island-02890.herokuapp.com/restaurantbylocation/${locationId}`,
         headers: {'Content-Type': 'application/json'}
     })
        .then(response =>this.setState({locations: response.data.restaurant}))
        .catch()
    }

    handleSearch = (event) => {
      const{restaurants} = this.state;
      const searchText = event.target.value;

      let filteredRestaurants;
      if(searchText=="") {
         filteredRestaurants = [];
      }
      else{
         filteredRestaurants = restaurants.filter(item => item.name.toLowerCase().includes(searchText.toLowerCase()));
      }

      this.setState({suggestions: filteredRestaurants});
    }

    handleItemClick = (item) => {
        this.props.history.push(`/details?restaurant = ${item._id}`)
    }

    renderSuggestions = () => {
       let {suggestions} = this.state;
       if(suggestions.length == 0) {
          return null;
       }
       return (
          <ui>
             {
                suggestions.map((item, index) => (<li key={index} onClick={() => this.handleItemClick(item)}>`{ `${item.name}, ${item.city}` }</li>))
             }
          </ui>
       )
    }

    render(){
       const{ddlocations} = this.props;

    return(
           <div>
<div style={{backgroundImage: "url('./Assets/fooditems.png')", height: '400px', paddingTop: '2%'}}>
       <div className="container-fluid">
         <div className="row">
            <div className="col-sm-6 col-md-6 col-lg-6"></div>
            <div className="col-sm-6 col-md-6 col-lg-6">
            <div style={{float: 'right'}}>
         </div>
      </div>
    </div>
        <div className="row">
        <div className="col-sm-4 col-md-4 col-lg-4"></div>
        <div className="col-sm-4 col-md-4 col-lg-4">
           <div className="logo">
               <b>e!</b>
           </div>
        </div>
        <div className="col-sm-4 col-md-4 col-lg-4"></div>
         </div>
         <div className="row">
          <div className="col-sm-4 col-md-4 col-lg-3"></div>
          <div className="col-sm-4 col-md-4 col-lg-6">
            <div className="heading1">Find the best restaurants,cafés, and bars</div>
         </div>
         <div className="col-sm-4 col-md-4 col-lg-3"></div>
         </div>
          <div className="row"  style={{marginTop: '5px'}}>
            <div className="col-sm-4 col-md-4 col-lg-2"></div>
            <div className="col-sm-4 col-md-4 col-lg-8" style={{textAlign: 'center'}}>
               <div>
                    <select className="dd" onChange={this.handlelocationChange}>
                        <option value="0">Select</option>
                        {ddlocations.map((item) => {
                           return<option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                        })}
                    </select>
                    
                    <div style={{display: 'inline-block'}}>
                      <span className="glyphicon glyphicon-search" style={{left: '25px'}}></span>
                      <input className="search-box" type="text" placeholder="Search for Restaurants"  />
                      {this.renderSuggestions()}
                    </div>
               </div>
            </div>
            <div className="col-sm-4 col-md-4 col-lg-2"></div>
          </div>
      </div>
  </div>
           </div>
    )
 }
}

export default withRouter(Wallpaper);