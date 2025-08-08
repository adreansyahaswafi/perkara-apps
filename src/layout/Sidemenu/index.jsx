import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react';
import ContextMenu from '../Context';
import { Link, useLocation } from 'react-router-dom';
import result from './data';

import logos from '../../assets/images/logo-only.png';

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

const Sidemenu = ({ level }) => {
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
                <div className='flex-1 py-1 animate-gradient bg-gradient-to-r from-blue-400 via-black to-cyan-500 bg-[length:200%_400%] relative justify-start flex gap-3 items-center px-4'>
                    <img src={logos} width={48} alt='for-logo' />
                    <div className="text-white">
                        <h1 className="text-4xl font-bold tracking-wider leading-tight">
                            SIPIDTER
                        </h1>
                        <div
                            className="w-48 h-1 bg-white rounded-sm scale-x-[-1]"
                            style={{ clipPath: 'polygon(100% 0%, 100% 0%, 100% 100%, 0% 0%)' }}
                        ></div>
                    </div>
                </div>
                {
                    result?.map((item, index) => {
                        const filteredMenu = item?.childrens?.filter(item => {
                            if (item.code === "user" && !['admin', 'master'].includes(level)) return false;
                            return true;
                        });
                        return (
                            <div key={index}>
                                <Menu>
                                    {filteredMenu?.map((itemMenus, indexMenus) => {
                                        return (!itemMenus?.childrens) ? (
                                            <MenuItem
                                                key={indexMenus}
                                                style={{ cursor: 'pointer' }}
                                                prefix={itemMenus?.icon}
                                                component={<Link to={itemMenus?.link} />}
                                                className={`text-sm cursor-pointer ${path === itemMenus?.code ? '!bg-gray-500 !text-blue-300' : ""} cursor-pointer text-gray-500 font-semibold`}>
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