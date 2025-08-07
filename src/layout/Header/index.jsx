import { ArrowLeftStartOnRectangleIcon, Bars3Icon, ChevronDownIcon, UserCircleIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { useContext, useEffect, useRef, useState } from 'react';
import ContextMenu from '../Context';
import useCustomEvent from '../../hooks/useCustomEvent';
import { Link } from 'react-router-dom';
import useLogOut from './hooks-integration/useLogout';

const Header = ({ data }) => {
    const { requestEvents } = useCustomEvent()
    const [isOpen, setIsOpen] = useState(false);
    const { open, setopen } = useContext(ContextMenu);
    const { postData } = useLogOut();
    const dropdownRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleLogout = () => {
        postData({ x: 1 });
        // removeToken()
    }
    return (
        <header className="animate-gradient bg-gradient-to-r from-cyan-500 via-gray-700 to-blue-400 bg-[length:100%_500%] flex justify-between items-center border-b-1 border-gray-200 shadow-2xl text-white pl-4 h-[4rem]">
            <div className="flex justify-between items-center">
                <div onClick={() => {
                    setopen(!open)
                    requestEvents({
                        eventName: "OPEN_SIDEBAR", input: {
                            detail: {
                                show: open
                            }
                        }
                    })
                }} className='cursor-pointer flex items-center justify-center w-8 h-8 relative'>
                    <Bars3Icon className={`text-white h-[24px] absolute transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'}`} />
                    <XMarkIcon className={`text-white-400 h-[24px] absolute transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </div>
            <div className='flex gap-8'>
                {/* <div className='flex gap-2 items-center'>
                    <div className='p-3 relative hover-animation text-gray-500 cursor-pointer hover:bg-sky-300 hover:text-white rounded-full'>
                        <div className="absolute top-2.5 right-2 bg-red-500 w-2 h-2 text-xs rounded-full animate-pulse"></div>
                        <BellAlertIcon className='h-5 text-white' />
                    </div>
                    <div className='p-3 relative hover-animation text-gray-500 cursor-pointer hover:bg-sky-300 hover:text-white rounded-full'>
                        <div className="absolute top-2.5 right-2 bg-red-500 w-2 h-2 text-xs rounded-full animate-pulse"></div>
                        <FolderIcon className='h-5 text-white' />
                    </div>
                </div> */}
                <div ref={dropdownRef} className='flex gap-8 pr-4 h-full relative items-center cursor-pointer'>
                    <div className="my-2 border-r-1 border-white h-6 mx-auto" />
                    <div onClick={() => setIsOpen(!isOpen)} className='flex gap-2 items-center'>
                        <div>
                            <UserCircleIcon className='h-8 text-white' />
                        </div>
                        <div className="text-sm text-white font-bold">hi, {data?.name}</div>
                        <ChevronDownIcon className={`h-[16px] text-white font-bold transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                    </div>
                    <div className={`absolute z-[1000] gap-2 flex flex-col top-12 pb-2 border-1 border-gray-200 right-0 w-md shadow-md rounded-md bg-white transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
                        <div className='flex bg-blue-400 px-3 rounded-t-md items-center pb-2 flex-col justify-center'>
                            <UserCircleIcon className='h-28 text-white' />
                            <span className='text-base text-center font-bold text-white'>{data?.email}</span>
                            {/* <span className='text-xs text-center font-bold text-white'>{data?.workingUnit}</span>
                            <span className='text-xs text-center font-bold text-white'>{data?.specialization}</span> */}
                        </div>
                        <div className='flex py-1 justify-between bg-white gap-2 px-4'>
                            <Link to={`/user/${data?._id}/edit`} className='text-base justify-center border w-[50%] rounded-md border-gray-200 hover-animation items-center cursor-pointer flex gap-2 px-3 py-3 text-gray-500 font-semibold hover:bg-blue-400 hover:text-white'>
                                <UserIcon className='h-[16px]' />
                                Account
                            </Link>
                            <div onClick={handleLogout} className='text-base justify-center border w-[50%] rounded-md border-gray-200 hover-animation items-center cursor-pointer flex gap-2 px-3 py-3 text-gray-500 font-semibold hover:bg-blue-400 hover:text-white'>
                                <ArrowLeftStartOnRectangleIcon className='h-[16px]' />
                                Sign Out
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    );
};

export default Header;
