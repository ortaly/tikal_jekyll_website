---
layout: post
title: Backing up Git repos with git bundle
created: 1368469463
author: hagzag
permalink: /devops/backing-git-repos-git-bundle
tags:
- DevOps
- git
- git bundle
- backup
---
<p>Git bundle was designed as a secondary method to the patch refs.</p>
<p>Scenario you want to pass over to a colleague a set of commits before pushing them to remote &quot;git push origin master ...&quot;, so you can do one of two things:</p>
<ol>
	<li>
		<em><strong>Export each commit as a patch</strong></em> - pass the patches via e-mail the other side apply patches and commit to the remote repo.<br />
		<pre>
git format-patch master --stdout &gt; fix_empty_poster.patch
</pre>
	</li>
	<li>
		<em><strong>Use git bundle to export a binary</strong></em> [blob] holding the whole commit history [ commit =&gt; tree =&gt; blob ] of the git objects + their snapshot in time.<br />
		<pre>
  git bundle create my_repo.bundle --all
</pre>
		<br />
		you could optionally specify SHA1&#39;s or revisions like so:<br />
		<pre>
  git bundle create my_repo.bundle master ^SHA-1</pre>
	</li>
</ol>
<p>Now isn&#39;t the title backing up git ? - well, what I did is use git bundle to backup repositories and the reason I found this most efficient is that the backup is one file [ so a simple git clone dosen&#39;t cut it !]</p>
<p>An exmaple of git bundle execution, verification &amp; restore:</p>
<pre>
hagzag-HPZW520:chef-intro-repo(master) $ git bundle create ../chef-intro-repo2.bundle master ^2c7146fdd
Counting objects: 59, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (24/24), done.
Writing objects: 100% (53/53), 16.05 KiB, done.
Total 53 (delta 22), reused 50 (delta 19)

hagzag-HPZW520:chef-intro-repo(master) $ git bundle verify ../chef-intro-repo2.bundle
The bundle contains 1 ref
e0951a40daece16892cee2d831fc26d9bafbb5e6 refs/heads/master
The bundle requires this ref
2c7146fdd7dd3186afa228c54a7123306ec5a1a1 
../chef-intro-repo2.bundle is okay
</pre>
<p><b>Create</b> a full repo bundle (--all)</p>
<pre>
hagzag-HPZW520:chef-intro-repo(master) $ git bundle create ../chef-intro-repo3.bundle --all
Counting objects: 374, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (180/180), done.
Writing objects: 100% (374/374), 90.98 KiB, done.
Total 374 (delta 124), reused 374 (delta 124)
hagzag-HPZW520:chef-intro-repo(master) $ cd ../
</pre>
<p><b>create</b> a clean repository and switch into it:</p>
<pre>
hagzag-HPZW520:backup $ git init chef-intro-repo3
Initialized empty Git repository in /tmp/backup/chef-intro-repo3/.git/
hagzag-HPZW520:backup $ cd chef-intro-repo3/
</pre>
<p><b>Recover</b> from the created bundle:</p>
<pre>
hagzag-HPZW520:chef-intro-repo3(master) $ git pull ../chef-intro-repo3.bundle
Receiving objects: 100% (374/374), 90.98 KiB, done.
Resolving deltas: 100% (124/124), done.
From ../chef-intro-repo3.bundle
 * branch            HEAD       -&gt; FETCH_HEAD
</pre>
<p><b>Verify</b> folder content:</p>
<pre>
hagzag-HPZW520:chef-intro-repo3(master) $ ll
total 48
drwxrwxr-x 2 hagzag hagzag  4096 May 13 21:12 certificates
-rw-rw-r-- 1 hagzag hagzag   156 May 13 21:12 chefignore
drwxrwxr-x 2 hagzag hagzag  4096 May 13 21:12 config
drwxrwxr-x 5 hagzag hagzag  4096 May 13 21:12 cookbooks
drwxrwxr-x 2 hagzag hagzag  4096 May 13 21:12 data_bags
drwxrwxr-x 2 hagzag hagzag  4096 May 13 21:12 environments
-rw-rw-r-- 1 hagzag hagzag 10850 May 13 21:12 LICENSE
-rw-rw-r-- 1 hagzag hagzag  2171 May 13 21:12 Rakefile
-rw-rw-r-- 1 hagzag hagzag  3521 May 13 21:12 README.md
drwxrwxr-x 2 hagzag hagzag  4096 May 13 21:12 roles
</pre>
<p><b>Verify</b> git log</p>
<pre>
hagzag-HPZW520:chef-intro-repo3(master) $ git log --oneline -n 5
e0951a4 Import sudo version 2.0.4
9f2fc33 Update recipe to support synamic service name resolution ...
fc54694 Update cookbooks/ntp/README.md
a61df3b Update cookbooks/ntp/README.md
d983fb8 Update cookbooks/ntp/README.md

</pre>
<p><b>Compare</b> with the original repository:</p>
<pre>
hagzag-HPZW520:chef-intro-repo3(master) $ cd ../chef-intro-repo
hagzag-HPZW520:chef-intro-repo(master) $ git log --oneline -n 5
e0951a4 Import sudo version 2.0.4
9f2fc33 Update recipe to support synamic service name resolution ...
fc54694 Update cookbooks/ntp/README.md
a61df3b Update cookbooks/ntp/README.md
d983fb8 Update cookbooks/ntp/README.md
</pre>
<p>Walla !</p>
<p>&nbsp;</p>
<p>For my Local git repositories [the ones I do not have a remote for on Github/BitBucket due to customer regulations] - I do the following backup daily:</p>
<p>&nbsp;</p>
<pre>
#!/bin/bash 

projects_dir=~/Projects
backup_base_dir=/tmp/backup

test -d ${backup_base_dir} || mkdir -p ${backup_base_dir}

pushd $projects_dir
  for repo in `find $projects_dir -type d -name .git`; do
    cd $repo/..
    this_repo=`basename $PWD`
    git bundle create ${backup_base_dir}/${this_repo}.bundle --all
    cd -
  done
popd
</pre>
<p>A reference to <em>git bundle:&nbsp;</em><a href="http://git-scm.com/blog/2010/03/10/bundles.html">http://git-scm.com/blog/2010/03/10/bundles.html</a></p>
<p>Hope you find this info useful - over &amp; out, HP</p>
