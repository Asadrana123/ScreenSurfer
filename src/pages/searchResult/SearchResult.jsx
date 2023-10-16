import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../../components/spinner/Spinner";
import "./style.scss";
import MovieCard from "../../components/movieCard/MovieCard";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import {apitesting} from "../../utils/api"
function SearchResult() {
  const [data,setData]=useState(null);
  const [pageNum,setPageNum]=useState(1);
  const [loading,setLoading]=useState(false);
  const {query}=useParams();
  let total_pages;
  const fetchInitialData=async()=>{
     setLoading(true);
     const response=await apitesting(`/search/multi?query=${query}&page=${pageNum}`);
     console.log(response);
     setData(response?.data?.results);
     setPageNum(pageNum+1);
     setLoading(false);
     total_pages=response?.data?.total_pages;
  }
  const fetchNextPageData=async()=>{
    const response=await apitesting(`/search/multi?query=${query}&page=${pageNum}`);
      const temp=data.concat(response.data.results);
      setData(temp);
      setPageNum(pageNum+1);
      console.log(data);
  }
  useEffect(()=>{
          setPageNum(1);
           fetchInitialData();
  },[query])
  return (
       <div className="searchResultsPage">
                {loading && <Spinner initial={true} />}
                {!loading && (
                  <ContentWrapper>
                    {data?.length>0?(
                              <> 
                               <div className="pageTitle">
                                         {
                                           `Search ${data?.length>1?"results":"result"} of ${query}`
                                         }
                               </div>
                               <InfiniteScroll
                                 className="content"
                                dataLength={data.length}
                                next={fetchNextPageData}
                                hasMore={pageNum<=total_pages}
                                loader={<Spinner/>}
                               >
                                    {data?.map((item,index)=>{
                                           if(item.media_type==="person") return;
                                           return (
                                            <MovieCard key={index} data={item}/>
                                           )         
                                    })}
                               </InfiniteScroll>
                              </>        
                    ):(
                         <span>Sorry, Results Not found</span>
                    )}
                  </ContentWrapper>
                )}
       </div>
  )
}

export default SearchResult