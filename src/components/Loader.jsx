import React from "react";
import { BiLoaderAlt } from "react-icons/bi";
const Loader = () => {
    return (
        <div className="flex justify-center items-center ">
            <BiLoaderAlt className="h-52 w-[70px] animate-spin text-gray-300" />
        </div>
    );
};

export default Loader;
