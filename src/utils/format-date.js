

const formatDate = (unformattedDate) => {
    const date = new Date(unformattedDate);

    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
}


export { formatDate }