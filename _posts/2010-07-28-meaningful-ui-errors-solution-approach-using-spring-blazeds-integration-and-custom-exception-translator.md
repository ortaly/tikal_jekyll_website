---
layout: post
title: Meaningful UI Errors   - Solution approach using Spring BlazeDS Integration
  and custom Exception Translator
created: 1280316720
permalink: /js/meaningful-ui-errors-solution-approach-using-spring-blazeds-integration-and-custom-exception
tags:
- JS
- Flex Spring BlazeDS
---
<p>
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml" rel="File-List" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx" rel="themeData" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml" rel="colorSchemeMapping" /><style type="text/css">
</style>                            </meta>
</meta>
</meta>
</meta>
</p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">Spring BlazeDS Integration comes with the notion of </span></span><span style="font-family: Tahoma;"><a target="_blank" href="http://static.springframework.org/spring-flex/docs/1.0.x/reference/html/ch02s08.html"><span style="font-size: 12pt; line-height: 115%;">custom exception translators</span></a></span><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">.  The translator makes sure that exceptions thrown from the  Spring-exposed LCDS/BlazeDS destinations are converted to meaningful  exceptions for the client, all of this far away from the service code  which will be far more simple and clean.</span></span></p>
<p class="MsoNormal">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml" rel="File-List" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx" rel="themeData" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml" rel="colorSchemeMapping" /><style type="text/css"></style>                            </meta>
</meta>
</meta>
</meta>
</p>
<p class="MsoNormal">&nbsp;</p>
<p><span style="font-family: Tahoma;">
<p class="MsoNormal"><u><span style="font-size: 16pt; line-height: 115%;">Server-Side Handling</span></u></p>
</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">In order to  propagate useful information back to the Flex client when an exception  occurs on the server,      		the original exception must be translated  into an instance of <em><code class="code">flex.messaging.MessageException</code></em>.</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">The translation logic can be provided by implementaion of <em><code class="code">org.springframework.flex.core.ExceptionTranslator </code></em><code class="code">interface.<br />
</code></span></p>
<p class="MsoNormal">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml" rel="File-List" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx" rel="themeData" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml" rel="colorSchemeMapping" /><style type="text/css"></style>                            </meta>
</meta>
</meta>
</meta>
</p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">The custom exception translator role is to extract the Throwable, translate it to MessageException and throw it further.</span></span><span style="font-size: 12pt; line-height: 115%;"><o:p></o:p></span></p>
<p><span style="font-family: Tahoma;">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">This Java class  is part of the BlazeDS and it will be deserialized using  the class  mx.messaging.messages.ErrorMessage (obtained from the  event.message  property).You can add your custom data in the MessageException class  using the extended property.</span></p>
<p class="MsoNormal">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml" rel="File-List" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx" rel="themeData" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml" rel="colorSchemeMapping" /><style type="text/css"></style>                            </meta>
</meta>
</meta>
</meta>
</p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><u><span style="font-size: 16pt; line-height: 115%;">Client-Side Handling</span></u></span><u><span style="font-size: 16pt; line-height: 115%;"><o:p></o:p></span></u><span style="font-family: Tahoma;"><i><span style="font-size: 14pt; line-height: 115%;"><br />
</span></i></span><i><span style="font-size: 14pt; line-height: 115%;"><o:p></o:p></span></i></p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">Enforce the mechanism using Cairngorm MVC Framework.</span></span><span style="font-size: 12pt; line-height: 115%;"><o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">Each  operation in Cairngorm framework(for example) uses the ICommand and the  IResponder interfaces to invoke the server. The IResponder interface  has the fault method in case of errors.</span></span><span style="font-size: 12pt; line-height: 115%;"><o:p></o:p></span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">By  implementing a BaseCommand which all commands will extend. The  BaseCommand will have a default implementation of the fault method. In  case of Error it will invoke the ErrorViewer Component with the relevant  parameters you would like to display to your end users(severity,  message, stack trace...)</span></span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">this code would look like:</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;"><em>&nbsp;&nbsp;&nbsp; public function fault(info:Object):void&nbsp;&nbsp;&nbsp; {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; var event:FaultEvent =&nbsp; FaultEvent(info) ;<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; var em:ErrorMessage = ErrorMessage(event.message);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; //extract extended data parameters <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; var extendedData:HashMap = extractExtendedData(em.extendedData);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; var debugEnabled:Boolean = (String(extendedData.getValue(&quot;debug&quot;))== &quot;true&quot;); <br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; if (em.faultCode==&quot;Channel.Call.Failed&quot;) {<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; errorViewer.show(&quot;Cannot connect to the server &quot;,&quot;&quot;, &quot;&quot;,event.fault.getStackTrace(),false,closeApplication);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }else if (em.faultCode==&quot;Server.Processing.DuplicateSessionDetected&quot;){<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; errorViewer.show(&quot;Your session has expired. \nPlease  login again&quot;, &quot;&quot;,  &quot;&quot;,event.fault.getStackTrace(),false,closeApplication);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }else<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; errorViewer.show(em.faultString,  extendedData.getValue(&quot;severity&quot;), extendedData.getValue(&quot;stackTrace&quot;)  ,debugEnabled);<br />
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }</em></span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">&nbsp;</span></p>
<p class="MsoNormal">
<meta content="text/html; charset=utf-8" http-equiv="Content-Type">
<meta content="Word.Document" name="ProgId">
<meta content="Microsoft Word 12" name="Generator">
<meta content="Microsoft Word 12" name="Originator">
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_filelist.xml" rel="File-List" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_themedata.thmx" rel="themeData" />
<link href="file:///C:%5CUsers%5CYOSSI%7E1.NEE%5CAppData%5CLocal%5CTemp%5Cmsohtmlclip1%5C01%5Cclip_colorschememapping.xml" rel="colorSchemeMapping" /><style type="text/css"></style>                            </meta>
</meta>
</meta>
</meta>
</p>
<p style="" class="MsoNormal rteindent1"><span style="font-family: Tahoma;"><i><span style="font-size: 14pt; line-height: 115%;">ErrorViewer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></i></span><i><span style="font-size: 14pt; line-height: 115%;"><o:p></o:p></span></i></p>
<p class="MsoNormal rteindent3"><span style="font-family: Tahoma;"><span style="font-size: 12pt; line-height: 115%;">Singleton  Flex component composed from pop-up window which will display a human  readable error message. The show method takes the relevant parameters  and display it.</span></span><span style="font-size: 12pt; line-height: 115%;"><o:p></o:p></span></p>
<p><span style="font-family: Tahoma;">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">&nbsp;</span></p>
<p class="MsoNormal"><span style="font-family: Tahoma;">The over-all process in a diagram:</span></p>
<p class="MsoNormal rtecenter"><span style="font-family: Tahoma;"><img alt="" src="file:///C:/Users/YOSSI%7E1.NEE/AppData/Local/Temp/moz-screenshot.png" /></span><img height="413" width="422" src="/files/Capture.PNG" alt="" /></p>
<p class="MsoNormal"><span style="font-size: 12pt; line-height: 115%;"><br />
<o:p></o:p></span></p>
<p>&nbsp;</p>
<p><span style="font-size: 12pt; line-height: 115%;"><o:p></o:p></span></p>
<p>&nbsp;</p>
