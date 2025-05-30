import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PhimLe = () => {
    const [data, setData] = useState([]);
    // console.log("data", data);
    useEffect(() => {
        const getAll = async () => {
            const res = await axios.get(
                "https://phimapi.com/v1/api/danh-sach/phim-le"
            );
            // console.log("res", res.data.data.items);

            setData(res.data.data.items);
        };
        getAll();
    }, []);
    return (
        <>
            <div className="bg-[#010101] lg:-mt-1 xl:-mt-0 lg:pt-10 xl:pt-10">
                <h2 className="text-white text-xl font-bold md:ml-[25px] lg:ml-[35px] xl:ml-[75px] mb-8 -mt-5 md:pt-9 lg:mt-0">
                    Mảnh ghép đơn lẻ
                </h2>
                <div className="md:w-[750px] lg:w-[900px] xl:w-[1370px] md:ml-[28px] lg:ml-[50px] xl:ml-[70px]">
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {data.map((item) => (
                            <div
                                key={item.id}
                                className="md:w-[240px] lg:w-[220px] xl:w-[260px] h-[350px]"
                            >
                                {/* img */}
                                <Link to={`/${item.slug}`}>
                                    <div className="flex justify-center cursor-pointer relative">
                                        <img
                                            src={`https://phimimg.com/${item.poster_url}`}
                                            alt={item.name}
                                            className="w-full h-[300px] object-cover rounded-ss-md rounded-se-md hover:transform hover:scale-105 transition-transform duration-300"
                                        />

                                        <p className="text-white absolute bottom-0 lg:left-2 xl:left-4">
                                            {item.episode_current}
                                        </p>
                                    </div>{" "}
                                </Link>
                                {/* name product */}
                                <div
                                    className="text-[14px] mt-2 cursor-pointer line-clamp-2 h-[42px] text-white"
                                    title={item.name}
                                >
                                    <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                                        {item.name}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PhimLe;
