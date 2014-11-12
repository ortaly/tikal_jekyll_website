---
layout: post
title: Nexus adds an additional "-beta" to jar name.
created: 1325147564
author: liorb
permalink: /nexus-adds-additional-beta-jar-name
tags:
- DevOps
- Nexus
- maven
---
<p>I upload the following jar into Nexus using GAV parameters:<br />
<br />
google-api-client-1.6.0-beta.jar</p>
<p><br />
GAV:<br />
Group:com.google.api-client<br />
Artifact:google-api-client<br />
Version:1.6.0-beta<br />
<br />
Once i'm done, this is waht i have in the repository:<br />
<br />
/com/google/api-client/google-api-client/1.6.0-beta/google-api-client-1.6.0-<strong>beta-beta.</strong>jar.md5<br />
/com/google/api-client/google-api-client/1.6.0-beta/google-api-client-1.6.0-<strong>beta-beta.</strong>jar.sha1<br />
/com/google/api-client/google-api-client/1.6.0-beta/google-api-client-1.6.0-beta.pom<br />
/com/google/api-client/google-api-client/1.6.0-beta/google-api-client-1.6.0-beta.pom.md5<br />
/com/google/api-client/google-api-client/1.6.0-beta/google-api-client-1.6.0-beta.pom.sha1</p>
<div class="x-form-element" id="x-form-el-ext-comp-1058" style="padding-left:105px">
<div style="width: 369px;" class=" x-form-display-field" id="ext-comp-1058" name="repositoryPath">&nbsp;</div>
</div>
<p>As you can see above, nexus added an extra -beta to my jar.<br />
<br />
Any ideas?</p>
<p>&nbsp;</p>
<p>Thanks,</p>
<p>Lior</p>
