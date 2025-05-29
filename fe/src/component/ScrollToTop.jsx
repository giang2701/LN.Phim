import React, { useState, useEffect } from "react";

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Hàm theo dõi vị trí cuộn
    const handleScroll = () => {
        const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
        setIsVisible(scrollTop > 300); // Hiển thị nút khi cuộn xuống hơn 300px
    };

    // Hàm cuộn lên đầu
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth", // Cuộn mượt mà
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {/* Nút cuộn lên đầu */}
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="hidden md:inline-block xl:inline-block fixed bottom-8 right-8 bg-white border-none rounded-full w-[50px] h-[50px] shadow-[0_2px_5px_rgba(0,0,0,0.3)] z-[99]"
                >
                    <i className="fa-solid fa-angles-up"></i>
                </button>
            )}
        </div>
    );
};

export default ScrollToTop;
