import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const PhimBo = () => {
    const [data, setData] = useState([]);
    // console.log("data", data);
    useEffect(() => {
        const getAll = async () => {
            const res = await axios.get(
                "https://phimapi.com/v1/api/danh-sach/phim-bo"
            );
            // console.log("res", res.data.data.items);

            setData(res.data.data.items);
        };
        getAll();
    }, []);
    return (
        <>
            <div className="bg-[#010101] ">
                <h2 className="text-white text-xl font-bold ml-[70px] mb-8 pt-5">
                    Tình yêu ngọt ngào
                </h2>
                <div className="xl:w-[1370px] xl:ml-[70px]">
                    <div className="grid grid-cols-5 gap-4">
                        {data.map((item) => (
                            <div key={item.id} className="w-[260px] h-[350px]">
                                {/* img */}
                                <Link to={`/${item.slug}`}>
                                    <div className="flex justify-center cursor-pointer relative">
                                        <img
                                            src={`https://phimimg.com/${item.poster_url}`}
                                            alt={item.name}
                                            className="w-full h-[300px] object-cover rounded-ss-md rounded-se-md hover:transform hover:scale-105 transition-transform duration-300"
                                        />
                                        <p className="text-white absolute bottom-0 left-4">
                                            {item.episode_current}
                                        </p>
                                    </div>
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

export default PhimBo;
