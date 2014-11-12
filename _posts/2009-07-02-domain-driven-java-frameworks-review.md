---
layout: post
title: Domain Driven Java Frameworks review
created: 1246564039
permalink: domain-driven-java-frameworks-review
tags:
- JAVA
- frameworks
---
<p>I look for framework like Ruby on Rails or Python on Jango but in Java.</p>
<p><br />
Below are the results:</p>
<p>&ndash; <a href="https://trails.dev.java.net/">Trails</a>;<br />
&ndash; <a href="http://openxava.org/">OpenXava</a>;<br />
&ndash; <a href="http://nexopen.org/">NexOpen</a>;<br />
&ndash; <a href="http://jmatter.org/">JMatter</a>;<br />
&ndash; <a href="http://www.nakedobjects.org/home/no_for_java_intro.shtml">Naked Objects</a>;<br />
&ndash; <a href="http://www.romaframework.org/">Roma Framework</a>;<br />
&ndash; <a href="http://bastionframework.org/">Bastion</a>.</p>
<p>All of them use <a href="http://en.wikipedia.org/wiki/Domain-driven_design">Domain Driven Design</a> or <a href="http://en.wikipedia.org/wiki/Model-driven_architecture">Model Driven Architecture</a> and <a href="http://en.wikipedia.org/wiki/Convention_over_Configuration">Convention over Configuration</a> approach.<br />
You write <a href="http://en.wikipedia.org/wiki/POJO">POJO</a> and get whole application with generated view and <a href="http://en.wikipedia.org/wiki/Data_Access_Object">DAO</a> level with connection to database of your choice.</p>
<p>&nbsp;</p>
<p>So i need one framework and i have seven to choose from.</p>
<p>I will use next methodology. Framework must be:</p>
<p>1. known;<br />
2. well documented;<br />
3. must have open source examples;<br />
4. must be very simple and quick to start;<br />
5. must be under commercial friendly license (like<a href="http://en.wikipedia.org/wiki/Apache_License"> Apache License</a>);<br />
6. i prefer code generation over generic usage;<br />
7. i want framework that can make for me all work from ajaxable view to database schema;<br />
8. last but not least: i should like it.</p>
<p>&nbsp;</p>
<p>Here are results of <a href="http://www.checkyourlinkpopularity.com/">Link Popularity Check</a> program compared above frameworks sites.</p>
<div style="text-align: left;"><img style="width: 648px; height: 546px;" src="http://docs.google.com/File?id=dgnwcmwc_6fjj7gffg_b" alt="" /></div>
<div style="text-align: left;">
<p>As you can see Trails is most popular, Naked Objects the next and so on..</p>
<p>&nbsp;</p>
<p>So go from end: Bastion seems to be still subject to mature and deleted by principle 1-4, 7.</p>
<p>&nbsp;</p>
<p>NexOpen is much better, but still is unknown and more important does not create view level and<br />
must be integrated with some MVC framework like Spring MVC or Struts. Such framework also<br />
nice to have, but now i need something more productive less flexible. Deleted with option to use<br />
in future.</p>
<p>&nbsp;</p>
<p>OpenXava seems to be very good documented, known enough,  shipped with examples (too simple),<br />
<a href="http://qamanager.wiki.sourceforge.net/">qaManager</a> open source project available to download and can be used as example.<br />
So i will try it to create sample application.</p>
<p>&nbsp;</p>
<p>Roma framework very good documented, known, so i will try it too.</p>
<p>&nbsp;</p>
<p>JMatter also good documented, known,  but generate Swing application run by Java Web Start.<br />
I want framework that generate web application played in browser. Deleted with option to use<br />
in future.</p>
<p>&nbsp;</p>
<p>Naked Objects that is , by the way, a Naked Objects Pattern implementation, also known,<br />
well documented, shipped with examples etc. The next  candidate for my dream framework.</p>
<p>And at last Trails seems to be a good example of situation, when most popular is not the best.<br />
Poor documented, using Maven is required in order to start new project. I have nothing against<br />
Maven, but i want something  more user friendly for such framework. Its name recalls Rails.<br />
Deleted.</p>
<p>&nbsp;</p>
<p><strong>Temporary summary: Naked Objects, Roma framework  and OpenXava.</strong></p>
<p>&nbsp;</p>
<p>Now i will start to create sample application with each of this frameworks.</p>
<p>For beginning i will create domain class Worker with some properties such name, salary etc.,<br />
and calculate time for creating whole application from download framework to deploy application<br />
to application server.</p>
<p>And the next step i will create custom method on domain class and custom button on view<br />
to run this method and calculate time will be taken on each framework to complete.</p>
<p>&nbsp;</p>
<p><a href="http://openxava.org/"><strong>OpenXava</strong></a>.</p>
<p>&nbsp;</p>
<p>Distributed package contains eclipse workspace and tomcat with hipersonic database.</p>
<p><br />
So, in order to start new project you must:<br />
1. start eclipse choosing OpenXava workspace;<br />
2. create new project called worker from eclipse menu;<br />
3. Go to the project OpenXavaTemplate and execute CreateNewProject.xml using<br />
Ant. You can do it with Right Button on CreateNewProject.xml &gt; Run as &gt; Ant<br />
Build. Ant ask you the project name, type worker.;<br />
4. configure datasource;<br />
5. from command line run tomcat, run database;<br />
6. write our Worker class;<br />
This is how Worker class looks like:</p>
<p>&nbsp;</p>
<pre class="java">
package com.mycompany.domain;

import javax.persistence.*;

import org.openxava.annotations.*;

@Entity
public class Worker {
@Id @Column(length=3) @Required
private int id;
@Column (length=40) @Required
private String name;
@Column (length=10) @Required
private int salary;

public String getName() {
return name;
}

public void setName(String name) {
this.name = name;
}

public int getSalary() {
return salary;
}

public void setSalary(int salary) {
this.salary = salary;
}

public int getId() {
return id;
}

public void setId(int id) {
this.id = id;
}

}</pre>
<p>Note, simple annotations added to support persistence</p>
<p>7. edit (specify jdbc driver) and run updateSchema ant task;<br />
8. run deployWar ant task;<br />
9. point browser to http://localhost:8080/worker/xava/module.jsp?application=worker&amp;module=Worker</p>
<p>&nbsp;</p>
<p>Note, that only step 3 is OpenXava specific. Other steps is very common to regular web<br />
application development. Step 7 &mdash; updateSchema ant task, must be run only if domain<br />
class was changed. Tomcat shouldn&rsquo;t be restarted each time after deploy.</p>
<p>All above steps took about 5 minutes to complete.</p>
<p>&nbsp;</p>
<p>Here the result application screenshots:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_7f994bxwk_b" alt="" /><br />
1.List mode. note, that list already contains filters. From list mode we can search, export to pdf,<br />
export to exsel, launch create new/detail page, delete selected row.<br />
.</p>
<p>2. in order to see detail mode we must add row to list<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_8qv8dvr9s_b" alt="crud" /><br />
From detail mode  we can create new or update existing entity, delete and also search by<br />
all fields.</p>
<p>Don&rsquo;t forget, that it took for us about 5 minutes to start new project and create above<br />
application (<strong>BTW full AJAX</strong> !)</p>
<p>&nbsp;</p>
<p><a href="http://romaframework.org/"><strong>Roma framework</strong></a></p>
<p>1. create ROMA_HOME environment variable (point to installation directory ;);<br />
Roma comes with a console tool to help in generating stuff. Assure to be in the<br />
$ROMA_HOME directory or just set once for ever the $ROMA_HOME directory in the PATH.<br />
2. run console command:<br />
roma create web worker com.mycompany.worker D:/projects/worker<br />
3. run eclipse with any workspace;<br />
4. import existing project from D:/projects/worker to workspace;<br />
5. write our Worker class (no annotations needed!);<br />
6. run console command to add view module:<br />
roma add view-echo2  ;<br />
7. run  console command to add application server:<br />
roma add web-jetty  ;<br />
8. run console command to add persistence module:<br />
roma add persistence-datanucleus ;<br />
9. run console command to generate CRUD code:<br />
roma crud com.mycompany.worker.domain.Worker ;<br />
10.edit HomePage.java;<br />
11.create debug configuration for jetty;<br />
12.run build.xml;<br />
13.run debug (jetty servlet container).</p>
<p>This is the result :</p>
<p><img src="http://docs.google.com/File?id=dgnwcmwc_10p54fktf2_b" alt="" /><br />
Note, filters placed separated from list. Only == statement can be used with filters value. But in OpenXava<br />
also &lt;=, =&gt;, starts etc.</p>
<p>I must to say that running application with Roma take me many time and was very confused, though<br />
I had the biggest expectations about this framework. The echo2 view implementation (above screenshot)<br />
only properly works in Opera browser.</p>
<p>To change view implementation:<br />
roma add view-html;<br />
run build.xml;<br />
relaunch jetty;</p>
<p><br />
<img src="http://docs.google.com/File?id=dgnwcmwc_11gmtkxktr_b" alt="" /><br />
much less impressible, but works without exceptions.<br />
Roma uses generated code instead of generic usage in OpenXava. And if to believe to documentation must be<br />
much more flexible. But this flexibility leads to complexity. I still want to use it, i wish that<br />
creators will improve documentation adding kickstart flow and default configuration. Also filters must be<br />
improved. There is Romulus Eclipse Plugin for Roma Framework available, but working with a little confusing too.</p>
<p>&nbsp;</p>
<p><a href="http://nakedobjects.org/"><strong>Naked Objects</strong></a></p>
<p>Naked Objects seems to be the simplest and most quick to start. No web development knowledge needed at all.</p>
<p>1. Start Eclipse, create new java project and add libraries to classpath from naked objects distribution.<br />
2. Copy web directories from naked objects distribution to project root.<br />
3. Create Worker class</p>
<p>&nbsp;</p>
<pre class="java">
package com.mycompany.domain;

import org.nakedobjects.applib.AbstractDomainObject;

public class Worker extends AbstractDomainObject{

    private int id;
    private String name;
    private int salary;

    public String title(){
        return name;
    }

    public int getId() {
        resolve(id);
        return id;
    }
    public void setId(int id) {
        this.id = id;
        objectChanged();
    }
    public String getName() {
        resolve(name);
        return name;
    }
    public void setName(String name) {
        this.name = name;
        objectChanged();
    }
    public int getSalary() {
        resolve(salary);
        return salary;
    }
    public void setSalary(int salary) {
        this.salary = salary;
        objectChanged();
    }

}
</pre>
<p>4. Create nakedobjects.properties file contains next line:<br />
nakedobjects.services=repository#com.mycompany.domain.Worker</p>
<p>5.Create Eclipse Run Configuration and run it.</p>
<p>&nbsp;</p>
<p>All above steps take one-two minutes to complete, depends how quick you type.<br />
Unlike OpenXava produced by default is complete application with login page,<br />
welcome page, menu etc.<br />
login:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_13ftmcgqfp_b" alt="" /><br />
welcome:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_14dg933jhc_b" alt="" /><br />
main:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_15fsvz4zgm_b" alt="" /><br />
new:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_16c4sxstm8_b" alt="" /><br />
list:<br />
<img src="http://docs.google.com/File?id=dgnwcmwc_17f3rhgvd4_b" alt="" /><br />
List is not something. No additional functionality like export to pdf or excel. Searching only<br />
by title.<br />
But it looks like complete application that not ashamed to show to colleagues or customers.</p>
<p><br />
So, summarize the results of above we have two finalists Naked Objects and OpenXava .<br />
I would use Naked Objects for something very simple like Domain Driven Design presentation<br />
and OpenXava for something a little more complex. Note, this is only the first impression that<br />
can be changed in a more detailed acquaintance.</p>
<p>&nbsp;</p>
<p><strong>So meet the winner: <a href="http://openxava.org/">OpenXava</a> .</strong></p>
<p><br />
Java on OpenXava?</p>
<p>to be continued&hellip;</p>
</div>
