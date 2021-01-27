// This is the api key that must be sent in the header for each api call
// <example>
//      Authorization: api_key;
// </example>
var api_key = "Client-ID cH-SqB633GOsbBUXK1gN5cbtaIXzCwHPS7HqpKuGHE4";

// This is the root api url
var api_url = "https://api.unsplash.com/";

async function gotoPage(keyWord, page) {
    // Do the api call
    const api_response = await fetch(api_url + "search/photos?per_page=12&" + "page=" + page + "&query=" + keyWord, {
        // header with the user credentials needs to be with the api call
        headers: {
            "Access-Control-Allow-Origin": api_url,
            "Authorization": api_key
        }
    })
    // Get the response as json object
    .then(response => response.json())
    // if the fetch failed, print the error message to the console
    .catch(err => console.log(err));

    // Return the response
    return api_response;
}

// Export all functions in this js file
export default {
    gotoPage
}