import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Header = () => {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [searchKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();
    const [isScrolled, setIsScrolled] = useState(false);
    // thể loại phim
    const [TheLoai, setTheLoai] = useState([]);
    // thể quoc gia
    const [nation, setNation] = useState([]);

    // Tạo mảng các năm từ 2000 đến năm hiện tại
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 2000 + 1 },
        (_, index) => 2000 + index
    );

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    // thể loại phim
    useEffect(() => {
        const cachedData = localStorage.getItem("theLoai");

        if (cachedData) {
            setTheLoai(JSON.parse(cachedData));
        } else {
            const getAll = async () => {
                const res = await axios.get("https://phimapi.com/the-loai");
                // console.log(res.data);
                setTheLoai(res.data);
                localStorage.setItem("theLoai", JSON.stringify(res.data));
            };
            getAll();
        }
    }, []);
    // end thể loại phim
    // Quốc gia
    useEffect(() => {
        const cachedData = localStorage.getItem("nation");

        if (cachedData) {
            setNation(JSON.parse(cachedData));
        } else {
            const getAll = async () => {
                const res = await axios.get("https://phimapi.com/quoc-gia");
                // console.log(res.data);
                setNation(res.data);
                localStorage.setItem("nation", JSON.stringify(res.data));
            };
            getAll();
        }
    }, []);
    const hanldClose = () => {
        Swal.fire("Chức năng này đang phát triển!!!");
    };
    // end Quốc gia

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchKeyword.trim()) {
            navigate(
                `/search?keyword=${encodeURIComponent(searchKeyword.trim())}`
            );
        }
    };
    return (
        <div
            className={`flex items-center top-0 left-0 w-full z-50 py-2 transition-all duration-300 ease-in-out ${
                isHome
                    ? isScrolled
                        ? "sticky bg-black bg-opacity-80 text-white shadow"
                        : "absolute bg-transparent text-white"
                    : "sticky bg-black bg-opacity-80 text-white shadow"
            }`}
        >
            <div className="flex items-center pl-14">
                {/* logo */}
                <Link to="/">
                    <div className="flex justify-content-around items-center pt-2 ">
                        <img
                            src="/image/logo.png"
                            alt=""
                            className="w-[70px]"
                        />
                        <p className="-ml-3 text-2xl font-semibold">𝓛𝓝.𝓟𝓱𝓲𝓶</p>
                    </div>
                </Link>
                {/* nav-danh mục phim*/}
                <div className="w-[700px] pt-2 pl-9 ">
                    <div className="flex items-center justify-around font-semibold cursor-pointer">
                        <Link to={`danh-sach/phim-bo`}>Phim Bộ</Link>
                        <Link to={`danh-sach/phim-le`}>Phim Lẻ</Link>
                        <Link to={`danh-sach/tv-shows`}>Tv Show</Link>
                        <Link to={`danh-sach/hoat-hinh`}>Hoạt Hình</Link>
                        <div className="flex items-center">
                            <button
                                id="dropdownNavbarLinkCategory"
                                data-dropdown-toggle="dropdownNavbarCategory"
                                className="flex items-center justify-between w-full py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                            >
                                Thể Loại
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu for Category */}
                            <div
                                id="dropdownNavbarCategory"
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[620px] dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-400 grid grid-cols-3 gap-x-2 gap-y-1 px-4"
                                    aria-labelledby="dropdownLargeButton"
                                >
                                    {TheLoai.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/the-loai/${item.slug}`}
                                                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button
                                id="dropdownNavbarLinkCountry"
                                data-dropdown-toggle="dropdownNavbarCountry"
                                className="flex items-center justify-between w-full py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                            >
                                Quốc Gia
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>
                            {/* Dropdown menu for Country */}
                            <div
                                id="dropdownNavbarCountry"
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[620px] dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-400 grid grid-cols-3 gap-x-2 gap-y-1 px-4"
                                    aria-labelledby="dropdownLargeButton"
                                >
                                    {nation.map((item, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/quoc-gia/${item.slug}`}
                                                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <button
                                id="dropdownNavbarLinkYear"
                                data-dropdown-toggle="dropdownNavbarYear"
                                className="flex items-center justify-between w-full py-2 px-3 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                            >
                                Năm
                                <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 4 4 4-4"
                                    />
                                </svg>
                            </button>

                            {/* Dropdown menu for Year */}
                            <div
                                id="dropdownNavbarYear"
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[620px] dark:bg-gray-700 dark:divide-gray-600"
                            >
                                <ul
                                    className="py-2 text-sm text-gray-700 dark:text-gray-400 grid grid-cols-3 gap-x-2 gap-y-1 px-4"
                                    aria-labelledby="dropdownNavbarLinkYear"
                                >
                                    {years.map((year, index) => (
                                        <li key={index}>
                                            <Link
                                                to={`/nam/${year}`}
                                                className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                                {year}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* action*/}
            <div className="pl-[90px]">
                <div className="flex items-center justify-around">
                    <div className="w-[250px] flex items-center text-black">
                        <form onSubmit={handleSubmit} className="relative">
                            <input
                                type="text"
                                placeholder="Tìm kiếm phim..."
                                className="w-[250px] h-[35px] rounded-md pl-3 outline-none"
                                value={searchKeyword}
                                onChange={(e) =>
                                    setSearchKeyword(e.target.value)
                                }
                            />
                            <img
                                src="/image/search-interface-symbol.png"
                                alt=""
                                onClick={handleSubmit}
                                className="w-[20px] h-[20px] cursor-pointer absolute top-2 right-3"
                            />
                        </form>
                    </div>
                    <button
                        className="flex items-center justify-center gap-1 ml-4 w-[100px] h-[36px] rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:bg-orange-500"
                        onClick={hanldClose}
                    >
                        <img
                            src="/image/wallet.png"
                            alt=""
                            className="w-[20px] h-[20px] cursor-pointer"
                        />
                        <span className="font-medium text-white text-[15px]">
                            Mua Gói
                        </span>
                    </button>
                    <button
                        className="flex items-center justify-center ml-4 font-medium text-[16px] hover:text-orange-500"
                        onClick={hanldClose}
                    >
                        Đăng Nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
