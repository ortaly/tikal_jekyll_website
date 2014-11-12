---
layout: post
title: Start using JBPM fast and easy
created: 1272181424
author: admin
permalink: /java/blog/start-using-jbpm-fast-and-easy
tags:
- JAVA
- eclipse
- proccess management
- tutorial
- jbpm
- jboss
---
<p>JBoss jBPM is a flexible, extensible workflow management system. jBPM combines easy development of workflow-applications with excellent enterprise application integration (EAI) capabilities. it includes a web-application and a scheduler and can be used in the simplest environment like an ant task and scale up to a clustered J2EE application.<br />
	The jBPM enables the creation of a workflow management system that bridges the gap between managers and developers by giving them a common language: the JBoss jBPM Process definition language (jPdl).<br />
	This article is an introduction and hopefully will help you start using JBPM easily and fast enough. As a first step you can take a look at this reference <a href="http://www.redhat.com/developer_studio/guides/jbpm/html_single/">jbpm reference guide</a></p>
<p>&nbsp;</p>
<p><span style="font-size: larger;"><strong>Eclipse plug-in:</strong></span><br />
	JBPM project supports the design of JBoss jBPM management system workflows within Eclipse: for example: jbpm-jpdl-designer-site-3.1.7.zip on <span style="font-size: larger;">eclipse 3.5.1</span><br />
	http://repository.jboss.com/maven2/org/jbpm/jbpm3/jbpm-jpdl-designer-site/3.1.7/<br />
	http://repository.jboss.com/maven2/org/jbpm/jbpm4/jbpm-jpdl/4.3/</p>
<p>&nbsp;</p>
<p><span style="font-size: larger;">Let&#39;s start write some code</span> <img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/regular_smile.gif" /><br />
	First define in workflowJBPMApplicationContext.xml, the Jbpm Templates and work flows (Process Definition FactoryBean).</p>
<pre class="brush: xhtml;" title="code">
&lt;!-- jBPM configuration  --&gt;
&lt;bean id=&quot;jbpmConfiguration&quot;    class=&quot;org.springmodules.workflow.jbpm31.LocalJbpmConfigurationFactoryBean&quot;&gt;
	    &lt;property name=&quot;sessionFactory&quot; ref=&quot;sessionFactory&quot;/&gt;
	    &lt;property name=&quot;configuration&quot; value=&quot;classpath:jbpm.cfg.xml&quot;/&gt;
	    &lt;property name=&quot;createSchema&quot; value=&quot;false&quot;/&gt;
	    &lt;property name=&quot;processDefinitionsResources&quot;&gt;
	     &lt;list&gt;
&lt;!-- list of all the workflows  --&gt;   &lt;value&gt;classpath:com/example/plugin/jbpm/flows/purchaseContent/processdefinition.xml&lt;/value&gt;
	     &lt;/list&gt;
	    &lt;/property&gt;
	  &lt;/bean&gt;
&lt;!&mdash;define ProcessDefinitionFactoryBean for each workflow  --&gt; 
&lt;bean id=&quot;purchaseContentWorkflow&quot; class=&quot;org.springmodules.workflow.jbpm31.definition.ProcessDefinitionFactoryBean&quot;&gt;
&lt;property name=&quot;definitionLocation&quot; 
value=&quot;classpath:com/example/plugin/jbpm/flows/purchaseContent/processdefinition.xml&quot;/&gt;
&lt;/bean&gt;

&lt;!&mdash;define Templates  --&gt; 
		&lt;bean id=&quot;purchaseContentJbpmTemplate&quot; class=&quot;org.springmodules.workflow.jbpm31.JbpmTemplate&quot;&gt;
		 &lt;constructor-arg index=&quot;0&quot; ref=&quot;jbpmConfiguration&quot;/&gt;
		 &lt;constructor-arg index=&quot;1&quot; ref=&quot;purchaseContentWorkflow&quot;/&gt;
		&lt;/bean&gt;

</pre>
<p>&nbsp;</p>
<p>Now let&#39;s add some <strong>Action Handlers and Decision Handlers</strong>:</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;jbpmAddTuneAction&quot; class=&quot;com.example.plugin.jbpm.handlers.actions.AddTuneActionHandler&quot; /&gt;</pre>
<p>And its Java code example:<br />
	public class AddTuneActionHandler implements org.jbpm.graph.def.ActionHandler<br />
	Inside the execute function: public void execute(ExecutionContext executionContext) you can get workflow variables Integer expiration = (Integer)executionContext.getVariable(JBPMConstants.EXPIRATION.toString());<br />
	Or setting them: executionContext.setVariable (JBPMConstants.NEW_TUNE.toString(), tune);<br />
	Throwing a rollBackException is also possible and this will be discussed later: throw new RollBackPurchaseContentException(subscriberId);</p>
<p>&nbsp;</p>
<p><span style="font-size: larger;"><strong>Decision Handlers: </strong></span></p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;jbpmIsSongExistDecision&quot; class=&quot;com.example.plugin.jbpm.handlers.decisions.IsSongExistDecisionHandler&quot; /&gt;</pre>
<pre class="brush: java;" title="code">
public class IsSongExistDecisionHandler implements DecisionHandler
public String decide(ExecutionContext executionContext) throws Exception {</pre>
<p>return the right String to continue the flow<br />
	The next step is to define the service which will trigger the template</p>
<p>&nbsp;</p>
<pre class="brush: xhtml;" title="code">
&lt;bean id=&quot;businessFlowServiceWS&quot; class=&quot;com.example.plugin.webservices.impl.BusinessFlowWSImpl&quot;&gt;</pre>
<p>This class will contain the JbpmTemplate</p>
<pre class="brush: java;" title="code">
@Resource
private JbpmTemplate purchaseContentJbpmTemplate;
</pre>
<p><strong>The flow will be triggered in the following way:</strong></p>
<pre class="brush: java;" title="code">
ProcessInstance processInstance = purchaseContentJbpmTemplate.getProcessDefinition().createProcessInstance();	
		try{		
processInstance.setKey(Long.toString(processInstance.getId()));			
//you can set variables for the flow like the following:
processInstance.getContextInstance().setVariable(JBPMConstants.SUBSCRIBER_ID.toString(), subscriberId);
//and start trigger the work flow			
while (!processInstance.isTerminatedImplicitly()) processInstance.signal();	
		} catch (Exception exception) {
//See that exceptions can be sent through the context		
BusinessException error = (BusinessException)  processInstance. getContextInstance().getVariable(JBPMConstants.EXCEPTION.toString());
		} 
		finally {
			processInstance = null;
		}	
</pre>
<p>&nbsp;</p>
<p><span style="font-size: larger;"><strong>WorkFlow process defenition</strong></span></p>
<p>As mentioned above, processdefinition.xml defines the workflow:<br />
	The flow needs to have a start state</p>
<pre class="brush: xhtml;" title="code">
&lt;start-state name=&quot;start&quot;&gt;&lt;transition to=&quot;Is Song Exist?&quot;&gt;&lt;/transition&gt;&lt;/start-state&gt;</pre>
<p>&nbsp;</p>
<p>Every Decision or actions declare its configuration and which bean will be used.<br />
	Define in The transitions, how the workflow continues from each point.</p>
<pre class="brush: xhtml;" title="code">
&lt;decision name=&quot;is user registered?&quot;&gt;
   	  &lt;handler config-type=&quot;bean&quot; class=&quot;org.springmodules.workflow.jbpm31.JbpmHandlerProxy&quot;&gt;
		&lt;targetBean&gt;jbpmIsUserRegisteredDecision&lt;/targetBean&gt;
		&lt;factoryKey&gt;jbpmConfiguration&lt;/factoryKey&gt;
		&lt;/handler&gt;
		&lt;transition name=&quot;yes&quot; to=&quot;does user has song?&quot;&gt;&lt;/transition&gt;
		&lt;transition to=&quot;Register to Service Billing&quot; name=&quot;no&quot;&gt;&lt;/transition&gt;
   &lt;/decision&gt;
</pre>
<p>&nbsp;</p>
<p>Action node example:</p>
<pre class="brush: xhtml;" title="code">
&lt;node name=&quot;Add Tune&quot;&gt;
		&lt;action name=&quot;addTune&quot; config-type=&quot;bean&quot; class=&quot;org.springmodules.workflow.jbpm31.JbpmHandlerProxy&quot;&gt;
			&lt;targetBean&gt;jbpmAddTuneAction&lt;/targetBean&gt;
			&lt;factoryKey&gt;jbpmConfiguration&lt;/factoryKey&gt;
		&lt;/action&gt;
		&lt;transition to=&quot;Caller Id parameter&quot;&gt;&lt;/transition&gt;
	&lt;/node&gt;
</pre>
<p><br />
	Exception handlers &ndash; enables to do rollback actions or any other action you want to perform.</p>
<pre class="brush: xhtml;" title="code">
&lt;exception-handler exception-class = &quot;com.example.plugin.jbpm.RollBackExceptions.RollBackPurchaseContentException&quot;&gt;
&lt;action name=&quot;refund billing&quot; config-type=&quot;bean&quot; class= &quot;org.springmodules.workflow.jbpm31.JbpmHandlerProxy&quot;&gt;
		&lt;targetBean&gt;jbpmUnRegisterToServiceAction&lt;/targetBean&gt;
		&lt;factoryKey&gt;jbpmConfiguration&lt;/factoryKey&gt;	
		&lt;/action&gt;
		&lt;action name=&quot;exit flow&quot; class=&quot;com.example.plugin.jbpm.handlers.actions.ExitFlowActionHandler&quot;&gt;&lt;/action&gt;
	&lt;/exception-handler&gt;
</pre>
<p>And at last an end state:</p>
<pre class="brush: xhtml;" title="code">
&lt;end-state name=&quot;end&quot; /&gt;</pre>
<p>Just few more cool things you can do:</p>
<pre class="brush: java;" title="code">
JbpmContext jbpmContext = JbpmConfiguration.getInstance().createJbpmContext();
ProcessInstance processInstance = jbpmContext.newProcessInstance(EXAMPLE_ADD_CONTACT);
</pre>
<p>And trigger it with:</p>
<pre class="brush: java;" title="code">
while (!processInstance.isTerminatedImplicitly()) processInstance.signal();
finally {jbpmContext.close();	}
</pre>
<p>example for the complete workflow image:</p>
<p><img alt="" height="622" src="/files/jbpm(1).jpg" width="752" /></p>
<p>&nbsp;</p>
<p>That&rsquo;s all, now you are ready to write your own flow and enjoy JBPM.</p>
