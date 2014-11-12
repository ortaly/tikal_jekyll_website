---
layout: post
title: Backing-Up Hudson-CI configration
created: 1259221737
author: hagzag
permalink: /devops/backing-hudson-ci-configration
tags:
- DevOps
- Hudson
- Continuous Integration
---
<p>A neat addition to your <a href="http://wiki.hudson-ci.org/display/HUDSON/Meet+Hudson">Hudson Continues Integration</a> server, is the <a href="http://wiki.hudson-ci.org/display/HUDSON/Backup+Plugin">Hudson Backup plug-in</a>.</p>
<p>If you are during a major change in your build configuration, backup your configurations and you can restore from the backup when / if needed.</p>
<p>It is just much more elegant then copying those XML file's and editing them by hand when in comes to restoring your configuration... believe me I've been there ... (tested with Hudson 1.327 and 1.335 which is one release since the latest).</p>
<!--break-->
<p>&nbsp;</p>
<p>The basic backup just backs up Hudson's configuration although you can also backup builds history &amp; artifacts and more - please make sure to configure what the backup should actually pickup (<a href="#ScrrenShot">see screen shot below</a>), by default it only backs-up configuration files.</p>
<p>&nbsp;</p>
<p>The plug-in is in it's early stages although quite adequate for simple tasks, if your interested the plug-in is planing on supporting:<del><br />
</del></p>
<ol>
    <li>Speed improvement (it is pretty slow ...)</li>
    <li>Support Hudson launched via java -jar hudson.war</li>
    <li>Build history management (number of backup to keep, ...)</li>
    <li>Incremental backup</li>
    <li>Backup jobs individually</li>
    <li>Automatic backup file format detection on restore</li>
</ol>
<p><a name="ScrrenShot"><img align="left" width="600" vspace="15" hspace="15" height="348" alt="Hudson CI Backup" src="/files/upload/29/HudsonCI-BackupConfig.png" /></a></p>
<p>&nbsp;</p>
<p><strong>Another important thing to note: </strong><u>Backup will restart Hudson</u> so if you have any job's running Hudson will wait until they are complete in order to perform the backup.</p>
<p>&nbsp;</p>
<p>An example <a href="#backupoutput">backup output</a> is listed below, this backup is a &quot;configuration-only&quot;.</p>
<p>&nbsp;</p>
<p>Hope you find this useful ...</p>
<p><a name="backupoutput">.</a><br />
|-- plugins<br />
|&nbsp;&nbsp; |-- backup<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- org.jvnet.hudson.plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- backup<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |-- WEB-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |-- classes<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- services<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- org<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- jvnet<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- hudson<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- backup<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- BackupLink<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- utils<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- compress<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- filename<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- lib<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; `-- images<br />
|&nbsp;&nbsp; |-- maven-plugin<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- org.jvnet.hudson.main<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- maven-plugin<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; `-- WEB-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- classes<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |-- annotations<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- services<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- hudson<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- FilteredChangeLogSet<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenBuild<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenModule<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenModuleSet<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenModuleSetBuild<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenProbeAction<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenTestDataPublisher<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- RedeployPublisher<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- reporters<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- MavenAbstractArtifactRecord<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- SurefireAggregatedReport<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- lib<br />
|&nbsp;&nbsp; |-- scis-ad<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- org.jvnet.hudson.plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- scis-ad<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; `-- WEB-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- classes<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- annotations<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- hudson<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- scis_ad<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- ScisSupportOffer<br />
|&nbsp;&nbsp; |-- ssh-slaves<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- org.jvnet.hudson.plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- ssh-slaves<br />
|&nbsp;&nbsp; |&nbsp;&nbsp; `-- WEB-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- classes<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |-- annotations<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- services<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- hudson<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- plugins<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- sshslaves<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- SSHLauncher<br />
|&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- lib<br />
|&nbsp;&nbsp; `-- subversion<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- maven<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- org.jvnet.hudson.plugins<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- subversion<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- WEB-INF<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- classes<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- META-INF<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; |-- annotations<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- services<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- hudson<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- scm<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- SubversionChangeLogSet<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- SubversionSCM<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- DescriptorImpl<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- SubversionTagAction<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |-- browsers<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- AbstractSventon<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- CollabNetSVN<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- FishEyeSVN<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- DescriptorImpl<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- Sventon<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- DescriptorImpl<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- Sventon2<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |&nbsp;&nbsp; `-- DescriptorImpl<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; |-- ViewSVN<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp; `-- WebSVN<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; |&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- subversion<br />
|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; `-- lib<br />
|-- updates<br />
`-- userContent<br />
&nbsp;</p>
