//var globalvar="";
var stateKey = 'spotify_auth_state';

/**
 * Obtains parameters from the hash of the URL
 * @return Object
 */
function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while (e = r.exec(q)) {
        hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
}

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


// **************************************
// ************* Functions **************
// **************************************
function sndsvr(command, params, func) {
    $.ajax({
        data: params,
        url: command,
        type: 'post',
        success: function (response) {
            func(response);
        }
    });
}

// **************************************
// ************* Events *****************
// **************************************
function events() {
    $('#btn1').on("click",btn1_click);
}

function btn1_click() {
    var client_id = '30b1330d8a94461b88e442292e6896cc'; // Your client id
    var redirect_uri = 'http://phmnet.mooo.com/spotyweb/dentro'; // Your redirect uri

    var state = generateRandomString(16);

    localStorage.setItem(stateKey, state);
    var scope = 'user-read-private user-read-email';

    var url = 'https://accounts.spotify.com/authorize';
    url += '?response_type=token';
    url += '&client_id=' + encodeURIComponent(client_id);
    url += '&scope=' + encodeURIComponent(scope);
    url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
    url += '&state=' + encodeURIComponent(state);

    window.location = url;
}

// **************************************
// ************* Init *******************
// **************************************
$(function () {
    events();
});
