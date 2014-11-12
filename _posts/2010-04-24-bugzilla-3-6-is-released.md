---
layout: post
title: Bugzilla 3.6 is released
created: 1272133837
author: liya
permalink: /java/bugzilla-36-released
tags:
- JAVA
- bugzilla
---
<p><span style="font-family: Verdana;"><span style="font-size: small;">The  next major version of Bugzilla was released on the 13th of April.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;"> Bugzilla  3.6 has a     lot of new features for Bugzilla users and administrators.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;"><br />
</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;"> Here  is the list of the <span style="font-size: larger;"><u>most interesting New Features and Improvements</u></span>:</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- General  Usability Improvements</span></span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;">A </span></span><span style="font-size: small;"><a href="https://wiki.mozilla.org/Bugzilla:CMU_HCI_Research_2008"><span style="font-family: Verdana;">scientific     usability study</span></a></span><span style="font-family: Verdana;"><span style="font-size: small;"> was done on Bugzilla by researchers   from Carnegie-Mellon University. As a result of this study,   </span></span><span style="font-size: small;"><a href="https://bugzilla.mozilla.org/showdependencytree.cgi?id=490786&amp;hide_resolved=0"><span style="font-family: Verdana;">several     usability issues</span></a></span><span style="font-family: Verdana;"><span style="font-size: small;"> were prioritized to be fixed, based on specific  data   from the study. As a result, you will see many small improvements in  Bugzilla's   usability, such as using Javascript to validate certain forms before   they are submitted, standardizing the words that we use in the user  interface,   being clearer about what Bugzilla needs from the user,   and etc.</span><br />
</span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;"> <em>[Some of these features and improvements were already  covered in Tikal  Bugzilla.]</em></span><br />
</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- New Extensions System</span></span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;">Bugzilla has a  brand-new Extensions system, which is   consistent, fast, and   </span></span><span style="font-size: small;"><a href="http://www.bugzilla.org/docs/3.6/en/html/api/Bugzilla/Extension.html"><span style="font-family: Verdana;">fully     documented</span></a></span><span style="font-family: Verdana;"><span style="font-size: small;">. It makes it possible to easily extend Bugzilla's   code and user interface to add new features or change existing  features.</span><br />
</span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;"> <em>[We will try to re-implement at least some of Tikal  Bugzilla features using this new extensions system]</em></span><br />
</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Improved  Quicksearch</span></span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;">The &quot;quicksearch&quot; box that appears on the front page of   Bugzilla and in the header/footer of every page   is now simplified and made more powerful. </span></span><span style="font-size: small;"><a href="http://www.bugzilla.org/releases/3.6/page.cgi?id=quicksearch.html"><span style="font-family: Verdana;">Quicksearch   Help</span></a></span><span style="font-family: Verdana;"><span style="font-size: small;"> describes every single feature of the system in a simple  layout,   including new features such as the ability to use partial field names   when searching.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Simple &quot;Browse&quot; Interface</span></span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;">There is  now a &quot;Browse&quot; link in the header of each Bugzilla   page that presents a very basic interface that allows users to simply   browse through all open bugs in particular components.</span><br />
</span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;"> <em>[I believe  it will replace Tikal Bugzilla Browse]</em></span><br />
</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Send Attachments  by Email</span></span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: small;">The </span></span><span style="font-size: small;"><a href="http://www.bugzilla.org/docs/3.6/en/html/api/email_in.html"><span style="font-family: Verdana;">email_in</span></a></span><span style="font-family: Verdana;"><span style="font-size: small;">   script now supports attaching multiple attachments to a bug   by email, both when filing and when updating a bug.</span><br />
</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Migration  From Other Bug-Trackers</span> <br />
</span></p>
<p class="rteindent1"><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;">Bugzilla 3.6 comes with a new script,   </span></span></span><span style="font-size: medium;"><span style="font-size: small;"><a href="http://www.bugzilla.org/docs/3.6/en/html/api/migrate.html"><span style="font-family: Verdana;">migrate.pl</span></a></span></span><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;">,   which allows migration from other bug-tracking systems.   Among the various features of the migration system are:</span></span><br />
</span></p>
<p class="rteindent2"><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;"> - It is  non-destructive--you can migrate into an existing     Bugzilla installation without destroying any data     in the installation.</span></span><br />
</span></p>
<p class="rteindent2"><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;"> - It has a &quot;dry-run&quot; mode so you can test  your migration     before actually running it.</span></span><br />
</span></p>
<p class="rteindent2"><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;"> - It is relatively easy to write new  migrators for new systems - the basic migration framework does most of  the  work     for you, see the     </span></span></span><span style="font-size: medium;"><span style="font-size: small;"><a href="http://www.bugzilla.org/docs/3.6/en/html/api/Bugzilla/Migrate.html"><span style="font-family: Verdana;">Bugzilla::Migrate</span></a></span></span><span style="font-family: Verdana;"><span style="font-size: medium;"><span style="font-size: small;">     documentation and see our current migrator,     <kbd>Bugzilla/Migrate/GNATS.pm</kbd> for information on how to make  your     own migrator.</span></span><br />
</span></p>
<p><span style="font-family: Verdana;">&nbsp;</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: larger;"><u>Other selected Enhancements and Changes</u></span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Bug  Editing: There have been significant performance     improvements in <kbd>show_bug.cgi</kbd> (the script that displays  thebug-editing form), particularly for bugs that     have lots of comments or attachments.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Attachments: We now make sure that there is     a Description specified for an attachment, using JavaScript, before     the form is submitted.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;"> [Already implemented in Tikal Bugzilla]</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Attachments: There is now a link back to the bug     at the bottom of the &quot;Details&quot; page for an attachment.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Search: When viewing search results, you can see which  columns  are     being sorted on, and which direction the sort is on, as indicated     by arrows next to the column headers.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Search: You can now search the Deadline field using relative     dates (like &quot;1d&quot;, &quot;2w&quot;, etc.).</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- New Charts: You can now convert an existing Saved Search     into a data series for New Charts.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- New Charts: There is now an interface that allows you to     delete data series.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- New Charts: When deleting a product, you now have the  option     to delete the data series that are associated with that product.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Administration: The <kbd>UNCONFIRMED</kbd> status being  enabled in a product     is now unrelated to the voting parameters. Instead, there is a</span></span></p>
<p><span style="font-family: Verdana;"> <span style="font-size: small;">checkbox     to enable the <kbd>UNCONFIRMED</kbd> status in a product.</span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">- Administration: Information about duplicates is now stored in  the database instead     of being stored in the <kbd>data/</kbd> directory. On large  installations     this could save several hundred megabytes of disk space.</span></span></p>
<p><span style="font-family: Verdana;">&nbsp;</span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;"> </span></span></p>
<p><span style="font-family: Verdana;"><span style="font-size: small;">For more information see the full </span></span><span style="font-size: small;"><a href="http://www.bugzilla.org/releases/3.6/release-notes.html"><span style="font-family: Verdana;">Bugzilla  3.6. Release Notes</span></a><span style="font-family: Verdana;">.<br />
</span></span></p>
<p><span style="font-family: Verdana;">&nbsp;</span></p>
<p><span style="font-family: Verdana;"><br />
</span></p>
