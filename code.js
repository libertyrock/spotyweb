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
// ************* Inicio *****************
// **************************************
$(function () {
    //main
    var userProfileSource = document.getElementById('user-profile-template').innerHTML,
        userProfileTemplate = Handlebars.compile(userProfileSource),
        userProfilePlaceholder = document.getElementById('user-profile');

    oauthSource = document.getElementById('oauth-template').innerHTML,
        oauthTemplate = Handlebars.compile(oauthSource),
        oauthPlaceholder = document.getElementById('oauth');

    var params = getHashParams();

    var access_token = params.access_token,
        state = params.state,
        storedState = localStorage.getItem(stateKey);

    if (access_token && (state == null || state !== storedState)) {
        alert('There was an error during the authentication');
    } else {
        localStorage.removeItem(stateKey);
        if (access_token) {
            $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    userProfilePlaceholder.innerHTML = userProfileTemplate(response);
                }

            });
            $.ajax({
                url: 'https://api.spotify.com/v1/browse/new-releases',
                data: {
                    limit: 50,
                    offset: 0
                },
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function (response) {
                    var html = "<p>Token: "+access_token+"</p>";
                    var obj = response.albums.items;
                    //var html2=JSON.stringify(obj);

                    for (let i = 0; i < obj.length; i++) {
                        // if (obj[i].album_type == "album") { 
                        html += "<div class='w3-row w3-border w3-red'><div class='w3-col s5'>";
                        html += "<a href='" + obj[i].external_urls.spotify + "'>";
                        html += "<img src='" + obj[i].images[0].url + "' width=150 height=150></a>";
                        html += "</div><div class='w3-col s4'>";
                        html += obj[i].album_type + " <i>" + obj[i].name + "</i> ";
                        for (let a = 0; a < obj[i].artists.length; a++) {
                            html += "<b>" + obj[i].artists[a].name + "</b>:";
                        }
                        html += "</div><div class='w3-col s3 w3-right-align'>" + obj[i].release_date
                        html += "</div></div>";
                        // fin if}
                    }
                    listreleases.innerHTML = html;
                    $('#login').hide();
                    $('#loggedin').show();
                }
            });
        } else {
            $('#login').show();
            $('#loggedin').hide();
        }

        document.getElementById('login-button').addEventListener('click', function () {

            var client_id = '30b1330d8a94461b88e442292e6896cc'; // Your client id
            var redirect_uri = 'http://phmnet.mooo.com/spotyweb/'; // Your redirect uri

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
        }, false);
    }
    //fin main
});

