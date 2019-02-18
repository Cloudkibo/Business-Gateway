console.log("IAM LOADED")
    
function CloudKiboAuthFunction (token) {
    console.log("Jsonp called by account server " + token)
    if (token === 'undefined') redirectToLoginAccounts()
    else {
        document.cookie = "token=" + token;
      const environment = readCookie('environment')
      if (environment === 'staging') window.location.replace('http://staging.kibopush.com')
      if (environment === 'production') window.location.replace('http://app.kibopush.com')
    }
  }

(function () {
    console.log("IAM LOADED after DOMCONTENTLOADED")
    const token = readCookie('token')
    if (typeof token === 'undefined' || token === '') {
        var wa = document.createElement('script')
        wa.type = 'text/javascript'
        wa.async = true
        const environment = readCookie('environment')
        if (environment === 'staging') wa.src = 'http://saccounts.cloudkibo.com/auth/scripts/jsonp?callback=CloudKiboAuthFunction'
        if (environment === 'production') wa.src = 'http://accounts.cloudkibo.com/auth/scripts/jsonp?callback=CloudKiboAuthFunction'
        var s = document.getElementsByTagName('script')[0]
        s.parentNode.insertBefore(wa, s)
    } else {

    }
})();


function redirectToLogoutAccounts () {
const environment = readCookie('environment')
if (environment === 'staging') window.location.replace('http://Saccounts.cloudkibo.com/auth/logout?continue=http://staging.kibopush.com')
if (environment === 'production') window.location.replace('http://accounts.cloudkibo.com/auth/logout?continue=http://app.kibopush.com')
}

function redirectToLoginAccounts () {
const environment = readCookie('environment')
if (environment === 'staging') window.location.replace('http://Saccounts.cloudkibo.com/?continue=http://staging.kibopush.com')
if (environment === 'production') window.location.replace('http://accounts.cloudkibo.com/?continue=http://app.kibopush.com')
}


function readCookie(name) {
  // todo remove nxt line
  if (name === 'environment') return "development"
var nameEQ = name + "=";
var ca = document.cookie.split(';');
for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
}
return null;
}