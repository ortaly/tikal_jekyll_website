---
layout: post
title: Schema export with Hibernate 4 and Maven
created: 1339081686
author: ittayd
permalink: /schema-export-hibernate-4-and-maven
tags:
- JAVA
- hibernate maven
- build
---
<p>I&nbsp;recently needed to upgrade a project from Hibernate 3.6.9 to 4.1.3. Upgrading the code went fairly smoothly. However, upgrading the build turned out to be more difficult. The reason was the build was using hibernate3-maven-plugin to create an SQL&nbsp;schema file. The plugin, as its name suggests, supported only Hibernate 3. The main issue was that the plugin's code tried to use Hibernate classes which were relocated to different packages in the 4.x version. I tried updating the plugin from version 2.2 to 3.0, but it didn't work.</p>
<p>&nbsp;</p>
<p>So I&nbsp;decided to do it myself. The schema export is done by a hibernate class called SchemaExport. So the best approach I&nbsp;found was to use gmaven to call the class. Here is the result, for anyone else encountering the same issue.</p>
<p>&nbsp;</p>
<p>What I&nbsp;needed to do is:</p>
<ul>
    <li>Find all persistent classes in the build - for this I&nbsp;used the <a href="http://scannotation.sourceforge.net">scannotation </a>project.</li>
    <li>Get class instances - I&nbsp;created a ClassLoader instance with the build compile path and used a hibernate utility</li>
    <li>Configure an instance of SchemaExport and execute it</li>
    <li>Print any errors</li>
</ul>
<p>&nbsp;</p>
<p>Here is the groovy code:</p>
<pre class="brush: java;" title="code">
import org.scannotation.AnnotationDB
import org.scannotation.archiveiterator.FileIterator
import java.io.File
import javax.persistence.Entity
import javax.persistence.MappedSuperclass
import javax.persistence.Embeddable
import org.hibernate.cfg.Configuration
import org.hibernate.tool.hbm2ddl.SchemaExport
import org.hibernate.internal.util.ReflectHelper
 
def classLoader() {
    def classpathElements = project.compileClasspathElements + project.build.outputDirectory + project.build.testOutputDirectory
    URL[] urls = classpathElements.collect{new File(it).toURL()}.toArray()
    new URLClassLoader( urls, this.class.classLoader )
}

def scan(String... directories) {
    def annotationDb = new AnnotationDB()
    for (dir in directories) {
        log.info(&quot;Scanning ${dir}&quot;)
        annotationDb.scanArchives(new File(dir).toURL())
    }
    def index = annotationDb.annotationIndex
    def entityClasses = index.get(Entity.class.name) + index.get(MappedSuperclass.class.name) + index.get(Embeddable.class.name)
    return entityClasses
}

def export(classes) {
    Configuration config = new Configuration();
    Properties properties = new Properties();
    log.info(&quot;properties: ${project.properties}&quot;)
    def propertyfile = new FileInputStream(new File(project.basedir, project.properties.propertyfile))
    properties.load(propertyfile)
    propertyfile.close()

    config.setProperties(properties);
    for (c in classes) config.addAnnotatedClass(c)
    SchemaExport export = new SchemaExport(config);

    File file = new File(project.properties.outputfile)
    if (!file.absolute) {
        file = new File(project.build.outputDirectory, file)
    }
    if (!file.exists()) {
        file.parentFile.mkdirs();
    } else if (!file.isFile()) {
        fail(&quot;${file} is not a file&quot;)
    }

    log.info(&quot;exporting to ${file}&quot;)
    export.setOutputFile(file.absolutePath)
    export.setDelimiter(project.properties.delimiter ?: &quot;;&quot;)
    export.setFormat(project.properties.format?.toBoolean() ?: false)

    export.execute(true, false, false, true)

    export.exceptions.each{log.error(it.toString())}
}

// The following line is a workaround to a bug in gmaven when trying to access project.properties inside a method fails
project.properties

def classNames = scan(project.build.outputDirectory, project.build.testOutputDirectory)
def oldClassLoader = Thread.currentThread().contextClassLoader
Thread.currentThread().contextClassLoader = classLoader()
def classes = classNames.collect {ReflectHelper.classForName(it, this.class);}
export(classes)
Thread.currentThread().contextClassLoader = oldClassLoader
</pre>
<p>&nbsp;</p>
<p>Note the use of project.properties to get arguments passed to the script.</p>
<p>&nbsp;</p>
<p>In the pom.xml file I&nbsp;added:</p>
<pre class="brush: xhtml;" title="code">
&lt;plugin&gt;
  &lt;groupId&gt;org.codehaus.gmaven&lt;/groupId&gt;
  &lt;artifactId&gt;gmaven-plugin&lt;/artifactId&gt;
  &lt;executions&gt;
    &lt;execution&gt;
      &lt;phase&gt;process-classes&lt;/phase&gt;
      &lt;goals&gt;
        &lt;goal&gt;execute&lt;/goal&gt;
      &lt;/goals&gt;
      &lt;configuration&gt;
        &lt;classpath&gt;
           &lt;element&gt;
             &lt;groupId&gt;org.scannotation&lt;/groupId&gt;
             &lt;artifactId&gt;scannotation&lt;/artifactId&gt;
             &lt;version&gt;1.0.3&lt;/version&gt;
           &lt;/element&gt;
        &lt;/classpath&gt;
        &lt;properties&gt;
          &lt;propertyfile&gt;${pom.basedir}/src/main/resources/prod-db.properties&lt;/propertyfile&gt;
        &lt;/properties&gt;
        &lt;source&gt;${pom.basedir}/schema_export.groovy&lt;/source&gt;
      &lt;/configuration&gt;
    &lt;/execution&gt;
  &lt;/executions&gt;
&lt;/plugin&gt;</pre>
<p>&nbsp;</p>
<p>That's it. HTH</p>
