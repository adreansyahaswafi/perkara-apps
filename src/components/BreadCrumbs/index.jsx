import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ items = [] }) => {
    return (
        <nav className="flex items-center space-x-2 text-sm">
            {items.map((item, index) => (
                <Fragment key={index}>
                    {index > 0 && (
                        <ChevronDoubleRightIcon className="w-4 h-4 text-gray-400 mx-1" />
                    )}
                    <Link
                        to={item.href}
                        className={`
                ${index === items.length - 1
                                ? 'text-gray-900 font-medium'
                                : 'text-blue-400'}
                transition-colors duration-200
            `}
                    >
                        {item.label}
                    </Link>
                </Fragment>
            ))}
        </nav>
    );
};
export default Breadcrumb;