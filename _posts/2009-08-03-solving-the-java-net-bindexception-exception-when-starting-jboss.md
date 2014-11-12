---
layout: post
title: Solving the java.net.BindException exception when starting JBoss
created: 1249316775
author: elad
permalink: /java/solving-javanetbindexception-exception-when-starting-jboss
tags:
- JAVA
- JVM_Bind
- JBoss default ports
- jboss
---
<p>Ever wondered why sometimes JBoss doesn't start and throws the following exception: &quot;Address already in use: JVM_Bind&quot; ?<br />
That'e because JBoss uses default ports, and some application is already running on one of these ports.</p>
<p><br />
this is a shrinked version of a post published here:</p>
<p><a href="http://www.mastertheboss.com/en/jboss-server/195-solving-javanetbindexception-address-already-in-use-jvmbind.html">http://www.mastertheboss.com/en/jboss-server/195-solving-javanetbindexception-address-already-in-use-jvmbind.html</a></p>
<p>there you can also find applications that can potentialy use JBoss default ports, thus making it to throw this exception.</p>
<p><br />
To solve this problem, here's a list of the default ports JBoss uses. This way you can tell which port is occupied by another application.<br />
To get information about running processes, do the following:</p>
<p>In Windows: use the &quot;netstat -ao&quot; command.<br />
In Unix: to get the process which is engaging a port, use the &quot;fuser -v -n (tcp | udp) &lt;port#&gt;&quot; command.</p>
<p>&nbsp;</p>
<table>
    <tbody>
        <tr>
            <th>
            <p><strong>Port</strong></p>
            </th>
            <th>
            <p><strong>Type</strong></p>
            </th>
            <th>
            <p><strong>Service Descriptor</strong></p>
            </th>
            <th>
            <p><strong>Service Name</strong></p>
            </th>
            <th>&nbsp;</th>
            <th>&nbsp;</th>
        </tr>
        <tr>
            <td>
            <p>1098</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss:service=Naming</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>1099</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss:service=Naming</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>3873</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/ejb3.deployer/META-INF/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss.remoting:type=Connector,name=DefaultEjb3Connector,handler=ejb3</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>4444</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss:service=invoker,type=jrmp (legacy 4.0.x invoker)</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>4445</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss:service=invoker,type=pooled (legacy 4.0.x invoker)</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>4446</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss.remoting:service=Connector,transport=socket (EJB2 beans in AS/EAP 4.2+)</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8009</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/jbossweb-tomcat41.sar/META-INF/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss.web:service=WebServer</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8080</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/jbossweb-tomcat41.sar/META-INF/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss.web:service=WebServer</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8083</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>conf/jboss-service.xml</p>
            </td>
            <td>
            <p>jboss:service=WebService</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8090</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/jms/oil-service.xml</p>
            </td>
            <td>
            <p>jboss.mq:service=InvocationLayer,type=OIL</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8092</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/jms/oil2-service.xml</p>
            </td>
            <td>
            <p>jboss.mq:service=InvocationLayer,type=OIL2</p>
            </td>
            <td>&nbsp;</td>
        </tr>
        <tr>
            <td>
            <p>8093</p>
            </td>
            <td>
            <p>TCP</p>
            </td>
            <td>
            <p>deploy/jms/uil2-service.xml</p>
            </td>
            <td>
            <p>jboss.mq:service=InvocationLayer,type=UIL2</p>
            </td>
            <td>&nbsp;</td>
        </tr>
    </tbody>
</table>
