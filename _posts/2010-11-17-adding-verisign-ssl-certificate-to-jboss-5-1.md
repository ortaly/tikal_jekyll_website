---
layout: post
title: Adding Verisign SSL Certificate to JBoss 5.1
created: 1289980741
author: admin
permalink: /java/forums/adding-verisign-ssl-certificate-jboss-51
tags:
- JAVA
- Jboss SSL
---
<p>Our web application is sending the https request to an external service. We created a keystore with the relevant certificate inside. We located it to${jboss.server.home.dir}/conf/my.jks passing it to the application using -Djavax.net.ssl.trustStore=d:\jboss-5.1.0.GA\server\default\conf\my.jks-Djavax.net.ssl.trustStorePassword=password.</p>
<p>After all&nbsp; we&#39;re getting the following exception during the runtime:</p>
<p>&nbsp;</p>
<p>&nbsp;&nbsp;&nbsp; javax.net.ssl.SSLException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty<br />
	AxisFault<br />
	&nbsp;faultCode: {http://schemas.xmlsoap.org/soap/envelope/}Server.userException<br />
	&nbsp;faultSubcode:<br />
	&nbsp;faultString: javax.net.ssl.SSLException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty<br />
	&nbsp;faultActor:<br />
	&nbsp;faultNode:<br />
	&nbsp;faultDetail:<br />
	&nbsp;&nbsp;&nbsp; {http://xml.apache.org/axis/}stackTrace:javax.net.ssl.SSLException: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.Alerts.getSSLException(Alerts.java:190)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1611)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1574)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.handleException(SSLSocketImpl.java:1557)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1146)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1123)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.components.net.JSSESocketFactory.create(JSSESocketFactory.java:186)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.transport.http.HTTPSender.getSocket(HTTPSender.java:191)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.transport.http.HTTPSender.writeToSocket(HTTPSender.java:404)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.transport.http.HTTPSender.invoke(HTTPSender.java:138)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.strategies.InvocationStrategy.visit(InvocationStrategy.java:32)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.SimpleChain.doVisiting(SimpleChain.java:118)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.SimpleChain.invoke(SimpleChain.java:83)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.AxisClient.invoke(AxisClient.java:165)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.Call.invokeEngine(Call.java:2784)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.Call.invoke(Call.java:2767)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.Call.invoke(Call.java:2443)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.Call.invoke(Call.java:2366)<br />
	&nbsp;&nbsp;&nbsp; at org.apache.axis.client.Call.invoke(Call.java:1812)<br />
	&nbsp;&nbsp;&nbsp; at com.passmarksecurity.efn.ws.client.EFraudNetworkStub.updateRiskData(EFraudNetworkStub.java:245)<br />
	&nbsp;&nbsp;&nbsp; at com.passmarksecurity.efn.BasicEfnClient.updateRiskDataService(BasicEfnClient.java:216)<br />
	&nbsp;&nbsp;&nbsp; at com.passmarksecurity.efn.BasicEfnClient.updateLocalRiskData(BasicEfnClient.java:256)<br />
	&nbsp;&nbsp;&nbsp; at com.passmarksecurity.efn.scheduler.EfnScheduler.process(EfnScheduler.java:35)<br />
	&nbsp;&nbsp;&nbsp; at com.rsa.csd.scheduler.BatchJobWrapper.process(BatchJobWrapper.java:99)<br />
	&nbsp;&nbsp;&nbsp; at com.rsa.csd.scheduler.BatchJobWrapper.executeInternal(BatchJobWrapper.java:83)<br />
	&nbsp;&nbsp;&nbsp; at org.springframework.scheduling.quartz.QuartzJobBean.execute(QuartzJobBean.java:86)<br />
	&nbsp;&nbsp;&nbsp; at org.quartz.core.JobRunShell.run(JobRunShell.java:203)<br />
	&nbsp;&nbsp;&nbsp; at org.quartz.simpl.SimpleThreadPool$WorkerThread.run(SimpleThreadPool.java:520)<br />
	Caused by: java.lang.RuntimeException: Unexpected error: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty<br />
	&nbsp;&nbsp;&nbsp; at sun.security.validator.PKIXValidator.&amp;lt;init&amp;gt;(PKIXValidator.java:59)<br />
	&nbsp;&nbsp;&nbsp; at sun.security.validator.Validator.getInstance(Validator.java:161)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.getValidator(X509TrustManagerImpl.java:108)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:204)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:249)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1014)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:124)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.Handshaker.processLoop(Handshaker.java:516)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.Handshaker.process_record(Handshaker.java:454)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:884)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1112)<br />
	&nbsp;&nbsp;&nbsp; at com.sun.net.ssl.internal.ssl.SSLSocketImpl.startHandshake(SSLSocketImpl.java:1139)<br />
	&nbsp;&nbsp;&nbsp; ... 23 more<br />
	Caused by: java.security.InvalidAlgorithmParameterException: the trustAnchors parameter must be non-empty<br />
	&nbsp;&nbsp;&nbsp; at java.security.cert.PKIXParameters.setTrustAnchors(PKIXParameters.java:183)<br />
	&nbsp;&nbsp;&nbsp; at java.security.cert.PKIXParameters.&amp;lt;init&amp;gt;(PKIXParameters.java:103)<br />
	&nbsp;&nbsp;&nbsp; at java.security.cert.PKIXBuilderParameters.&amp;lt;init&amp;gt;(PKIXBuilderParameters.java:87)<br />
	&nbsp;&nbsp;&nbsp; at sun.security.validator.PKIXValidator.&amp;lt;init&amp;gt;(PKIXValidator.java:57)<br />
	&nbsp;&nbsp;&nbsp; ... 34 more<br />
	&nbsp;</p>
<p>The standalone command-line client on the same environment is running without any problem (even without the certificate).</p>
<p>Environent details: JBoss 5.1.0.GA on WIN2008R2</p>
<p>&nbsp;</p>
<p>Please, advise.</p>
