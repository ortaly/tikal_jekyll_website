---
layout: post
title: Help with buildr for ALM etc
created: 1294309288
permalink: help-with-buildr-for-alm-etc
tags:
- DevOps
- buildr
---
<p>Full details here:</p>
<p>http://www.tikalk.com/add-git-gitorious-tikal-alm-using-alm2-platform#comment-1437</p>
<p>&nbsp;</p>
<p>Updated script i am using:</p>
<pre class="brush: php;" title="code">
#!/bin/sh

#sudo apt-get install gem
#sudo apt-get install jruby
#sudo gem install cucumber


sudo add-apt-repository &quot;deb http://archive.canonical.com/ lucid partner&quot;
sudo apt-get update
sudo apt-get install sun-java6-jdk

sudo rm /usr/bin/java
sudo ln &ndash;s /usr/lib/jvm/java-6-sun-1.6.0.22/bin/java  /usr/bin/java
sudo update-alternatives --config java

export JAVA_HOME=/usr/lib/jvm/java-6-sun-1.6.0.22
export PATH=$PATH:$JAVA_HOME/bin


export DEV_DIR=tikalk
export BUILDR=buildr-1.3.5-jruby-1.4.0

mkdir $DEV_DIR
cd $DEV_DIR

wget http://people.apache.org/%7Eboisvert/$BUILDR.zip
unzip $BUILDR.zip
chmod +x $BUILDR/bin/*

svn --username  --password   co http://dev.tikalk.com/svn/repos/private_branches/alm_2.0

cd alm_2.0
../$BUILDR/bin/buildr  com.tikal.alm:base:dist:assembly

cd base/dist/target/assembly/bin

./tikal_alm start

</pre>
<p>&nbsp;</p>
