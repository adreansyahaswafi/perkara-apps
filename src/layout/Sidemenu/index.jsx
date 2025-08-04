import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react';
import ContextMenu from '../Context';
import { Link, useLocation } from 'react-router-dom';
import result from './data';
import logo from '../../assets/images/logo.png';
import ribbon from '../../assets/images/ribbon.png';


const findItemByCodeWithParents = (data, code, parents = []) => {
    for (const item of data) {
        const newParents = [...parents, item]; // Track parent hierarchy
        if (item.code === code) {
            return { item, parents: newParents };
        }
        if (item.childrens) {
            const found = findItemByCodeWithParents(item.childrens, code, newParents);
            if (found) return found;
        }
    }
    return null;
};

const Sidemenu = () => {
    const { open } = useContext(ContextMenu);
    const [openMenu, setOpenMenu] = useState(null);
    const [openMenumultilevel, setOpenMenumultilevel] = useState(null);
    const route = useLocation();

    const menuAccessParent = ({ code }) => {
        if (openMenu === code) {
            setOpenMenu(null)
        }
        else {
            setOpenMenu(code)

        }
    }
    const menuAccessNext = ({ code }) => {
        if (openMenumultilevel === code) {
            setOpenMenumultilevel(null)
        }
        else {
            setOpenMenumultilevel(code)
        }
    }
    const path = route?.pathname?.split("/")?.filter(i => i !== "")?.[0];

    useEffect(() => {
        const isCod = path;
        const isFind = findItemByCodeWithParents(result, isCod);
        const menu = isFind?.parents?.map(item => (item))?.filter((_, index) => index > 0);
        const isParent = menu?.filter(i => i.childrens !== null);
        setOpenMenu(isParent?.[0]?.code);
        setOpenMenumultilevel(isParent?.[1]?.code);
    }, [path]);
    return (
        <div>
            <Sidebar width={"20rem"} collapsed={open} collapsedWidth="0px" className='!bg-white h-full'>
                <div className='flex-1 relative bg-[#ffffff00] shadow-sm justify-center flex flex-col items-center px-4 py-2'>
                    <img src={ribbon} className='w-41 absolute right-[-3rem] scale-y-[-1] rotate-90 ' alt='background' />
                    <img src={ribbon} className='w-41 absolute left-[-3rem] scale-x-[-1] rotate-90 ' alt='background' />
                    <img src={logo} className='w-32 h-32' alt='background' />
                    <div className='text-sm font-bold'><span>SI</span><span className='text-sm font-bold text-red-600'>PERKARA</span></div>
                </div>
                {
                    result?.map((item, index) => {
                        return (
                            <div key={index}>
                                <Menu>
                                    {item?.childrens?.map((itemMenus, indexMenus) => {
                                        return (!itemMenus?.childrens) ? (
                                            <MenuItem
                                                key={indexMenus}
                                                style={{ cursor: 'pointer' }}
                                                prefix={itemMenus?.icon}
                                                component={<Link to={itemMenus?.link} />}
                                                className={`text-sm cursor-pointer ${path === itemMenus?.code ? '!bg-gray-500 !text-red-300' : ""} cursor-pointer text-gray-500 font-semibold`}>
                                                {itemMenus?.name}
                                            </MenuItem>
                                        ) : (
                                            <SubMenu
                                                key={indexMenus}
                                                open={(openMenu === itemMenus?.code)}
                                                onClick={() => menuAccessParent({ code: itemMenus?.code })}
                                                prefix={itemMenus?.icon}
                                                suffix={<ChevronDownIcon className={`h-[16px] font-bold transition-transform duration-200 ${openMenu === itemMenus?.code ? 'rotate-180' : ''}`} />}
                                                className='text-sm cursor-pointer  text-gray-500 font-semibold'
                                                label={itemMenus?.name}
                                            >
                                                {itemMenus?.childrens?.map((itemChildrens, indexChildrens) => {
                                                    return (!itemChildrens?.childrens) ? (
                                                        <MenuItem
                                                            key={indexChildrens}
                                                            prefix={itemChildrens?.icon}
                                                            component={<Link to={itemChildrens?.link} />}
                                                            className={`text-sm ${path === itemChildrens?.code ? '!bg-gray-500 !text-sky-300' : ""} cursor-pointer text-gray-500 font-semibold`}>
                                                            {itemChildrens?.name}
                                                        </MenuItem>
                                                    ) : (
                                                        <SubMenu
                                                            open={(openMenumultilevel === itemChildrens?.code)}
                                                            onClick={() => menuAccessNext({ code: itemChildrens?.code })}
                                                            key={indexChildrens}
                                                            prefix={itemChildrens?.icon}
                                                            suffix={<ChevronDownIcon className={`h-[16px] font-bold transition-transform duration-200 ${openMenumultilevel === itemChildrens?.code ? 'rotate-180' : ''}`} />}
                                                            className='text-sm cursor-pointer  text-gray-500 font-semibold'
                                                            label={itemChildrens?.name}
                                                        >
                                                            {itemChildrens?.childrens?.map((itemChildrensLastLevel, indexChildrensLastLevel) => {
                                                                return (<MenuItem
                                                                    key={indexChildrensLastLevel}
                                                                    prefix={itemChildrensLastLevel?.icon}
                                                                    component={<Link to={itemChildrensLastLevel?.link} />}
                                                                    className={`text-sm ${path === itemChildrensLastLevel?.code ? '!bg-gray-500 !text-sky-300' : ""} cursor-pointer text-gray-500 font-semibold`}>
                                                                    {itemChildrensLastLevel?.name}
                                                                </MenuItem>)
                                                            })}
                                                        </SubMenu>
                                                    )
                                                })}
                                            </SubMenu>
                                        )
                                    })}
                                </Menu>
                            </div>
                        )
                    })
                }
            </Sidebar>
        </div>
    );
};

export default Sidemenu;