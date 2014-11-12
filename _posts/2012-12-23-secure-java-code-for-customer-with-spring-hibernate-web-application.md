---
layout: post
title: Secure Java code for customer with Spring/Hibernate web application
created: 1356256251
author: yanai
permalink: /devops/secure-java-code-customer-springhibernate-web-application
tags:
- DevOps
- Obfuscation Java code
---
<p>&nbsp;<span style="font-size: 9pt; line-height: 0.47cm;">Hi,</span></p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;">&nbsp;</p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;"><font color="#666666"><font face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><font size="2" style="font-size: 9pt">One of our customers needs to protect his code as much as possible - I know that in Java there is no 100% encryption protection, but they are OK, if at least we bring higher the code security barrier, i.e. with obfuscation that works on server web application. </font></font></font></p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;"><font color="#666666"><font face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><font size="2" style="font-size: 9pt">Does anyone recommend from his experience on a good tool (either open source or not, free or commercial), which can do the job  (i.e. <a href="http://proguard.sourceforge.net/">Proguard</a> can't do it since it uses simple Java reflection)?</font></font></font></p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;"><font color="#666666"><font face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><font size="2" style="font-size: 9pt">The product is a full web application (heavy usage of Spring/Hibernate based) that runs in Tomcat on Linux 64 , and we build it with Maven, so it would be an advantage if the tool will be integrated as part of the build process. We saw <a href="http://www.componio.com/products/jinstaller/jinstaller_secure_edition/">this product</a>, but we are totally unsure it can work for the requirements above. </font></font></font></p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;">&nbsp;</p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;"><font color="#666666"><font face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><font size="2" style="font-size: 9pt">Do you have any good experience with any product that can work for us ? </font></font></font></p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;">&nbsp;</p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;">&nbsp;</p>
<p style="margin-bottom: 0cm; border: none; padding: 0cm; line-height: 0.47cm;"><font color="#666666"><font face="Tahoma, Verdana, Arial, Helvetica, sans-serif"><font size="2" style="font-size: 9pt">Thanks,</font></font></font></p>
<p>&nbsp;</p>
