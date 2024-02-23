import * as Yup from 'yup';


const updatebadgeschema = Yup.object({

    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().notRequired(),
    additional_information: Yup.string().required('Additional information is required'),

})


export { updatebadgeschema };