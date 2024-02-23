import * as Yup from 'yup';

const updateLibrarySchema = Yup.object({
    description: Yup
        .string()
        .max(255)
        .required('Description is required'),
    title: Yup
        .string()
        .max(255)
        .required('Title is required'),
    media: Yup
        .mixed()
        .notRequired(),
});

export { updateLibrarySchema }