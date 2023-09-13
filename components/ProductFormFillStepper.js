import { useEffect, useState } from "react"

function ProductFormFillStepper({ properties }) {
  const [step, setStep] = useState(0)

  const fields = [
    {
      name: properties.name,
      display_name: properties.display_name,
      model: properties.model,
      category_id: properties.category_id,
      weight: properties.weight,
      unit_price: properties.unit_price,
      long_desc: properties.long_desc,
      short_desc: properties.short_desc,
      active: properties.active,
    },
    {
      width: properties.width,
      length: properties.length,
      height: properties.height,
      image: properties.image,
      colors: properties.colors,
    },
    {
      features: properties.features,
    },
    {
      meta_description: properties.meta_description,
      meta_keywords: properties.meta_keywords,
      meta_title: properties.meta_title,
      tags: properties.tags,
    },
  ]

  const handleStep = () => {
    if (
      fields[3].meta_description &&
      fields[3].meta_keywords &&
      fields[3].meta_title &&
      fields[3].tags
    ) {
      setStep(4)
    } else if (fields[2].features.length) {
      setStep(3)
    } else if (
      fields[1].width &&
      fields[1].length &&
      fields[1].height &&
      fields[1].image.length &&
      fields[1].colors.length
    ) {
      setStep(2)
    } else if (
      fields[0].name &&
      fields[0].display_name &&
      fields[0].model &&
      fields[0].category_id &&
      fields[0].weight &&
      fields[0].unit_price &&
      fields[0].long_desc
    ) {
      setStep(1)
    } else {
      setStep(0)
    }
  }

  useEffect(() => {
    handleStep()
  }, [])

  return (
    <ul className="w-full h-24 md:h-32 flex justify-center items-center">
      <li
        className={`w-12 h-12 xsm:w-14 xsm:h-14 sm:w-14 sm:h-14 md:w-18 md:h-18 self-start rounded-full ${
          step >= 1 ? "bg-primary dark:bg-secondary" : "bg-transparent"
        } border border-primary text-center leading-none xsm:leading-4 xsm:pt-2.5 sm:leading-5 pt-2 sm:pt-1.5 md:pt-4`}
      >
        <span
          className={`${
            step >= 1
              ? "text-gray-50 font-medium"
              : "text-primary dark:text-secondary"
          } text-2xs xsm:text-xs sm:text-xs md:text-sm`}
        >
          مشخصات اصلی
        </span>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            step > 1 ? "text-primary dark:text-secondary" : "text-gray-400"
          } -rotate-[30deg]`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </li>
      <li
        className={`w-12 h-12 xsm:w-14 xsm:h-14 sm:w-14 sm:h-14 md:w-18 md:h-18 self-end rounded-full  ${
          step >= 2 ? "bg-primary dark:bg-secondary" : "bg-transparent"
        } border border-primary text-center leading-none xsm:leading-4 xsm:pt-2 sm:leading-5 pt-1 sm:pt-1 md:pt-3`}
      >
        <span
          className={`${
            step >= 2
              ? "text-gray-50 font-medium"
              : "text-primary dark:text-secondary"
          } text-2xs xsm:text-xs sm:text-xs md:text-sm`}
        >
          سایر مشخصات
        </span>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            step > 2 ? "text-primary dark:text-secondary" : "text-gray-400"
          } rotate-[30deg]`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </li>
      <li
        className={`w-12 h-12 xsm:w-14 xsm:h-14 sm:w-14 sm:h-14 md:w-18 md:h-18 self-start rounded-full  ${
          step >= 3 ? "bg-primary dark:bg-secondary" : "bg-transparent"
        } border border-primary text-center leading-[2.75rem] xsm:leading-[3.5rem] sm:leading-[3.5rem] md:leading-[4.5rem]`}
      >
        <span
          className={`${
            step >= 3
              ? "text-gray-50 font-medium"
              : "text-primary dark:text-secondary"
          } text-2xs xsm:text-xs sm:text-xs md:text-sm`}
        >
          ویژگی‌ها
        </span>
      </li>
      <li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className={`w-6 h-6 ${
            step > 3 ? "text-primary dark:text-secondary" : "text-gray-400"
          } -rotate-[30deg]`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
          />
        </svg>
      </li>
      <li
        className={`w-12 h-12 xsm:w-14 xsm:h-14 sm:w-14 sm:h-14 md:w-18 md:h-18 self-end rounded-full  ${
          step >= 4 ? "bg-primary dark:bg-secondary" : "bg-transparent"
        } border border-primary text-center leading-[2.75rem] xsm:leading-[3.5rem] sm:leading-[3.5rem] md:leading-[4.5rem]`}
      >
        <span
          className={`${
            step >= 4
              ? "text-gray-50 font-medium"
              : "text-primary dark:text-secondary"
          } text-2xs xsm:text-xs sm:text-xs md:text-sm`}
        >
          فراداده
        </span>
      </li>
    </ul>
  )
}

export default ProductFormFillStepper
