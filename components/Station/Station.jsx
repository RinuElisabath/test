
import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./Station.css";



const stop_url = 'http://52.203.100.234:5010/files/stops.txt';// contains stop name and stop id
const fare_id_url = 'http://52.203.100.234:5010/files/fare_rules.txt'; //contains fare id
const price_url = 'http://52.203.100.234:5010/files/fare_attributes.txt'; //contains price for journey







function Station() {
    const [stations, getStations] = useState('');          //stations contain name and id of each station


    useEffect(() => { stationDetails(); }, []);         // since dependency is mentioned, rendering takes place only once.





    function stationDetails() {
        axios.get(stop_url)
            .then(response => {
                const stationDetail = response.data
                getStations(stationDetail)
            })
            .catch(console.log("error"))
    }
    return (
        <>

            <Display stations={stations} />
        </>
    );
}









function Display(props) {     //function to display arrival and departure stations scrollbar, price


    const [arrivalStation, setArrivalStation] = useState('')  /* retrieves the arrival station details to arrivalStation 
    when onclick event of right container occurs */

    const [departureStation, setDepartureStation] = useState('')  /*retrieves the departure station details to departureStation when 
    onclick event of left containr occurs */


    const [price, setPrice] = useState('')                     //retrieves the price for journey 







    //display deprture station scrollbar
    function DisplayDepartureStations(props) {

        const { stations } = props;


        if (stations.length > 0) {

            return (
                stations.filter(station => station.stop_id !== "").map(stat =>



                    <div className='data-container' onClick={() => { setDepartureStation(stat) }}>
                        <h3>{stat.stop_name}</h3><br></br>
                        <hr></hr><br></br>
                        <p>Station Code: {stat.stop_id}</p>
                        <p>Theme: Business</p>
                        <p>Theme Description: Station's Theme Description</p>
                    </div>


                )

            )
        }

    }


















    //display arrival stations scrollbar

    function DisplayArrivalStations(props) {

        const { stations } = props;

        if (stations.length > 0) {

            return (

                stations.map((stat, index) => {
                    return (


                        <div className='data-container' onClick={() => { setArrivalStation(stat); Fare(departureStation.stop_id, stat.stop_id) }}>
                            <h3>{stat.stop_name}</h3><br></br>
                            <hr></hr><br></br>
                            <p>Station Code: {stat.stop_id}</p>
                            <p>Theme: Business</p>
                            <p>Theme Description: Station's Theme Description</p>
                        </div>

                    )


                }
                )
            )


        }
    }







    //fare calculation
    function Fare(data1, data2) {
        axios.get(fare_id_url)
            .then(response => {
                const allStation = response.data
                getFareDetails(allStation, data1, data2)
            })
            .catch(console.log("error"))






        function getFareDetails(allStation, data1, data2) {
            var datas = allStation.filter(allStation => allStation.origin_id === data1 && allStation.destination_id === data2)
            axios.get(price_url)
                .then(response => {
                    const allStationFare = response.data
                    getPrice(allStationFare)
                })
                .catch(console.log("error"))

            function getPrice(allStationFare) {
                var price = allStationFare.filter(allStationFare => allStationFare.fare_id === datas[0].fare_id)
                console.log(price)
                const FinalPrice = price[0].price
                setPrice(FinalPrice)


            }
        }
    }










    //display
    return (
        <>

            <div className='head'>
                <p className='departure-heading'>Select Departure station</p>
                <p className='arrival-heading'>Select Arrival station</p>
            </div>
            <div className='container'>
                <div className='container-1'>

                    <div className="container-div">
                        {DisplayDepartureStations(props)}
                    </div>

                </div>
                <div className='container-1'>
                    <div className="container-div">
                        {DisplayArrivalStations(props)}
                    </div >

                </div>
            </div>
            <div className="trip-main">
                <p className="trip">Trip Details</p><br></br>
                <div className="trip-sub"><p className="trip-sub1">span</p>
                    <p className="trip-sub1">Fare</p></div>
            </div>
            <div className='fare'>
                <div className='fare-sub'>
                    <h3>{departureStation.stop_name}</h3><br></br>
                    <hr></hr><br></br>
                    <p>Station Code: {departureStation.stop_id}</p>
                    <p>Theme: Business</p>
                    <p>Theme Description: Station's Theme Description</p>


                </div>
                <div className='fare-sub'>
                    <h3>{arrivalStation.stop_name}</h3><br></br>
                    <hr></hr><br></br>
                    <p>Station Code: {arrivalStation.stop_id}</p>
                    <p>Theme: Business</p>
                    <p>Theme Description: Station's Theme Description</p>
                </div>
                <div className='fare-sub1'>
                    <p>Rs {price}/-</p>{ }

                </div>
            </div>

        </>
    );



}



export default Station;




