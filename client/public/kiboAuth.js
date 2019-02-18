function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

    (function () {
        const token = readCookie('token')
        if (typeof token === 'undefined' || token === '' || token === null) {
            var wa = document.createElement('script')
            wa.type = 'text/javascript'
            wa.async = true
            const environment = readCookie('environment')
            if (environment === 'staging') wa.src = 'http://Saccounts.cloudkibo.com/auth/scripts/jsonp?callback=CloudKiboAuthFunction'
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
  
  // eslint-disable-next-line
  function CloudKiboAuthFunction (token) {
    if (token === 'undefined') redirectToLoginAccounts()
    else {
        document.cookie = "token=" + token;
      const environment = readCookie('environment')
      if (environment === 'staging') window.location.replace('http://staging.kibopush.com')
      if (environment === 'production') window.location.replace('http://app.kibopush.com')
    }
  }