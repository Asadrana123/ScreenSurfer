import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import Genres from "../genres/Genres";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

import "./style.scss";
import CircleRating from "../circleRating/CircleRating";

export default function Carousel({data,loading,title}) {
    const {url}=useSelector(state=>state.home);
    const carouselContainer=useRef();
    const navigate=useNavigate();
    const navigation = (dir) => {
      const container = carouselContainer.current;

      const scrollAmount =
          dir === "left"
              ? container.scrollLeft - (container.offsetWidth + 20)
              : container.scrollLeft + (container.offsetWidth + 20);

      container.scrollTo({
          left: scrollAmount,
          behavior: "smooth",
      });
  };
    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };
    const handleClick=(media_type,id)=>{
         console.log(media_type);
         if(media_type==undefined)navigate(`/tv/${id}`)
        else navigate(`/${media_type}/${id}`)
    }
  return (
    <div className="carousel">
        {title && <div className="carouselTitle">{title}</div>}
          <ContentWrapper>
          <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {
                    loading?(
                        <div className="loadingSkeleton">
                                    {skItem()}
                                    {skItem()}
                                    {skItem()}
                                    {skItem()}
                                    {skItem()}
                        </div>
                    ):(
                         <div className="carouselItems" ref={carouselContainer}>
                              {
                                data?.map((item)=>{
                                     const  posterUrl=item.poster_path?url.backdrop+item.poster_path:PosterFallback
                                     return (
                                        <div key={item.id} className="carouselItem" onClick={()=>handleClick(item.media_type,item.id)}>
                                        <div className="posterBlock">
                                        <Img src={posterUrl}/> 
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids} />
                                        </div>
                                        <div className="textBlock">
                                                  <span className="title">
                                                    {item.title||item.name}
                                                  </span>
                                                  <span className="date">
                                                       {dayjs(item.release_Date).format(
                                                            "MMM D, YYYY"
                                                       )}
                                                  </span>
                                        </div>
                                       </div>
                                     )
                                    
                                })
                              }
                         </div>
                    )
                }
          </ContentWrapper>

    </div>
  )
}
