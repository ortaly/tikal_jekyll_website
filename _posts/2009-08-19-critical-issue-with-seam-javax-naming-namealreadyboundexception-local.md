---
layout: post
title: 'Critical issue with Seam- javax.naming.NameAlreadyBoundException: local '
created: 1250670444
permalink: critical-issue-with-seam-javax-naming-namealreadyboundexception-local
tags:
- JAVA
- seam
---
<p>Urgent help needed ... after an upgrade to GA5.1 .</p>
<p>&nbsp;</p>
<p>Two EAR's each of which has the jboss-seam jar in its /lib directory and EAR isolation level is globally set to true (e.g. should have its own classloader). Both are also utilizing quartz version 1.5.2.</p>
<p>&nbsp;</p>
<p>Urgent help needed ... after an upgrade to GA5.1 .</p>
<p></p>
<p>Two EAR's each of which has the jboss-seam jar in its /lib directory and EAR isolation level is globally set to true (e.g. should have its own classloader). Both are also utilizing quartz version 1.5.2.</p>
<p></p>
<pre class="brush: java">
2009-08-19 11:15:03,593 ERROR [org.jboss.kernel.plugins.dependency.AbstractKernelController] Error installing to Start: name=jboss.j2ee:ear=xxx-app.ear,jar=xxx-app.ear,name=TimerServiceDispatcher,service=EJB3 state=Create
java.lang.RuntimeException: Could not bind Reference Class Name: Proxy for: org.jboss.seam.async.LocalTimerServiceDispatcher
Type: ProxyFactoryKey
Content: ProxyFactory/xxx-app/TimerServiceDispatcher/TimerServiceDispatcher/local
Type: EJB Container Name
Content: jboss.j2ee:ear=xxx-app.ear,jar=xxx-app.ear,name=TimerServiceDispatcher,service=EJB3
Type: Proxy Factory is Local
Content: true
Type: Local Business Interface
Content: org.jboss.seam.async.LocalTimerServiceDispatcher
 into JNDI at "TimerServiceDispatcher/local"
        at org.jboss.ejb3.proxy.impl.jndiregistrar.JndiSessionRegistrarBase.bind(JndiSessionRegistrarBase.java:915)
        at org.jboss.ejb3.proxy.impl.jndiregistrar.JndiSessionRegistrarBase.bind(JndiSessionRegistrarBase.java:895)
        at org.jboss.ejb3.proxy.impl.jndiregistrar.JndiSessionRegistrarBase.bind(JndiSessionRegistrarBase.java:884)
        at org.jboss.ejb3.proxy.impl.jndiregistrar.JndiSessionRegistrarBase.bindEjb(JndiSessionRegistrarBase.java:151)
        at org.jboss.ejb3.session.SessionContainer.lockedStart(SessionContainer.java:210)
        at org.jboss.ejb3.session.SessionSpecContainer.lockedStart(SessionSpecContainer.java:577)
        at org.jboss.ejb3.stateless.StatelessContainer.lockedStart(StatelessContainer.java:192)
        at org.jboss.ejb3.EJBContainer.start(EJBContainer.java:884)
        at sun.reflect.GeneratedMethodAccessor299.invoke(Unknown Source)
        at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
        at java.lang.reflect.Method.invoke(Method.java:597)
        at org.jboss.reflect.plugins.introspection.ReflectionUtils.invoke(ReflectionUtils.java:59)
        at org.jboss.reflect.plugins.introspection.ReflectMethodInfoImpl.invoke(ReflectMethodInfoImpl.java:150)
        at org.jboss.joinpoint.plugins.BasicMethodJoinPoint.dispatch(BasicMethodJoinPoint.java:66)
        at org.jboss.kernel.plugins.dependency.KernelControllerContextAction$JoinpointDispatchWrapper.execute(KernelControllerContextAction.java:241)
        at org.jboss.kernel.plugins.dependency.ExecutionWrapper.execute(ExecutionWrapper.java:47)
        at org.jboss.kernel.plugins.dependency.KernelControllerContextAction.dispatchExecutionWrapper(KernelControllerContextAction.java:109)
        at org.jboss.kernel.plugins.dependency.KernelControllerContextAction.dispatchJoinPoint(KernelControllerContextAction.java:70)
        at org.jboss.kernel.plugins.dependency.LifecycleAction.installActionInternal(LifecycleAction.java:221)
        at org.jboss.kernel.plugins.dependency.InstallsAwareAction.installAction(InstallsAwareAction.java:54)
        at org.jboss.kernel.plugins.dependency.InstallsAwareAction.installAction(InstallsAwareAction.java:42)
        at org.jboss.dependency.plugins.action.SimpleControllerContextAction.simpleInstallAction(SimpleControllerContextAction.java:62)
        at org.jboss.dependency.plugins.action.AccessControllerContextAction.install(AccessControllerContextAction.java:71)
        at org.jboss.dependency.plugins.AbstractControllerContextActions.install(AbstractControllerContextActions.java:51)
        at org.jboss.dependency.plugins.AbstractControllerContext.install(AbstractControllerContext.java:348)
        at org.jboss.dependency.plugins.AbstractController.install(AbstractController.java:1631)
        at org.jboss.dependency.plugins.AbstractController.incrementState(AbstractController.java:934)
        at org.jboss.dependency.plugins.AbstractController.resolveContexts(AbstractController.java:1082)
        at org.jboss.dependency.plugins.AbstractController.resolveContexts(AbstractController.java:984)
        at org.jboss.dependency.plugins.AbstractController.install(AbstractController.java:774)
        at org.jboss.dependency.plugins.AbstractController.install(AbstractController.java:540)
        at org.jboss.deployers.vfs.deployer.kernel.BeanMetaDataDeployer.deploy(BeanMetaDataDeployer.java:121)
        at org.jboss.deployers.vfs.deployer.kernel.BeanMetaDataDeployer.deploy(BeanMetaDataDeployer.java:51)
        at org.jboss.deployers.spi.deployer.helpers.AbstractSimpleRealDeployer.internalDeploy(AbstractSimpleRealDeployer.java:62)
        at org.jboss.deployers.spi.deployer.helpers.AbstractRealDeployer.deploy(AbstractRealDeployer.java:50)
        at org.jboss.deployers.plugins.deployers.DeployerWrapper.deploy(DeployerWrapper.java:171)
        at org.jboss.deployers.plugins.deployers.DeployersImpl.doDeploy(DeployersImpl.java:1439)
        at org.jboss.deployers.plugins.deployers.DeployersImpl.doInstallParentFirst(DeployersImpl.java:1157)
        at org.jboss.deployers.plugins.deployers.DeployersImpl.doInstallParentFirst(DeployersImpl.java:1178)
        at org.jboss.deployers.plugins.deployers.DeployersImpl.install(DeployersImpl.java:1098)
        at org.jboss.dependency.plugins.AbstractControllerContext.install(AbstractControllerContext.java:348)
        at org.jboss.dependency.plugins.AbstractController.install(AbstractController.java:1631)
        at org.jboss.dependency.plugins.AbstractController.incrementState(AbstractController.java:934)
        at org.jboss.dependency.plugins.AbstractController.resolveContexts(AbstractController.java:1082)
        at org.jboss.dependency.plugins.AbstractController.resolveContexts(AbstractController.java:984)
        at org.jboss.dependency.plugins.AbstractController.change(AbstractController.java:822)
        at org.jboss.dependency.plugins.AbstractController.change(AbstractController.java:553)
        at org.jboss.deployers.plugins.deployers.DeployersImpl.process(DeployersImpl.java:781)
        at org.jboss.deployers.plugins.main.MainDeployerImpl.process(MainDeployerImpl.java:702)
        at org.jboss.system.server.profileservice.repository.MainDeployerAdapter.process(MainDeployerAdapter.java:117)
        at org.jboss.system.server.profileservice.hotdeploy.HDScanner.scan(HDScanner.java:362)
        at org.jboss.system.server.profileservice.hotdeploy.HDScanner.run(HDScanner.java:255)
        at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:441)
        at java.util.concurrent.FutureTask$Sync.innerRunAndReset(FutureTask.java:317)
        at java.util.concurrent.FutureTask.runAndReset(FutureTask.java:150)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.access$101(ScheduledThreadPoolExecutor.java:98)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.runPeriodic(ScheduledThreadPoolExecutor.java:181)
        at java.util.concurrent.ScheduledThreadPoolExecutor$ScheduledFutureTask.run(ScheduledThreadPoolExecutor.java:205)
        at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
        at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
        at java.lang.Thread.run(Thread.java:619)
Caused by: javax.naming.NameAlreadyBoundException: local
        at org.jnp.server.NamingServer.bind(NamingServer.java:209)
        at org.jnp.server.NamingServer.bind(NamingServer.java:167)
        at org.jnp.interfaces.NamingContext.bind(NamingContext.java:650)
        at org.jnp.interfaces.NamingContext.bind(NamingContext.java:611)
        at org.jboss.util.naming.Util.bind(Util.java:105)
        at org.jboss.util.naming.Util.bind(Util.java:91)
        at org.jboss.ejb3.proxy.impl.jndiregistrar.JndiSessionRegistrarBase.bind(JndiSessionRegistrarBase.java:910)
        ... 60 more
2009-08-19 11:15:03,811 ERROR [org.jboss.kernel.plugins.dependency.AbstractKernelController] Error installing to Start: name=jboss.j2ee:ear=xxx.ear,jar=xpr-cms-app.ear,name=EjbSynchronizations,service=EJB3 state=Create
java.lang.RuntimeException: Could not bind Reference Class Name: Proxy for: org.jboss.seam.transaction.LocalEjbSynchronizations
Type: ProxyFactoryKey
Content: ProxyFactory/xxx-app/EjbSynchronizations/EjbSynchronizations/local
Type: EJB Container Name
Content: jboss.j2ee:ear=xxx-app.ear,jar=xxx-app.ear,name=EjbSynchronizations,service=EJB3
Type: Proxy Factory is Local
Content: true
Type: Local Business Interface
Content: org.jboss.seam.transaction.LocalEjbSynchronizations
 into JNDI at "EjbSynchronizations/local"
 
</pre>
