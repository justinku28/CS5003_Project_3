# CS5003 Project 3

## WeatherScape

### A client-server architecture based on Node.js to display daily weather forecasts.

The objective of this project was to develop a website utilizing weather data from OpenWeatherMaps with a large group of people. It required us to establish the requirements and make design choices as a group. Additionally, we worked with real world data from several sources, mashing them up into a unique program. 

### How to install:

You will also need to replace the server name with the details given by the couchdb-setup. 

You can access the information by using the following command:

```javascript
couchdb-setup
```

Then store the username and password somewhere safe and add both to the ```SERVER.JS``` and ```DB.js``` files where needed.

Next, you will need to run the following command:

```javascript
couchdb-start
```

Here you should get a CouchDB successful message.

If so, 'cd' into the folder root and then run the following command:

```javascript
node SERVER.js
node DB.js
```

Now you should be presented with the local host URL for the application.

It should look like the following:

```javascript
Server running at http://127.0.0.1:5984/
```
Go to the URL and enjoy.

### NOTE: *NOT* your school/university username and password!

### NOTE: Access the portal here: 

You can access the CouchDB Portal to see history submits at:

```javascript
<rooturl>.cs.st-andrews.ac.uk:20148/_utils/index.html
```
