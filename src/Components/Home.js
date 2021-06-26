import React from 'react';
import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';
import axios from 'axios';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            locations:[],
            mealtypes:[]
        }

    }
    componentDidMount() {
        sessionStorage.clear();
        //location API Call
        axios({
            method: 'GET',
            url: 'http://localhost:2022/locations',
            headers: {'Content-Type': 'application/json'}
        })
           .then(response =>this.setState({locations: response.data.city}))
           .catch()
        //QuickSearch API Call
           axios({
            method: 'GET',
            url: 'http://localhost:2022/mealtypes',
            headers: {'Content-Type': 'application/json'}
        })
           .then(response =>this.setState({mealtypes: response.data.mealtypes}))
           .catch()

    }
  
   
    
    render(){
        const {locations,mealtypes}=this.state;
    return(
        <div>
            <Wallpaper ddlocations={locations}/>
            <QuickSearch quicksearch={mealtypes}/>  
        </div>
    )
 }
}

export default Home;