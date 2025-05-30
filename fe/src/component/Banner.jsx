import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade, Autoplay } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";
const Banner = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [data, setData] = useState([]);
    // console.log("data", data);

    useEffect(() => {
        const getAll = async () => {
            const res = await axios.get(
                "https://phimapi.com/v1/api/danh-sach/phim-bo?page=2"
            );
            setData(res.data.data.items);
            // localStorage.setItem(
            //     "phimData",
            //     JSON.stringify(res.data.data.items)
            // );
        };
        getAll();
    }, []);

    const activeItem = data[activeIndex]; // Get the current item based on activeIndex
    return (
        <>
            <div className="bg-[#010101]  md:h-[800px] lg:h-[1200px] xl:h-[1200px]">
                <div className="w-full h-screen relative z-10">
                    <Swiper
                        modules={[Navigation, EffectFade, Autoplay]} //bỏ Pagination để xóa chấm
                        navigation
                        pagination={{ clickable: true }}
                        effect="fade"
                        fadeEffect={{ crossFade: true }}
                        autoplay={{
                            delay: 3000, // Change slide every second
                            disableOnInteraction: false, // Continue autoplay after user interactions
                        }}
                        speed={1000} // Set the transition speed to 700ms
                        onSlideChange={(swiper) =>
                            setActiveIndex(swiper.activeIndex)
                        }
                        className="mb-6"
                    >
                        {data.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className="relative w-screen h-screen">
                                    <img
                                        src={`https://phimimg.com/${item.thumb_url}`}
                                        alt={item.title}
                                        className="w-full object-cover object-top shadow-lg transition-opacity duration-700 ease-in-out rounded-none"
                                    />
                                    <div
                                        className="absolute inset-0 pointer-events-none xs:h-[280px] md:h-[480px] lg:h-[600px] xl:h-screen"
                                        style={{
                                            background:
                                                window.innerWidth < 640 // Adjust this value based on your sm breakpoint
                                                    ? `
                linear-gradient(to top, rgba(0,0,0,0.3), transparent 30%),
                linear-gradient(to bottom, rgba(0,0,0.5), transparent 30%),
                linear-gradient(to left, rgba(0,0,0,0.5), transparent 30%),
                linear-gradient(to right, rgba(0,0,0,0.7), transparent 30%)
            `
                                                    : `
                linear-gradient(to top, rgba(0,0,0,0.5), transparent 90%),
                linear-gradient(to bottom, rgba(0,0,0.5), transparent 30%),
                linear-gradient(to left, rgba(0,0,0,0.5), transparent 30%),
                linear-gradient(to right, rgba(0,0,0,0.7), transparent 30%)
            `,
                                        }}
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Info block */}
                    {activeItem && (
                        <div
                            key={activeIndex} // Important to re-render animation
                            className="absolute xs:top-[120px] md:top-[160px]  lg:top-[160px] xl:top-[300px] xs:left-[20px] md:left-[30px] lg:left-[30px]  xl:left-[80px] z-10"
                        >
                            <h2 className="xs:text-[25px] md:text-[40px] lg:text-[60px] xl:text-[50px] font-brush mb-2 text-white w-[335px] overflow-hidden whitespace-nowrap text-ellipsis">
                                {activeItem.name}
                            </h2>
                            <div className="xs:hidden md:flex items-center md:-mt-1 lg:mt-0">
                                <div className="md:w-[150px] lg:w-[170px] md:text-[13px] lg:text-[16px] bg-[#04dc5c]  pl-2 font-semibold text-white rounded-ss-md rounded-es-md">
                                    Top Phim Thịnh Hành
                                </div>
                                <div className="md:w-[50px] lg:w-[60px]  md:text-[13px] lg:text-[16px] bg-[#a1aba7]/50 pl-2 font-semibold text-white rounded-se-md rounded-ee-md">
                                    Top 1
                                </div>
                            </div>
                            <div className="xs:-mt-3 md:-mt-0">
                                <p className="text-white mt-2">
                                    <span className="text-[15px] font-semibold ">
                                        <i className="fa-solid fa-star pr-1"></i>
                                        9.8 |&nbsp;
                                    </span>
                                    <span className="text-[15px] font-semibold ">
                                        {activeItem.year} |&nbsp;
                                    </span>
                                    <span className="text-[15px] font-semibold ">
                                        {activeItem.episode_current}
                                    </span>
                                    <span className="xs:mt-[7px] md:mt-[7px] lg:mt-3 block">
                                        {activeItem.country.map(
                                            (country, index) => (
                                                <span
                                                    key={index}
                                                    className="xs:hidden md:inline mr-1 bg-[#a1aba7]/50 px-2 pb-[3px] md:text-[13px] lg:text-[16px] font-semibold text-white "
                                                >
                                                    {country.name}
                                                </span>
                                            )
                                        )}
                                        {activeItem.category.map(
                                            (category, index) => (
                                                <span
                                                    key={index}
                                                    className="mr-1 xs:bg-green-500 md:bg-[#a1aba7]/50 px-2 pb-[3px] xs:text-[12px] md:text-[13px] lg:text-[16px] font-semibold text-white "
                                                >
                                                    {category.name}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </p>
                            </div>
                            {/* action banner */}
                            <div className="xs:hidden md:mt-4 lg:mt-6 md:flex items-center gap-4">
                                <Link to={`/${activeItem.slug}`}>
                                    <button className="md:w-[50px] md:h-[50px] lg:w-[65px] lg:h-[65px] bg-green-400 rounded-full flex items-center justify-center text-white text-[20px] font-semibold hover:bg-green-500 transition-colors duration-300">
                                        <i className="fa-solid fa-play"></i>
                                    </button>
                                </Link>
                                <button className="md:w-[50px] md:h-[50px] lg:w-[65px] lg:h-[65px] bg-white rounded-full flex items-center justify-center text-white  font-semibold hover:bg-green-500 transition-colors duration-300">
                                    <img
                                        src="/image/bookmark.png"
                                        alt=""
                                        className="md:w-[30px] lg:w-auto"
                                    />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Banner;
