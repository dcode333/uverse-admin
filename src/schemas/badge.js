import * as Yup from 'yup';


const uploadbadgeschema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().required('Media is required'),
    badges_type: Yup.string().required('Badges type is required'),
    hashtag: Yup.string().required('Hashtag is required'),
    additional_information: Yup.string().required('Additional information is required'),
    age_restricted: Yup.boolean().required('Age restricted is required'),
    checkin: Yup.string().notRequired(),
    quantity: Yup.number()
        .when('badges_type', {
            is: 'Misc',
            then: (schema) => schema.required("Quantity is required"),
            otherwise: (schema) => schema.notRequired()
        }),
    required_tokens: Yup.number()
        .when('badges_type', {
            is: 'Misc',
            then: (schema) => schema.required("Token is required"),
            otherwise: (schema) => schema.notRequired()
        }),
    constraint_number: Yup.number()
        .when('badges_type', {
            is: (val) => val === 'Follower' || val === 'Followings' || val === 'Creations',
            then: (schema) => schema.required("Quantity is required"),
            otherwise: (schema) => schema.notRequired()
        }),
})


export { uploadbadgeschema };