import { AdjustmentsVerticalIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";

const Filter = ({ doFilter, name, title, children }) => {
    const [isOpen, setIsOpen] = useState(null);
    const { watch, reset, } = useFormContext();
    const [marked, ismarked] = useState(false);
    const field = watch(name); // Watching multiple fields    
    const dropdownRef = useRef(null);
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const isFilled = field.some((item) => item !== undefined && item !== "");
    return (
        <div ref={dropdownRef} className="relative">
            <button type="button" onClick={() => setIsOpen(!isOpen)} className=" border w-10 h-10 hover:bg-sky-300 hover:text-white hover-animation cursor-pointer rounded-full flex justify-center relative items-center border-gray-300">
                <AdjustmentsVerticalIcon className="h-5 hover:text-white cursor-pointer px-2" />
            </button>
            {marked && <span className="h-2 w-2 absolute bg-red-400 top-0 right-1 rounded-full"></span>}
            <div className={`absolute z-[1000] gap-2 flex flex-col top-12 pb-2 border-1 border-gray-200 right-[-13rem] w-md shadow-md rounded-md bg-white transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                <h2 className="text-base px-4 pt-4 font-bold">{title}</h2>
                {children}
                <div className="flex gap-2 px-4">
                    <button onClick={() => {
                        const objBean = Object.fromEntries(name.map(key => [key, undefined]));
                        reset(objBean);
                        doFilter(objBean);
                        setIsOpen(false);
                        ismarked(false);
                    }} type="button" className="border border-gray-300 w-full rounded-md p-2 cursor-pointer">
                        Reset
                    </button>
                    <button onClick={() => {
                        const objSent = Object.fromEntries(name.map(key => [key, watch(key)]));
                        doFilter(objSent);
                        setIsOpen(false);
                        ismarked(isFilled);
                    }} type="button" className="border bg-green-600 text-white border-gray-300 w-full rounded-md p-2 cursor-pointer">
                        Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Filter;