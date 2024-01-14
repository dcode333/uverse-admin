import * as Yup from 'yup';


const uploadlibraryschema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().required('Media is required'),
    threeD_file: Yup.mixed().required('3D File is required'),
    hashtag: Yup.string().required('Hashtag is required'),
    subtype: Yup.string().required('Subtype is required'),
    category: Yup.string().required('Category is required'),
    is_locked: Yup.boolean().required('Is Locked is required'),
    locked_content: Yup.string()
        .when('is_locked', {
            is: true,
            then: (schema) => schema.required("Locked Content is required"),
            otherwise: (schema) => schema.notRequired()
        }),
})


export { uploadlibraryschema };