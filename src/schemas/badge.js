import * as Yup from 'yup';

const yesterday = new Date(Date.now() - 86400000);
const uploadbadgeschema = Yup.object({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    media: Yup.mixed().required('Media is required'),
    giveaways_type: Yup.string().required('Badges type is required'),
    category: Yup.string().required('Category is required'),
    additional_information: Yup.string().required('Additional information is required'),
    age_restricted: Yup.boolean().required('Age restricted is required'),
    expires_date: Yup.date()
        .min(yesterday, "Expiry date must be today or later")
        .notRequired(),
    checkin: Yup.string()
        .when('giveaways_type', {
            is: 'CheckInRewardedBadge',
            then: (schema) => schema.required("Check-in is required"),
            otherwise: (schema) => schema.notRequired()
        })
    ,
    quantity: Yup.number().notRequired(),
    required_tokens: Yup.number()
        .when('giveaways_type', {
            is: 'Misc',
            then: (schema) => schema.required("Token is required"),
            otherwise: (schema) => schema.notRequired()
        }),
    constraint_number: Yup.number()
        .when('giveaways_type', {
            is: (val) => val === 'Follower' || val === 'Followings' || val === 'Creations',
            then: (schema) => schema.required("Quantity is required"),
            otherwise: (schema) => schema.notRequired()
        }),
})


export { uploadbadgeschema };