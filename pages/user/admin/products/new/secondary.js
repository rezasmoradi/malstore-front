import React, { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { wrapper } from "../../../../../redux/store"
import UserPanelDrawer from "../../../../../components/UserPanelDrawer"
import UserHeader from "../../../../../components/UserHeader"
import TextField from "../../../../../components/TextField"
import Button from "../../../../../components/Button"
import Checkbox from "../../../../../components/Checkbox"
import { setProductPropertiesAction } from "../../../../../redux/actions/productAction"
import { selectProduct } from "../../../../../redux/slices/productSlice"
import ProductFormFillStepper from "../../../../../components/ProductFormFillStepper"

function Secondary() {
  const dispatch = useDispatch()
  const { properties } = useSelector(selectProduct)
  const [currentColor, setCurrentColor] = useState({
    code: null,
    name: "",
    stock: null,
  })
  const [currentImage, setCurrentImage] = useState({
    name: null,
    file: null,
    main: false,
  })
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const [data, setData] = useState({
    dimensions: {
      width: null,
      length: null,
      height: null,
    },
    colors: [],
    images: [],
  })

  const handleColors = () => {
    const regexColor = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i
    if (regexColor.exec(currentColor.code) !== null) {
      let colors = data.colors
      colors.push({
        code: currentColor.code,
        name: currentColor.name,
        stock: currentColor.stock,
      })
      setData({ ...data, colors })
      setCurrentColor({ code: null, name: null, stock: null })
    }
  }

  const handleFile = e => {
    const file = e.target.files[0]
    if (file.size < 2097152) {
      setCurrentImage({ name: e.target.value, file: file, main: false })
    }
  }

  const handleCurrentImage = () => {
    if (currentImage.file) {
      let images = data.images
      images.push(currentImage)
      setData({ ...data, images })
      setCurrentImage({ name: null, file: null, main: false })
    }
  }

  return (
    <div className="w-full h-full flex dark:bg-dark transition-all">
      <UserPanelDrawer open={open} role="admin" onChangeState={() => { setOpen(!open) }} />
      <div className="w-full h-full msm:pl-2 bg-white dark:bg-dark transition-all overflow-hidden">
        <UserHeader />
        <div className="w-full h-full">
          <div className="w-[90%] h-full mx-auto rounded mt-4 mb-12">
            <div className="w-full h-full flex justify-center items-start">
              <ProductFormFillStepper properties={properties} />
            </div>
            <div className="w-full h-full mt-8 content-center items-start grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-14 sm:gap-y-8">
              <fieldset className="row-span-3 col-span-2 md:col-span-1 border border-primary rounded p-4">
                <legend className="text-xs h-4 font-medium text-gray-900 dark:text-gray-300 transition-all">
                  ابعاد محصول
                </legend>
                <TextField
                  type="number"
                  value={data.dimensions?.width}
                  onChange={e => {
                    setData({ ...data, dimensions: { ...data.dimensions, width: Number(e.target.value) } })
                  }}
                  onChangeValue={val => {
                    setData({ ...data, dimensions: { ...data.dimensions, width: val } })
                  }}
                  required
                  label="(سانتی‌متر) عرض"
                />
                <TextField
                  type="number"
                  value={data.dimensions?.length}
                  onChange={e => {
                    setData({ ...data, dimensions: { ...data.dimensions, length: Number(e.target.value) } })
                  }}
                  onChangeValue={val => {
                    setData({ ...data, dimensions: { ...data.dimensions, length: val } })
                  }}
                  className="mt-8"
                  required
                  label="(سانتی‌متر) طول"
                />
                <TextField
                  type="number"
                  value={data.dimensions?.height}
                  onChange={e => {
                    setData({ ...data, dimensions: { ...data.dimensions, height: Number(e.target.value) } })
                  }}
                  onChangeValue={val => {
                    setData({ ...data, dimensions: { ...data.dimensions, height: val } })
                  }}
                  className="mt-8"
                  label="(سانتی‌متر) ارتفاع"
                />
              </fieldset>
              <fieldset className="h-auto row-span-4 flex flex-col lg:flex-row justify-evenly border border-primary rounded p-4">
                <legend className="text-xs h-4 font-medium transition-all text-gray-900 dark:text-gray-300">
                  رنگ‌های محصول
                </legend>
                <div className="w-auto flex flex-col">
                  <TextField
                    value={currentColor.name}
                    onChange={e => {
                      setCurrentColor({ ...currentColor, name: e.target.value })
                    }}
                    required
                    label="نام رنگ"
                    placeholder="ارغوانی"
                  />
                  <TextField
                    value={currentColor.code}
                    onChange={e => {
                      setCurrentColor({
                        ...currentColor,
                        code: e.target.value,
                      })
                    }}
                    className="my-6"
                    required
                    label="رنگ"
                    placeholder="#fefe42"
                  />
                  <TextField
                    value={currentColor.stock}
                    onChange={e => {
                      setCurrentColor({
                        ...currentColor,
                        stock: e.target.value,
                      })
                    }}
                    required
                    label="تعداد موجود"
                    placeholder="0"
                    type="number"
                  />
                  <Button
                    className="mt-4 md:mt-8 md:mb-8 lg:mb-4 self-center"
                    onClick={handleColors}
                  >
                    ثبت رنگ
                  </Button>
                </div>
                <div className="w-full lg:max-w-[40%] relative h-auto min-h-[4rem] bg-slate-100 dark:bg-slate-600 border rounded mt-8 md:mt-0 mb-2 py-2">
                  {data.colors.map((item, index) => (
                    <div
                      key={index}
                      className="w-auto h-auto mx-1 my-1.5 text-right"
                      onClick={() => {
                        setData({
                          ...data,
                          colors: data.colors.filter(
                            color => color.name !== item.name
                          ),
                        })
                      }}
                    >
                      <span
                        className={`inline-block w-fit h-6 bg-[${item.color}] font-medium rounded ltr px-1`}
                      >
                        {item.name}
                      </span>
                      <span className="mx-4">{item.stock}</span>
                    </div>
                  ))}
                  <span className="absolute top-full text-xs md:text-sm text-gray-800 mt-0.5">
                    برای حذف هر مورد روی آن کلیک کنید
                  </span>
                </div>
              </fieldset>
              <fieldset className="row-span-3 col-span-2 border flex flex-col md:flex-row justify-between items-center sm:items-start border-primary rounded p-4">
                <legend className="text-xs h-4 font-medium transition-all text-gray-900 dark:text-gray-300">
                  تصاویر محصول
                </legend>
                <div className="w-full md:w-2/5 flex flex-col items-start border rounded px-2 py-1">
                  <TextField
                    accept="image/jpg,image/jpeg,image/png"
                    value={currentImage.name}
                    type="file"
                    onChange={handleFile}
                    required
                    label="تصویر محصول"
                  />
                  <Checkbox
                    disabled={
                      data.images.filter(photo => photo.main === true).length >=
                      1
                    }
                    defaultChecked={false}
                    className="my-8 sm:my-4"
                    onChange={e => {
                      setCurrentImage({
                        ...currentImage,
                        main: e.target.checked,
                      })
                    }}
                    label="تصویر اصلی محصول"
                  />
                  <Button
                    className="self-center mb-4"
                    onClick={handleCurrentImage}
                  >
                    ثبت
                  </Button>
                </div>
                <div className="w-full md:w-3/5 h-auto mt-8 md:mt-0 flex flex-col justify-center items-center">
                  {data.images
                    .filter(photo => photo.main === true)
                    .map((item, index) => (
                      <Image
                        key={index}
                        src={URL.createObjectURL(item.file)}
                        width={250}
                        height={250}
                        className="rounded-sm"
                      />
                    ))}
                  <div className="w-full md:w-10/12 mt-8 flex justify-evenly">
                    {data.images
                      .filter(photo => photo.main === false)
                      .map((item, index) => (
                        <div key={index} className="w-auto h-auto mx-1 my-1.5">
                          <Image
                            src={URL.createObjectURL(item.file)}
                            width={64}
                            height={64}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              </fieldset>
            </div>
            <div className="w-full lg:w-1/2 mx-auto my-12 flex flex-col sm:flex-row justify-evenly items-center">
              <Button
                className="my-8 sm:mx-2"
                onClick={() => {
                  router.push("/user/admin/products/new/primary")
                }}
              >
                رفتن به مرحله قبل
              </Button>
              <Button
                className="sm:mr-3 md:mr-0"
                onClick={() => {
                  dispatch(setProductPropertiesAction(data))
                  router.push("/user/admin/products/new/features")
                }}
              >
                رفتن به مرحله بعد
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ctx => {
    const { token } = ctx.req.cookies
    if (!token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      }
    }
  }
)

export default Secondary
