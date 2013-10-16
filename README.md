web-passwd-storage
==================

``web-passwd-storage`` -- is solution for storing/restoring passwords
on some bank (Paypal, Qiwi, ...) web-sites.


How to Use
----------

Use this URL-command on login-page of web-site:

    javascript: (function (g, d, m, f) {'use strict'; var el = d.createElement('script'); el.addEventListener('load', function (evt) { d.head.removeChild(el); g[m].main() }); el.src = f; el.charset = 'utf-8'; d.head.appendChild(el) })(this, document, 'app__web_passwd_storage', 'https://raw.github.com/web-passwd-storage-2013-10-16/web-passwd-storage/master/web-passwd-store.js')

You may use Bookmarks or Debug Console.
