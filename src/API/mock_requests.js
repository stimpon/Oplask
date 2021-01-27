/*
    This file contains mock api functions for use in testing of
    the application.
*/

// Gets all items from the Objects.json file 
function load() {
    // This is the local json file
    return require('../assets/Objects.json');
}

// Export all functions in this js file
export default {
    load
}