import React, { useState } from 'react'
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import SwitchTabs from '../../../components/switchTabs/SwitchTabs';
import useFetch from '../../../hooks/useFetch';
import Carousel from '../../../components/carousel/Carousel';
function Popular() {
    const [endPoint,setEndPoint]=useState("tv");
    const {data,loading}=useFetch(`/${endPoint}/popular`);
    const onTabChange=()=>{
          setEndPoint(endPoint==="tv"?"movie":"tv");
    }
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className='carouselTitle'>What's Popular</span>
            <SwitchTabs data={["Day","Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.data?.results} loading={loading} />
        </div>
  )
}

export default Popular;