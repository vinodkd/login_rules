// ==UserScript==
// @name         Login Rules
// @namespace    http://vinodkd.org/login_rules/
// @version      0.1
// @description  Display the rules for user names and their passwords for all sites
// @author       vinodkd
// @match        *://*/*
// @noframes
// @grant        GM.xmlHttpRequest
// @grant        GM_addStyle
// @copyright    2021, vinodkd (https://github.com/vinodkd)
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    let domain = window.location.hostname;
    let parts = domain.split('.');
    let rootDomain = parts;
    if(parts.length>2){
        rootDomain = [parts[parts.length-2],parts[parts.length-1]].join('.');
    }

    console.log(`Site:${rootDomain}`);
    GM.xmlHttpRequest({
        method: "GET",
        url: `https://www.vinodkd.org/login_rules/sites/${rootDomain}.json`,
        onload: function(response) {
          let data;
          try {
            // console.log(response.responseText);
            data = JSON.parse(response.responseText);
            //console.log(data);
            display(data);
          } catch (error) {
            console.log('Not found. Add to the repo?'+error);
          }
        }
      });
    
    function display(data){
      let container = document.createElement('div');
      container.setAttribute("id","lrcontainer");
      container.innerHTML = `
        <div id='header'>Login Rules</div>
        <div id='body'>
          <div>
            <span class='label'>Username rules</span>
            <span class='info'>${data.username_rules ? data.username_rules : ''}</span>
          </div>
          <div>
            <span class='label'>Password rules</span>
            <span class='info'>${data.password_rules ? data.password_rules : ''}</span>
          </div>
        </div>
      `;
      document.body.appendChild(container);

      GM_addStyle ( `
    #lrcontainer {
        position:               absolute;
        top:                    0;
        left:                   0;
        font-size:              12px;
        background:             powderblue;
        border:                 1px outset blue;
        margin:                 2px;
        opacity:                0.5;
        z-index:                1100;
        padding:                5px 20px;
    }
` );
    }

    // function GM_addStyle(css) {
    //   const style = document.getElementById("GM_addStyle234") || (function() {
    //     const style = document.createElement('style');
    //     style.type = 'text/css';
    //     style.id = "GM_addStyle234";
    //     document.head.appendChild(style);
    //     return style;
    //   })();
    //   const sheet = style.sheet;
    //   sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
    // }
})();
