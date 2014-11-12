---
layout: post
title: Step by Step Beginners Guide to CDF (Community Dashboard Framework)
created: 1287219152
author: udid
permalink: /java/step-step-beginners-guide-cdf-community-dashboard-framework
tags:
- JAVA
- Toturial
- Pentaho
- guide
- Dashbaord
- CDF
- OSBI
---
<p>Dashboards used to be the hottest buzzword among BI enthusiasts such as myself, a Dashboard is like a mini application which gives managers a bird's-eye view of data for the purpose of decision making.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<!--break-->
<p style="margin-bottom: 0in;"><a href="http://en.wikipedia.org/wiki/Dashboards_%28management_information_systems%29">Wikipedia</a> adds that:</p>
<p style="margin-bottom: 0in;">&ldquo;Like a car's dashboard (or control panel), a software dashboard provides decision makers with the input necessary to &quot;drive&quot; the business. Thus, a graphical user interface may be designed to display summaries, graphics (e.g., bar charts, pie charts, bullet graphs, &quot;sparklines,&quot; etc.), and gauges (with colors similar to traffic lights) in a portal-like framework to highlight important information.&rdquo;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">In this post we will learn how easy it is to create a Dashboard such as this one:</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;"><img width="600" height="324" border="1" src="/files/dash3.png" alt="" />&nbsp;</p>
<p style="margin-bottom: 0in;">The Dashboard will allow the user to search for a companies. Companies are arranged in a 3-level hierarchy, and the Dashboard will allow users to navigate down the hierarchy, so if the user clicks a company in one level, the levels below it will show it's subsidiaries and the levels above it will show its parent companies. When ever a company is selected (in any of the levels) the graphs on the bottom display additional data for the company.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">To accomplish the task, we are going to use Pentaho BI Server and <a href="http://code.google.com/p/pentaho-cdf/">CDF</a>, which is an open source dashboard framework developed by Pedro Alves from WebDetails.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">So first thing first, we have to set up our infrastructure, the good news is that CDF is now an integral part of Pentaho CE, so we just need to download and install Pentaho 3.6:</p>
<pre title="code" class="brush: xhtml;">
$ wget http: //sourceforge.net/projects/pentaho/files/Business%20Intelligence%20Server/3.6.0-stable/biserver-ce-3.6.0-stable.tar.gz/download
$ tar xzvf biserver-ce-3.6.0-stable.tar.gz
$ cd biserver-ce
$ ./start-pentaho.sh
</pre>
<p>&nbsp;</p>
<p>Great, you can see that it is working by navigating to port 8080 on the localhost. You can log-in using the default user and password (joe/password), there are many samples, including CDF samples and also CDF documentation is available through the system.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">I am going to publish the system on the web so I have to edit tomcat/conf/server.xml and to change the Connector port from 8080 to just 80, and also to edit tomcat/webapps/pentaho/WEB-INF/web.xml and modify the base-url parameter to the url I am going to use.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Next step is to create a datasource to the database, this can be done using the administrator colsole, but for me it is easier to just  editing tomcat/webapps/pentaho/META-INF/context.xml and add this:</p>
<pre title="code" class="brush: xhtml;">
&lt;Resource name=&quot;jdbc/datasource&quot; auth=&quot;Container&quot; type=&quot;javax.sql.DataSource&quot;
factory=&quot;org.apache.commons.dbcp.BasicDataSourceFactory&quot; maxActive=&quot;20&quot; maxIdle=&quot;5&quot;
maxWait=&quot;10000&quot; username=&quot;biserver&quot; password=&quot;nottelling&quot;
driverClassName=&quot;com.mysql.jdbc.Driver&quot; url=&quot;jdbc:mysql://localhost:3306/dw&quot;/&gt;
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">At this point don't forget to restart the server.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">OK, next step is to create a solution and a dashboard, the easiest way is copy-paste from the examples.</p>
<pre title="code" class="brush: jscript;">
$ cd pentaho-solutions
$ cp -r cdf-samples/20-samples/charts mySolution
$ cd mySolution</pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The solution is defined by the index.xml file and we can edit the index.properties file to give it a name and a description. The Dashboard is defined by the .xcdf file which we should also rename and edit to our own names.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Now you can go back to the web-browser, in order to see the new solution and new Dashboard you have to &ldquo;refresh the repository cache&rdquo; (there's a menu option for that and also a refresh icon) and Voil&agrave; &ndash; a new Dashboard was born.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The content of the dashboard is stored in a template.html file, there are several parts to it which I would explain herein.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">First there is the html template itself which defines the structure of the Dashboard. In my case I needed a search box, 3 multi-select-boxes, two bar-charts and one gauge which I am going to layout as follows:</p>
<pre title="code" class="brush: xhtml;">
&lt;table align=&quot;center&quot; style=&quot;border: 0px solid&gt;
&lt;tr&gt;
&lt;td valign=&quot;top&quot;&gt;Search:&lt;div id=&quot;search_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td valign=&quot;top&quot;&gt;A Level:&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;B Level:&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;C Level:&lt;/div&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;a_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;b_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;c_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;tr&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;channel_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;dialChart_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;td valign=&quot;top&quot;&gt;&lt;div id=&quot;product_object&quot;&gt;&lt;/div&gt;&lt;/td&gt;
&lt;/tr&gt;
&lt;/table&gt;</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">The next step is to create the different components using CDF, the search box is declared using javascript:</p>
<pre title="code" class="brush: java;">
var query;
var searchComponent =
{
name: &quot;searchComponent&quot;,
type: &quot;textInputComponent&quot;,
htmlObject: &quot;search_object&quot;,
executeAtStart: true,
parameter: &quot;query&quot;,
tooltip: &quot;enter partial company name and press Enter&quot;,
postChange: function(){ searchFunction(query); }
}</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The htmlObject property is very important, it tells CDF where in the html template the component is going to reside.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The postChange trigger function is going to be called when the users enters a new search query, and would be described in more details later.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Each of the 3 multi-select-boxes is declared in a similar way:</p>
<pre title="code" class="brush: jscript;">
var a;
var aComponent =
{
name: &quot;aComponent&quot;,
type: &quot;selectMultiComponent&quot;,
parameters:[],
parameter:&quot;a&quot;,
size: &quot;10&quot;,
valueAsId: false,
htmlObject: &quot;a_object&quot;,
executeAtStart: true,
queryDefinition: aQueryDefinition,
listeners: [&quot;event&quot;],
postChange: function(){aFunction(a);}
}; </pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The queryDefinition object, as you must have already gueesed, is responsible for querying the data that is going to populate the component, it will be described in more details below.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Bar-charts are created using this code:</p>
<pre title="code" class="brush: jscript;">
var channelComponent =
{
name: &quot;channelComponent&quot;,
type: &quot;jFreeChartComponent&quot;,
listeners:[&quot;selectedRegionMeasure&quot;],
chartDefinition: channelDefinition,
htmlObject: &quot;channel_object&quot;,
executeAtStart: true,
listeners: [&quot;event&quot;]
}
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">The listeners property lists event names to which this component listens, when ever such event is fired the component will refresh it's data.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Finally the code for a gauge component:</p>
<pre title="code" class="brush: java;">
var overallComponent =
{
name: &quot;overallComponent&quot;,
type: &quot;dialComponent&quot;,
listeners:[&quot;departmentMeasure&quot;],
chartDefinition: dialChartDefinition,
htmlObject: &quot;dialChart_object&quot;,
executeAtStart: true,
listeners: [&quot;event&quot;]
}
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">Now that all the components are ready we can go ahead and initiate the Dashboard with this call:</p>
<pre title="code" class="brush: jscript;">
Dashboards.init([searchComponent,aComponent,bComponent,cComponent,overallComponent,channelComponent,productComponent]);
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">CDF includes many components such as Buttons, Combo-boxes, Menus, Tables, Maps, FlashCharts, Pivot views, Traffic lights and more... check out the online documentation for the full list, descriptions and samples.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The next thing we want to define is the behavior of the Dashboard, in my case the state of the Dashboard is going to be managed using 4 variables and is going to use just one event to refresh all the views when the state changes:</p>
<pre title="code" class="brush: jscript;">
var queryStatus;
var aStatus;
var bStatus;
var cStatus;
</pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Now we can go back and look at the postChange function of the search component, which stores the query and resets any previous state. The call to fireChanges is will dispatch the event through all our views causing it to change.</p>
<pre title="code" class="brush: jscript;">
function searchFunction(val) {
queryStatus = val;
aStatus = &quot;&quot;;
bStatus = &quot;&quot;;
cStatus = &quot;&quot;;
Dashboards.fireChange(&quot;event&quot;,queryStatus);
}</pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">And for each of the multi-select components, the code is just as simple:</p>
<pre title="code" class="brush: java;">
function aFunction(val) {
queryStatus = &quot;&quot;;
aStatus = val;
bStatus = &quot;&quot;;
cStatus = &quot;&quot;;
Dashboards.fireChange(&quot;event&quot;,queryStatus);
}
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">Now we are approaching the last part of the development, which is to define the data queries in either SQL or MDX. The query is constructed based on the state of the dashboard.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The queryDefinition object for the multi-selects is:</p>
<pre title="code" class="brush: java;">
var aQueryDefinition = {
queryType: 'sql',
jndi: &quot;datasource&quot;,
query: function(){
var q= &quot;SELECT distinct A_ID, A_NAME &quot; +
&quot;FROM company &quot; +
&quot;WHERE 1=1 &quot; +
(queryStatus==&quot;&quot;?&quot;&quot;:(&quot;AND A_NAME like '%&quot;+queryStatus+&quot;%' &quot;)) +
(aStatus==&quot;&quot;?&quot;&quot;:(&quot;AND A_ID=&quot;+aStatus+&quot; &quot;)) +
(bStatus==&quot;&quot;?&quot;&quot;:(&quot;AND B_ID=&quot;+bStatus+&quot; &quot;)) +
(cStatus==&quot;&quot;?&quot;&quot;:(&quot;AND C_ID=&quot;+cStatus+&quot; &quot;)) +
&quot;LIMIT 100&quot;;
return q;
}
}</pre>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">As you can see, we are using an SQL query to the datasource to pull a list of all the A level companies that match to the criteria that is defined by the status of the Dashboard, so if the status is a query we will pick only companies whose names contains the search query and if the status is a company we will pick only companies on that branch of the hierarchy.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">Similarly, the queryDefinition of the bar-charts is:</p>
<pre title="code" class="brush: jscript;">
var channelDefinition = {
width: 300,
height: 250,
chartType: &quot;BarChart&quot;,
datasetType: &quot;CategoryDataset&quot;,
is3d: &quot;false&quot;,
isStacked: &quot;true&quot;,
includeLegend: &quot;false&quot;,
foregroundAlpha: 0.7,
queryType: 'sql',
jndi: &quot;datasource&quot;,
title: &quot;Channel Revenues:&quot;,
query: function(){
var query = &quot;SELECT name, sum(Revenue) &quot; +
&quot;FROM company LEFT JOIN revenue ON company.id=COMPANY_SEQ LEFT JOIN channel ON CHANNEL_SEQ=channel.id &quot; +
&quot;WHERE &quot; +
(aStatus==&quot;&quot;&amp;&amp;bStatus==&quot;&quot;&amp;&amp;cStatus==&quot;&quot;?&quot;1=0 &quot;:&quot;1=1 &quot;) +
(aStatus==&quot;&quot;?&quot;&quot;:(&quot;AND A_ID=&quot;+aStatus+&quot; &quot;)) +
(bStatus==&quot;&quot;?&quot;&quot;:(&quot;AND B_ID=&quot;+bStatus+&quot; &quot;)) +
(cStatus==&quot;&quot;?&quot;&quot;:(&quot;AND C_ID=&quot;+cStatus+&quot; &quot;)) +
&quot;GROUP BY id ORDER BY sum(Revenue) DESC LIMIT 10&quot;;
//query = &quot;SELECT 'London',100&quot;;
return query;
}
}</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">This query will return the total revenues by channel of all the companies that are on the branch of the selected company, if no company is selected the query will return no results.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<p style="margin-bottom: 0in;">The gauge query will select the average value over all the companies in the branch.</p>
<pre title="code" class="brush: jscript;">
var dialChartDefinition = {
width: 300,
height: 200,
chartType: &quot;DialChart&quot;,
queryType: 'sql',
is3d: 'true',
jndi: &quot;datasource&quot;,
title: &quot;Overall&quot;,
intervals: [40,60,100],
includeLegend: true,
query: function(){
var query = &quot; SELECT avg(ovrall) FROM overall LEFT JOIN company ON COMPANY_SEQ=id &quot;+
&quot; WHERE &quot; +
(aStatus==&quot;&quot;&amp;&amp;bStatus==&quot;&quot;&amp;&amp;cStatus==&quot;&quot;?&quot;1=0&quot;:&quot;1=1&quot;) +
(aStatus==&quot;&quot;?&quot;&quot;:(&quot;AND A_ID=&quot;+aStatus+&quot; &quot;)) +
(bStatus==&quot;&quot;?&quot;&quot;:(&quot;AND B_ID=&quot;+bStatus+&quot; &quot;)) +
(cStatus==&quot;&quot;?&quot;&quot;:(&quot;AND C_ID=&quot;+cStatus+&quot; &quot;));
//query= &quot;SELECT 75&quot;;
return query;
}
}
</pre>
<p>&nbsp;</p>
<p style="margin-bottom: 0in;">That would be all. We have defined the Dashboard's view by suppling the html template and the components to populate it, the Dashboard's controller was defined using the components call back functions and the update event and the Dashboard's data model by defining the dynamic queries to the datasource. The Dashboard is ready to be used. Enjoy!</p>
<p>&nbsp;</p>
