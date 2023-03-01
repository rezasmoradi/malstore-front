import React from "react";


function Breadcrumb({ items = [] }) {
    return (
        <ul className="w-full h-full flex flow-row px-1">
            {items && items.map((item, index) => {
                return (
                    <li key={index.toString()} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
                        <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-200">{item}</span>
                        {
                            index !== items.length - 1 ? <span className="w-2 h-2 border-b border-l border-primary rotate-45 mx-1.5" /> : null
                        }
                    </li>
                );
            })}
        </ul>
    );
}

export default Breadcrumb;