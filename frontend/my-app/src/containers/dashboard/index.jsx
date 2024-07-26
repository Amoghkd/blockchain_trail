import React, {useEffect, useState} from 'react';
import DataTable from '../../components/dashboard';

const Dashboard = () => {
    const[data,setData]=useState();
    const[isLoading,setIsLoading]=useState(false) ;
    const[error,setError]=useState(null);
    // const[bool,setBool]=useState(true);

    const API_URL ='http://localhost:4000/api/fetchall'
    useEffect(() => {
        const fetchData= async () => {
            setIsLoading(true) ;
            setError(null) ;
            // const response = await fetch(API_URL) 
            // console.log('response', response)
            // const fetchedData=await response.json()
            // console.log('fetchedData', fetchedData)
            // setData(fetchedData)
        try{
                const response = await fetch(API_URL) ;
                if(!response.ok){
                    throw new Error(`API request failed with status ${response.status}`) ;
                }
                const fetchedData=await response.json() ;
                setData(fetchedData) ;
            }catch(error) {
                    setError(error.message) ;
                }finally {
                    setIsLoading(false);
                }
        };
        fetchData() ;
    },[])

    const handleTableAction = (id) => {
console.log('id', id)
    }
const createContract= () => {
        const[data,setData]=useState();
        const[isLoading,setIsLoading]=useState(false) ;
        const[error,setError]=useState(null);
    
        const API_URL ='http://localhost:4000/api/e'
        useEffect(() => {
            const fetchData= async () => {
                setIsLoading(true) ;
                setError(null) ;
                // const response = await fetch(API_URL) 
                // console.log('response', response)
                // const fetchedData=await response.json()
                // console.log('fetchedData', fetchedData)
                // setData(fetchedData)
            try{
                    const response = await fetch(API_URL) ;
                    if(!response.ok){
                        throw new Error(`API request failed with status ${response.status}`) ;
                    }
                    const fetchedData=await response.json() ;
                    setData(fetchedData) ;
                }catch(error) {
                        setError(error.message) ;
                    }finally {
                        setIsLoading(false);
                    }
            };
            fetchData() ;
        },[])
}

useEffect(() => {
    timeOut()
},[bool])

const timeOut = () => {
    if (bool) {
        console.log('gu')
            setBool(false)
    } else {
        setBool(true)
    }
}
return(
    <div>
    {isLoading && <p> Loading data ...</p> }
    {error &&<p>Error : {error}</p>}
    {data && <DataTable data={data} handleTableAction={handleTableAction} />}
    </div>
);

}

export default Dashboard;