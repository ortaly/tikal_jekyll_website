---
layout: post
title: The 10 minutes AntInstaller and maven guide
created: 1288085703
permalink: /js/10-minutes-antinstaller-and-maven-guide
tags:
- JS
- maven
- antinstaller
- Ant
---
<p>The information about the combination of these two goodies is to say the least scarce. I decided to create a minimal small POC project which</p>
<p>Full credit to Ittai who helped me out with this post. </p>
<p><br />
1-Has a self contained Maven POM, which works out of the box without any major modifications.<br />
2-Explicitly invokes AntInstaller via a configuration file while utilizing an antinstaller properties file<br />
3-Is easy to understand and expand. <br />
<br />
Without further ado, I shall describe the files involved in the project which was fully build using the one and only Intellij IDEA. <br />
<br />
Folder structure is as follows:</p>
<pre class="brush: xhtml;" title="code">
|-tikalk-installer
 |---src
 |-----main
 |-------antlib
 |-------installer
 |-------lib
</pre>
<p>The directory structure was generated using the folowing linux command:</p>
<pre class="brush: php;" title="code">
ls -R | grep &quot;:$&quot; | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' \
-e 's/^/ /' -e 's/-/|/'</pre>
<p><br />
<br />
The root directory contains the maven POM:</p>
<pre title="code" class="brush: xhtml;">
&lt;project xmlns=&quot;http://maven.apache.org/POM/4.0.0&quot;
         xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;
         xsi:schemaLocation=&quot;http://maven.apache.org/POM/4.0.0
                               http://maven.apache.org/maven-v4_0_0.xsd&quot;&gt;

    &lt;modelVersion&gt;4.0.0&lt;/modelVersion&gt;
    &lt;groupId&gt;com.tikalk.tikalk.runtime.prod&lt;/groupId&gt;
    &lt;artifactId&gt;tikalk-installer&lt;/artifactId&gt;
    &lt;version&gt;1.0-SNAPSHOT&lt;/version&gt;
    &lt;name&gt;Rt installer&lt;/name&gt;
    &lt;packaging&gt;pom&lt;/packaging&gt;
    &lt;inceptionYear&gt;2010&lt;/inceptionYear&gt;

    &lt;developers&gt;
        &lt;developer&gt;
            &lt;name&gt;Shlomo&lt;/name&gt;
            &lt;organization&gt;Tikalk&lt;/organization&gt;
        &lt;/developer&gt;
    &lt;/developers&gt;

    &lt;pluginRepositories&gt;
        &lt;pluginRepository&gt;
            &lt;id&gt;nexus -public&lt;/id&gt;
            &lt;url&gt;http://build/nexus/content/groups/public&lt;/url&gt;
        &lt;/pluginRepository&gt;
    &lt;/pluginRepositories&gt;

    &lt;repositories&gt;
        &lt;repository&gt;
            &lt;id&gt;nexus -public&lt;/id&gt;
            &lt;url&gt;http://build/nexus/content/groups/public&lt;/url&gt;
        &lt;/repository&gt;

    &lt;/repositories&gt;

    &lt;properties&gt;       
        &lt;jdk.product.version&gt;java-6-sun&lt;/jdk.product.version&gt;
        &lt;jdk.product.name&gt;jdk&lt;/jdk.product.name&gt;       
        &lt;rt.base.folder&gt;target&lt;/rt.base.folder&gt;
    &lt;/properties&gt;

    &lt;dependencies&gt;
        &lt;!-- Ant-Contrib for Special Ant Tasks (IF) --&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.maven&lt;/groupId&gt;
            &lt;artifactId&gt;maven-artifact-ant&lt;/artifactId&gt;
            &lt;version&gt;2.0.4&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;org.apache.ant&lt;/groupId&gt;
            &lt;artifactId&gt;ant&lt;/artifactId&gt;
            &lt;version&gt;1.7.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;ant-contrib&lt;/groupId&gt;
            &lt;artifactId&gt;ant-contrib&lt;/artifactId&gt;
            &lt;version&gt;1.0b2&lt;/version&gt;
            &lt;exclusions&gt;
                &lt;exclusion&gt;
                    &lt;groupId&gt;ant&lt;/groupId&gt;
                    &lt;artifactId&gt;ant&lt;/artifactId&gt;
                &lt;/exclusion&gt;
            &lt;/exclusions&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;ant&lt;/groupId&gt;
            &lt;artifactId&gt;optional&lt;/artifactId&gt;
            &lt;version&gt;1.5.4&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;ant&lt;/groupId&gt;
            &lt;artifactId&gt;ant-antlr&lt;/artifactId&gt;
            &lt;version&gt;1.6.5&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;antlr&lt;/groupId&gt;
            &lt;artifactId&gt;antlrall&lt;/artifactId&gt;
            &lt;version&gt;2.7.4&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ant&lt;/groupId&gt;
            &lt;artifactId&gt;ant-nodeps&lt;/artifactId&gt;
            &lt;version&gt;1.6.5&lt;/version&gt;
        &lt;/dependency&gt;

        &lt;dependency&gt;
            &lt;groupId&gt;ant-installer&lt;/groupId&gt;
            &lt;artifactId&gt;ant-installer&lt;/artifactId&gt;
            &lt;version&gt;1.0&lt;/version&gt;
        &lt;/dependency&gt;
        &lt;dependency&gt;
            &lt;groupId&gt;ant-installer-ext&lt;/groupId&gt;
            &lt;artifactId&gt;ant-installer-ext&lt;/artifactId&gt;
            &lt;version&gt;1.0&lt;/version&gt;
        &lt;/dependency&gt;
    &lt;/dependencies&gt;
    &lt;profiles&gt;
        &lt;profile&gt;
            &lt;id&gt;new-installer&lt;/id&gt;
            &lt;properties&gt;
                &lt;platform&gt;linux&lt;/platform&gt;
            &lt;/properties&gt;
            &lt;activation&gt;
                &lt;activeByDefault&gt;true&lt;/activeByDefault&gt;
                &lt;os&gt;
                    &lt;family&gt;linux&lt;/family&gt;
                &lt;/os&gt;
            &lt;/activation&gt;

            &lt;build&gt;
                &lt;plugins&gt;
                    &lt;plugin&gt;
                        &lt;groupId&gt;org.jvnet.maven-antrun-extended-plugin&lt;/groupId&gt;
                        &lt;artifactId&gt;maven-antrun-extended-plugin&lt;/artifactId&gt;
                        &lt;version&gt;1.8&lt;/version&gt;
                        &lt;dependencies&gt;
                            &lt;dependency&gt;
                                &lt;groupId&gt;ant-installer&lt;/groupId&gt;
                                &lt;artifactId&gt;ant-installer&lt;/artifactId&gt;
                                &lt;version&gt;1.0&lt;/version&gt;
                            &lt;/dependency&gt;
                            &lt;dependency&gt;
                                &lt;groupId&gt;ant-installer-ext&lt;/groupId&gt;
                                &lt;artifactId&gt;ant-installer-ext&lt;/artifactId&gt;
                                &lt;version&gt;1.0&lt;/version&gt;
                            &lt;/dependency&gt;
                        &lt;/dependencies&gt;
                        &lt;executions&gt;
                            &lt;execution&gt;
                                &lt;id&gt;initialize&lt;/id&gt;
                                &lt;phase&gt;initialize&lt;/phase&gt;
                                &lt;configuration&gt;
                                  &lt;tasks&gt;
                                     &lt;copy file=&quot;src/main/installer/ant.install.properties&quot;
                                              tofile=&quot;src/main/target/ant.install.properties&quot;
                                              overwrite=&quot;true&quot; verbose=&quot;true&quot;/&gt;

                                      &lt;resolveArtifact artifactId=&quot;jdk&quot; property=&quot;jdk.archive&quot;/&gt;                                    

                                      &lt;taskdef name=&quot;installer&quot;
                                                 classname=&quot;org.tp23.antinstaller.taskdefs.Installer&quot;
                                                 classpathref=&quot;maven.plugin.classpath&quot;/&gt;

                                        &lt;!-- configure the installer task --&gt;
                                        &lt;installer file=&quot;src/main/target/tikalk-installer.jar&quot;
                                                   compress=&quot;true&quot;
                                                   extractType=&quot;SelfExtractor&quot;
                                                   installConfig=&quot;src/main/installer/antinstall-config.xml&quot;
                                                   buildFile=&quot;src/main/installer/build.xml&quot;
                                                   antInstallLib=&quot;src/main/lib&quot;
                                                   antLib=&quot;src/main/antlib&quot;
                                                   validateConfig=&quot;true&quot;
                                                   failOnError=&quot;true&quot; &gt;

                                            &lt;fileset file=&quot;${jdk.archive}&quot; /&gt;                                           

                                        &lt;/installer&gt;

                                  &lt;/tasks&gt;

                                &lt;/configuration&gt;
                                &lt;goals&gt;
                                    &lt;goal&gt;run&lt;/goal&gt;
                                &lt;/goals&gt;
                            &lt;/execution&gt;
                        &lt;/executions&gt;
                    &lt;/plugin&gt;


                &lt;/plugins&gt;
            &lt;/build&gt;

        &lt;/profile&gt;

    &lt;/profiles&gt;
&lt;/project&gt;
</pre>
<p>&nbsp;</p>
<p>Let us try and understand the various sections of the maven POM. The installer is minimal and will pack a JDK inside it, it can be any other artifact(s) such as mysql or your own artifact placed under a private Nexus repository.</p>
<p>&nbsp;</p>
<p>The most cruical section is the one starting at line 114.&nbsp; It defines the plug-in taht allows maven to interact with Ant and Antinstaller. Additionally, it defines two dependencies, which MUST be placed under your local nexus repo so that they can be resolved.</p>
<p>&nbsp;</p>
<pre title="code" class="brush: xhtml;">
 &lt;plugin&gt;
                        &lt;groupId&gt;org.jvnet.maven-antrun-extended-plugin&lt;/groupId&gt;
                        &lt;artifactId&gt;maven-antrun-extended-plugin&lt;/artifactId&gt;
                        &lt;version&gt;1.8&lt;/version&gt;
                        &lt;dependencies&gt;
                            &lt;dependency&gt;
                                &lt;groupId&gt;ant-installer&lt;/groupId&gt;
                                &lt;artifactId&gt;ant-installer&lt;/artifactId&gt;
                                &lt;version&gt;1.0&lt;/version&gt;
                            &lt;/dependency&gt;
                            &lt;dependency&gt;
                                &lt;groupId&gt;ant-installer-ext&lt;/groupId&gt;
                                &lt;artifactId&gt;ant-installer-ext&lt;/artifactId&gt;
                                &lt;version&gt;1.0&lt;/version&gt;
                            &lt;/dependency&gt;
                        &lt;/dependencies&gt;
</pre>
<pre title="code" class="brush: xhtml;">

</pre>
<p>Next at line 135, we copy our own version of the property file used by the installer at runtime:</p>
<pre title="code" class="brush: xhtml;">
 &lt;copy file=&quot;src/main/installer/ant.install.properties&quot;
                                              tofile=&quot;src/main/target/ant.install.properties&quot;
                                              overwrite=&quot;true&quot; verbose=&quot;true&quot;/&gt;</pre>
<p>&nbsp;</p>
<p>Next at line 139 we define our only artifact that must be resolved (the jdk) at build time:</p>
<pre class="brush: xhtml;" title="code">
&lt;resolveArtifact artifactId=&quot;jdk&quot; property=&quot;jdk.archive&quot;/&gt; </pre>
<p>&nbsp;</p>
<p>Next at line 142 we define the actual antinatller task:</p>
<pre title="code" class="brush: xhtml;">
  &lt;taskdef name=&quot;installer&quot;
                                                 classname=&quot;org.tp23.antinstaller.taskdefs.Installer&quot;
                                                 classpathref=&quot;maven.plugin.classpath&quot;/&gt;</pre>
<p>Note that the class loader will look under the&nbsp; &quot;maven.plugin.classpath&quot; to try and locat the installer task.</p>
<p>&nbsp;</p>
<p>Next at lines 146 to 156 the resulting installer is defined:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: xhtml;">
 &lt;!-- configure the installer task --&gt;
                                        &lt;installer file=&quot;src/main/target/tikalk-installer.jar&quot;
                                                   compress=&quot;true&quot;
                                                   extractType=&quot;SelfExtractor&quot;
                                                   installConfig=&quot;src/main/installer/antinstall-config.xml&quot;
                                                   buildFile=&quot;src/main/installer/build.xml&quot;
                                                   antInstallLib=&quot;src/main/lib&quot;
                                                   antLib=&quot;src/main/antlib&quot;
                                                   validateConfig=&quot;true&quot;
                                                   failOnError=&quot;true&quot; &gt;
                                            &lt;fileset file=&quot;${jdk.archive}&quot; /&gt;          </pre>
<p>Line 146 names the installer, e.g</p>
<pre title="code" class="brush: xhtml;">
tikalk-installer.jar</pre>
<p>Line 149 referes to our own antinstall-config.xml file:</p>
<pre class="brush: xhtml;" title="code">
 installConfig=&quot;src/main/installer/antinstall-config.xml&quot;</pre>
<p>Line 150 referes to our own ant build.xml file:</p>
<pre title="code" class="brush: xhtml;">
 buildFile=&quot;src/main/installer/build.xml&quot;

</pre>
<p>Last but not least, we include out only artifact inside the installer:</p>
<pre title="code" class="brush: xhtml;">
&lt;fileset file=&quot;${jdk.archive}&quot; /&gt;       

</pre>
<p>Under /src/main<b>: </b><br />
The installer directory contains: <br />
A. The ant build.xml file used for invoking your actual installation tasks once the installer has been built and is run on a machine:</p>
<pre class="brush: xhtml;" title="code">
&lt;?xml version=&quot;1.0&quot;?&gt;
&lt;project name=&quot;Tikal installer build&quot; default=&quot;&quot; basedir=&quot;${basedir}&quot;&gt;
    &lt;target name=&quot;default&quot; depends=&quot;&quot;&gt;
        &lt;echo&gt;&quot;Default&quot;&lt;/echo&gt;
    &lt;/target&gt;
    &lt;target name=&quot;configureServer-linux&quot; depends=&quot;&quot;&gt;
        &lt;echo&gt;server-linux&lt;/echo&gt;
    &lt;/target&gt;
&lt;/project&gt;</pre>
<p><br />
B. The antinstall-config.xml file used for defining the installation tasks and gathering input from the user via a GUI or the command line:</p>
<p>(credit: http://wiki.eclipse.org/Migrate_the_ConfigureAperi_code_to_AntInstaller)</p>
<pre class="brush: xhtml;" title="code">
&lt;?xml version=&quot;1.0&quot;?&gt;
&lt;!DOCTYPE installer PUBLIC &quot;-//tp23 //DTD Ant Installer Config//EN&quot; &quot;http://antinstaller.sf.net/dtd/antinstall-config-0.8.dtd&quot;&gt;

&lt;installer
        ui=&quot;swing,text,text-auto&quot;
        verbose=&quot;true&quot;
        debug=&quot;true&quot;
        lookAndFeel=&quot;native&quot;
        name=&quot;Tikalk  Installer&quot;
        minJavaVersion=&quot;1.5&quot;
        finishButtonText=&quot;Install&quot;
        version=&quot;5.3&quot;
        loadDefaults=&quot;true&quot;
        wide=&quot;600:275&quot;&gt;    
    &lt;page
        type=&quot;input&quot;
        name=&quot;intro&quot;
        displayText=&quot;Welcome&quot;&gt;
        &lt;comment
            displayText=&quot;&quot;
            explanatoryText=&quot;Tikalk Tikalk installer&quot;
            /&gt;
        &lt;comment displayText=&quot;&quot;/&gt;
        &lt;comment displayText=&quot;Installer made with&quot;/&gt;
        &lt;comment displayText=&quot;http://antinstaller.sourceforge.net&quot; bold=&quot;true&quot;/&gt;
 		&lt;hidden
 			property=&quot;env.HOSTNAME&quot;
 			value=&quot;${env.COMPUTERNAME}&quot;
 		/&gt;
    &lt;/page&gt;    
    &lt;page
        type=&quot;input&quot;
        name=&quot;componentSelection&quot;
        displayText=&quot;Component Selection&quot;&gt;
        &lt;comment
        	displayText=&quot;The Tikalk system consists of two major components:
        	Server,Client&quot;
				title=&quot;false&quot; /&gt;
        &lt;comment
        	displayText=&quot;You can configure any or all of these to run on this computer.&quot;
				title=&quot;false&quot; /&gt;	
        &lt;target
        	target=&quot;configureServer&quot;
        	displayText=&quot;Server&quot;
        	defaultValue=&quot;true&quot;
        	osSpecific=&quot;true&quot;
        	strict=&quot;false&quot; /&gt;
    &lt;/page&gt;
    &lt;page
      	type=&quot;input&quot;
    	name=&quot;installLocation&quot;
    	displayText=&quot;Installation location&quot; &gt;
    	&lt;directory
    		displayText=&quot;Installation location&quot;
    		checkExists=&quot;true&quot;
    		create=&quot;true&quot;
    		defaultValue=&quot;/opt/Tikalk&quot;
    		property=&quot;install.dir&quot; /&gt;
    &lt;/page&gt;
	&lt;page 
		name=&quot;serverConfig&quot;
		displayText=&quot;Server configuration&quot;
		type=&quot;input&quot;
		ifProperty=&quot;(${configureAgent}==true)OR(${configureServer}==true)&quot;&gt;
		&lt;comment
			displayText=&quot;Enter values to configure the server.&quot;
			title=&quot;true&quot; /&gt;
		&lt;validated
			property=&quot;server.hostname&quot;
			displayText=&quot;Server hostname&quot;
			defaultValue=&quot;${env.HOSTNAME}&quot;
			regex=&quot;[a-zA-Z0-9.]*&quot;
		/&gt;
	&lt;/page&gt;
    &lt;page
			type=&quot;progress&quot;
			name=&quot;progress&quot;
			showTargets=&quot;true&quot;
			displayText=&quot;Installation progress&quot; &gt;
	&lt;/page&gt;	
&lt;/installer&gt;
</pre>
<p><br />
C. The ant.install.properties used for defining default installation values:</p>
<pre title="code" class="brush: php;"><a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Ant Installer - properties auto generated on Mon\ Oct\ 25\ 07\:55\:40\ GMT\ 2010

basedir = /home/dambo/projects/tikalk-installer/src/main/target/.
ant.install.config.version = 5.3


<a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Properties from Page:intro
<a href="http://search.twitter.com/search?q=%23">#</a> .HiddenPropertyInput
env.HOSTNAME = 

<a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Properties from Page:componentSelection
<a href="http://search.twitter.com/search?q=%23">#</a> .TargetInput
configureServer = true
<a href="http://search.twitter.com/search?q=%23">#</a> Targets selected for page
componentSelection-targets = configureServer-linux,

<a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Properties from Page:installLocation
<a href="http://search.twitter.com/search?q=%23">#</a> .DirectoryInput
install.dir = /home/dambo/tikalk-installer

<a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Properties from Page:serverConfig
<a href="http://search.twitter.com/search?q=%23">#</a> .ValidatedTextInput
server.hostname = localhost

<a href="http://search.twitter.com/search?q=%23">#</a><a href="http://search.twitter.com/search?q=%23">#</a> Properties from Page:progress
</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The lib directory contains ant lib libraries (ships with ant installer)</p>
<p>&nbsp;</p>
<p>The antlib directory contains additional &quot;antlib&quot; third party libraries (ships with antinstaller) <br />
&nbsp; <br />
Once the maven target &quot;install&quot; is invoked, a file named tikalk-installer.jar will be generated. In order to actuayly run teh installer use:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
 java -jar tikalk-installer.jar</pre>
<p>&nbsp;</p>
<p>Of course it can run in either GUI mode using swing or command line mode on the unix shell.</p>
<p>&nbsp;</p>
<p>Questions welcomed,</p>
<p><br />
&nbsp;</p>
