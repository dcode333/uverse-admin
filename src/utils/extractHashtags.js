

function extractHashtags(description) {
    const regex = /#(\w+)/g;
    const matches = description.match(regex);

    // Set to store unique hashtags with '#' symbol
    const uniqueHashtagsSet = new Set(matches ? matches.map(match => `#${match.slice(1)}`) : []);

    // Convert set to array
    const uniqueHashtagsArray = Array.from(uniqueHashtagsSet);

    return uniqueHashtagsArray;
}



export { extractHashtags };