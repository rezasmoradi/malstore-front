import React from "react";


function Breadcrumb({ items = [], className = '' }) {

    return (
        <ul className={`w-full h-full flex flow-row px-1 ${className}`}>
            {Array.isArray(items) && items.map((item, index) => {
                return (
                    <li key={index.toString()} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <span className="text-xs xsm:text-sm sm:text-sm text-gray-600 dark:text-gray-200">{item}</span>
                        {
                            index !== items.length - 1 ? <span className="w-2 h-2 border-b-2 border-l-2 border-primary rounded-sm rotate-45 mx-1.5" /> : null
                        }
                    </li>
                );
            })}
        </ul>
    );
}

export default Breadcrumb;