import React, { useEffect, useState } from 'react'
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper'
import { useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import Img from '../../../components/lazyLoadImage/Img';
import './style.scss';
export default function HeroBanner() {
   const [background,setbackground]=useState("");
   const [query,setQuery]=useState("");
   const {data,loading}=useFetch("/movie/upcoming");
   const navigate=useNavigate();
   const url=useSelector((state)=>state.home.url);
   useEffect(()=>{
        const bg=url.backdrop+data?.data?.results?.[Math.floor(Math.random()*20)]?.backdrop_path;
        setbackground(bg);
   })
   const searchQueryHandler=(event)=>{
           console.log(event.key)
           console.log(query.length)
          if(event.key=="Enter" && query.length>0){
            console.log("hi")
            navigate(`/search/${query}`)
          }   
   }
  return (
    <div className="heroBanner">
    {!loading && (
        <div className="backdrop-img">
            <Img src={background} />
        </div>
    )}
    <div className="opacity-layer"></div>
    <ContentWrapper>
        <div className="heroBannerContent">
            <span className="title">Welcome.</span>
            <span className="subTitle">
                Millions of movies, TV shows and people to discover.
                Explore now.
            </span>
            <div className="searchInput">
                <input
                    type="text"
                    placeholder="Search for a movie or tv show...."
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={searchQueryHandler}
                />
                <button>Search</button>
            </div>
        </div>
    </ContentWrapper>
</div>
  )
}
