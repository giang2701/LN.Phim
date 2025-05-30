import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import NotFound from "./NotFound";

const MovieSearch = () => {
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);
    const [yearOptions, setYearOptions] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [results, setResults] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const currentYear = new Date().getFullYear();
    // Lấy thể loại và quốc gia
    useEffect(() => {
        const fetchCategoriesAndCountries = async () => {
            try {
                const categoryResponse = await axios.get(
                    "https://phimapi.com/the-loai"
                );
                const countryResponse = await axios.get(
                    "https://phimapi.com/quoc-gia"
                );

                setCategories(categoryResponse.data);
                setCountries(countryResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchCategoriesAndCountries();
        setYearOptions(
            Array.from(
                { length: currentYear - 2000 + 1 },
                (_, i) => currentYear - i
            )
        );
    }, [currentYear]);

    // Tự động tìm khi đổi trang
    useEffect(() => {
        if (keyword || selectedCategory || selectedCountry || selectedYear) {
            handleSearch();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handleSearch = async (kw = keyword) => {
        setLoading(true);
        try {
            // Giả lập thời gian loading 2 giây
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const params = new URLSearchParams({
                keyword: kw,
                category: selectedCategory,
                country: selectedCountry,
                year: selectedYear,
                page: currentPage,
                sort_field: "_id",
                sort_type: "desc",
                limit: 30,
            });

            const response = await axios.get(
                `https://phimapi.com/v1/api/tim-kiem?${params}`
            );
            setResults(response.data.data.items || []);
        } catch (error) {
            console.error("Error searching movies:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const keywordFromUrl = searchParams.get("keyword") || "";
        setKeyword(keywordFromUrl);
        if (keywordFromUrl) {
            setCurrentPage(1);
            handleSearch(keywordFromUrl);
        }
    }, [searchParams]);
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
        <div className="bg-black min-h-screen xs:pt-[50px] md:pt-[120px] xl:pt-[100px] -mt-[75px]">
            <div className="md:flex items-center bg-black  md:w-[720px] lg:w-[790px] xl:w-[1370px] h-[30px] md:ml-[45px] lg:ml-[125px] xl:ml-[70px] xs:mb-[120px] md:mb-5 py-8 pl-4 md:rounded-md md:border-[2px] md:border-white/40">
                <p className="text-white mr-6 xs:mb-6 md:mb-0 xs:font-bold md:font-normal">
                    Lọc Phim
                </p>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="xs:w-[150px] md:w-[130px] lg:w-[150px] xl:w-[180px] xs:mb-3 md:mb-0 xs:mr-7 md:mr-2 lg:mr-5 xl:mr-5 md:text-sm lg:text-sm xl:text-base px-3 py-2 bg-black text-white border border-white/30 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 ease-in-out hover:border-white/60 "
                >
                    <option value="">Chọn thể loại</option>
                    {categories.map((cat) => (
                        <option key={cat.slug} value={cat.slug}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="xs:w-[150px] md:w-[130px] lg:w-[150px] xl:w-[180px] xs:mb-3 md:mb-0 md:mr-5 lg:mr-5 xl:mr-5 md:text-sm lg:text-sm xl:text-base px-3 py-2 bg-black text-white border border-white/30 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 ease-in-out hover:border-white/60 "
                >
                    <option value="">Chọn quốc gia</option>
                    {countries.map((country) => (
                        <option key={country.slug} value={country.slug}>
                            {country.name}
                        </option>
                    ))}
                </select>
                <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="xs:w-[150px] md:w-[130px] lg:w-[150px] xl:w-[180px] xs:mb-3 md:mb-0 xs:mr-7 md:mr-6 lg:mr-5 xl:mr-5 md:text-sm lg:text-sm xl:text-base px-3 py-2 bg-black text-white border border-white/30 rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 ease-in-out hover:border-white/60 "
                >
                    <option value="">Chọn năm</option>
                    {yearOptions.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <button
                    onClick={() => {
                        setCurrentPage(1);
                        handleSearch();
                    }}
                    className="w-[150px] px-1 py-1 bg-[#8563fe] text-white border border-white/30 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-white/50 transition duration-200 ease-in-out hover:border-white/60"
                >
                    Tìm Kiếm
                </button>
            </div>
            <div className="results">
                {results.length > 0 ? (
                    <div className="xl:w-[1370px] xl:ml-[70px] xs:pl-3 md:pl-3 xl:pl-0">
                        <div className="grid xs:grid-cols-2  md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 md:gap-1 xl:gap-4">
                            {results.map((item) => (
                                <div
                                    key={item.id}
                                    className="xs:w-[180px]  md:w-[186px] xl:w-[260px] h-[350px]"
                                >
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
                        <div className="mt-4 pb-3 flex justify-between">
                            <button
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                                disabled={currentPage === 1}
                                className="px-3 py-3 bg-black text-white/70 rounded-full border-[2px] border-white/50 xs:ml-[270px] md:ml-[650px] lg:ml-[880px] xl:ml-[1250px] hover:border-white hover:text-white"
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
                                onClick={() =>
                                    setCurrentPage((prev) => prev + 1)
                                }
                                className="px-3 py-3 bg-black text-white/70 rounded-full border-[2px] border-white/50 xl:mr-[0px] hover:border-white hover:text-white"
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
                ) : (
                    <div className="flex justify-center items-center h-[450px]">
                        <NotFound />
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSearch;
