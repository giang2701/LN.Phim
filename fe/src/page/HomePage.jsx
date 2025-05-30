import { useEffect, useState } from "react";
import Banner from "../component/Banner";
import Footer from "../component/Footer";
import ScrollToTop from "../component/ScrollToTop";
import Anime from "../component/ui/Anime";
import Hot from "../component/ui/Hot";
import PhimBo from "../component/ui/PhimBo";
import PhimLe from "../component/ui/PhimLe";

const HomePage = () => {
    // const [loading, setLoading] = useState(true);
    // useEffect(() => {
    //     // Giả lập loading 2 giây
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);

    //     // Dọn dẹp khi component unmount
    //     return () => clearTimeout(timer);
    // }, []);

    // if (loading)
    //     return (
    //         <>
    //             {/* Lớp phủ đen mờ */}
    //             <div className="absolute inset-0 bg-black"></div>
    //             <div className="breeding-rhombus-spinner detailPage flex ml-[48%] mt-[250px]">
    //                 <div className="rhombus child-1"></div>
    //                 <div className="rhombus child-2"></div>
    //                 <div className="rhombus child-3"></div>
    //                 <div className="rhombus child-4"></div>
    //                 <div className="rhombus child-5"></div>
    //                 <div className="rhombus child-6"></div>
    //                 <div className="rhombus child-7"></div>
    //                 <div className="rhombus child-8"></div>
    //                 <div className="rhombus big"></div>
    //             </div>
    //         </>
    //     );
    return (
        <>
            <Banner />
            <ScrollToTop />
            {/* Đề xuất hot */}
            <Hot />
            {/* Anime */}
            <Anime />
            {/* phim bộ  */}
            <PhimBo />
            {/* phim bộ  */}
            <PhimLe />
            <Footer />
        </>
    );
};

export default HomePage;
