import * as Yup from 'yup';

const uploadcheckinschema = Yup.object({
    description: Yup
        .string()
        .max(255)
        .required('Description is required'),
    title: Yup
        .string()
        .max(255)
        .required('Title is required'),
    longitude: Yup
        .number()
        .required('Longitude is required'),
    latitude: Yup
        .number()
        .required('Latitude is required'),
    media: Yup
        .mixed()
        .required('Media is required'),
    badgeId: Yup
        .string()
        .required('Badge ID is required'),
});


export { uploadcheckinschema }