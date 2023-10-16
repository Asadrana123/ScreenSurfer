import './App.css'
import { useEffect } from 'react'
import { apitesting } from './utils/api'
import { useDispatch, useSelector } from 'react-redux'
import { getApiConfiguration, getGenres } from './store/homeSlice'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header/Header'
import Footer from './components/footer/footer'
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from './pages/searchResult/searchResult'
import Explore from "./pages/explore/Explore";
import PageNotFound from './pages/404/PageNotFound';
function App() {
  const dispatch = useDispatch();
  const url = useSelector(state => state.home.url);
  const fetchapi = async () => {
    const result = await apitesting("/configuration");
    const url = {
      backdrop: result?.data?.images?.secure_base_url
        + "original",
      poster: result?.data?.images?.secure_base_url
        + "original",
      profile: result?.data?.images?.secure_base_url
        + "original"

    }
    dispatch(getApiConfiguration(url))
  }
  useEffect(() => {
    fetchapi();;
    genresCall();
  }, [])
  const genresCall=async ()=>{
      let promises=[];
      let endPoints=["tv","movie"];
      let allGenres={};
      endPoints.forEach((url)=>{
           promises.push(apitesting(`/genre/${url}/list`));
      })
      const data=await Promise.all(promises);
      const moviesGenres=data[0].data.genres;
      const tvGenres=data[1].data.genres;
       moviesGenres.map((item)=>{
           allGenres[item.id]=item.name;
      })
      tvGenres.map((item)=>{
        allGenres[item.id]=item.name;
     })
      dispatch(getGenres(allGenres));
  }
  return (
    <>
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}
export default App
