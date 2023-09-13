import React, { useState, useEffect } from "react"
import axiosClient from "../../../../../utils/axiosClient"
import { wrapper } from "../../../../../redux/store"
import UserPanelDrawer from "../../../../../components/UserPanelDrawer"
import UserHeader from "../../../../../components/UserHeader"
import TextField from "../../../../../components/TextField"
import ComboBox from "../../../../../components/ComboBox"
import Button from "../../../../../components/Button"
import { useRouter } from "next/router"
import ProductFormFillStepper from "../../../../../components/ProductFormFillStepper"
import { useDispatch, useSelector } from "react-redux"
import { selectProduct } from "../../../../../redux/slices/productSlice"
import { useRef } from "react"

function Metadata({ token }) {
  const dispatch = useDispatch()
  const { properties } = useSelector(selectProduct)
  const tagInputRef = useRef()
  const [open, setOpen] = useState(false)
  const [currentTagSearch, setCurrentTagSearch] = useState("")
  const [tags, setTags] = useState([])
  const router = useRouter()
  const [data, setData] = useState({
    tags: [],
    meta_description: properties.meta_description ? properties.meta_description : properties.short_desc ? properties.short_desc : "",
    meta_keywords: properties.meta_keywords ? properties.meta_keywords : "",
    meta_title: properties.meta_title ? properties.meta_title : '',
  })


  const searchTag = async () => {
    try {
      const res = await axiosClient.get(`/tag/${currentTagSearch}`, {
        headers: {
          Authorization: token,
        },
      })

      if (res.status === 200) setTags(res.data.tags)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (currentTagSearch.trim() !== "") searchTag()
  }, [currentTagSearch])

  const handleTag = async (e) => {
    e.preventDefault()
    if (currentTagSearch.length > 2) {
      let tags = data.tags
      tags.push(currentTagSearch)
      setData({ ...data, tags, meta_keywords: data.tags.join(", ") })
      setCurrentTagSearch("")
      tagInputRef.current.focus()
    }
  }

  const removeTag = tag => {
    const newTags = data.tags.filter(t => t !== tag)
    setData({ ...data, tags: newTags, meta_keywords: newTags.join(", ") })
  }



  const sumbit = async () => {
    var formData = new FormData()
    Object.entries({ ...properties, ...data }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.map((val, index) => {
          if (typeof val === 'object') {
            Object.entries(val).map(([k, v], i) => {
              formData.append(`${key}[${i}][${k}]`, v)
            })
          } else {
            formData.append(`${key}[${index}]`, val)
          }
        })
      } else {
        formData.append(key, value)
      }
    }
    )
    formData.forEach((val, key) => { console.log(val, key) })
    /* try {
      const res = await axiosClient.post("/product", formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
      })
      console.log(res)
    } catch (err) {
      console.log(`ERROR: ${err}`)
    } */
  }

  return (
    <div className="w-full h-full flex dark:bg-gray-800 transition-all">
      <UserPanelDrawer open={open} role="admin" onChangeState={() => { setOpen(!open) }} />
      <div className="w-full h-full msm:pl-2 bg-white dark:bg-gray-800 transition-all overflow-hidden">
        <UserHeader />
        <div className="w-full h-full">
          <div className="w-[90%] h-full mx-auto rounded mt-4 mb-12">
            <div className="w-full h-full flex justify-center items-start">
              <ProductFormFillStepper properties={properties} />
            </div>
            <div className="w-full h-full mt-8 content-center items-start grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-14 sm:gap-y-8">
              <fieldset className="row-span-3 flex flex-col items-center border border-primary rounded px-2">
                <legend className="text-xs h-4 font-medium transition-all text-gray-800 dark:text-gray-400">
                  برچسب‌های محصول
                </legend>
                <form
                  className="w-full flex flex-col justify-center items-center"
                  onSubmit={handleTag}>
                  <ComboBox
                    ref={tagInputRef}
                    hint={"هر برچسب باید حداقل 3 کاراکتر باشد"}
                    defaultValue={currentTagSearch}
                    required
                    data={tags}
                    label="برچسب جدید"
                    onChange={text => { setCurrentTagSearch(text) }} />
                  <Button
                    type="submit"
                    className="mt-10 mb-6"
                    onClick={handleTag}>
                    ثبت
                  </Button>
                </form>
                <fieldset className="w-full h-auto border border-primary rounded mb-8">
                  <legend className="text-xs h-4 font-medium transition-all pr-0.5 text-gray-900 dark:text-gray-300">
                    برچسب‌ها
                  </legend>
                  <div className="w-full h-auto min-h-[6rem] relative my-1 pr-2 pb-2">
                    {data.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-sm font-medium"
                        onClick={() => {
                          removeTag(tag)
                        }}
                      >
                        {tag}،{" "}
                      </span>
                    ))}
                    <span className="inline-block absolute bottom-0 right-1 text-xs text-primary dark:text-secondary my-0.5">
                      حداکثر 8 برچسب
                    </span>
                    <span className="inline-block absolute top-full right-1 text-xs md:text-sm text-gray-800 dark:text-gray-400 my-2">
                      برای حذف هر برچسب روی آن کلیک کنید
                    </span>
                  </div>
                </fieldset>
              </fieldset>
              <fieldset className="h-auto row-span-3 border border-primary rounded px-4 pb-4">
                <legend className="text-xs h-4 font-medium transition-all text-gray-800 dark:text-gray-400">
                  فراداده
                </legend>
                <TextField
                  value={data.meta_title}
                  onChange={e => { setData({ ...data, meta_title: e.target.value }) }}
                  required
                  className="mb-8"
                  label="عنوان صفحه محصول"
                />
                <TextField
                  value={data.meta_keywords}
                  onChange={e => { setData({ ...data, meta_keywords: e.target.value }) }}
                  required
                  maxLength={1000}
                  label="کلمات کلیدی"
                />
                <TextField
                  value={data.meta_description}
                  onChange={e => { setData({ ...data, meta_description: e.target.value }) }}
                  className="mt-8"
                  required
                  multiline={true}
                  maxLength={1000}
                  label="توضیحات صفحه محصول"
                />
              </fieldset>
            </div>
            <div className="w-full lg:w-1/2 mx-auto my-12 flex flex-col sm:flex-row justify-evenly items-center">
              <Button
                onClick={() => { router.push("/user/admin/products/new/preview") }}
                style="outlined"
                className="sm:ml-3 md:ml-0">
                پیش‌نمایش
              </Button>
              <Button
                className="my-8 sm:mx-2"
                onClick={() => { router.push("/user/admin/products/new/features") }}>
                رفتن به مرحله قبل
              </Button>
              <Button className="sm:mr-3 md:mr-0" onClick={sumbit}>
                ثبت محصول
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ctx => {
  const { token } = ctx.req.cookies
  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      token,
    },
  }
}
)

export default Metadata
