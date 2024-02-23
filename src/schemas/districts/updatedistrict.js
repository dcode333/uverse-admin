import * as Yup from 'yup';


const updateDistrictSchema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().notRequired(),
})


export { updateDistrictSchema };