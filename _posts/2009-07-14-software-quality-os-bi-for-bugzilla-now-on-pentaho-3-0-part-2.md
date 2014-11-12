---
layout: post
title: Software Quality – OS BI for Bugzilla – now on Pentaho 3.0 - part 2
created: 1247554385
author: udid
permalink: /devops/software-quality-–-os-bi-bugzilla-–-now-pentaho-30-part-2
tags:
- DevOps
- SQR
- Pentaho
- OSBI
- bugzilla
---
<h6>The first part of this post can be found&nbsp;<a title="here" id="here" name="here" href="http://tikalk.tikalknowledge.com/java/software-quality-%E2%80%93-os-bi-bugzilla-%E2%80%93-now-pentaho-30">here</a></h6>
<br />
<p style="margin-bottom: 0in;">The Software Quality Report (SQR) were build for version 1.2 of the Pentaho BI Platform.</p>
<p style="margin-bottom: 0in;">In this document is the list of changes and fixes for the Penatho BI Platform 3.x from version 1.2 of the Pentaho BI Platform.</p>
<p style="margin-bottom: 0in;">&nbsp;</p>
<ol>
    <li>
    <p style="margin-bottom: 0in;">Pre-Requirements</p>
    <ul>
        <li>
        <p style="margin-bottom: 0in;">Kettle (Data Integration / 		ETL)<br />
        can be downloaded 		at:<br />
        <a href="http://sourceforge.net/project/showfiles.php?group_id=140317&amp;package_id=186321">http://sourceforge.net/project/showfiles.php?group_id=140317&amp;package_id=186321</a><br />
        &nbsp;</p>
        </li>
    </ul>
    </li>
</ol>
<ol>
    <ul>
        <li>
        <p style="margin-bottom: 0in;"><span style="display: none;" id="1247679686800S">&nbsp;</span><span style="display: none;" id="1247679694622S">&nbsp;</span><span style="display: none;" id="1247679692551S">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>Pentaho Reporting (Reporting)<br />
        can 		be downloaded 		at:<br />
        http://sourceforge.net/project/showfiles.php?group_id=51669<br />
        <span style="display: none;" id="1247679687159E">&nbsp;</span>&nbsp;<span style="display: none;" id="1247679694797E">&nbsp;</span><span style="display: none;" id="1247679693040E">&nbsp;</span></p>
        </li>
    </ul>
</ol>
<ol start="2">
    <li>
    <p style="margin-bottom: 0in;">Run the installation process found 	in the InstallPentahoBi_WithSQR.odt document<br />
    &nbsp;</p>
    </li>
    <li>
    <p style="margin-bottom: 0in;">Populate the SQR repository is 	done using the Pentaho Data Integration tool (Kettle).<br />
    &nbsp;</p>
    </li>
</ol>
<ol>
    <ul>
        <li>
        <p style="margin-bottom: 0in;">The code (Transformations \ Jobs) 		for this process was compiled to version 1.2 of the Pentaho BI 		Platform.<br />
        It is recommended to recompile all code  		(Transformations \ Jobs) for verion 3.x</p>
        </li>
    </ul>
</ol>
<ol>
    <ul>
        <ul>
            <li>
            <p style="margin-bottom: 0in;">open each transformation \ job 			found in the 			$PENTAHO_ROOT/biserver-ce/pentaho-solutions/software-quality/data/etl 			folder.<br />
            &nbsp;</p>
            </li>
            <li>
            <p style="margin-bottom: 0in;">save each transformation \ job  			<br />
            &nbsp;</p>
            </li>
        </ul>
    </ul>
</ol>
<ol>
    <ul>
        <li>
        <p style="margin-bottom: 0in;">Some of the transformations \ 		jobs have bugs in them the below fixes have been made to the 		transformations \ jobs :<br />
        &nbsp;</p>
        </li>
    </ul>
</ol>
<ol>
    <ul>
        <ul>
            <li>
            <p style="margin-bottom: 0in;">drop_tables_and_views.kjb<br />
            &nbsp;</p>
            <ol>
                <li>
                <p style="margin-bottom: 0in;">Edit the &ldquo;Drop Views&rdquo; SQL 				Script<br />
                <br />
                Add &ldquo;if exists&rdquo; to all drop statements<br />
                e.g. 				<br />
                <font color="#0000ff"><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><b>drop 				view </b></font></font></font><font face="Courier, monospace"><font size="2" style="font-size: 9pt;">v_current_issues;<br />
                </font></font><font face="Nimbus Roman No9 L, serif"><font size="3">Will 				be changed to:</font></font><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><br />
                </font></font><font color="#0000ff"><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><b>drop 				view if exists </b></font></font></font><font face="Courier, monospace"><font size="2" style="font-size: 9pt;">v_current_issues;<br />
                </font></font></p>
                </li>
                <li>
                <p style="margin-bottom: 0in;">Edit the &ldquo;Drop Tables&rdquo; SQL 				Script<br />
                <br />
                Add &ldquo;if exists&rdquo; to all drop statements<br />
                <br />
                e.g. 				<br />
                <font color="#0000ff"><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><b>DROP 				TABLE </b></font></font></font><font face="Courier, monospace"><font size="2" style="font-size: 9pt;">int_issue;<br />
                </font></font><font face="Nimbus Roman No9 L, serif"><font size="3">Will 				be changed to:</font></font></p>
                <p style="margin-bottom: 0in;"><font color="#0000ff"><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><b>DROP 				TABLE if exists </b></font></font></font><font face="Courier, monospace"><font size="2" style="font-size: 9pt;">int_issue;</font></font><font color="#0000ff"><font face="Courier, monospace"><font size="2" style="font-size: 9pt;"><b><br />
                <br />
                </b></font></font></font></p>
                </li>
            </ol>
            </li>
            <li>
            <p style="margin-bottom: 0in;">bugz_int_issue_step3.ktr<br />
            &nbsp;</p>
            <ol>
                <li>
                <p style="margin-bottom: 0in;">The STATUS_NAT_ID field is 				converted to number (and sometime holds space)<br />
                A step to 				remove the space from the field needs to be added<br />
                &nbsp;</p>
                <p style="margin-bottom: 0in;">You can add a calculator \ java 				script expression to remove the spaces between the &ldquo;Stream 				Lookup&rdquo; and the &ldquo;Calculator&rdquo; steps<br />
                &nbsp;</p>
                </li>
            </ol>
            </li>
            <li>
            <p style="margin-bottom: 0in;">summary_fact_issue_monthly.ktr<br />
            &nbsp;</p>
            <ol>
                <li>
                <p style="margin-bottom: 0in;">The PRODUCT_NAME and 				ISSUE_TYPE_NAME cannot be null so another  condition is needs in 				the java_script transformation:</p>
                </li>
            </ol>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;"><br />
            <font size="3">Change</font>:<br />
            <br />
            if (prevRow != null &amp;&amp; </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	PRODUCT_NAME.getString().equals(prevRow.getString(&quot;PRODUCT_NAME&quot;, 			&quot;&quot;)) &amp;&amp; </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	ISSUE_TYPE_NAME.getString().equals(prevRow.getString(&quot;ISSUE_TYPE_NAME&quot;, 			&quot;&quot;)) </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">) 			{ </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;"><br />
            <font size="3">To 			be:</font><br />
            </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">if 			(prevRow != null &amp;&amp; </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	 			</font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	<font color="#2300dc">!PRODUCT_NAME.isNull() 			&amp;&amp; !ISSUE_TYPE_NAME.isNull() &amp;&amp; </font></font></p>
            <p style="margin-bottom: 0in;">&nbsp;</p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	PRODUCT_NAME.getString().equals(prevRow.getString(&quot;PRODUCT_NAME&quot;, 			&quot;&quot;)) &amp;&amp; </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">	ISSUE_TYPE_NAME.getString().equals(prevRow.getString(&quot;ISSUE_TYPE_NAME&quot;, 			&quot;&quot;)) </font></p>
            <p style="margin-bottom: 0in;"><font size="2" style="font-size: 9pt;">) 			{</font><br />
            &nbsp;</p>
            </li>
        </ul>
    </ul>
</ol>
<ol start="4">
    <li>
    <p style="margin-bottom: 0in;">Running the reports using the 	Pentaho 	&ldquo;report-designer&rdquo;<br />
    biserver-ce/pentaho-solutions/software-quality/reports/</p>
    </li>
</ol>
<ol>
    <ul>
        <li>
        <p style="margin-bottom: 0in;">Some of the reports s have bugs 		in them the below fixes have been made to the reports <br />
        The 		reports can be found in the 		<br />
        $PENTAHO_ROOT/biserver-ce/pentaho-solutions/software-quality/reports/</p>
        <p style="margin-bottom: 0in;">&nbsp;</p>
        </li>
    </ul>
</ol>
<p>&nbsp;</p>
