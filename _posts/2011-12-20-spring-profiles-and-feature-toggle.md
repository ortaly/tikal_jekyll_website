---
layout: post
title: Spring profiles and feature toggle
created: 1324377429
author: ittayd
permalink: /spring-profiles-and-feature-toggle
tags:
- JAVA
- spring feature-toggle
- Spring
---
<p>Feature-toggle is an agile development paradigm where features are committed to the main development branch, but are turned off until ready. This avoids merging branches and helps discover conflicts between features early. Another benefit is that QA can test the feature and approve it before it officially appears in the product.</p>
<p>&nbsp;</p>
<p>Many times, a feature-toggle is just an 'if' statement that wraps the entry code to the feature. E.g. 'if (formValidationFeature) validateForm()'</p>
<p>&nbsp;</p>
<p>However, in some cases, the feature modifies the top level services in the product. If using Spring, it means modifying the bean declarations. In this post I'd like to quickly show how to do this using Spring 3.1's new profiles feature.</p>
<p>&nbsp;</p>
<p>The profiles feature allows toggling bean definitions. You can read more about it <a href="http://blog.springsource.com/2011/02/11/spring-framework-3-1-m1-released/">here</a></p>
<p>&nbsp;</p>
<p>How can this be used for feature toggle?&nbsp;Simple:</p>
<ul>
    <li>Make sure the service can be defined as a bean with or without the feature being enabled (e.g., the feature may just be another property that gets set when the feature is toggled). If the whole interface of the service changes, create a new class for the service with the feature.</li>
    <li>Read a property value as a boolean that toggles the feature. Can be from system properties, a file. E.g., feature.formValidation</li>
    <li>Set a profile with the property name and value. E.g., featureProperty +&nbsp;&quot;=&quot; +&nbsp;propertyValue(featureProperty). The result can be the profile &quot;feature.formValidation=true&quot;.</li>
    <li>In the beans configuration file (or configuration class), use the beans element with the profile name to wrap the new service definitions (e.g. &lt;beans profile=&quot;feature.formValidation=true&quot;&gt;). You can either leave the &quot;untoggled&quot; configuration in the root beans element, or create another beans element for it.</li>
</ul>
<p>HTH</p>
