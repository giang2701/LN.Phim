import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const BrowsePage = () => {
    const { type, value } = useParams();
    const [movies, setMovies] = useState([]);
    // console.log("movies", movies);
    const formatSlug = (slug) =>
        slug
            .split("-")
            .map((w) => w[0].toUpperCase() + w.slice(1))
            .join(" ");
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 20; // Giới hạn mặc định mỗi trang

    useEffect(() => {
        const baseApi = (() => {
            switch (type) {
                case "nam":
                    return `https://phimapi.com/v1/api/nam/${value}`;
                case "the-loai":
                    return `https://phimapi.com/v1/api/the-loai/${value}`;
                case "quoc-gia":
                    return `https://phimapi.com/v1/api/quoc-gia/${value}`;
                case "danh-sach":
                    const validDanhSach = [
                        "phim-bo",
                        "phim-le",
                        "tv-shows",
                        "hoat-hinh",
                    ];
                    return validDanhSach.includes(value)
                        ? `https://phimapi.com/v1/api/danh-sach/${value}`
                        : null;
                default:
                    console.warn("Loại 'type' không hợp lệ:", type);
                    return null;
            }
        })();

        if (!baseApi) return;

        const fetchMovies = async (page) => {
            try {
                const res = await axios.get(
                    `${baseApi}?page=${page}&limit=${limit}`
                );
                return res.data.data;
            } catch (error) {
                console.error("Lỗi khi fetch:", error);
                return { items: [], pagination: {} };
            }
        };

        const fetchAllMovies = async () => {
            setLoading(true);
            try {
                // Giả lập thời gian loading 2 giây
                await new Promise((resolve) => setTimeout(resolve, 2000));
                const firstRes = await fetchMovies(currentPage);
                const { items, pagination } = firstRes;

                const totalPages = pagination?.totalPages || 1;
                const allItems = [...items];

                // Duyệt qua các trang tiếp theo nếu cần
                for (let page = 2; page <= totalPages; page++) {
                    const res = await fetchMovies(page);
                    allItems.push(...res.items);
                }

                setMovies(allItems);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMovies();
    }, [type, value, currentPage]);

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
        <div className="p-4 bg-black pt-[80px] -mt-[75px]">
            <h2 className="text-2xl font-bold mb-7 capitalize text-white ml-16 mt-6">
                {formatSlug(value)}
            </h2>
            <div className="xl:w-[1370px] xl:ml-[70px]">
                <div className="grid grid-cols-5 gap-4">
                    {movies.map((item) => (
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
            <div className="mt-4 flex justify-between">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-3 bg-black text-white/70 rounded-full border-[2px] border-white/50 xl:ml-[1350px] hover:border-white hover:text-white"
                >
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
                            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5"
                        />
                    </svg>
                </button>
                <button
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-3 py-3 bg-black text-white/70 rounded-full border-[2px] border-white/50 xl:mr-[40px] hover:border-white hover:text-white"
                >
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
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default BrowsePage;
