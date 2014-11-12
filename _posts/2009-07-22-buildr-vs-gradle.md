---
layout: post
title: BuildR vs Gradle
created: 1248239277
author: ittayd
permalink: /devops/buildr-vs-gradle
tags:
- DevOps
- buildr build gradle
---
<p>BuildR and Gradle are tools for multi-module builds where the build files are defined using a real language and task based (Ruby for BuildR, Groovy for Gradle). The benefits of a real language is that it is easy to create utility methods, control structures etc. Being task based (where 'task' is not the same as in ant, but rather as a Make target) means fine grained dependencies and lifecycle through invocation of dependencies.</p>
<p>&nbsp;</p>
<p>In this writeup, I try to compare the tools, to help people choose the one they want.</p>
<p>&nbsp;</p>
<ol>
    <li>language: buildr is ruby only. gradle is groovy and java. the use of java may help performance (although for builds, jit probably never kicks in), on the other hand, navigating two languages is a hassle and using java means features of a dynamic language like groovy/ruby cannot be used. (note that both ruby and groovy are different than java and require a learning curve). while i can't be sure about groovy, ruby is a very open language, allowing to change thirdparty code and do a lot of meta programming, making many things possible.</li>
    <li>plugins: in buildr, extensions can have code that is called before or after a project is defined. the extension is loaded by requiring the file and can also be applied on specific projects. in gradle, a plugin is applied on a project when the project's definition calls a method. you can do it for all projects with 'allprojects { usePlugin('myplugin')}', but it depends on the user doing this and doing it before doing anything else to the project. the plugin doesn't have a hook to do something after the project has been defined (e.g., after the definition provided some information)</li>
    <li>project lifecycle: in buildr, the project definition is in itself a body of a task. this means that 1: cyclic project references can be detected, 2: if the user wishes to build only a certain project, then unrelated projects are not evaluated - a major performance boost in one of our clients (the latter statement is not very accurate, since vanilla buildr evaluates all projects up front, by by 2 days work i was able to achieve the lazy evaluation)</li>
    <li>gradle natively supports separating project definitions into files. buildr does not, but it is easy to add.</li>
    <li>artifact and dependencies:
    <ol>
        <li>gradle supports many types of dependencies (maven, ivy, internal), including transitive (by using maven/ivy). buildr only supports maven dependencies and transitive support (through parsing of pom files) is 'experimental' (there is an external project to add ivy support).
        <ol>
            <li>the reason for not having full transitive support is that they want to do it right. however, it doesn't seem there is any progress there</li>
            <li>note that in java, transitive dependencies are important for runtime, not compile time.</li>
        </ol>
        </li>
        <li>buildr has better management of artifact (artifact namespace)</li>
        <li>gradle separates dependency definition from the task that uses it, so 'compile' dependency is separate from the 'javac' task (similar to maven). dependencies can also be inherited from one another. in buildr, a task that needs dependencies, defines a method to declare them. this means each task can have an api unique to its needs (e.g., in C++ define a dependency on an artifact, and state the libraries to use from it).</li>
    </ol>
    </li>
    <li>tasks: gradle allows to define task dependencies as first / last. buildr (rake) api has a natural way of adding dependencies at the end of the existing list and a clunkier one for adding first. gradle allows to overwrite tasks with new definitions, rake requires hacking. gradle also has better emphasis on constructing a tree of dependencies before executing tasks, which means it finds cyclic dependencies first and is better positioned to add support for parallel execution. in buildr this is done when tasks are invoked. since invoking tasks means first invoking its prerequisites, cyclic dependencies are discovered before any of the tasks code is executed.</li>
    <li>it is easier for me to navigate code in buildr than gradle. some of it is that gradle uses a lot of interfaces, so i usually find the method on the interface, and then need to find the implementation of it. buildr due to duck typing does not require interfaces. other aspects are that gradle uses a lot of delegation with registries and factories, requiring more navigation. in general, i find buildr to have better design.</li>
    <li>java integration: buildr uses a package which loads the jvm through jni allowing to call java code&nbsp; (Java.java.lang.String.new). when dealing with obscure OSs, getting it to work is tricky. JRuby is an option, but then buildr will loose performance. also, there are limitations, e.g., you can't define an extension or classes in java and inherit from them - although i see no reason to choose to implement code in java, both groovy and ruby allow better flexability, using existing java code is what matters. In gradle, java interoperability is more natural.</li>
    <li>buildr is an apache top-level project, this can give it a boost in the long run. however, the developers of buildr seem to have lost steam. in the last year or so most of the work was from a new contributor to add scala support. in gradle, there is one maintainer, but he is very active.</li>
    <li>buildr supports more tools than gradle, scala has full support, cobertura, emma etc.</li>
</ol>
