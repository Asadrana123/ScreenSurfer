import React from 'react'
import DetailsBanner from './detailsBanner/DetailsBanner'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Cast from './cast/Cast';
import './style.scss'
import VideosSection from './videosSection/VideosSection';
import Similar from './carousels/Similar';
import Recommendation from './carousels/Recommendation';
function Details() {
  const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );
  return (
    <div>
      <DetailsBanner video={data?.data?.results?.[0]} crew={credits?.data?.crew}/>
      <Cast data={credits?.data?.cast} loading={creditsLoading} />
      <VideosSection data={data?.data} loading={loading} />
      <Similar mediaType={mediaType} id={id}/>
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  )
}

export default Details