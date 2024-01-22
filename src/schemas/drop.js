import * as Yup from 'yup';


const uploadDropSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    badges_to_be_assigned: Yup.array().min(1, 'Select at least one badge').required('Select at least one badge'),
    badges_filter: Yup.array().min(1, 'Select at least one badge').required('Select at least one badge'),
    interests_filter: Yup.array().min(1, 'Select at least one interest').required('Select at least one interest'),
    users_ids: Yup.array().min(1, 'Select at least one user').required('Select at least one user'),
})


export { uploadDropSchema };