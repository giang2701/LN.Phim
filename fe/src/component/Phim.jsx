import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { Link, useParams } from "react-router-dom";

const App = () => {
    const [episodeLink, setEpisodeLink] = useState("");
    const { slug } = useParams();
    const [data, setData] = useState([]);
    console.log(data);

    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    useEffect(() => {
        const getAll = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://phimapi.com/phim/${slug}`);
                const movie = res.data;
                setData(movie);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getAll();
    }, [slug]);

    useEffect(() => {
        if (!loading && data.episodes?.length && !episodeLink) {
            const firstLink = data.episodes?.[0]?.server_data?.[0]?.link_m3u8;
            if (firstLink) {
                setEpisodeLink(firstLink);
            }
        }
    }, [loading, data, episodeLink]);

    useEffect(() => {
        if (episodeLink && videoRef.current) {
            if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(episodeLink);
                hls.attachMedia(videoRef.current);
                hls.on(Hls.Events.ERROR, function (event, data) {
                    console.error("HLS.js error", data);
                });
                return () => hls.destroy(); // cleanup khi unmount
            } else if (
                videoRef.current.canPlayType("application/vnd.apple.mpegurl")
            ) {
                videoRef.current.src = episodeLink;
            }
        }
    }, [episodeLink]);
    const groupedEpisodes = data.episodes?.reduce((acc, episode) => {
        const name = episode.server_name || "Khác";
        if (!acc[name]) {
            acc[name] = [];
        }
        acc[name].push(...(episode.server_data || []));
        return acc;
    }, {});
    if (loading)
        return (
            <>
                {/* Lớp phủ đen mờ */}
                <div className="absolute inset-0 bg-black"></div>
                <div className="breeding-rhombus-spinner detailPage flex xs:ml-[43%] md:ml-[48%] mt-[250px]">
                    <div className="rhombus child-1"></div>
                    <div className="rhombus child-2"></div>
                    <div className="rhombus child-3"></div>
                    <div className="rhombus child-4"></div>
                    <div className="rhombus child-5"></div>
                    <div className="rhombus child-6"></div>
                    <div className="rhombus child-7"></div>
                    <div className="rhombus child-8"></div>
                    <div className="rhombus big"></div>
                </div>
            </>
        );
    return (
        <div className="bg-black min-h-screen md:pt-[100px] lg:pt-[70px] -mt-[75px] relative">
            <img
                src={data?.movie?.thumb_url}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover blur-md" // hoặc blur-md, blur-lg
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                        "https://s3.cloud.cmctelecom.vn/tinhte1/2018/04/4282714_9PShuk4.jpg";
                }}
            />

            {/* Lớp phủ đen mờ */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>
            <div className="flex items-center md:ml-[40px]  xl:ml-[90px] text-white text-[12px] mt-5 relative">
                <Link to="/" className="flex items-center">
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
                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                        />
                    </svg>
                    &nbsp;<span> Trang Chủ </span>&nbsp;
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m8.25 4.5 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </Link>
                {data.movie?.country?.map((item) => item.name)}&nbsp;
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
                {data.movie?.year}&nbsp;
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="size-4"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
                {data.movie?.name}
            </div>
            {/* content PC */}
            <div className="hidden xl:flex items-center relative z-20">
                {/* box 1 */}
                <div className="w-[340px] h-[500px] bg-[#202125] ml-[40px] mt-6 overflow-y-auto scrollbar-hide pl-4">
                    {groupedEpisodes &&
                        Object.entries(groupedEpisodes).map(
                            ([name, items], index) => {
                                // Sắp xếp giảm dần theo số trong item.name
                                const sortedItems = [...items].sort((a, b) => {
                                    const getNumber = (str) => {
                                        const match = str.match(/\d+/);
                                        return match
                                            ? parseInt(match[0], 10)
                                            : 0;
                                    };
                                    return (
                                        getNumber(b.name) - getNumber(a.name)
                                    );
                                });

                                return (
                                    <div key={index}>
                                        <h3 className="text-white font-semibold px-1 mt-4 pt-4">
                                            {name}
                                        </h3>
                                        <div className="flex flex-wrap">
                                            {sortedItems.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setEpisodeLink(
                                                            item.link_m3u8
                                                        )
                                                    }
                                                    className="m-1 px-2 py-1 bg-[#bab8b8] rounded text-[15px] hover:bg-white"
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                </div>
                {/* box 2 */}
                <div style={{ marginTop: "20px" }}>
                    <video
                        ref={videoRef}
                        controls
                        className="xl:w-[800px] xl:h-[500px] bg-[#000]"
                    />
                </div>
                {/* box 3 */}
                <div className="w-[370px] text-white">
                    <div className="py-3 pl-4">
                        <h1 className="text-2xl font-bold w-[100%]">
                            {data.movie?.name}&nbsp;
                            <span className="text-lg">
                                ({data.movie?.origin_name})
                            </span>{" "}
                        </h1>
                        <p className="xl:text-sm xl:mt-4">
                            Thời lượng:&nbsp;
                            <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                {data.movie?.time}
                            </span>
                        </p>{" "}
                        <p className="xl:text-sm xl:mt-4">
                            Tình trạng:&nbsp;
                            <span className="xl:inline-block xl:bg-gray-400/50 xl:px-3 xl:py-[1px] xl:rounded-sm xl:ml-3">
                                {data.movie?.episode_current}
                            </span>
                        </p>
                        <p className="xl:text-sm xl:mt-4 leading-6">
                            Thể loại:&nbsp;
                            <span className="inline-block xl:py-[1px] xl:rounded-lg w-[300px] flex flex-wrap gap-x-2 gap-y-2">
                                {data.movie?.category?.map((item, index) => (
                                    <span
                                        key={index}
                                        className="bg-gray-400/50 px-3 py-[2px] rounded-lg"
                                    >
                                        {item.name}
                                    </span>
                                ))}
                            </span>
                        </p>
                        <p className="xl:text-sm xl:mt-4">
                            Năm phát hành:&nbsp;
                            <span className="xl:inline-block xl:bg-green-400/50 xl:px-3 xl:py-[1px] xl:rounded-lg xl:ml-3">
                                {data.movie?.year}
                            </span>
                        </p>
                        <div className="xl:text-sm xl:mt-4">
                            <p className="text-xl font-bold">
                                Nội Dung Phim :&nbsp;
                            </p>
                            <span
                                className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:mt-2 overflow-y-auto scrollbar-hide text-justify"
                                style={{
                                    width: "330px",
                                    maxHeight: "150px",
                                    overflowY: "auto",
                                    lineHeight: "1.7",
                                    // scrollbarWidth: "thin", // Firefox
                                }}
                            >
                                {data.movie?.content}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {/* content */}
            <div className="block xl:hidden items-center relative z-20 md:-mt-[40px] lg:-mt-[40px]">
                {/* box 1 */}
                <div className="mt-20">
                    <video
                        ref={videoRef}
                        controls
                        className="xs:w-[360px] md:w-[760px] xs:ml-[15px] md:ml-[30px] lg:w-[950px] lg:h-[500px] lg:ml-[35px]"
                    />
                </div>
                {/* box 2 */}
                <div className="xs:w-[370px] md:w-[770px] lg:w-[950px]  text-white text-justify md:ml-[15px]  lg:ml-[35px] ">
                    <div className="py-3 pl-4">
                        <div className="lg:text-sm lg:mt-4 xs:h-[140px] md:h-[200px] xs:overflow-y-auto scrollbar-hide">
                            <p className="text-xl font-bold">
                                Nội Dung Phim :&nbsp;
                            </p>
                            <span className="xs:text-xs md:text-xl lg:inline-block  lg:py-[1px] lg:rounded-lg lg:mt-2 ">
                                {data.movie?.content}
                            </span>
                        </div>
                    </div>
                </div>
                {/* box 3 */}
                <div className="xs:w-[360px] md:w-[748px] lg:w-[940px] h-[300px] bg-[#202125] xs:ml-[10px] md:ml-[30px] lg:ml-[40px] mt-3 overflow-y-auto scrollbar-hide xs:pl-2 md:pl-4">
                    {groupedEpisodes &&
                        Object.entries(groupedEpisodes).map(
                            ([name, items], index) => {
                                // Sắp xếp giảm dần theo số trong item.name
                                const sortedItems = [...items].sort((a, b) => {
                                    const getNumber = (str) => {
                                        const match = str.match(/\d+/);
                                        return match
                                            ? parseInt(match[0], 10)
                                            : 0;
                                    };
                                    return (
                                        getNumber(b.name) - getNumber(a.name)
                                    );
                                });

                                return (
                                    <div key={index}>
                                        <h3 className="text-white font-semibold px-1 mt-4 pt-4">
                                            {name}
                                        </h3>
                                        <div className="flex flex-wrap">
                                            {sortedItems.map((item, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() =>
                                                        setEpisodeLink(
                                                            item.link_m3u8
                                                        )
                                                    }
                                                    className="m-1 px-2 py-1 bg-[#bab8b8] rounded text-[15px] hover:bg-white"
                                                >
                                                    {item.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                );
                            }
                        )}
                </div>
            </div>
        </div>
    );
};

export default App;
