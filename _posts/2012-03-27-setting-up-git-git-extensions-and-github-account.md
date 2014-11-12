---
layout: post
title: Setting up Git, Git Extensions and GitHub account
created: 1332843190
author: igorz
permalink: /setting-git-git-extensions-and-github-account
tags:
- .NET
- GitHub
- Git Extensions
- git
- .Net Open Source
---
<p>This tutorial indeed for people who is not familiar with <a href="http://git.or.cz/">Git</a> and <a href="https://github.com/">GitHub</a> and make first steps with this this technology. The tutorial contains following steps:</p>
<ol>
    <li>Installing Git and Git Extensions</li>
    <li>Setting up GitHub account ,SSH keys and repository</li>
    <li>Working with GitHub repository with Git Extensions</li>
    <li>Cloning public repository from GitHub</li>
</ol>
<p>&nbsp;</p>
<!--break-->
<p>&nbsp;</p>
<h2>Installing Git and Git Extensions</h2>
<p>&nbsp;</p>
<p><a href="http://code.google.com/p/gitextensions/">Git Extensions</a> is  an open-source project provides graphical user interface for Git that  allows you control Git without using the command line. It's download  includes <a href="http://code.google.com/p/msysgit/">msysgit</a> - implementation of Git for Windows.<br />
<br />
Download and run latest build from <a href="http://code.google.com/p/gitextensions/downloads/list">download page</a> . I use version 2.29 for this tutorial. Follow installation wizard with taking notes below:<br />
<br />
When you run installer you get welcome page:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-yhar7P55qus/T3FVCzzpjfI/AAAAAAAAOU4/GqHnFWrMa78/s1600/2012-03-27+07h19_25.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://4.bp.blogspot.com/-yhar7P55qus/T3FVCzzpjfI/AAAAAAAAOU4/GqHnFWrMa78/s1600/2012-03-27+07h19_25.png" /></a></div>
<p><br />
&nbsp;Go next till you get &quot;Required Software&quot; page:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-V3NVR1j_68w/T3FVilvoZkI/AAAAAAAAOVA/iI1sUvuUEec/s1600/2012-03-27+07h19_46.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://1.bp.blogspot.com/-V3NVR1j_68w/T3FVilvoZkI/AAAAAAAAOVA/iI1sUvuUEec/s1600/2012-03-27+07h19_46.png" /></a></div>
<p><br />
<br />
Since Git Extensions is only graphical tool, it requires Git installed.  If you are not sure you have proper git installation, just select option  &quot;Install MsysGit&quot;. KDiff is a diff/merge tool, not the best one, but  free. I recommend you select it as well.<br />
<br />
Go next till you get &quot;Select SSH client&quot; page:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-IRT6vk3lquQ/T3FXVZPnTMI/AAAAAAAAOVQ/5u3HDwVxIpY/s1600/2012-03-27+07h19_56.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-IRT6vk3lquQ/T3FXVZPnTMI/AAAAAAAAOVQ/5u3HDwVxIpY/s1600/2012-03-27+07h19_56.png" /></a></div>
<p><br />
Ensure you select &quot;PuTTY&quot;. It is an easiest way to work with SSH on Windows.<br />
<br />
Go next till you get MsysGit installer running (as part of Git Extensions installation).</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-E4HJ_pAXQ94/T3FYF8glrtI/AAAAAAAAOVY/16Ew2xFY90s/s1600/2012-03-27+07h20_43.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-E4HJ_pAXQ94/T3FYF8glrtI/AAAAAAAAOVY/16Ew2xFY90s/s1600/2012-03-27+07h20_43.png" /></a></div>
<p><br />
Select following settings during installation (it is can be changed after installation).</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-r4pRsX40M5w/T3FZaNQicEI/AAAAAAAAOVg/AmKxgvDj7go/s1600/2012-03-27+07h21_15.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://3.bp.blogspot.com/-r4pRsX40M5w/T3FZaNQicEI/AAAAAAAAOVg/AmKxgvDj7go/s1600/2012-03-27+07h21_15.png" /></a></div>
<p>&nbsp;</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-kXQTMtDrh7Y/T3FZiH3lV7I/AAAAAAAAOVo/yWtWJ5tEtpw/s1600/2012-03-27+07h21_24.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://4.bp.blogspot.com/-kXQTMtDrh7Y/T3FZiH3lV7I/AAAAAAAAOVo/yWtWJ5tEtpw/s1600/2012-03-27+07h21_24.png" /></a></div>
<p><br />
Finally you get &quot;Complete installation&quot;&nbsp; page with &quot;Finish&quot; button.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-ADC_yNUu9aQ/T3FaBahCutI/AAAAAAAAOVw/VA6YtIoBgJk/s1600/2012-03-27+07h22_35.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-ADC_yNUu9aQ/T3FaBahCutI/AAAAAAAAOVw/VA6YtIoBgJk/s1600/2012-03-27+07h22_35.png" /></a></div>
<p><br />
Congratulations! You have Git and Git Extensions installed. Run it!<br />
<br />
When you run Get Extensions for fist time, it comes with settings page with error:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-Lu-c24q2x0w/T3FbUc-Q3GI/AAAAAAAAOV4/06XmxDGZT4A/s1600/2012-03-27+08h11_43.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="505" alt="" src="http://2.bp.blogspot.com/-Lu-c24q2x0w/T3FbUc-Q3GI/AAAAAAAAOV4/06XmxDGZT4A/s640/2012-03-27+08h11_43.png" /></a></div>
<p><br />
Don't <span lang="en" class="short_text" id="result_box"><span class="hps alt-edited">be scared, it is normal for first time. Just click &quot;Repair&quot; and fill missing details&nbsp;</span></span><br />
<span lang="en" class="short_text" id="result_box"><span class="hps alt-edited"><br />
</span></span></p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-ylYwkoE4bAM/T3Fb3LsJ0_I/AAAAAAAAOWA/dDa2rl4atdk/s1600/2012-03-27+08h11_54.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="504" alt="" src="http://2.bp.blogspot.com/-ylYwkoE4bAM/T3Fb3LsJ0_I/AAAAAAAAOWA/dDa2rl4atdk/s640/2012-03-27+08h11_54.png" /></a></div>
<p><span lang="en" class="short_text" id="result_box"><span class="hps alt-edited"><br />
</span></span><br />
That's it. Now you are ready to work with Git repository.</p>
<p>&nbsp;</p>
<h3>&nbsp;</h3>
<h2>Setting up GitHub account ,SSH keys and repository</h2>
<p>&nbsp;</p>
<p>Go to <a href="https://github.com/signup/free">https://github.com/signup/free</a> to set up you free account. Registration process is very simple. If you already have GitHub account, skip this step.<br />
<br />
Once you have an account at GitHub, log in and go to your account SSH keys configuration page <a href="https://github.com/settings/ssh">https://github.com/settings/ssh</a>. If you first time here, you have an empty list.<br />
<br />
Now it is time to create your SSH key. You may follow instructions from GitHub, but I want to show you my way.<br />
<br />
When we installed Git Extensions, we selected &quot;PuTTY&quot; as SSH client and  it resulted with helpful&nbsp; PuTTY utilities was installed. You may find  them in <i><b>C:\Program Files (x86)\GitExtensions\PuTTY</b></i> folder (or <i><b>C:\Program Files\GitExtensions\PuTTY</b></i> on 32bit Windows)</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-72FA74hTGrg/T3FhZZ9WXBI/AAAAAAAAOWI/X6iWfv2ZR98/s1600/2012-03-27+08h41_08.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="416" alt="" src="http://2.bp.blogspot.com/-72FA74hTGrg/T3FhZZ9WXBI/AAAAAAAAOWI/X6iWfv2ZR98/s640/2012-03-27+08h41_08.png" /></a></div>
<p><br />
<b>pageant.exe</b> - PuTTY SSH authentication agent,<br />
<b>plink.exe</b> - PuTTY SSH client,<br />
<b>puttygen.exe</b> - PuTTY SSH key generator.<br />
<br />
Run <b>puttygen.exe, </b>click &quot;Generate&quot; button and move mouse over black area while progress is displayed.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-4EcMBXhU4dI/T3Fj0SlMhdI/AAAAAAAAOWU/RGHgiAnZARk/s1600/2012-03-27+08h49_56.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-4EcMBXhU4dI/T3Fj0SlMhdI/AAAAAAAAOWU/RGHgiAnZARk/s1600/2012-03-27+08h49_56.png" /></a></div>
<p><br />
This way you generated your SSH key.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-dRGcf9Af_JI/T3FkAQ86Y3I/AAAAAAAAOWc/WkUVPM1uBbo/s1600/2012-03-27+08h49_31.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-dRGcf9Af_JI/T3FkAQ86Y3I/AAAAAAAAOWc/WkUVPM1uBbo/s1600/2012-03-27+08h49_31.png" /></a></div>
<p><br />
Now save private key (you may select passphrase (password) if you want). Note: you have to keep you private key in secret.<br />
<br />
Copy text from textbox above - it is your public key.&nbsp; This is what you  put into your GitHub account. You can always get this public key by  loading your private key in <b>puttygen</b>. (File &gt; Load private key).<br />
<br />
Not it is time to come back to GitHub <a href="https://github.com/settings/ssh">https://github.com/settings/ssh</a>.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-tzdwYziRQLE/T3Fm30osB2I/AAAAAAAAOWk/1WE3ujeWQ_o/s1600/2012-03-27+09h03_29.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="553" alt="" src="http://3.bp.blogspot.com/-tzdwYziRQLE/T3Fm30osB2I/AAAAAAAAOWk/1WE3ujeWQ_o/s640/2012-03-27+09h03_29.png" /></a></div>
<p><br />
Click &quot;Add SSH key&quot;, give a name for this key and copy you public key from <b>puttygen.&nbsp; </b>Click &quot;Add key&quot; - <br />
SSH Keys list shows your newly created key:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-viN8jUt0oYY/T3FnxNoeORI/AAAAAAAAOWw/OMlv5_DGiHU/s1600/2012-03-27+09h07_07.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="86" alt="" src="http://4.bp.blogspot.com/-viN8jUt0oYY/T3FnxNoeORI/AAAAAAAAOWw/OMlv5_DGiHU/s640/2012-03-27+09h07_07.png" /></a></div>
<p><br />
Creating repository is very simple. From main page (<a href="https://github.com/">https://github.com/</a>)  click &quot;New repository&quot;, fill the form and click &quot;Create repository&quot; -  you will get instructions how to set up Git. You may follow this  instructions, or follow my way I used to go.</p>
<h2>&nbsp;</h2>
<h2>Working with GitHub repository with Git Extensions.</h2>
<p>&nbsp;</p>
<p>First of all you have to know your repository url. Take it from GitHub instruction page:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-28ZUpMxSaSE/T3F3cRDEMZI/AAAAAAAAOXA/lPgzoVKOmFE/s1600/2012-03-27+09h27_12.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="574" alt="" src="http://3.bp.blogspot.com/-28ZUpMxSaSE/T3F3cRDEMZI/AAAAAAAAOXA/lPgzoVKOmFE/s640/2012-03-27+09h27_12.png" /></a></div>
<p><br />
<br />
Open Git Extensions and click &quot;Clone repository&quot;</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-0aeCdqGvIBU/T3F4Mzl7MJI/AAAAAAAAOXI/LoGoPPLIbEo/s1600/2012-03-27+10h03_13.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="528" alt="" src="http://3.bp.blogspot.com/-0aeCdqGvIBU/T3F4Mzl7MJI/AAAAAAAAOXI/LoGoPPLIbEo/s640/2012-03-27+10h03_13.png" /></a></div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-5kaas2IhUXo/T3F222aohwI/AAAAAAAAOW4/wnyrc1TccNc/s1600/2012-03-27+10h03_13.png" style="margin-left: 1em; margin-right: 1em;"><br />
</a></div>
<p><br />
Fill repository url and destination. Then click &quot;Load SSH key&quot;.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://4.bp.blogspot.com/-0qCa5_ZgrGQ/T3F4gMScxkI/AAAAAAAAOXQ/s4UvzHS5ekk/s1600/2012-03-27+10h05_21.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://4.bp.blogspot.com/-0qCa5_ZgrGQ/T3F4gMScxkI/AAAAAAAAOXQ/s4UvzHS5ekk/s1600/2012-03-27+10h05_21.png" />&nbsp;</a></div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">Select you previously saved private key and click &quot;Load&quot;. It might  prompt password, if you set up one when saved the private key.&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">Loading SSH key required for authentication against GitHub.</div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">Click &quot;Clone&quot;. Git Extensions will create destination directory and initialize local git repository there.</div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-2mUxZcCaoH0/T3F59s0rhdI/AAAAAAAAOXY/HaPBNx6mb54/s1600/2012-03-27+10h06_12.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-2mUxZcCaoH0/T3F59s0rhdI/AAAAAAAAOXY/HaPBNx6mb54/s1600/2012-03-27+10h06_12.png" /></a></div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">Click &quot;OK&quot; - it prompts with &quot;Open repository&quot; dialog.</div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-a-pJTQdlqf4/T3F6Y7qGrVI/AAAAAAAAOXg/XUYrPazMr4k/s1600/2012-03-27+10h06_30.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://3.bp.blogspot.com/-a-pJTQdlqf4/T3F6Y7qGrVI/AAAAAAAAOXg/XUYrPazMr4k/s1600/2012-03-27+10h06_30.png" /></a></div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: left;">Click &quot;Yes&quot; - your newly cloned repository will be opened:</div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-bQG_YY_Unco/T3F8ISlSPEI/AAAAAAAAOXo/rfxDoRLD05s/s1600/2012-03-27+10h35_02.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="528" alt="" src="http://3.bp.blogspot.com/-bQG_YY_Unco/T3F8ISlSPEI/AAAAAAAAOXo/rfxDoRLD05s/s640/2012-03-27+10h35_02.png" /></a></div>
<div class="separator" style="clear: both; text-align: left;">&nbsp;</div>
<p>Such screen you will see each time you clone an empty repository. Lets do some changes.<br />
<br />
Go to repository directory and create new <b>README </b>text file:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-01Qp5yae_94/T3F8xuPkCtI/AAAAAAAAOXw/cOiJURWauDk/s1600/2012-03-27+10h07_25.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="419" alt="" src="http://3.bp.blogspot.com/-01Qp5yae_94/T3F8xuPkCtI/AAAAAAAAOXw/cOiJURWauDk/s640/2012-03-27+10h07_25.png" /></a></div>
<p><br />
You will see there <b>.git</b> folder. <u>Don't modify or delete it</u>. This is actually Git repository. All files and folders beside are only current checked out branch.<br />
<br />
Now go back to Git Extensions and click &quot;Commit&quot;. You will get commit dialog:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-xOfw7Uq0kzc/T3F-a3jtK9I/AAAAAAAAOYA/uP7-hd3mr3o/s1600/2012-03-27+10h08_12.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="488" alt="" src="http://1.bp.blogspot.com/-xOfw7Uq0kzc/T3F-a3jtK9I/AAAAAAAAOYA/uP7-hd3mr3o/s640/2012-03-27+10h08_12.png" /></a></div>
<div class="separator" style="clear: both; text-align: center;">&nbsp;</div>
<p><br />
Our newly created file have no persistency in repository, Click &quot;Stage&quot; to &quot;fix&quot; it.</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-wCn9jzLzItk/T3F-q4nPgHI/AAAAAAAAOYI/feFlQNsghUA/s1600/2012-03-27+10h08_34.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="488" alt="" src="http://2.bp.blogspot.com/-wCn9jzLzItk/T3F-q4nPgHI/AAAAAAAAOYI/feFlQNsghUA/s640/2012-03-27+10h08_34.png" /></a></div>
<p><br />
Now it is ready for commit. Put commit message and click &quot;Commit&quot;.<br />
<br />
Git Extensions shows this first commit in our local repository (red colored label).</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-qAu0Y4_l1f0/T3F_Q-au0yI/AAAAAAAAOYQ/arXvMWRRsxo/s1600/2012-03-27+10h08_57.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="528" alt="" src="http://3.bp.blogspot.com/-qAu0Y4_l1f0/T3F_Q-au0yI/AAAAAAAAOYQ/arXvMWRRsxo/s640/2012-03-27+10h08_57.png" /></a></div>
<p><br />
But it is not all. Since this is our local repository, we have to deliver our changes to remote repository at GitHub.<br />
<br />
Go to menu &quot;Commands&quot; &gt; &quot;Push&quot;. It opens &quot;Push&quot; dialog:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-L6EJzcNE6dw/T3GAmngkd6I/AAAAAAAAOYY/-q6Wu2r5eAE/s1600/2012-03-27+10h09_34.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="273" alt="" src="http://2.bp.blogspot.com/-L6EJzcNE6dw/T3GAmngkd6I/AAAAAAAAOYY/-q6Wu2r5eAE/s640/2012-03-27+10h09_34.png" /></a></div>
<p><br />
Click &quot;Push&quot;. Because there is no master branch in remote repository yet, it opens confirmation dialog:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://2.bp.blogspot.com/-wlXGrDJMyc4/T3GBHf0YkVI/AAAAAAAAOYo/DMbrvHGuy40/s1600/2012-03-27+10h09_50.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://2.bp.blogspot.com/-wlXGrDJMyc4/T3GBHf0YkVI/AAAAAAAAOYo/DMbrvHGuy40/s1600/2012-03-27+10h09_50.png" /></a></div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-ENcVerNcBuA/T3GBC1BUZiI/AAAAAAAAOYg/rarsGUkANe8/s1600/2012-03-27+10h06_30.png" style="margin-left: 1em; margin-right: 1em;"><br />
</a></div>
<p>Click &quot;Yes&quot;.<br />
<br />
Now Git Extensions shows your remote repository branch (green colored label)</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-8Q7_dLgS2Ds/T3GBmHcuFtI/AAAAAAAAOYw/M9LZtxrSpPQ/s1600/2012-03-27+10h10_16.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="528" alt="" src="http://1.bp.blogspot.com/-8Q7_dLgS2Ds/T3GBmHcuFtI/AAAAAAAAOYw/M9LZtxrSpPQ/s640/2012-03-27+10h10_16.png" /></a></div>
<p><br />
Since we have created master branch in GitHub repository, it's page  doesn't show Git set up instructions, but all repository related  information:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-0zXvxhOnjn0/T3GDP_C7kHI/AAAAAAAAOY4/CnAxYx9kHws/s1600/2012-03-27+10h10_38.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="410" alt="" src="http://3.bp.blogspot.com/-0zXvxhOnjn0/T3GDP_C7kHI/AAAAAAAAOY4/CnAxYx9kHws/s640/2012-03-27+10h10_38.png" /></a></div>
<p><br />
All further commit with this repository are similar to first one. You make changes, stage them, commit and push.</p>
<h2>&nbsp;</h2>
<h2>Cloning public repository from GitHub</h2>
<p>&nbsp;</p>
<p>If you want to clone some public repository from GitHub, you have to  follow the same steps as you clone your own repository.&nbsp; The difference  is in&nbsp; repository url. To obtain repository url go repository page.<br />
<br />
There is my repository page for example <a href="https://github.com/manishma/IZWebFileManager">https://github.com/manishma/IZWebFileManager</a>:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://1.bp.blogspot.com/-rT-Ty9iW72M/T3GFuapmgdI/AAAAAAAAOZA/y0S-LEB3LGo/s1600/2012-03-27+11h15_53.png" style="margin-left: 1em; margin-right: 1em;"><img width="640" border="0" height="490" alt="" src="http://1.bp.blogspot.com/-rT-Ty9iW72M/T3GFuapmgdI/AAAAAAAAOZA/y0S-LEB3LGo/s640/2012-03-27+11h15_53.png" /></a></div>
<p><br />
In case you select read only access url, you even don't need to configure SSH key. (You still need it for read-write access).</p>
<h2>&nbsp;</h2>
<h2>Authentication failures and loading SSH key</h2>
<p>&nbsp;</p>
<p>When you open local repository with Git Extensions and want to update  or&nbsp; push you changes from/to remote GitHub repository,&nbsp; you might fail  into authentication error:</p>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-74Fwc03-rR4/T3GIcsc3FXI/AAAAAAAAOZM/vo9uDgbJQjQ/s1600/2012-03-27+11h25_12.png" style="margin-left: 1em; margin-right: 1em;"><img border="0" alt="" src="http://3.bp.blogspot.com/-74Fwc03-rR4/T3GIcsc3FXI/AAAAAAAAOZM/vo9uDgbJQjQ/s1600/2012-03-27+11h25_12.png" /></a></div>
<p><br />
It happens if your SSH key has not been loaded yet. Don't panic, click  &quot;Load SSH key&quot;, select your SSH private key and then click &quot;Retry&quot;.</p>
<h2>&nbsp;</h2>
<h2>Thank you</h2>
<p>&nbsp;</p>
<p>I hope you find this tutorial helpful.<br />
<br />
If you have any questions, please put your comment here.</p>
