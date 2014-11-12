---
layout: post
title: Java assist to the rescue
created: 1359533167
author: chaim.turkel
permalink: java-assist-to-the-rescue
tags:
- JAVA
- XStream
- javaassit
---
<p>&nbsp;</p>
<h1 align="center" style="text-align:center">
	Java assist to the rescue<o:p></o:p></h1>
<p class="MsoNormal">We use XStream (<a href="http://xstream.codehaus.org/">http://xstream.codehaus.org/</a>) for <span style="font-size: 9pt; line-height: 107%; font-family: Helvetica, sans-serif; color: black; background-position: initial initial; background-repeat: initial initial;">serializing objects to xml. Our basic structure is: <o:p></o:p></span></p>
<pre class="brush: xhtml;" title="code">
&lt;GlobalInfo&gt;
                &lt;user/&gt;
                &lt;date/&gt;
                &lt;object&gt;
                                &lt;specificinfo&gt;
                                &lt;/specificinfo&gt;
                &lt;/object&gt;
&lt;/GlobalInfo&gt;</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">We create annotations on our objects for the XStream converter, which worked fine. The problem we faced was how to give a proper name for the &ldquo;object&rdquo; node in the xml. Since we needed objects for the converter, we created a class GlobalInfo that accepted a base class of GenericObject. Each scenario that needed to transform an object to the xml, we inherited the GenericObject that had an internal field by the name that we wanted, this way the standard serializer used the field name for the xml. For example:<o:p></o:p></p>
<pre class="brush: java;" title="code">
 public class TempObject extends GenericObject {
       private MyObject myName;
}
 </pre>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p class="MsoNormal">This would create the following xml:<o:p></o:p></p>
<pre class="brush: xhtml;" title="code">
&lt;GlobalInfo&gt;
                &lt;user/&gt;
                &lt;date/&gt;
                &lt;myName&gt;
                                &lt;MyObject&gt;
                                &lt;/MyObject&gt;
                &lt;/myName&gt;
&lt;/GlobalInfo&gt;</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">I looked for a generic way to create the &ldquo;myName&rdquo; node. Using XStream the standard way was to use annotations. The problem is that during run time you cannot change the annotation values. To overcome this I used java assit. With java assit I could create the class &ldquo;TempObject&rdquo; by code during runtime and then I would have a generic way to create the xml node without creating multiple classes during the coding phase. <o:p></o:p></p>
<p class="MsoNormal">The idea is to create a class during runtime, and then assign the filed <span style="font-size:10.0pt;line-height:107%;font-family:
Consolas;color:#0000C0">myName </span>with the object that needs to be serialized.<o:p></o:p></p>
<p class="MsoNormal">The following example will create the class:<o:p></o:p></p>
<pre class="brush: java;" title="code">
@SuppressWarnings({ &quot;rawtypes&quot;, &quot;unchecked&quot; })
public static GenericObject generate(Object source, String objectFieldName) {
       try {
              ClassPool pool = ClassPool.getDefault();
              // create the class
              String generatedClassName = String.format(&quot;TempObject.%s&quot;, objectFieldName);
              Class clazz = classFactory.get(objectFieldName);
              if (clazz == null) {
                     CtClass transClass = null;
                     try {
                           transClass = pool.get(generatedClassName);
                     } catch (NotFoundException e) {
 
                           transClass = pool.makeClass(generatedClassName);
                           CtClass superClass = pool.get(&quot;a.b.c.GenericObject&quot;);
                           transClass.setSuperclass(superClass);
 
                           CtField field = CtField.make(
                                         String.format(&quot;private Object %s;&quot;, objectFieldName), transClass);
                           transClass.addField(field);
                           transClass.addMethod(CtNewMethod.make(
                                         String.format(&quot;public void setObject (Object obj) { this.%s=obj; }&quot;,
                                                       objectFieldName), transClass));
 
                           clazz = transClass.toClass();
                           classFactory.put(objectFieldName, clazz);
                     }
              }
 
              Object obj = clazz.newInstance();
              Class[] formalParams = new Class[] { Object.class };
              Method meth = clazz.getDeclaredMethod(&quot;setObject&quot;, formalParams);
              meth.invoke(obj, source);
              // PropertyUtils.setProperty(obj, &quot;obj&quot;, source);
              return (GenericObject) obj;
 
       } catch (Exception e) {
              throw new RuntimeException(e);
 
       }
}</pre>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;line-height:
normal;mso-layout-grid-align:none;text-autospace:none">&nbsp;</p>
<p>&nbsp;</p>
