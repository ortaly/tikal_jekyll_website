---
layout: post
title: 'Subversion: set property to multipule & existant files'
created: 1228079105
author: hagzag
permalink: /devops/subversion-set-property-multipule-existant-files
tags:
- DevOps
- bash
---
<p dir="ltr">In continuation to my post earlier this month, regarding setting a automatic property to a file in svn. The issue I dealt with in that post was a property set that would be given only to newly created files, meaning only new files with the given extension would receive the specific type of property. What I encountered now was a case where I had to set a specific property on a large number of files which were already committed to svn.</p> <p dir="ltr">Well, one could spend a week locating those files and setting the properties manually but the elegant way would be to write a short shell script which will do the job for you.</p> <p dir="ltr">so because I had multiple locations I chose to run the script on the server itself so I am not hanging on http protocol + I am using svn file and not http but this can be easily done by via http too.</p> <div dir="ltr">&nbsp;</div> <p dir="ltr">So if your svn is build out of trunk, branches and tags so I would like to go over trunk for example and checkout first level directories look for a file extension and change its property (of course If you want to set more then one property you will have to modify this script) then set its property and commit so I created a file containing the names of the first level directories after trunk and out them into a file called trunk.list</p> <div dir="ltr"><strong>Task list:</strong></div> <div dir="ltr">1. checkout from svn</div> <p dir="ltr">2. find files with extension .properties (or any other extention I/you desire)</p> <div dir="ltr">3. set svn property eol CRLF</div> <div dir="ltr">4. commit change to svn</div> <div dir="ltr">&nbsp;</div> <p dir="ltr">So I wrote in bash a short loop that would read the file and for each line do the four tasks I wanted:</p> <pre>
#!/bin/bash

#set vars
SVNUSER=opencm
SVNPASS=opencm
file=$2
cat $file | while read line;

do

 # &quot;now&quot; var will be used for commit message
 now=`date +%Y_%m_%d_%T`
 # checkout
 svn co --username $SVNUSER --password $SVNPASS file:///path-to-svnroot/trunk/$line /tmp/$line
 cd /tmp/$line
 # set the property of CRLF to the found files
 find&amp;nbsp; /tmp/$line -name &quot;*.$1&quot; | xargs -r svn propset svn:eol-style CRLF
 # commit the changes to svn
 svn commit -m &quot;setting svnprop eol=CRLF done on $now&quot;
 # remove eorking copy
 rm /tmp/$line -Rf


done

 

exit 0

 

#EOF</pre><div dir="ltr">&nbsp;</div> <div dir="ltr">&nbsp;</div> <div dir="ltr"><p dir="ltr">to execute the command you need to command line args $1 file extension for example txt and $2 is the list of the directories you are checking out of svn so from command prompt it should look like:</p> <div dir="ltr">[opencm@localhost ]# ./chgCRLFprop.bash txt trunk.list</div> <p dir="ltr">And if you really want to continue working in the process add this &quot;&gt; chgCRLFprop.log 2&gt;&amp;1 &amp;&quot; to the end of the command which will send the job to the background and you can also reference the log if you like.</p> <div dir="ltr">Give it a test run first running the script without the svn commit.</div></div><p>&nbsp;</p>
