import { Route, Routes } from "react-router-dom";
import BrowsePage from "../page/DetailPage";
import HomePage from "../page/HomePage";
import Header from "./../component/Header";
import DetailPhim from "../page/DetailPhim";
import MovieSearch from "../component/Search";
import MoviePlayer from "../component/Phim";

const Router = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/:type/:value" element={<BrowsePage />} />
                <Route path="/:slug" element={<DetailPhim />} />
                <Route path="/search" element={<MovieSearch />} />
                <Route path="/play/:slug" element={<MoviePlayer />} />
            </Routes>
        </>
    );
};
export default Router;
