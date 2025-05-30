import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="flex justify-center items-center bg-[#000] text-white h-[80px] border-t-[1px] border-x-gray-300 py-3">
                {" "}
                {/* logo */}
                <Link to="/">
                    <div className="flex justify-content-around items-center pt-2 ">
                        <img
                            src="../../public/image/logo.png"
                            alt=""
                            className="w-[70px]"
                        />
                        <p className="-ml-3 xs:text-lg md:text-2xl font-semibold">
                            𝓛𝓝.𝓟𝓱𝓲𝓶 Thế Giới Phim Mới Nhất
                        </p>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default Footer;
