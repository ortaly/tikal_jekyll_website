---
layout: post
title: Performing backup with Git
created: 1366131698
author: hagzag
permalink: /performing-backup-git
tags:
- DevOps
- git
- Drupal
---
<p>~4 years ago I wrote a script which will sync my drupal files directory between two servers [ I used rsync for that ], the problem with rsync was that it fetches a checsum of every file and direcroty over SSH which was very slow, and the critical issue was I have no history of the data - and if I am maintaining multipule syncs whats the point in rsync.</p>
<p>I looked @ svn at the time which was extreemly slow with binaries [ zip, tars etc ], Git and the git protocol in specific did the full sync [ ~1GB ] in under 45 minuets - over the Internet which was quite good IMO.</p>
<p>I was talking with a collegue on such a solution the other day and I thought why not share this. So for purely educational puposes I put thist scripup as a Gist @:&nbsp;<a href="https://gist.github.com/hagzag/5396510">https://gist.github.com/hagzag/5396510</a>&nbsp;[ or part of the repository @:&nbsp;<a href="https://github.com/hagzag/files_repo/blob/master/syncFiles.sh">https://github.com/hagzag/files_repo/blob/master/syncFiles.sh</a>, but i am not sure it will survive there]&nbsp;&nbsp;and an acompenying repository called &quot;<a href="https://github.com/hagzag/files_repo">files_repo</a>&quot;.</p>
<p>As you will see in the readme I am not sure it will do much for you but if you are consdering on using it read the following:</p>
<ul style="margin: 15px 0px; padding-right: 0px; padding-left: 30px; border: 0px; color: rgb(51, 51, 51); font-family: Helvetica, arial, freesans, clean, sans-serif; font-size: 14px; line-height: 22px;">
	<li style="margin: 0px; padding: 0px; border: 0px;">
		create a repository [ e.g. on GitHub ]</li>
	<li style="margin: 0px; padding: 0px; border: 0px;">
		set the FILES_DIR parameter [ or default to /opt/data ]</li>
	<li style="margin: 0px; padding: 0px; border: 0px;">
		set the MY_GIT_REPO parameter [ or default to /opt/git-repo ]</li>
	<li style="margin: 0px; padding: 0px; border: 0px;">
		set my GIT_REMOTE parameter with the full git url of you repository [I didn&#39;t check this via https ... ]</li>
</ul>
<p style="margin: 0px; padding: 0px; border: 0px;">Run the script, this is really custom to my use case, but shows another awsome aspect of git.</p>
<p style="margin: 0px; padding: 0px; border: 0px;">Enjoy</p>
<p style="margin: 0px; padding: 0px; border: 0px;">HP</p>
