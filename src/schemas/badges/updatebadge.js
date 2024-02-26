import * as Yup from 'yup';

const yesterday = new Date(Date.now() - 86400000);
const updatebadgeschema = Yup.object({

    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().notRequired(),
    additional_information: Yup.string().required('Additional information is required'),
    giveaways_type: Yup.string().notRequired(),
    expires_date: Yup.date()
        .min(yesterday, "Expiry date must be today or later")
        .notRequired(),
    quantity: Yup.number().nullable().notRequired().min(1),
    required_tokens: Yup.number()
        .when('giveaways_type', {
            is: 'Misc',
            then: (schema) => schema.required("Token is required").min(1, "Minimum value should 1"),
            otherwise: (schema) => schema.notRequired()
        }),
    constraint_number: Yup.number()
        .when('giveaways_type', {
            is: (val) => val === 'Follower' || val === 'Followings' || val === 'Creations',
            then: (schema) => schema.required("Quantity is required").min(1, "Minimum value should 1"),
            otherwise: (schema) => schema.notRequired()
        }),

})


export { updatebadgeschema };