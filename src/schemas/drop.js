import * as Yup from 'yup';


const uploadDropSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
})


export { uploadDropSchema };