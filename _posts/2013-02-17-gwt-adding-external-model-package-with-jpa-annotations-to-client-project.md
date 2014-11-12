---
layout: post
title: GWT - adding external model package with JPA annotations to client project.
created: 1361079545
author: olga
permalink: gwt-adding-external-model-package-with-jpa-annotations-to-client-project
tags:
- JAVA
- gwt
---
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;Usually we want to use our model classes inside of the GWT project. But it is impossible without additional configuration of a model package.</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">The first step is to add file&nbsp;<strong><span style="margin: 0px; padding: 0px; color: rgb(153, 51, 0);">model.gwt.xml</span></strong>&nbsp;to the model package for conversion of the regular java package to the GWT module.</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><span style="margin: 0px; padding: 0px; color: rgb(153, 51, 0);">model.gwt.xml</span>&nbsp;:</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
&lt;module&gt;
	&lt;inherits name=&#39;com.google.gwt.user.User&#39; /&gt;

	&lt;source path=&quot;model&quot;&gt;&lt;/source&gt;
&lt;/module&gt;
</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><font face="monospace" size="1"><span style="margin: 0px; padding: 0px; white-space: pre;">&nbsp;</span></font></p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">The second step add this new module to the main GWT module. My GWT project&rsquo;s name is &lsquo;web&rsquo;.</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><span style="margin: 0px; padding: 0px; color: rgb(153, 51, 0);">web.gwt.xml</span>&nbsp;:</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
&lt;module rename-to=&#39;web&#39;&gt;
	&lt;inherits name=&#39;com.google.gwt.user.theme.clean.Clean&#39; /&gt;
	&lt;inherits name=&quot;com.google.gwt.resources.Resources&quot; /&gt;
	&lt;inherits name=&quot;com.sencha.gxt.ui.GXT&quot;&gt;&lt;/inherits&gt;
	&lt;inherits name=&#39;com.XX.model&#39;/&gt;


	&lt;entry-point class=&#39;com.XX.web.client.MainApp&#39; /&gt;


	&lt;!-- Specify the paths for translatable code --&gt;
	&lt;source path=&#39;client&#39; /&gt;
	&lt;source path=&#39;shared&#39; /&gt;
	
	&lt;set-property name=&quot;user.agent&quot; value=&quot;safari&quot;/&gt;
	&lt;collapse-all-properties /&gt;
&lt;/module&gt;
</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">The third step we combine the modules using Maven and add support for JPA annotations.</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><span style="margin: 0px; padding: 0px; color: rgb(153, 51, 0);">web/pom.xml</span>&nbsp;:</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<pre class="brush: xhtml;" style="margin-top: 0px; margin-bottom: 0px; padding: 0px; color: rgb(102, 102, 102); line-height: 19px;" title="code">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;project&gt;
....
	
	&lt;dependencies&gt;

		&lt;dependency&gt;
			&lt;groupId&gt;com.XX&lt;/groupId&gt;
			&lt;artifactId&gt;model&lt;/artifactId&gt;
			&lt;version&gt;${project.version}&lt;/version&gt;
		&lt;/dependency&gt;
		
		&lt;!-- Add JPA annotations --&gt;

		&lt;dependency&gt;
			&lt;groupId&gt;org.hibernate&lt;/groupId&gt;
			&lt;artifactId&gt;hibernate-entitymanager&lt;/artifactId&gt;
                &lt;version&gt;3.6.3.Final&lt;/version&gt;
			&lt;exclusions&gt;
				&lt;exclusion&gt;
					&lt;groupId&gt;cglib&lt;/groupId&gt;
					&lt;artifactId&gt;cglib&lt;/artifactId&gt;
				&lt;/exclusion&gt;
				&lt;exclusion&gt;
					&lt;groupId&gt;dom4j&lt;/groupId&gt;
					&lt;artifactId&gt;dom4j&lt;/artifactId&gt;
				&lt;/exclusion&gt;
			&lt;/exclusions&gt;
		&lt;/dependency&gt;
	....
&lt;/dependencies&gt;
	&lt;build&gt;


		&lt;plugins&gt;
...
			&lt;plugin&gt;
				&lt;groupId&gt;org.codehaus.mojo&lt;/groupId&gt;
				&lt;artifactId&gt;gwt-maven-plugin&lt;/artifactId&gt;
				&lt;version&gt;${gwtmaven}&lt;/version&gt;
				&lt;configuration&gt;
					&lt;logLevel&gt;${gwt.loglevel}&lt;/logLevel&gt;
					&lt;style&gt;${gwt.outputstyle}&lt;/style&gt;
					&lt;gwtVersion&gt;${gwtversion}&lt;/gwtVersion&gt;
					&lt;compileReport&gt;true&lt;/compileReport&gt;
					
					&lt;sourcesArtifacts&gt;
						&lt;artifact&gt;org.codehaus.mojo:model&lt;/artifact&gt;
					&lt;/sourcesArtifacts&gt;

					&lt;runTarget&gt;index.html&lt;/runTarget&gt;
					&lt;hostedWebApp&gt;${project.build.directory}/${project.build.finalName}&lt;/hostedWebApp&gt;
				&lt;/configuration&gt;
				&lt;executions&gt;
					&lt;execution&gt;
						&lt;phase&gt;prepare-package&lt;/phase&gt;
						&lt;goals&gt;
							&lt;goal&gt;compile&lt;/goal&gt;
						&lt;/goals&gt;
					&lt;/execution&gt;
				&lt;/executions&gt;
			&lt;/plugin&gt;
			&lt;plugin&gt;
				&lt;groupId&gt;org.apache.maven.plugins&lt;/groupId&gt;
				&lt;artifactId&gt;maven-surefire-plugin&lt;/artifactId&gt;
				&lt;configuration&gt;
					&lt;argLine&gt;-Xmx216m&lt;/argLine&gt;
					&lt;additionalClasspathElements&gt;
						&lt;!-- allows to move the .gwt.xml file to resources folder --&gt;
						&lt;additionalClasspathElement&gt;src/main/java&lt;/additionalClasspathElement&gt;
						&lt;additionalClasspathElement&gt;src/test/java&lt;/additionalClasspathElement&gt;
						&lt;additionalClasspathElement&gt;${project.basedir}/src/main/resources&lt;/additionalClasspathElement&gt;

						&lt;additionalClasspathElement&gt;\${project.build.sourceDirectory}&lt;/additionalClasspathElement&gt;
						&lt;additionalClasspathElement&gt;\${project.build.testSourceDirectory}&lt;/additionalClasspathElement&gt;
					&lt;/additionalClasspathElements&gt;
					&lt;useManifestOnlyJar&gt;false&lt;/useManifestOnlyJar&gt;
					&lt;forkMode&gt;always&lt;/forkMode&gt;
					&lt;systemProperties&gt;
						&lt;property&gt;
							&lt;name&gt;gwt.args&lt;/name&gt;
							&lt;value&gt;-out target/gwt-tests&lt;/value&gt;
						&lt;/property&gt;
						&lt;property&gt;
							&lt;!-- Setting this to true (default) causes a exception first time 
								test are run Gwt issue_6443 --&gt;
							&lt;name&gt;gwt.persistentunitcache&lt;/name&gt;
							&lt;value&gt;false&lt;/value&gt;
						&lt;/property&gt;
					&lt;/systemProperties&gt;
				&lt;/configuration&gt;
			&lt;/plugin&gt;


		&lt;!-- allows to move the .gwt.xml file to resources folder --&gt;
		&lt;resources&gt;
			&lt;resource&gt;
				&lt;directory&gt;../model/src/main/java&lt;/directory&gt;
				&lt;includes&gt;
					&lt;include&gt;*.java&lt;/include&gt;
				&lt;/includes&gt;
			&lt;/resource&gt;
			&lt;resource&gt;
				&lt;directory&gt;../model/src/main/resources&lt;/directory&gt;
				&lt;includes&gt;
					&lt;include&gt;**/*.gwt.xml&lt;/include&gt;
				&lt;/includes&gt;
			&lt;/resource&gt;
			&lt;resource&gt;
				&lt;directory&gt;src/main/java&lt;/directory&gt;
				&lt;includes&gt;
					&lt;include&gt;**/client/**/*.java&lt;/include&gt;
				&lt;/includes&gt;
			&lt;/resource&gt;
			&lt;resource&gt;
				&lt;directory&gt;src/main/resources&lt;/directory&gt;
				&lt;includes&gt;
					&lt;include&gt;**/*.gwt.xml&lt;/include&gt;
				&lt;/includes&gt;
			&lt;/resource&gt;
		&lt;/resources&gt;
	&lt;/build&gt;

&lt;/project&gt;
</pre>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">The structure of packages:</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;">&nbsp;</p>
<p style="margin: 0px; padding: 0px; font-size: 14px; line-height: 21px; color: rgb(102, 102, 102); font-family: Tahoma, Verdana, Arial, Helvetica, sans-serif;"><img _fcksavedurl="/files/upload/338/post.jpg" alt="" height="429" src="http://www.tikalk.com/files/upload/338/post.jpg" style="border: 0px;" width="234" /></p>
