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
    // handle onclick icon search tablet pro
    const [IconSearch, setIconSearch] = useState(false);
    console.log("IconSearch", IconSearch);
    const [IconSearchMobie, setIconSearchMobie] = useState(false);
    console.log("IconSearchMobie", IconSearchMobie);
    // End handle onclick icon search tablet pro
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
        setIconSearch(false);
        setIconSearchMobie(false);
    };
    return (
        <div
            className={`flex items-center top-0 left-0 w-full z-50 py-2 xs:px-10 md:px-0 transition-all duration-300 ease-in-out ${
                isHome
                    ? isScrolled
                        ? "sticky bg-black bg-opacity-80 text-white shadow"
                        : "absolute bg-transparent text-white"
                    : "sticky bg-black bg-opacity-80 text-white shadow"
            }`}
        >
            <div className="flex items-center md:-ml-1 lg:ml-5 xl:ml-0 xl:pl-14">
                {/* logo */}
                <Link to="/">
                    <div className="flex justify-content-around items-center pt-2 xs:-ml-10 md:ml-12 lg:-ml-1 xl:-ml-0">
                        <img
                            src="/image/logo.png"
                            alt=""
                            className="xs:w-[70px] md:w-[70px] lg:w-[70px] xl:w-[70px]"
                        />
                        <p className="xs:-ml-[14px] md:-ml-[10px] lg:-ml-3 xl:-ml-3 md:text-lg lg:text-sm xl:text-2xl lg:-mt-1 xl:mt-0 font-semibold">
                            𝓛𝓝.𝓟𝓱𝓲𝓶
                        </p>
                    </div>
                </Link>
                {/* nav-danh mục phim*/}
                <div className="hidden md:w-[610px] lg:w-[610px] xl:w-[700px] pt-2 lg:pl-4 xl:pl-9 md:block md:absolute md:top-[60px] md:left-[12%] lg:static lg:top-[0px] xl:static xl:top-[0px]">
                    <div className="flex items-center justify-around font-semibold cursor-pointer lg:text-[14px] xl:text-[16px]">
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
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[420px] dark:bg-gray-700 dark:divide-gray-600"
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
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[420px] dark:bg-gray-700 dark:divide-gray-600"
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
                                className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-[220px] dark:bg-gray-700 dark:divide-gray-600"
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
                {/* nav-danh mục phim mobile */}
            </div>
            {/* action*/}
            <div className="lg:-ml-[30px] xl:ml-0 pl-[90px]">
                <div className="flex items-center justify-around">
                    {/* icon mobile */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={`xs:size-6 xs:block xs:size-6 xs:text-white xs:absolute xs:right-[80px] xs:z-50 xs:block  md:hidden lg:hidden xl:hidden`}
                        onClick={() => setIconSearchMobie(!IconSearchMobie)}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                    {/* icon tablet */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className={`xs:size-6 xs:hidden  lg:size-6 lg:text-white xs:translate-x-[55px] lg:-translate-x-[30px] lg:translate-y-1 lg:z-50 xs:block  md:hidden lg:block xl:hidden`}
                        onClick={() => setIconSearch(!IconSearch)}
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                        />
                    </svg>
                    {/*//*End icon mobile */}
                    <div className="lg:w-[100px] xl:w-[250px] flex items-center text-black  md:block">
                        <form onSubmit={handleSubmit} className="relative">
                            {/* pc */}
                            <div className="hidden xl:block">
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
                            </div>
                            {/* tablet pro */}
                            <div className="xs:hidden md:hidden lg:block xl:hidden">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm phim..."
                                    className={` h-[35px] rounded-lg pl-3 outline-none ${
                                        IconSearch
                                            ? "lg:translate-y-[150%] lg:-translate-x-[100%] lg:w-[250px]"
                                            : "lg:-translate-y-[200%] lg:-translate-x-[100%] lg:w-[50px]"
                                    } `}
                                    value={searchKeyword}
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className={`lg:size-6 lg:text-black lg:absolute  ${
                                        IconSearch
                                            ? "lg:-bottom-[135%] lg:-left-[30px]"
                                            : "lg:bottom-[135%] lg:-left-[30px]"
                                    }`}
                                    onClick={handleSubmit}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </div>
                            {/* tablet thường */}
                            <div className="xs:hidden md:block lg:hidden xl:hidden">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm phim..."
                                    className="w-[250px] h-[35px] md:rounded-lg lg:rounded-md xl:rounded-md pl-3 outline-none md:bg-[#63635c] lg:bg-white xl:bg-white  md:text-white lg:text-black xl:text-black"
                                    value={searchKeyword}
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className={`size-6 text-white  cursor-pointer absolute top-[5px] right-3`}
                                    onClick={handleSubmit}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </div>
                            {/* mobile */}
                            <div className="xs:block md:hidden lg:hidden xl:hidden">
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm phim..."
                                    className={`absolute h-[35px] rounded-lg pl-3 outline-none ${
                                        IconSearchMobie
                                            ? "xs:top-[30px] xs:-right-[80px] xs:w-[250px]"
                                            : "xs:-top-[100px] xs:-right-[80px] xs:w-[50px]"
                                    } `}
                                    value={searchKeyword}
                                    onChange={(e) =>
                                        setSearchKeyword(e.target.value)
                                    }
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className={`xs:size-6 xs:text-black xs:absolute  ${
                                        IconSearchMobie
                                            ? "xs:-bottom-[60px] xs:left-[50px]"
                                            : "xs:bottom-[235px] xs:-left-[30px]"
                                    }`}
                                    onClick={handleSubmit}
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                    />
                                </svg>
                            </div>
                        </form>
                    </div>
                    <button
                        className="flex items-center justify-center gap-1 xs:absolute xs:right-1 md:static xs:ml-[0px] md:ml-[50px] lg:-ml-[120px] xl:ml-4 lg:mt-1 xl:mt-0 xs:w-[70px] md:w-[100px] lg:w-[90px] xl:w-[100px] h-[36px] rounded-md bg-gradient-to-r from-orange-500 to-red-500 hover:bg-orange-500"
                        onClick={hanldClose}
                    >
                        <img
                            src="/image/wallet.png"
                            alt=""
                            className="w-[20px] h-[20px] cursor-pointer"
                        />
                        <span className="xs:hidden md:flex text-white lg:text-[13px] xl:text-[15px] lg:font-normal xl:font-medium">
                            Mua Gói
                        </span>
                        <span className="xs:flex md:hidden text-white lg:text-[13px] xl:text-[15px] lg:font-normal xl:font-medium">
                            VIP
                        </span>
                    </button>
                    <button
                        className="xs:hidden md:flex  items-center justify-center  md:ml-4 lg:ml-3 xl:ml-4 lg:font-normal xl:font-medium md:text-[13.9px] lg:text-[14px] xl:text-[16px] hover:text-orange-500"
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
