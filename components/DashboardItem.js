import Link from "next/link"

function DashboardItem({
  children,
  label,
  value,
  status,
  border = "",
  iconColor="",
  className = "",
  href = "#",
}) {
  return (
    <div
      className={`w-32 h-32 sm:w-36 sm:h-36 lg:w-44 lg:h-44 transition-transform lg:hover:cursor-pointer lg:hover:border p-1 lg:hover:rounded-full duration-200 lg:hover:scale-105 ${className}`}
    >
      <Link href={href}>
        <div className={`h-full border rounded-full ${border}`}>
          <div className="flex flex-col justify-between align-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 mt-2 self-center ${iconColor}`}
            >
              {children}
            </svg>
            <span className="text-xs sm:text-sm md:text-base text-center text-gray-700 dark:text-gray-300 py-0.5 lg:py-2">
              {label}
            </span>
            <p className="text-lg md:text-xl font-medium text-center text-gray-900 dark:text-gray-300 py-0.5 lg:py-2">
              {value}
            </p>
            <span className="text-2xs sm:text-sm text-center text-gray-500 dark:text-gray-400">
              {status}
            </span>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default DashboardItem
