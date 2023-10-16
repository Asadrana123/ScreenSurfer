import React from 'react'
import { useEffect,useState } from 'react'
import { apitesting } from '../utils/api'
function useFetch(url) {
  const [data,setData]=useState(null);
  const [loading,setLoading]=useState(null);
  const [error,setError]=useState(null);
  useEffect(()=>{
         const fetchDatainUseFetch=async()=>{
          setLoading("loading...");
          setData(null);
          setError(null);
          try{
           const res= await apitesting(url);
           setData(res);
           setLoading(false);
          }catch(err){
             setLoading(false);
             setError("Something went wrong") 
          }
         }
         fetchDatainUseFetch();
  },[url])
  return {data,loading,error};
}

export default useFetch;