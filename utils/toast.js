import { toast } from "react-toastify"


export const showToast = (data, options = {}) => {

    Object.values(data).forEach(item => {
        if (Array.isArray(item)) {
            item.map(msg => {
                toast(msg, options)
            })
        }
    })
}