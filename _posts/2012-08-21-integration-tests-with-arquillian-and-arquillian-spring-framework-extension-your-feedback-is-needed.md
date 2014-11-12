---
layout: post
title: Integration tests with Arquillian and Arquillian Spring Framework Extension
  - Your feedback is needed
created: 1345538474
permalink: integration-tests-with-arquillian-and-arquillian-spring-framework-extension-your-feedback-is-needed
tags:
- JAVA
- JUnit
---
<p>&nbsp;</p>
<div>I would like to set up an infrastructure for integration testing. <br />
Currently we bootstrap tomcat using maven and then execute httpunit tests.</div>
<div>But the current solution has few drawbacks.</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">1.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Any changes committed to the database need to be rollback manually in the end if the test</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">2.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Running code coverage on integration test is not straight forward (we are using sonar).</div>
<div>My goals are</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">1.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Allow automatic rollback between tests (hopefully using String @transaction &nbsp;and @rollback)</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">2.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Simple straight forward &nbsp;code coverage</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">3.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Using @RunWith that will bootstrap the system from JUnit and not externally</div>
<div style="margin-left:20.5pt;text-indent:-.25in;">4.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Interacting with live servlets and javascript (I consider switching from httpuinit to selenium&hellip;<span dir="RTL">(</span></div>
<div style="margin-left:20.5pt;text-indent:-.25in;">5.<span style="font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Reasonable execution time (at least not longer than the existing execution time) &nbsp;&nbsp;&nbsp;</div>
<div>I was thinking to achieve those goals by using Arquillian and Arquillian Spring Framework Extension component.</div>
<div>See also <a href="https://github.com/arquillian/arquillian-showcase/">https://github.com/arquillian/arquillian-showcase/</a></div>
<div>&nbsp;</div>
<div>Does anyone have any experience with Arquillian and with Arquillian Spring Framework Extension?<br />
Can anyone suggest an alternative approach to the above?</div>
<div>&nbsp;</div>
<div>Regards <br />
Haim</div>
<p>&nbsp;</p>
