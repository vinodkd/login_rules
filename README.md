Login Rules
===

"I just cant remember my login/password for this site. If I knew their uid/password rules, I could remember it"

Login Rules is a repository of the rules that websites have for their user IDs and passwords. It is also a set of browser addons/scripts that pop those rules up when you're on a website to jog your memory.

How to use
---

On the web

1. Goto  the login rules website
1. Enter the domain for which you want the password rules
1. View the rules if they are in the repo, else choose to add them (or not)

Via your browser

1. Install the Tampermonkey script.
1. Click the "Login Rules" icon to see the passsword rules for the site you're on, or be prompted to add them.

Adding rules for a site

1. Clone this git repo
1. Add a new site definition
1. Submit a PR
1. PR Bot vets the entry and adds it to the database (or not)


How it works
---

* Git repo contains the mapping from domain name to its password rules:
  * `domain` name is a string containing the full domain name, e.g., mail.google.com, ideally the subdomain of the page that requests the password
  * `username_rules` is a string of human readable text that contains the rules for the user name
  * `password_rules` is a string of human readable text that contains the rules for the password
  * `special_rules` is an optional string of human readable text that calls out anything that the site requires in addition to its password rules, like the need to changed them every X months or so.
* These rules are stored in the repo in files named `$domain.json`.
* They are converted to html files using a static site generator that runs:
  * manually to begin with
  * at every PR eventually
* A search for `$domain` on the website is converted into `/sites/$domain`, which loads the rules up. If `$domain` is not found, the configured error page prompts adding the site.
* A search for `$domain` via TamperMonkey is converted by the script into `/sites/$domain.json`, and the result is displayed as html.


