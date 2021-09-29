import React from 'react';
import '../Styles/QuickSearch.css';
import {withRouter} from 'react-router-dom';

class QuickSearch extends React.Component{
  handleClick=(mealtypeId) =>{
    const locationId = sessionStorage.getItem('locationId');
    if(locationId){
      this.props.history.push(`/filter?mealtype=${mealtypeId}&location=${locationId}`);
    }
    else{
    this.props.history.push(`/filter?mealtype=${mealtypeId}`);
    }
  }
    render(){
      const{quicksearch} =this.props;
    return(
           <div>
                   <div className= "Quick-Searches">Quick Searches</div>
          <div className="discover">Discover restaurants by type of meal</div>
  <div className="container">
    
    <div className="row">
    {quicksearch.map((item) =>{
      return(
         <div className="col-sm-12 col-md-6 col-lg-4"  onClick={()=>this.handleClick(item.meal_type)}>
      <div style={{height: '150px', width: '350px', boxShadow: '0 3px 6px 0 rgba(0, 0, 0, 0.16)', margin: '5px'}}>
        <div style={{display: 'inline-block', width: '40%'}} >
          <img src={item.image} alt="" height="145px" width="140px" style={{marginTop: '-62px' }}/>
        </div>
        <div style={{display: 'inline-block', width: '50%'}} >
          <div className="Breakfast"> {item.name}</div>
          <div className="breakfastcontent"> {item.content}</div>
        </div>
      </div>
    </div>
    

    )})}
        
         </div>
     </div>
 </div>
            
           
    )
 }
}

export default withRouter(QuickSearch);