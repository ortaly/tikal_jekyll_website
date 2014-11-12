---
layout: post
title: Keep WCF Client Configuration in a Class Library app.config
created: 1344499700
author: amiram
permalink: /net/keep-wcf-client-configuration-class-library-appconfig
tags:
- .NET
---
<p>When building a WCF client with Visual Studio with the simple “Add Service Reference” feature, you get your client configuration (<strong>system.serviceModel</strong> section) in your app.config file. If the project that holds the config file is an application (Winform, WPF, ASP.NET etc.) then probably you’re just in the demo phase. Usually you have several projects that need to call the service, and you don’t want to add the service references in each. Also, you don’t want to bind all other project to the WCF technology, so you want them to call a library that communicates with the WCF service.</p>
<p>After creating you class library with the service references and app.config file, you can create a layer over the service calls like that:</p>
<p> </p><pre class="crayon-plain-tag">// Service code
[ServiceContract]
public interface IService1
{
	[OperationContract]
	string GetData(int value);
}

// Client code
public class Service1Agent
{
	public static int GetData(string value)
	{
		using (var client = new Service1Client())
		{
			return client.GetData(value);
		}
	}
}</pre><p></p>
<p>Now any call to the WCF service is unaware of the WCF technology:</p>
<p></p><pre class="crayon-plain-tag">var result = Service1Agent.GetData(5);</pre><p></p>
<p>When running this simple and “obviously should work” code, you’ll get the following famous exception:</p>
<blockquote>
<p>Could not find default endpoint element that references contract ‘Service1.IService1′ in the ServiceModel client configuration section. This might be because no configuration file was found for your application, or because no endpoint element matching this contract could be found in the client element.</p>
</blockquote>
<p>The reason for that is simple. Class libraries don’t have a configuration file of their own in run-time and they rely on the configuration file of the app they run within. You end up copying the <strong>system.serviceModel</strong> section to the app.config or web.config of your application and also to your tests project (as said <a href="http://stackoverflow.com/questions/3814319/reason-of-this-exception-in-wcf" target="_blank">here</a> and <a href="http://stackoverflow.com/a/2737593/1495902" target="_blank">here</a>). Although you might accept the duty to do it every time your class library config file gets updated (adding service reference, changing address, changing security etc.), there are scenarios this is not acceptable, for example when you develop your <strong>ServiceAgent</strong> project for an existing product that you’re not allowed to edit its application config file.</p>
<p>Although this is a very famous issue, there are not many solutions for that (except to copy). Possible solution to the problem you can find <a href="http://weblogs.asp.net/cibrax/archive/2007/10/19/loading-the-wcf-configuration-from-different-files-on-the-client-side.aspx" target="_blank">here</a>, however the code that generates the client is very complicated. A better solution can be found <a href="http://blogs.msdn.com/b/youssefm/archive/2010/09/02/loading-wcf-client-configuration-from-different-files-with-configurationchannelfactory.aspx" target="_blank">here</a>, but it assumes that you know the endpoint name and it is hard-coded.</p>
<p>My solution is based on the latter, but is dynamic. Microsoft added a new class in .NET 4 called <a href="http://msdn.microsoft.com/en-us/library/dd575311.aspx" target="_blank">ConfigurationChannelFactory</a>. This class allows you to create a channel with custom configuration source, for example:</p>
<p></p><pre class="crayon-plain-tag">var channelFactory = new ConfigurationChannelFactory<IService1Channel>(endpointName, configuration, null);
var client = channelFactory.CreateChannel();
var result = client.GetData(5);</pre><p></p>
<p>For the above code to work, you need to load your configuration and know the endpoint name. Loading the configuration from file is easy with the <a href="http://msdn.microsoft.com/en-us/library/ms134269.aspx" target="_blank">ConfigurationManager.OpenMappedExeConfiguration</a> method:</p>
<p></p><pre class="crayon-plain-tag">var configuration = ConfigurationManager.OpenMappedExeConfiguration(
                             new ExeConfigurationFileMap 
		             { 
                                 ExeConfigFilename = "app.config" 
                             }, ConfigurationUserLevel.None);</pre><p></p>
<p>The app.config file is the class library config file. You can have it copied to the application output directory by setting “Copy To Output Directory” to “Copy always” in the file properties.</p>
<p>As for the endpoint name, in order not to make a switch-case for all service reference? you got, you need to find it in the config file. In the config file the endpoint may appear like that:</p>
<p></p><pre class="crayon-plain-tag"><endpoint address="http://localhost:12345/Service1.svc"
	binding="basicHttpBinding" 
	bindingConfiguration="BasicHttpBinding_IService1"
	contract="Service1.IService1"
	name="BasicHttpBinding_IService1" /></pre><p></p>
<p>Knowing the contract name can help you find the endpoint name. The interface hierarchy in the generated client code is:</p>
<p><a href="http://linqto.net/blog/wp-content/uploads/2012/08/capture.png"><img class="alignnone size-medium wp-image-107" title="Interfaces" alt="" src="http://i2.wp.com/linqto.net/blog/wp-content/uploads/2012/08/capture.png?resize=144%2C300"  data-recalc-dims="1"></a></p>
<p>With an instance of <strong>IService1Channel</strong> you can call the service and close connection since it is <strong>IDisposable</strong>, so this is the type you should pass as the generic <strong>T</strong> parameter to the <strong>ConfigurationChannelFactory</strong> constructor.</p>
<p>The interface <strong>IService1</strong> has an attribute with the <strong>ConfigurationName </strong>that corresponds to the <strong>contract</strong><strong> </strong>attribute value in the config file:</p>
<p></p><pre class="crayon-plain-tag">[System.ServiceModel.ServiceContractAttribute(ConfigurationName="Service1.IService1")]
public interface IService1
{
}</pre><p></p>
<p>In order to find this attribute we can find the interface that <strong>IService1Channel</strong> inherits from and find the attribute with <strong>GetCustomAttributes:</strong></p>
<p></p><pre class="crayon-plain-tag">var channelType = typeof(T);
var contractType = channelType.GetInterfaces().First(i => i.Namespace == channelType.Namespace);
// We compare the namespace because the inteface inherits also from System.ServiceModel.IClientChannel
var contractAttribute = contractType.GetCustomAttributes(typeof(ServiceContractAttribute), false).First() as ServiceContractAttribute;</pre><p></p>
<p>With the configuration and the contract name you can find the endpoint:</p>
<p></p><pre class="crayon-plain-tag">var serviceModelSectionGroup = ServiceModelSectionGroup.GetSectionGroup(configuration);
var endpoint = serviceModelSectionGroup.Client.Endpoints.OfType<ChannelEndpointElement>().First(e => e.Contract == contractAttribute.ConfigurationName);</pre><p></p>
<p>All above code is making the complete client generation helper method:</p>
<p></p><pre class="crayon-plain-tag">public static T GetClient<T>() where T : IClientChannel
{
	var channelType = typeof(T);
	var contractType = channelType.GetInterfaces().First(i => i.Namespace == channelType.Namespace);
	var contractAttribute = contractType.GetCustomAttributes(typeof(ServiceContractAttribute), false)
                                                 .First() as ServiceContractAttribute;
	
	var configuration = ConfigurationManager.OpenMappedExeConfiguration(
            new ExeConfigurationFileMap 
            { 
                ExeConfigFilename = "app.config" 
            }, ConfigurationUserLevel.None);
	var serviceModelSectionGroup = ServiceModelSectionGroup.GetSectionGroup(configuration);
	var endpoint = serviceModelSectionGroup.Client.Endpoints.OfType<ChannelEndpointElement>()
                          .First(e = e.Contract == contractAttribute.ConfigurationName);
	var channelFactory = new ConfigurationChannelFactory<T>(endpoint.Name, configuration, null);
	var client = channelFactory.CreateChannel();
	
	return client;
}</pre><p></p>
<p>With this helper method you can write your <strong>ServiceAgent</strong> like that:</p>
<p></p><pre class="crayon-plain-tag">public static string GetData(int value)
{
	using (var client = ClientHelper.GetClient<IService1Channel>())
	{
		return client.GetData(value);
	}
}</pre><p></p>
<p>With this code you have achieved abstraction over the WCF technology and you no longer need to inject XML into the application config file as long as you library app.config is in the application bin folder.</p>
