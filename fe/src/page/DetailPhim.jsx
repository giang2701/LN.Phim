import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailPhim = () => {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    // console.log("data", data.movie?.actor);

    useEffect(() => {
        const getAll = async () => {
            setLoading(true);
            try {
                // Giả lập thời gian loading 2 giây
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const res = await axios.get(`https://phimapi.com/phim/${slug}`);
                setData(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        getAll();
    }, [slug]);

    if (loading)
        return (
            <>
                {/* Lớp phủ đen mờ */}
                <div className="absolute inset-0 bg-black"></div>
                <div className="breeding-rhombus-spinner detailPage flex ml-[48%] mt-[250px]">
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
        <>
            <div className="relative w-full h-screen pt-[70px] -mt-[75px]">
                {/* Ảnh nền */}
                <img
                    src={data?.movie?.thumb_url}
                    alt="background"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                        e.target.onerror = null; // tránh vòng lặp vô hạn nếu ảnh fallback cũng lỗi
                        e.target.src =
                            "https://s3.cloud.cmctelecom.vn/tinhte1/2018/04/4282714_9PShuk4.jpg";
                    }}
                />

                {/* Lớp phủ đen mờ */}
                <div className="absolute inset-0 bg-black bg-opacity-60"></div>
                <div className="relative z-10 text-white pt-6">
                    <div className="flex items-center  ml-[70px] text-white text-[12px]">
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
                    <div className="xl:w-[1150px] xl:flex xl:mt-7 xl:items-center xl:ml-[170px] gap-3">
                        {/* left */}
                        <div className="xl:w-[35%] relative">
                            <img
                                src={`${data.movie?.poster_url}`}
                                alt={data.movie?.name}
                                className="w-full h-[560px] object-cover rounded-md"
                            />
                            <Link to={`/play/${data.movie?.slug}`}>
                                <button className="absolute bottom-1 right-2 flex w-[150px] p-3 border-2 border-white rounded-2xl bg-green-600 items-center justify-center font-semibold hover:bg-green-700 hover:border-green-500 transition">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                                        />
                                    </svg>
                                    &nbsp; Xem Phim
                                </button>
                            </Link>
                        </div>
                        {/* right */}
                        <div className="xl:w-[60%] bg-black bg-opacity-40 h-[563px] rounded-lg">
                            <div className="py-3 pl-4">
                                <h1 className="text-2xl font-bold w-[90%]">
                                    {data.movie?.name}&nbsp;
                                    <span className="text-lg">
                                        ({data.movie?.origin_name})
                                    </span>{" "}
                                </h1>
                                <p className="xl:text-sm xl:mt-4">
                                    Tình trạng:&nbsp;
                                    <span className="xl:inline-block xl:bg-gray-400/50 xl:px-3 xl:py-[1px] xl:rounded-sm xl:ml-3">
                                        {data.movie?.episode_current}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Số tập :&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.episode_total}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Thời lượng:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.time}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Năm phát hành:&nbsp;
                                    <span className="xl:inline-block xl:bg-green-400/50 xl:px-3 xl:py-[1px] xl:rounded-lg xl:ml-3">
                                        {data.movie?.year}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Chất lượng:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.quality}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Ngôn ngữ:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.lang}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Đạo diễn:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.director}
                                    </span>
                                </p>
                                <div className="xl:text-sm xl:mt-4 xl:flex xl:items-center">
                                    <p>Diễn viên:&nbsp;</p>
                                    <p
                                        className="xl:py-[1px] xl:rounded-lg xl:ml-1 w-[500px] overflow-hidden text-ellipsis whitespace-nowrap"
                                        title={data.movie?.actor}
                                    >
                                        {data.movie?.actor}
                                        {data.movie?.actor}
                                    </p>
                                </div>{" "}
                                <p className="xl:text-sm xl:mt-4">
                                    Thể loại:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.category?.map(
                                            (item, index) => (
                                                <span
                                                    key={index}
                                                    className="xl:bg-gray-400/50 xl:px-3 xl:py-[1px] xl:rounded-lg xl:ml-1"
                                                >
                                                    {item.name}
                                                    {index <
                                                    data.movie?.category
                                                        .length -
                                                        1
                                                        ? ""
                                                        : ""}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </p>
                                <p className="xl:text-sm xl:mt-4">
                                    Quốc gia:&nbsp;
                                    <span className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:ml-1">
                                        {data.movie?.country?.map(
                                            (item, index) => (
                                                <span
                                                    key={index}
                                                    className="xl:bg-gray-400/50 xl:px-3 xl:py-[1px] xl:rounded-lg xl:ml-1"
                                                >
                                                    {item.name}
                                                    {index <
                                                    data.movie?.country.length -
                                                        1
                                                        ? ""
                                                        : ""}
                                                </span>
                                            )
                                        )}
                                    </span>
                                </p>
                                <div className="xl:text-sm xl:mt-4">
                                    <p className="text-xl font-bold">
                                        Nội Dung Phim :&nbsp;
                                    </p>
                                    <span
                                        className="xl:inline-block xl:py-[1px] xl:rounded-lg xl:mt-2"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            lineHeight: "1.7",
                                        }}
                                    >
                                        {data.movie?.content}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailPhim;
