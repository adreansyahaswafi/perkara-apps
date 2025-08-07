import { BookOpenIcon, TableCellsIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/outline";
import { BriefcaseIcon, ClipboardDocumentCheckIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/solid";
const data = [{
    name: "Beranda",
    parent: 0,
    icon: <HomeIcon className='h-[20px] font-bold ' />,
    code: 'beranda',
    link: '/beranda',
    childrens: null
}, {
    name: "Laporan Polisi",
    parent: 0,
    icon: <ClipboardDocumentCheckIcon className='h-[20px] font-bold ' />,
    code: 'laporan-polisi',
    link: '/laporan-polisi',
    childrens: null
}, {
    name: "Register Laporan Polisi",
    parent: 0,
    icon: <BriefcaseIcon className='h-[20px] font-bold ' />,
    code: 'register-laporan-polisi',
    link: '/register-laporan-polisi',
    childrens: null
}, {
    name: "Library Pasal",
    parent: 0,
    icon: <BookOpenIcon className='h-[20px] font-bold ' />,
    code: 'pustaka',
    link: '/pustaka',
    childrens: null
}, {
    name: "User",
    parent: 0,
    icon: <UsersIcon className='h-[20px] font-bold ' />,
    code: 'user',
    link: '/user',
    childrens: null
}];


// {
//     name: "Kejahatan/Pelanggaran",
//     parent: 0,
//     icon: <HandRaisedIcon className='h-[20px] font-bold ' />,
//     code: 'kejahatan',
//     link: '/kejahatan',
//     childrens: null
// }, {
//     name: "Register Tahanan",
//     parent: 0,
//     icon: <BuildingLibraryIcon className='h-[20px] font-bold ' />,
//     code: 'tahanan',
//     link: '/tahanan',
//     childrens: null
// }, 

const isParent = [{
    parent: 0,
    name: null,
    icon: null
}, {
    parent: 1,
    name: "Data",
    icon: <TableCellsIcon className='h-[16px]' />
}, {
    parent: 2,
    name: "Settings",
    icon: <WrenchScrewdriverIcon className='h-[16px]' />
}];

const result = isParent.map(parent => {
    // Find all items in `data` that match the parent ID
    const relatedItems = data.filter(item => item.parent === parent.parent);

    // Return the parent with its related children
    return {
        ...parent,
        childrens: relatedItems.length > 0 ? relatedItems : null,
    };
});
export default result;