import React from 'react'; 
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';


class Filter extends React.Component{
  constructor(){
    super();
    this.state = {
            restaurants:[],
            location: undefined,
            mealtype: undefined,
            cuisine: undefined,
            hcost: undefined,
            lcost: undefined,
            sort: undefined,
            page: undefined,
            locations: []
    }
  }
  componentDidMount(){
    const qs=queryString.parse(this.props.location.search);
    const location = qs.location;
    const mealtype = qs.mealtype;

    const inputObj={
      mealType_id: mealtype,
      location_id: location
    };
  axios({
    method: 'POST',
    url: 'http://localhost:2022/filter',
    headers: {'Content-Type':'application/json'},
    data: inputObj
 })
 .then(response => this.setState({restaurants:response.data.restaurant, location: location, mealtype: mealtype}))
 .catch()

  axios({
    method: 'GET',
    url: 'http://localhost:2022/locations',
    headers: {'Content-Type': 'application/json'}
  
})
   .then(response =>this.setState({locations: response.data.city}))
   .catch()
}

apiCall = (inputObj) => {
  axios({
      method: 'POST',
      url: 'http://localhost:2022/filter',
      headers: { 'Content-Type': 'application/json' },
      data: inputObj
  })
      .then(response => this.setState({ restaurants: response.data.restaurant, lcost: inputObj.lcost, hcost: inputObj.hcost, sort: inputObj.sort }))
      .catch()
}


handleSortChange = (sort) => {
  const { location, mealtype, lcost, hcost, page } = this.state;
  const inputObj = {
      sort: sort,
      mealType_id: mealtype,
      location_id: location,
      lcost: lcost,
      hcost: hcost,
      page: page
  };
  this.apiCall(inputObj);
}

handleCostChange = (lcost, hcost) => {
  const { location, mealtype, sort, page } = this.state;
  const inputObj = {
    mealType_id: mealtype,
    location_id: location,
      lcost: lcost,
      hcost: hcost,
      page: page
  };
  this.apiCall(inputObj);
}

handleLocationChange = (event) => {
  const location = event.target.value;
  const { mealtype, sort, hcost, lcost, page } = this.state;

  const inputObj = {
      sort: sort,
      mealType_id: mealtype,
      location_id: location,
      lcost: lcost,
      hcost: hcost,
      page: page
  };
  this.apiCall(inputObj);
}

handlePageChange = (page) => {
  const { location, mealtype, lcost, hcost, sort } = this.state;
  const inputObj = {
      sort: sort,
      mealType_id: mealtype,
      location_id: location,
      lcost: lcost,
      hcost: hcost,
      page: page
    };
    this.apiCall(inputObj);
}


handleNavigate = (resId) => {
  this.props.history.push(`/details?restaurant=${resId}`);
}
    render(){
      const{ restaurants,locations} = this.state;
    return(
        <div>
            <div className="heading">Breakfast Places  </div>
    <div>
          <div name="left" style={{display: 'inline-block'}}>
                <div className="rectangle" >
                <div className="filter">Filter</div>

                <span classsName = "glyphicon glyphicon-chevron-down toggle-span" data-toggle = "collapse" data-target = "#filter"> </span>
                <div id = "filter" className = "collapse"></div>
                <div className="select">Select Location</div>
                <select className="location" onChange={this.handleLocationChange}>
                   <option value = "0">select</option>
                   {locations.map((item) => {
                                    return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                })}
                </select>
                <div className="select">cusines</div>
                <div>
                
                     <input type="checkbox" />
                     <span className="input-options">North Indian</span>
                </div>
                <div>
                     <input type="checkbox" />
                     <span className="input-options">South Indian</span>
                </div>
                <div> 
                     <input type="checkbox" />
                     <span className="input-options">Chinese</span>
                </div>
                <div>
                     <input type="checkbox" />
                     <span className="input-options">Fast Food</span>
                </div>
                <div>
                     <input type="checkbox" />
                     <span className="input-options">Street Food</span>
                </div>
                <div className="select">Cost For Two</div>
                <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1, 500)}/>
                    <span className="input-options">Less Than &#8377; 500</span>
                </div>
                <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange( 500,1000)} />
                    <span className="input-options"> &#8377; 500 &#8377; 1000</span>  
                </div>
                <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1000,1500 )} />
                    <span className="input-options">&#8377; 1000 &#8377; 1500</span>
                </div>
                <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(1500,2000)} />
                    <span className="input-options">&#8377; 1500 &#8377; 2000+</span>
                </div>
                <div>
                    <input type="radio" name="cost" onChange={() => this.handleCostChange(2000,10000)}/>
                    <span className="input-options"> &#8377; 2000+</span>
                </div>
                <div className="sort">Sort</div>
                <div>
                    <input type="radio" name="sort" onChange={() => this.handleSortChange(1)}/>
                    <span className="input-options"> Price low to high</span>
                </div>
                <div> 
                  <input type="radio" name="sort" onChange={() => this.handleSortChange(-1)}/>
                  <span className="input-options"> Price high to low</span>  
                </div>
            </div>
       </div>
       
         <div name="right" style={{display: 'inline-block', verticalAlign: 'top', marginLeft: '20px'}}>
           {restaurants && restaurants.length > 0 ? restaurants.map((item)=>{
               return(<div>
               <div className= "fooditems" onClick={() => this.handleNavigate(item._id)}>
               <div>
                   <div style={{display: 'inline-block', width: '30%'}}>
                     <img className="heading-image" alt="" src="./Assets/breakfast.png" width= '130' height= '100' />
                   </div>
                   <div style={{display: 'inline-block', width: '60%'}}>
                     <div className="big-chill">{item.name}</div>
                     <div className="fort">{item.locality}</div>
                     <div className="address">{item.city}</div>
                   </div>
               </div>
                 <hr className="hr"/>
                 <div style={{display: 'inline-block',width: '20%'}}>
                 <div className="cusines2">CUISINES:</div>
                 <span className="cusines2">COST-FOR-TWO:</span>
                 </div>
                 
                 <div style={{display: 'inline-block', width:'25%'}}>
                 <div className="bakery-700">{item.cuisine.map((cuis)=> `${cuis.name}, `)}</div>
                 <span className="bakery-700">&#8377; {item.min_price}</span>
                 </div>
                 </div>
                 </div>)

    }):<div className="no-records">No Records Found...</div>}
               
                 {restaurants && restaurants.length > 0 ? <div className="pagination"> 
                   <a href="#" onClick={() => this.handlePageChange}>&laquo;</a>
                   <a href="#" onClick={() => this.handlePageChange}>1 </a> 
                   <a href="#" onClick={() => this.handlePageChange}>2 </a>
                   <a href="#" onClick={() => this.handlePageChange}>3 </a>
                   <a href="#" onClick={() => this.handlePageChange}>4 </a>
                   <a href="#" onClick={() => this.handlePageChange}>5 </a>
                   <a href="#" onClick={() => this.handlePageChange}>6 </a>         
                   <a href="#" onClick={() => this.handlePageChange}>&raquo;</a>
                 </div>:null}
          </div>
    </div>
        </div>
           
    )
 }
}

export default Filter;