CivilHub
----------
CivilHub is a free and open-source platform written in Python & Django for the purpose of collaboration in local civic communities. 

Our biggest dream is to build a tool that can helps us collaborate and communicate in the places we live in. In our opinion, citizens need a platform that will help them bring democracy and civil power onto a next level. 

We believe that together we can create amazing things in our cities.
Brief: https://civilhub.org/brief/

Our Mission
----------
CivilHub’s mission is to engage all citizens in improving the countries, cities and other places they live in.

Features
----------
1. **Places** - each country, town, district and housing can have their own place that allows people to collaborate.
2. **Ideas** - users can propose what should be improved in our environment, law or community.
  - Everyone can vote for ideas. Vote Yes or No, 
  - Anyone can check who voted Yes and who voted No,
  - You can add photos and use a rich-text editor to create content,
3. **News** - a simple and powerful way to inform users what has happend in our community,
4. **Discussions** - a multithreaded forum for places, has categories and tags, 
5. **Polls** - users can create polls for people in Places. All answers and statistics are public,
6. **Projects** - one of most the most important part of our platform. I believe that Ideas on their own can't change the World. We have created a tool that allows to transform ideas into local civil projects. Users can create and divade tasks to bring the project alive. All of this was made in order to implement our ideas into life.
7. **Map** - all content types can be marked on a map. You can see all the initiatives, discussions, projects and locations in a fully interactive map. Due to limitations in Google Maps (not a good solution for Clustering and displaying more than 100 thousand points on a map). We had to write our own solutions.
  - We used the Open Street Map - Taile are currently downloaded from Mapbox, in the future we will possibly implement our own server with map tails,
  - PostGIS for PostgreSQL database,
  - Our overlay clustering, server-side filtering displays only those points that you currently see on the screen.
8. **Guides** - a system of user-written guides available for each location. An example of such a guide would be an instruction on how to register an organization,
9. **City and organization module** - users can create organizations (both for the official local authorities or for NGOs). Organizations have a special site with their information (they can also post e.g. news there). Members of such organizations gain a special badge and have their organization name displayed with each post,
10. **Badge system** - organization members, moderators and regular users can have badges that display their status,
11. **Comments** - Disqus was our inspiration, the best comment system that exist. You can comment on all of the portal’s content,
12. **User profiles** - You can see all user activities and all users in the location you belong to.
  - Login and registration via Facebook, Twitter, LinkedIn and Google+
13. **Messages between users** - a simple system for communication between users, with anti spam security,
14. **Categories** - all content can be categorized, 
15. **Tags** - all content in the portal can be tagged,
16. **Bookmarks** - all types of content can be bookmarked and later on accessed,
17. **Filter and sort** -  all content type,
18. **Search** - the ability to search through all of the portal's available content is possible thanks to Xapian & Haystack,
19. **Redis cache** - for each language version we cache most of the content through Redis,
20. **Mail** - we have created a simple and automatic, cyclic system that allows to send emails with information to users about locations they are currently following,
21. **Notification system** - an easy way to see whether something has changed in the content you are following,
22. **Follow other users** - see the activities of your friends,
23. **Embed contnet** - the ability to post ideas, news, discussions etc. right into facebook, twitter and linkedin.
24. **Invite friends** - from Google+ contacts,
25. **Multilingualism** - both the whole structure of the portal and the database models can be translated. Please help us translate CivilHub to Your language. portal: https://www.transifex.com/projects/p/civilhub/
26. **REST API** - Access to all data stored in https://civilhub.org

About Us
----------
We are a group of young people who live in Warsaw (Poland) and expect to spend our lives in a more friendly environment. In our opinion, citizens should take responsibility for how our country, the region looks like.

Contact Us
----------
Grzegorz Warzecha - https://www.facebook.com/gwarzecha or grzegorz@civilhub.org

Special thanks
----------
We would like to say "thank you" to Browserstack (https://www.browserstack.com) for making their awesome tool available for us free of charge.

Requirements
------------

Apps to install with apt-get install (on Debian-based distros):

	python-dev
	virtualenvwrapper
	postgresql-server-dev-all
	libicu-dev
	libjpeg-dev
	libfreetype6-dev
	build-essential
	git
	gettext
	python-geoip
	libxapian-dev
	python-xapian
	binutils
	libproj-dev
	gdal-bin
	nodejs
	nodejs-legacy
	npm
	
`Python 2.7` is required. This project is **not** compatible with `Python 3`.

`python-xapian` you can install from different sources. You must symlink to virtualenv folder.
You do not have to use builds, `nodejs`, `nodejs-legacy`, `npm`, `virtualenv`.

A running `redis` is required.

Create a development environment
--------------------------------
First, make sure you are in the root of the CivilHub repository.
Next, initiate a virtualenv

	virtualenv Places
	source Places/bin/activate
	
Install python dependencies:
	
	pip install -r requirements.txt
	
Settings:

Create a file called `settings/secret.json/` (create the directory `settings` as it doesn't exist and is ignored by a `.gitignore` rule)

Add the following information to `secret.json` replace with your values:
```javascript
{
    "host" : "localhost",
    "username" : "[REPLACE]",
    "password" : "[REPLACE]",
    "secret_key" : "[REPLACE]",
    "internal_ips" : ["127.0.0.1"],
    "allowed_hosts" : ["127.0.0.1"],
    "databases" : {
        "default": {
            "ENGINE": "django.db.backends.mysql",
            "NAME": "[REPLACE]",
            "USER": "[REPLACE]",
            "PASSWORD": "[REPLACE]",
            "HOST": "localhost",
            "PORT": "3306"
        }
    },
    "google_plus_key" : "",
    "google_plus_secret" : "",
    "facebook_key" : "",
    "facebook_secret" : "",
    "twitter_key" : "",
    "twitter_secret" : "",
    "linkedin_key" : "",
    "linkedin_secret" : "",
    "email_host" : "",
    "email_user" : "",
    "email_pass" : "",
    "etherpad" : {
        "apikey" : "[REPLACE]"
    },
    "raven_dsn" : "",
    "clicky_site_id" : ""
}
```

Logs:

the django module stores log files in the `logs` sub directory. As it is ignored by a `.gitignore` rule, you have to create the logs directory

	mkdir logs

Build:

	./manage.py build

Multirequire  `./manage.py build`. Build and compress `less` and `js`.
Options:
	-m &lt;module_name&gt; Module name to compress, np. `idea-detail`.
	--css-only	compress only `less` files

To rebuild you need two packages:

	npm install -g less
	npm install -g requirejs
