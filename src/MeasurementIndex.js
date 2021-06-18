import React, { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart';
import './App.css'

function MeasurementIndex() {

    let groupOne = 0;
    let groupTwo = 0;

    const [resData, setResData] = useState({result: [], loading: true});

    useEffect(() => {
        async function fetchAPI() {         
            let response = await fetch("https://docs.openaq.org/v2/measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2021-06-17T17%3A03%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&unit=%C2%B5g%2Fm%C2%B3&radius=1000&order_by=datetime");
            let data = await response.json()
            setResData({ result: data.results, loading: false });
        }
        fetchAPI();
    }, []);

    resData.result.forEach( result => {
        if (result.value >= 5 ) {
            groupOne += 1;             
         }
         else {
             groupTwo += 1;
        }
     })     
     console.log(resData.result.length, groupOne, groupTwo)

        return (
            <>
            {resData.loading ? <div>loading...</div> :
            <div>
                <h1>Hello</h1>
                <PieChart className="chart_part"
                    data = {[
                           {title: 'GroupeOne', value: groupOne, color: '#E38627'},
                           {title: 'GroupTwo', value: groupTwo, color: '#C13C37' },
                    ]}
                />
                {resData.result.map( (result, index)=>                 
                   <li key={index}>Location: {result.location } - Result: {result.value} {result.unit}</li>
                )}

            </div> }
            </>
            
        )
        
    }

export default MeasurementIndex



