const validations = ({ name, description, genre, image, rating, released, platforms }) => {
    const errors = {};

    // name
    if (!name.length) {
        errors.name = "This field can't be empty"
    }else if (name.length >= 30) {
        errors.name = "You reached the maximum number of characters"
    } 

    // platforms
    if (!platforms.length) {
        errors.platforms = "Choose at least one platform"
    } 
    
    // released
    if (!released.length) {
        errors.released = "This field can't be empty"
    }

    // rating
    if (!rating.length) {
        errors.rating = "This field can't be empty"
    }
    else if (rating < 1 || rating > 5) {
        errors.rating = "Must to be a number between 0 and 5"
    }
    else if(isNaN(parseInt(rating))){
        errors.rating = "Must be a number. You can use ',' "
    } 

    // description
    if (!description.length) {
        errors.description = "This field can't be empty"
    }
    else if (description.length === 300) {
        errors.description = "You reached the maximum number of characters"
    } 

    // genre
    if (!genre.length) {
        errors.genre = "Choose at least one genre"
    } 

    // image
    if(!(/^(?:https?|ftp):\/\/(?:www\.)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(?:\/[\w#!:.?+=&%@!\-\/]*)?$/).test(image)){
        errors.image = "This field must be a URL"
    } 
    
    return errors
}

export default validations