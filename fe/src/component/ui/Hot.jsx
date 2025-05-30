import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Hot = () => {
    const scrollRef = useRef(null);
    const [isActive, setIsActive] = useState("");
    const [data, setData] = useState([]);
    // console.log("data", data);
    const handleScroll = (direction) => {
        setIsActive(direction);
        if (scrollRef.current) {
            const scrollAmount = direction === "right" ? 1500 : -1500; // Độ dài lướt
            scrollRef.current.scrollLeft += scrollAmount;
        }
    };

    useEffect(() => {
        const getAll = async () => {
            const res = await axios.get(
                "https://phimapi.com/danh-sach/phim-moi-cap-nhat"
            );
            setData(res.data.items);
        };
        getAll();
    }, []);
    return (
        <>
            <div className="relative z-20 xs:-top-[600px] md:top-0 md:-mt-[420px] lg:-mt-[720px] xl:-mt-[600px]">
                <div className="text-white text-xl font-bold xs:ml-[20px] md:ml-[28px] lg:ml-[35px] xl:ml-[75px] md:pt-3 lg:mt-0">
                    <h2>Đề xuất hot</h2>
                </div>
                <div className="md:w-[790px] lg:w-[880px] xl:w-[1365px] lg:ml-[10px] xl:ml-[60px]  xl:rounded-md md:rounded-md  mt-5 pb-7 md:pt-1 lg:pt-3">
                    {/* header BestSellingGoods */}
                    {/* body BestSellingGoods */}
                    <div className="box_2_container relative ">
                        {/* button left */}
                        <div className="hidden md:inline xl:inline ">
                            {isActive !== "right" ? (
                                <>
                                    {/* {" "}
                                    <div
                                        className="absolute hidden md:-left-3 xl:-left-[20px]  top-[52%] cursor-pointer shadow-[0_3px_8px_rgba(0,0,0,0.24)]  w-[40px] h-[40px]  flex justify-center items-center  rounded-full font-semibold text-xl text-[#a19f9f] pt-[2px]"
                                        onClick={() => handleScroll("left")}
                                    >
                                        <p>&#60;</p>
                                    </div> */}
                                </>
                            ) : (
                                <>
                                    {" "}
                                    <div
                                        className="absolute md:-left-1 xl:-left-[20px] top-[42%] cursor-pointer  text-white"
                                        onClick={() => handleScroll("left")}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M15.75 19.5 8.25 12l7.5-7.5"
                                            />
                                        </svg>
                                    </div>
                                </>
                            )}
                        </div>
                        {/* content */}
                        <div
                            className="xs:w-[360px] md:w-[750px] lg:w-[930px] xl:w-[1365px] ml-[15px] md:ml-[22px] xl:ml-[15px] mt-4 flex sub_box_2_container overflow-x-auto no-scrollbar md:overflow-hidden xl:overflow-hidden scroll-smooth"
                            ref={scrollRef}
                        >
                            {data.map((item) => (
                                <div
                                    key={item.id}
                                    className="xs:w-[120px] md:w-[207px] lg:w-[227px] xl:w-[237px]  h-[350px] xs:mr-[5px] md:mr-[8px] lg:mr-2 xl:mr-3"
                                >
                                    {/* img */}
                                    <Link to={`/${item.slug}`}>
                                        <div className="flex justify-center cursor-pointer relative ">
                                            <img
                                                src={`${item.poster_url}`}
                                                alt={item.name}
                                                className="w-full md:h-[270px] lg:h-[300px] object-cover rounded-ss-md rounded-se-md hover:transform hover:scale-105 transition-transform duration-300"
                                            />
                                            <p className="text-white absolute bottom-0 left-4">
                                                {item.episode_current}
                                            </p>
                                        </div>
                                    </Link>
                                    {/* name product */}
                                    <div
                                        className="text-[14px] mt-2 w-[300px] cursor-pointer line-clamp-2 h-[42px] text-white "
                                        title={item.name}
                                    >
                                        <p className="xs:w-[100px] md:w-[200px] overflow-hidden whitespace-nowrap text-ellipsis">
                                            {item.name}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* button right */}
                        <div className="hidden md:inline xl:inline ">
                            {isActive === "right" ? (
                                <>
                                    {/* <div
                                        className="absolute hidden -right-3 top-[502%] cursor-pointer shadow-[0_3px_8px_rgba(0,0,0,0.24)]  w-[40px] h-[40px] bg-white flex justify-center items-center  rounded-full font-semibold text-xl text-[#a19f9f] pt-[2px]"
                                        onClick={() => handleScroll("right")}
                                    >
                                        <p>&#62;</p>
                                    </div> */}
                                </>
                            ) : (
                                <>
                                    <div
                                        className="absolute md:-right-[10px] lg:-right-[110px] xl:-right-12 top-[42%] cursor-pointer text-white"
                                        onClick={() => handleScroll("right")}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="size-6"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                            />
                                        </svg>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hot;
