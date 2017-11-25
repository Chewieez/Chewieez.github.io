
// Factory function to create each blog object and cut down on repetitive typing
const blogObjectFactory = function (title, content, author, ...tags) {
    // function to add a space after the , in the collection of tags
    function spacedTags(tags) {
        let spacedOutTags = tags.join(", ");
        return spacedOutTags;
    }
    // factory function will return a function with this format, each prop will be populated with data either passed in as a parameter or created in this function such as Date and blog ID (from generator function)
    return Object.create(null, {
        "author": { value: author, enumerable: true }, 
        "title": { value: title, enumerable: true },
        "content": { value: content, enumerable: true },
        "tags": { value: spacedTags(tags), enumerable: true },
        "published": { value: Date.now(), enumerable: true }
    })
}

module.exports = blogObjectFactory