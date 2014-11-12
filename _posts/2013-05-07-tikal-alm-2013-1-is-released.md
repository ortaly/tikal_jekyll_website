---
layout: post
title: Tikal ALM 2013.1 is released
created: 1367943176
author: liya
permalink: /devops/tikal-alm-20131-released
tags:
- DevOps
- bugzilla alm
---
<p>Tikal ALM 2013.1 release includes new features and bug fixes in Tikal Bugzilla.</p>
<h4>
	New Features</h4>
<h5>
	For Users</h5>
<p>- Added option in User Preferences to have 8 queries results on the Homepage instead of 4.&nbsp; See Actions-&gt;User-&gt;Preferences-&gt;Homepage</p>
<h5>
	For Administrators</h5>
<p>- Added gitweb integration<br />
	&nbsp; See Actions-&gt;Administration-&gt;Parameters-&gt;Administrative Policies<br />
	&nbsp; &#39;gitweburl&#39; parameter should be set to the base path as&nbsp; &#39;http://yourserver/?p=yourrepo&amp;a=search&amp;h=HEAD&amp;st=commit&amp;sr=1&amp;s=[BugIdIssueId]%3A&#39;<br />
	<br />
	- Add parameter to make file attachments to be a default<br />
	&nbsp; See Actions-&gt;Administration-&gt;Parameters-&gt;Attachments<br />
	&nbsp; &#39;localattachment_default&#39; parameter can be set to &#39;On&#39;<br />
	<br />
	- Bugzilla utilities: add sendmail option to updateFieldValue and updateStatusResolution function<br />
	- Bugzilla utilities: add comment option to updateStatusResolution function<br />
	- Bugzilla utilities: add addComment function<br />
	- Add script to convert singleselect custom field to multiselect custom field (migrate_singleselect2multiselect.pl)</p>
<h4>
	Bugs fixes</h4>
<p>#2538 - New/Browse menus look bad in IE7, IE8 and IE9 when using classifications<br />
	#2540 - When CRM is cleared, db is not updated correctly<br />
	#2544 - CRM is partially cleared on mass update<br />
	#2542 - Resolver appears as userid instead of login in issue activity</p>
<p>&nbsp;</p>
