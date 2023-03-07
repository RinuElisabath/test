import React from 'react';
import icon from '/home/rinu-elisabath/Desktop/new-react/metro/src/images/metro.png';
import "./Header.css";



function Header() {
    return (
      
      <div className="top-menu">


        <div className="top-menu-image">
          
          <img src={icon} className="photo" />

        </div>


        <div className="top-menu-head">
          <h1>KOCHI METRO</h1>            
        </div>

        <br/>

      </div>
    )
}




function Details() {
  return (
    <div className="description"> 
      <h2>Metro Station Details and Fare Calculation</h2>    
      <p>By selecting the departure and arrival stations below, you will be able to see the ticket fare </p>   
          
    </div>

            

  );
}


export {Header,Details};


