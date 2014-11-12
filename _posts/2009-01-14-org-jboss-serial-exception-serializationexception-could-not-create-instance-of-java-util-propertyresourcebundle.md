---
layout: post
title: 'org.jboss.serial.exception.SerializationException: Could not create instance
  of java.util.PropertyResourceBundle'
created: 1231938350
permalink: org-jboss-serial-exception-serializationexception-could-not-create-instance-of-java-util-propertyresourcebundle
tags:
- JAVA
---
<pre>
Hi,
When the @Destroy method of our SEAM beans is invoked, the following execption is thrown. The bottom line is that somewhere there is a reference to 
java.util.PropertyResourceBundle classs which is not serializable. I checked and 
re-checked our code and we have no reference to a PropertyResourceBundle, so i guess it has to be in a third party library. 
Any ideas about how to tackle this issue? I debugged and caught the exception but couldn't trace down the class which had a reference to it. 

Thanks, 

 
2009-01-11 13:18:10,543 WARN [org.jboss.seam.Component] Exception calling component @Destroy method: Neo_SyslogServerAction
java.lang.RuntimeException: java.lang.RuntimeException: java.io.IOException
at org.jboss.ejb3.interceptor.LifecycleInterceptorHandler.postActivate(LifecycleInterceptorHandler.java:152)
at org.jboss.ejb3.stateful.StatefulContainer.invokePostActivate(StatefulContainer.java:400)
</pre><pre>
Hi,
When the @Destroy method of our SEAM beans is invoked, the following execption is thrown. The bottom line is that somewhere there is a reference to 
java.util.PropertyResourceBundle classs which is not serializable. I checked and 
re-checked our code and we have no reference to a PropertyResourceBundle, so i guess it has to be in a third party library. 
Any ideas about how to tackle this issue? I debugged and caught the exception but couldn't trace down the class which had a reference to it. 

Thanks, 

 
2009-01-11 13:18:10,543 WARN [org.jboss.seam.Component] Exception calling component @Destroy method: Neo_SyslogServerAction
java.lang.RuntimeException: java.lang.RuntimeException: java.io.IOException
at org.jboss.ejb3.interceptor.LifecycleInterceptorHandler.postActivate(LifecycleInterceptorHandler.java:152)
at org.jboss.ejb3.stateful.StatefulContainer.invokePostActivate(StatefulContainer.java:400)
at org.jboss.ejb3.stateful.StatefulBeanContext.postActivate(StatefulBeanContext.java:381)
at org.jboss.ejb3.cache.simple.StatefulSessionFilePersistenceManager.activateSession(StatefulSessionFilePersistenceManager.java:316)
at org.jboss.ejb3.cache.simple.SimpleStatefulCache.get(SimpleStatefulCache.java:387)
at org.jboss.ejb3.cache.simple.SimpleStatefulCache.get(SimpleStatefulCache.java:375)
at org.jboss.ejb3.stateful.StatefulInstanceInterceptor.invoke(StatefulInstanceInterceptor.java:61)
at org.jboss.aop.joinpoint.MethodInvocation.invokeNext(MethodInvocation.java:101)
at org.jboss.ejb3.stateful.StatefulRemoveInterceptor.invoke(StatefulRemoveInterceptor.java:97)
at org.jboss.aop.joinpoint.MethodInvocation.invokeNext(MethodInvocation.java:101)
at org.jboss.aspects.security.AuthenticationInterceptor.invoke(AuthenticationInterceptor.java:77)
at org.jboss.ejb3.security.Ejb3AuthenticationInterceptor.invoke(Ejb3AuthenticationInterceptor.java:106)
at org.jboss.aop.joinpoint.MethodInvocation.invokeNext(MethodInvocation.java:101)
at org.jboss.ejb3.ENCPropagationInterceptor.invoke(ENCPropagationInterceptor.java:46)
at org.jboss.aop.joinpoint.MethodInvocation.invokeNext(MethodInvocation.java:101)
at org.jboss.ejb3.asynchronous.AsynchronousInterceptor.invoke(AsynchronousInterceptor.java:106)
at org.jboss.aop.joinpoint.MethodInvocation.invokeNext(MethodInvocation.java:101)
at org.jboss.ejb3.stateful.StatefulContainer.localInvoke(StatefulContainer.java:204)
at org.jboss.ejb3.stateful.StatefulLocalProxy.invoke(StatefulLocalProxy.java:100)
at $Proxy409.destroy(Unknown Source)
at sun.reflect.GeneratedMethodAccessor1037.invoke(Unknown Source)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:585)
at org.jboss.seam.util.Reflections.invoke(Reflections.java:21)
at org.jboss.seam.intercept.RootInvocationContext.proceed(RootInvocationContext.java:31)
at org.jboss.seam.intercept.ClientSideInterceptor$1.proceed(ClientSideInterceptor.java:76)
at org.jboss.seam.intercept.SeamInvocationContext.proceed(SeamInvocationContext.java:56)
at org.jboss.seam.security.SecurityInterceptor.aroundInvoke(SecurityInterceptor.java:40)
at org.jboss.seam.intercept.SeamInvocationContext.proceed(SeamInvocationContext.java:68)
at org.jboss.seam.ejb.RemoveInterceptor.aroundInvoke(RemoveInterceptor.java:41)
at org.jboss.seam.intercept.SeamInvocationContext.proceed(SeamInvocationContext.java:68)
at org.jboss.seam.intercept.RootInterceptor.invoke(RootInterceptor.java:106)
at org.jboss.seam.intercept.ClientSideInterceptor.invoke(ClientSideInterceptor.java:54)
at org.javassist.tmp.java.lang.Object_$$_javassist_27.destroy(Object_$$_javassist_27.java)
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:585)
at org.jboss.seam.util.Reflections.invoke(Reflections.java:21)
at org.jboss.seam.util.Reflections.invokeAndWrap(Reflections.java:125)
at org.jboss.seam.Component.callComponentMethod(Component.java:2074)
at org.jboss.seam.Component.callDestroyMethod(Component.java:2005)
at org.jboss.seam.Component.destroy(Component.java:1323)
at org.jboss.seam.contexts.Contexts.destroy(Contexts.java:251)
at org.jboss.seam.contexts.Contexts.destroyConversationContext(Contexts.java:413)
at org.jboss.seam.contexts.Lifecycle.endSession(Lifecycle.java:236)
at org.jboss.seam.contexts.ServletLifecycle.endSession(ServletLifecycle.java:129)
at org.jboss.seam.servlet.SeamListener.sessionDestroyed(SeamListener.java:49)
at org.apache.catalina.session.StandardSession.expire(StandardSession.java:702)
at org.apache.catalina.session.StandardSession.isValid(StandardSession.java:592)
at org.apache.catalina.session.ManagerBase.processExpires(ManagerBase.java:682)
at org.apache.catalina.session.ManagerBase.backgroundProcess(ManagerBase.java:667)
at org.apache.catalina.core.ContainerBase.backgroundProcess(ContainerBase.java:1286)
at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1571)
at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1580)
at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.processChildren(ContainerBase.java:1580)
at org.apache.catalina.core.ContainerBase$ContainerBackgroundProcessor.run(ContainerBase.java:1560)
at java.lang.Thread.run(Thread.java:595)
Caused by: java.lang.RuntimeException: java.io.IOException
at org.jboss.ejb3.stateful.StatefulBeanContext.extractBeanAndInterceptors(StatefulBeanContext.java:809)
at org.jboss.ejb3.stateful.StatefulBeanContext.getInterceptorInstances(StatefulBeanContext.java:768)
at org.jboss.ejb3.interceptor.LifecycleInvocationContextImpl.getLifecycleInvocationContext(LifecycleInvocationContextImpl.java:65)
at org.jboss.ejb3.interceptor.LifecycleInterceptorHandler.postActivate(LifecycleInterceptorHandler.java:143)
... 57 more
Caused by: java.io.IOException
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithMethod(RegularObjectPersister.java:107)
at org.jboss.serial.persister.RegularObjectPersister.defaultRead(RegularObjectPersister.java:269)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:241)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithFields(RegularObjectPersister.java:353)
at org.jboss.serial.persister.RegularObjectPersister.defaultRead(RegularObjectPersister.java:273)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:241)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithFields(RegularObjectPersister.java:353)
at org.jboss.serial.persister.RegularObjectPersister.defaultRead(RegularObjectPersister.java:273)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:241)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.ArrayPersister.readObjectArray(ArrayPersister.java:196)
at org.jboss.serial.persister.ArrayPersister.readData(ArrayPersister.java:172)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.io.JBossObjectInputStream.readObjectOverride(JBossObjectInputStream.java:163)
at java.io.ObjectInputStream.readObject(ObjectInputStream.java:342)
at org.jboss.serial.io.MarshalledObject.get(MarshalledObject.java:68)
at org.jboss.ejb3.stateful.StatefulBeanContext.extractBeanAndInterceptors(StatefulBeanContext.java:780)
... 60 more
Caused by: java.lang.reflect.InvocationTargetException
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:585)
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithMethod(RegularObjectPersister.java:103)
... 86 more
Caused by: java.io.IOException
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithMethod(RegularObjectPersister.java:107)
at org.jboss.serial.persister.RegularObjectPersister.defaultRead(RegularObjectPersister.java:269)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:241)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithFields(RegularObjectPersister.java:353)
at org.jboss.serial.persister.RegularObjectPersister.defaultRead(RegularObjectPersister.java:273)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:241)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.ObjectInputStreamProxy.readObjectOverride(ObjectInputStreamProxy.java:68)
at java.io.ObjectInputStream.readObject(ObjectInputStream.java:342)
at java.util.concurrent.ConcurrentHashMap.readObject(ConcurrentHashMap.java:1409)
... 91 more
Caused by: java.lang.reflect.InvocationTargetException
at sun.reflect.GeneratedMethodAccessor1254.invoke(Unknown Source)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:585)
at org.jboss.serial.persister.RegularObjectPersister.readSlotWithMethod(RegularObjectPersister.java:103)
... 105 more
Caused by: org.jboss.serial.exception.SerializationException: Could not create instance of java.util.PropertyResourceBundle - java.util.PropertyResourceBundle
at org.jboss.serial.classmetamodel.ClassMetaData.newInstance(ClassMetaData.java:342)
at org.jboss.serial.persister.RegularObjectPersister.readData(RegularObjectPersister.java:239)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.readObjectDescriptionFromStreaming(ObjectDescriptorFactory.java:412)
at org.jboss.serial.objectmetamodel.ObjectDescriptorFactory.objectFromDescription(ObjectDescriptorFactory.java:82)
at org.jboss.serial.objectmetamodel.DataContainer$DataContainerDirectInput.readObject(DataContainer.java:643)
at org.jboss.serial.persister.ObjectInputStreamProxy.readObjectOverride(ObjectInputStreamProxy.java:68)
at java.io.ObjectInputStream.readObject(ObjectInputStream.java:342)
at java.util.ArrayList.readObject(ArrayList.java:591)
... 109 more
Caused by: java.lang.InstantiationException: java.util.PropertyResourceBundle
at java.lang.Class.newInstance0(Class.java:335)
at java.lang.Class.newInstance(Class.java:303)
at org.jboss.serial.classmetamodel.ClassMetaData.newInstance(ClassMetaData.java:334</pre><p>&nbsp;</p>
