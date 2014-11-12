---
layout: post
title: Mobile Development Using Phonegap
created: 1339320992
permalink: mobile-development-using-phonegap
tags:
- Incubator
- iOS
- Mobile
---
<p>Perhaps one of the most tedious tasks I have to do monthly at Tikal is reporting the hours I work and on what project.  I have to open a special web portal and sort through all the projects I worked on over the last month.  This process is pretty repetitive and very boring.  It would be great if there was a better way to do this task.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">So,  after thinking about this problem for some time I came up with what I think is an ideal solution.  A solution that involves very little interaction from me.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">I carry my Mobile Phone with me everywhere.  I happen to have an iPhone 4.  It is in my pocket at every project I work on.  It has GPS technology which can be used to keep track of my location.  So,  why not let my phone keep track of where I am.  Based on my location,  my phone can log the hours I am at  projects.  Right,  this seems so obvious now that I mention it.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">Now I have a great idea for a new mobile app.  I want to build an app that can log hours based on my location and report those hours to tikal upon request.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">The next thing I thought about was what mobile OS do I want to support.  I have an iPhone,  but I think that most Tikal employees have Android phones.  So I would have to choose,  iOS or Android?  I want to be able to reach the greatest number of users.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">I looked on the web and noticed that there are frameworks that claim to be “Cross Platform”.  A lot of them cost money to use, like Monotouch and Titanium.  I wanted something that was free and open source.  I soon discovered Phonegap.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">Phonegap is an open source app platform.  It is based on familiar web technologies like HTML5,  CSS,  and Javascript.  Additionally,  it comes pre-packaged with “Plugins” that allow the Javascript to access native functions on the mobile device.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">What devices are supported was the next thing I wanted to know.  I read on the Phonegap site that it supports iOS and Android and Windows Mobile and many other popular Mobile OSes.  7 Platforms total.  Whew!!!</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">Now that I know what framework I want to use I need to architect my app.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">I set out to plan how I was going to create this app.  I would need a way to retrieve locations based on GPS.  I thought about Foursquare.  They have an open API that can be accessed by Javascript.  The application would need to show the location on a map.  Google Map API comes to the rescue and this,  too,  can be used via a javascript API.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">Once I determined that Phonegap was the ideal solution for my app I wanted to figure out what Javascript framework I would use.  After searching on the internet I found that the top two frameworks are Sench Touch and jQuery Mobile.  Sencha Touch seemed nice since it encourages MVC out of the box.  After reading more about it I shied away from this solution since coding was tedious since it seemed all my code need<span style="color: #9a0806;">ed</span> to be in JSON format.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">jQuery Mobile seemed like the most flexible solution.  It has many plugins since it is based on jQuery and this allowed me to get up and running quickly.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">I started up eclipse and went through the initial setup for a new Android app.  Checkout:  <a title="http://www.phonegap.com" href="http://www.phonegap.com" target="_blank">http://www.phonegap.com</a> for downloads and documentation.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">I created the WWW folder needed to store my HTML,  CSS and Javascript.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica;">This is how I decided to create the pages of my app:</p>
<ol>
<li>My Projects – This is the main page of my app. Here the user can see a list of all active projects. Additionally, there are buttons for the user to add new projects and see events by month:</li>
<li>Project Details – This page shows the current status of a project. The user can manually checkin or checkout and set the auto update feature. The user can also opt to remove this project altogether.</li>
<li>Events – This page allows the user to select a month and year and display the projects and hours worked. The send button will create a TSV file for each project and email them.</li>
<li>Add new project – This page retrieves nearby locations from foursquare and allows the user to add them as current projects. The user can also select to see the project on a map before adding.</li>
<li>Map View – Shows the project selected on a map.</li>
</ol>
<p> </p>
<p>So now that we know what pages are too be included in the app lets figure out how to actually build it.</p>
<p> </p>
<p>I started by defining the model for my project.  The app will have two entities:  Project and Event.  I found an open source project called Persistence JS that wraps the functions needed to build a WebSQL database.</p>
<p> </p>
<p>PersistenceJS allows me to define a project as:</p>
<pre class="brush: jscript;" title="code">var Project = persistence.define('Project', {
  fid: "TEXT",
  name: "TEXT",
  address: "TEXT",
  latitude: "TEXT",
  longitude: "TEXT",
  currentlyHere: "BOOL"
});</pre>
<p> </p>
<p>This line will configure a new database:</p>
<pre class="brush: jscript;" title="code">persistence.store.websql.config(persistence, 'tikaltimetracker', 'Tikal Time Tracker DB', 5 * 1024 * 1024);</pre>
<p> </p>
<p>My main view contains a list of projects.  Therefore,  I will need to use persistence to define a table in my database that stores Projects.</p>
<p>persistence will sync the defined entities and create new tables for them if needed by running the following line:</p>
<pre class="brush: jscript;" title="code">persistence.schemaSync(function(tx) { // callback });</pre>
<p> </p>
<p>These lines add a new Project to the table and flush the changes to the database.</p>
<pre class="brush: jscript;" title="code">persistence.add(project);
persistence.flush(function() { //callback });</pre>
<p> </p>
<p>Now that I have my model lets build the page that will display the list of projects.</p>
<p style="margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px;">
<p>This is how the projects page looks:</p>
<pre class="brush: xhtml;" title="code"><div data-add-back-btn="true" data-role="page" id="mainPage">
		<div data-role="header" data-position="fixed" data-theme="b">
			<a href="#eventsPage" data-icon="grid" data-iconpos="left" class="ui-btn-left" data-theme="c">Events</a>
			<a onClick="retrieveLocations();" data-icon="plus" data-iconpos="right" class="ui-btn-right" data-theme="c">Add</a>
			<span class="ui-title">My Projects</span>
		</div>
          <ul class="lstMyProjects" data-role="listview" data-split-icon="gear" data-split-theme="d">
		  </ul>

            <script id="projectItem" type="text/x-jquery-tmpl">
                <li>
                <a onclick="showMapForLocation('${fid}');">
                <h3>${name}</h3>
                <p>${address}</p>
                </a>
                <a onclick="doShowProjectOptions('${fid}');">${name}</a>
                </li>
            </script>
      </div></pre>
<p> </p>
<p>This is all I needed to do in order to setup the first page.  My page is built using jQuery Mobile.  It has a div that designates the navigation bar.  The next element is a ul tag to contain the list that will display the table view of projects.</p>
<p> </p>
<p>Once we have the page that will list the projects we now need a way to add new projects.  I thought it would be great idea to have the add new project involve as little input from the user as possible.  This is how the Add Project page works:</p>
<p> </p>
<p>When the page is loaded it requests the devices GPS location using the GeoLocation Phonegap plugin.</p>
<pre class="brush: jscript;" title="code">navigator.geolocation.getCurrentPosition(onSuccess, onError);</pre>
<p>This code calls the phone gap plugin and calls the onSuccess or onError callback function once it is completed.  An error can happen if the user has declined Location services for the app.</p>
<p> </p>
<p>Because I want the user to have to do as little as possible to add a project I decided it would be great if I could show nearby locations.  This way the user could just select his project.</p>
<p> </p>
<p>Foursquare provides a venues API that can be accessed without any type of authentification.</p>
<pre class="brush: jscript;" title="code">search: function(parameters, requestCallback)
		{
//			var parameters = {
//				requestCallback,
//				ll,
//				llAcc,
//				altAcc,
//				alt,
//				query,
//				limit,
//				intent,
//				categoryId,
//				url,
//				providerId,
//				linkedId,
//				radius
//			}

			var requestUrl = this.SEARCH_URL + client.requestQuery();
			requestUrl += FourSquareUtils.createQueryString("&", parameters);
			FourSquareUtils.doRequest(requestUrl, requestCallback);
		}</pre>
<p> </p>
<p>The Add Project page will display all nearby locations inside a ul element.  The model for this page is the same as the Current Projects page:</p>
<pre class="brush: jscript;" title="code">var Project = persistence.define('Project', {
  fid: "TEXT",  // Foursquare ID
  name: "TEXT",
  address: "TEXT",
  latitude: "TEXT",
  longitude: "TEXT",
  currentlyHere: "BOOL"
});</pre>
<p> </p>
<p>The user is now able to select a location to add as a current project.  Additionally,  I provide a map view to show the project on a map before the user confirms adding the project.</p>
<p> </p>
<p>Now the user is back on the Current Projects page.  So far all of our development has been done with simple HTML and Javascript using jQuery Mobile.  I haven’t had to build any native layouts for either Android or iPhone.  My entire project is in one HTML file.  I have of course included various javascript files to access jQuery Mobile and Foursquare,  but development so far has been straight forward.</p>
<p> </p>
<p>So now that we have our list of projects I want to program the app to automatically update my hours based on my location.  How am I going to do this?</p>
<p> </p>
<p>Geofencing!!!</p>
<p> </p>
<p>A geo-fence is a virtual perimeter for a real-world geographic area.  Wonderful.  How does this help me in this case?</p>
<p> </p>
<p>Well, I know what I want to do,  now the fun part is to see how I can actually program this on a mobile phone.  I first checked out phonegap and didn’t find any plugins for Geofencing.  This would be a good opportunity to build a custom Phonegap plugin.</p>
<p> </p>
<p>iOS supports Geofencing natively.  All I need is to define a unique id,  latitude, longitude and radius.  Once I register a Geofence the system will notify the app when the boundaries are crossed.  If the app isn’t running it will be launched in the background to process the geofence notification.</p>
<p> </p>
<p>Android was another story.  I didn’t find any native support for Geofencing.  Looking online yielded a number of sites offering subscription APIs.  I wasn’t going to spend money on this.</p>
<p> </p>
<p>I had an idea.  I wanted to create my own method to mimic Geofencing.  The simple choice would be to just have the GPS always on and monitoring my location.  This would probably work for about two hours before eating up all the battery.  I came up with another idea.  Every project I go to has at least one WIFI hotspot.  I could create a service that would scan for changes in WIFI hotspots.  When it found one that was at one of my projects the service would trigger a request to retrieve the current location.  This way only WIFI needed to be left on, instead of constant GPS monitoring, which is a lot less taxing on the battery from my experience.</p>
<p> </p>
<p>Now that I knew how each device would handle Geofencing on the native side it was time to create a Phonegap plugin for each platform to wrap this native code.  This way I could communicate with it from javascript.</p>
<p> </p>
<p>I came up with the following commands that I wanted the Javascript to be able to do:</p>
<pre class="brush: jscript;" title="code">/*
	Params:
	#define KEY_REGION_ID       @"fid"
	#define KEY_PROJECT_NAME    @"projectname"
	#define KEY_PROJECT_LAT     @"latitude"
    #define KEY_PROJECT_LNG     @"longitude"
    #define KEY_PROJECT_ADDRESS @"address"
	*/
     addProject: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "addProject", [params]);
     }

    /*
	Params:
	#define KEY_REGION_ID       @"fid"
	#define KEY_PROJECT_NAME    @"projectname"
	#define KEY_PROJECT_LAT     @"latitude"
    #define KEY_PROJECT_LNG     @"longitude"
    #define KEY_PROJECT_ADDRESS @"address"
	*/
     removeProject: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "removeProject", [params]);
     },

	/*
	Params:
	#define KEY_REGION_ID       				@"fid"
	#define KEY_PROJECT_LAT     				@"latitude"
    #define KEY_PROJECT_LNG     				@"longitude"
	*/
     setShouldAutoUpdateProjectEvents: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "setShouldAutoUpdateProjectEvents", [params]);
     },

	/*
	Params:
	#define KEY_REGION_ID       				@"fid"
	Returns
	#define KEY_PROJECT_SHOULD_AUTO_UPDATE      @"shouldautoupdate"
	#define KEY_PROJECT_CURRENTLY_HERE          @"currentlyhere"
	*/
     getShouldAutoUpdateProjectEvents: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "getShouldAutoUpdateProjectEvents", [params]);
     },

	/*
	Params:
	#define KEY_REGION_ID       				@"fid"
	*/
     checkinToProject: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "checkinToProject", [params]);
     },

	/*
	Params:
	#define KEY_REGION_ID       				@"fid"
	*/
     checkoutOfProject: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "checkoutOfProject", [params]);
     },

	/*
	Params:
	#define KEY_YEAR                            @"year"
	#define KEY_MONTH                           @"month"
    Returns array of
    #define KEY_PROJECT_NAME                    @"projectname"
    #define KEY_EVENT_CHECKIN                   @"checkin"
    #define KEY_EVENT_CHECKOUT                  @"checkout"
	*/
     retrieveProjectEventsForDate: function(params, success, fail) {
          return PhoneGap.exec(success, fail, "DGPTimeTracker", "retrieveProjectEventsForDate", [params]);
     }</pre>
<p> </p>
<p>These functions are all part of the Phonegap plugin.  The fun part was to create the native code that handled each one of them.</p>
<p> </p>
<p>In order to add a project for monitoring from the Javascript in the HTML I just need to call:</p>
<pre class="brush: jscript;" title="code">currentLocation.location.lng, "address": currentLocation.location.address};
DGPTimeTracker.addProject(
			params,
			function(result) {
	      	},
	      	function(error) {
	      	}
		);</pre>
<p> </p>
<p>Feel free to browse the source code for this project on GitHub.</p>
<p>The source code for the plugins and the entire project can be found here:  <a title="https://github.com/tikalk/TikalTimeTracker" href="https://github.com/tikalk/TikalTimeTracker" target="_blank">https://github.com/tikalk/TikalTimeTracker</a></p>
<p> </p>
