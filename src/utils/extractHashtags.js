

function extractHashtags(description) {
    const regex = /#(\w+)/g;
    const matches = description.match(regex);

    // Set to store unique hashtags
    const uniqueHashtagsSet = new Set(matches ? matches.map(match => match.slice(1)) : []);
    const uniqueHashtagsArray = Array.from(uniqueHashtagsSet); //back to array

    return uniqueHashtagsArray;
}



export { extractHashtags };