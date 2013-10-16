// -*- mode: js; coding: utf-8 -*-
//
// Copyright 2013 Andrej Antonov <polymorphm@gmail.com>.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Lesser General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Lesser General Public License for more details.
//
// You should have received a copy of the GNU Lesser General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function (global) {
    'use strict'
    
    var MODULE_NAME = 'app__web_passwd_storage'
    
    if (global[MODULE_NAME] !== undefined) {
        return
    }
    
    var module = global[MODULE_NAME] = {
            LOCALSTORAGE_PREFIX: '/app__web_passwd_storage',
            
            UNKNOWN_WEB_SITE_ERROR_MSG:
                    'error: web-site is unknown for web-passwd-storage',
            
            INVALID_LOGIN_PAGE_ERROR_MSG:
                    'error: invalid login page',
            
            USERNAME_NOT_ENTERED_ERROR_MSG:
                    'error: username not entered',
            
            USERNAME_NOT_FOUND_ERROR_MSG:
                    'error: username not found in storage',
            
            async_prompt: function (text, val, callback) {
                setTimeout(function () {
                    try {
                        var result = prompt(text, val)
                        
                        callback(null, result)
                    } catch (err) {
                        callback(err, null)
                    }
                }, 0)
            },
            
            async_alert: function (text) {
                setTimeout(function () {
                    alert(text)
                }, 0)
            },
            
            paypal_route: function () {
                var username_elem = document.querySelector('#login_email')
                var password_elem = document.querySelector('#login_password')
                
                if (!username_elem || !password_elem) {
                    module.async_alert(module.INVALID_LOGIN_PAGE_ERROR_MSG)
                    return
                }
                
                var username = username_elem.value
                
                if (!username) {
                    module.async_alert(module.USERNAME_NOT_ENTERED_ERROR_MSG)
                    return
                }
                
                var storage_name = module.LOCALSTORAGE_PREFIX + '/paypal/password_for/' + username
                
                var password = password_elem.value
                
                if (!password) {
                    // restoring password
                    
                    password = localStorage[storage_name]
                    
                    if (password === undefined) {
                        module.async_alert(module.USERNAME_NOT_FOUND_ERROR_MSG)
                        return
                    }
                    
                    password_elem.value = password
                    
                    return
                }
                
                // storing password
                
                localStorage[storage_name] = password
            },
            
            qiwi_route: function () {
                var username_elem = document.querySelector('#phone')
                var password_elem = document.querySelector('#password')
                
                if (!username_elem || !password_elem) {
                    module.async_alert(module.INVALID_LOGIN_PAGE_ERROR_MSG)
                    return
                }
                
                var username = username_elem.value
                
                if (!username) {
                    module.async_alert(module.USERNAME_NOT_ENTERED_ERROR_MSG)
                    return
                }
                
                var storage_name = module.LOCALSTORAGE_PREFIX + '/qiwi/password_for/' + username
                
                var password = password_elem.value
                
                if (!password) {
                    // restoring password
                    
                    password = localStorage[storage_name]
                    
                    if (password === undefined) {
                        module.async_alert(module.USERNAME_NOT_FOUND_ERROR_MSG)
                        return
                    }
                    
                    password_elem.value = password
                    
                    return
                }
                
                // storing password
                
                localStorage[storage_name] = password
            },
            
            main: function () {
                switch (location.hostname) {
                    case 'paypal.com':
                    case 'www.paypal.com':
                        module.paypal_route()
                        break
                    
                    case 'qiwi.com':
                    case 'www.qiwi.com':
                    case 'visa.qiwi.com':
                    case 'qiwi.ru':
                    case 'www.qiwi.ru':
                    case 'visa.qiwi.ru':
                        module.qiwi_route()
                        break
                    
                    default:
                        module.async_alert(module.UNKNOWN_WEB_SITE_ERROR_MSG)
                }
            },
            }
})(this)
