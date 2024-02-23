import * as Yup from 'yup';


const uploadDistrictSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    brands: Yup.array().min(1, 'Select at least one Brand').required('Select at least one Brand'),
    media: Yup.mixed().required('Select at least one media'),
})


export { uploadDistrictSchema };