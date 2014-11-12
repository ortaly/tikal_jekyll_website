---
layout: post
title: 'Get windows Environment Variables in AIR application '
created: 1327439479
author: vladislavm
permalink: /js/get-windows-environment-variables-air-application
tags:
- JS
- Windows
---
<p><style type="text/css">
/* Style Definitions */
table.MsoNormalTable
{mso-style-name:"Table Normal";
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-style-noshow:yes;
mso-style-priority:99;
mso-style-parent:"";
mso-padding-alt:0in 5.4pt 0in 5.4pt;
mso-para-margin-top:0in;
mso-para-margin-right:0in;
mso-para-margin-bottom:10.0pt;
mso-para-margin-left:0in;
line-height:115%;
mso-pagination:widow-orphan;
font-size:11.0pt;
font-family:"Calibri","sans-serif";
mso-ascii-font-family:Calibri;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Calibri;
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;
mso-bidi-theme-font:minor-bidi;
mso-bidi-language:AR-SA;}
</style></p>
<p><span style="font-size: small;"><span style="font-family: Verdana;">Writing Desktop application in AIR has certain security limitations, especially when your application will run under Vista or Windows 7 OS. For example, if there is an external process you want to invoke from Flex, sometimes it requires administrator access. In that case you should run the AIR application in administrator mode and this will solve the problem.</span></span></p>
<p><span style="font-size: small;"><span style="font-family: Verdana;"><br />
</span></span></p>
<p><span style="font-size: small;"><span style="font-family: Verdana;">But let's take more complicated case - you have no idea of exact path to external application. Meaning, no absolute path can be used - the external tool can be installed in any folder. There is a standard solution for this kind of cases, when the path to the application appears in windows Environment Variables. So you can just get the path by request of specific environment variables from OS.... Unfortunately, you can't. There is no such object in Flex that could make our life easier.</span></span></p>
<p>&nbsp;</p>
<p class="MsoNormal"><span style="font-size: small;"><span style="font-family: Verdana;">I&rsquo;m not sure the way I found is a best one, but it works. We can use external batch file (<b>pathfinder.bat</b>) which will request and print to STDOUT required variable:</span></span></p>
<pre title="code" class="brush: java;">
ECHO ON 
set TOOL1_PATH 
set TOOL2_PATH
</pre>
<p class="MsoNormal">&nbsp;</p>
<p class="MsoNormal"><!--[if gte mso 9]><xml>
<o:OfficeDocumentSettings>
<o:AllowPNG />
</o:allowpng></o:officedocumentsettings>
</xml><![endif]--><!--[if gte mso 9]><xml>
<w:WordDocument>
<w:View>Normal</w:view>
<w:Zoom>0</w:zoom>
<w:TrackMoves />
<w:TrackFormatting />
<w:PunctuationKerning />
<w:ValidateAgainstSchemas />
<w:SaveIfXMLInvalid>false</w:saveifxmlinvalid>
<w:IgnoreMixedContent>false</w:ignoremixedcontent>
<w:AlwaysShowPlaceholderText>false</w:alwaysshowplaceholdertext>
<w:DoNotPromoteQF />
<w:LidThemeOther>EN-US</w:lidthemeother>
<w:LidThemeAsian>X-NONE</w:lidthemeasian>
<w:LidThemeComplexScript>HE</w:lidthemecomplexscript>
<w:Compatibility>
<w:BreakWrappedTables />
<w:SnapToGridInCell />
<w:WrapTextWithPunct />
<w:UseAsianBreakRules />
<w:DontGrowAutofit />
<w:SplitPgBreakAndParaMark />
<w:EnableOpenTypeKerning />
<w:DontFlipMirrorIndents />
<w:OverrideTableStyleHps />
</w:overridetablestylehps></w:dontflipmirrorindents></w:enableopentypekerning></w:splitpgbreakandparamark></w:dontgrowautofit></w:useasianbreakrules></w:wraptextwithpunct></w:snaptogridincell></w:breakwrappedtables></w:compatibility>
<m:mathPr>
<m:mathFont m:val="Cambria Math" />
<m:brkBin m:val="before" />
<m:brkBinSub m:val="&#45;-" />
<m:smallFrac m:val="off" />
<m:dispDef />
<m:lMargin m:val="0" />
<m:rMargin m:val="0" />
<m:defJc m:val="centerGroup" />
<m:wrapIndent m:val="1440" />
<m:intLim m:val="subSup" />
<m:naryLim m:val="undOvr" />
</m:narylim></m:intlim></m:wrapindent></m:defjc></m:rmargin></m:lmargin></m:dispdef></m:smallfrac></m:brkbinsub></m:brkbin></m:mathfont></m:mathpr></w:donotpromoteqf></w:validateagainstschemas></w:punctuationkerning></w:trackformatting></w:trackmoves></w:worddocument>
</xml><![endif]--><!--[if gte mso 9]><xml>
<w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="true"
DefSemiHidden="true" DefQFormat="false" DefPriority="99"
LatentStyleCount="267">
<w:LsdException Locked="false" Priority="0" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Normal" />
<w:LsdException Locked="false" Priority="9" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="heading 1" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 2" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 3" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 4" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 5" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 6" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 7" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 8" />
<w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 9" />
<w:LsdException Locked="false" Priority="39" Name="toc 1" />
<w:LsdException Locked="false" Priority="39" Name="toc 2" />
<w:LsdException Locked="false" Priority="39" Name="toc 3" />
<w:LsdException Locked="false" Priority="39" Name="toc 4" />
<w:LsdException Locked="false" Priority="39" Name="toc 5" />
<w:LsdException Locked="false" Priority="39" Name="toc 6" />
<w:LsdException Locked="false" Priority="39" Name="toc 7" />
<w:LsdException Locked="false" Priority="39" Name="toc 8" />
<w:LsdException Locked="false" Priority="39" Name="toc 9" />
<w:LsdException Locked="false" Priority="35" QFormat="true" Name="caption" />
<w:LsdException Locked="false" Priority="10" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Title" />
<w:LsdException Locked="false" Priority="1" Name="Default Paragraph Font" />
<w:LsdException Locked="false" Priority="11" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Subtitle" />
<w:LsdException Locked="false" Priority="22" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Strong" />
<w:LsdException Locked="false" Priority="20" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Emphasis" />
<w:LsdException Locked="false" Priority="59" SemiHidden="false"
UnhideWhenUsed="false" Name="Table Grid" />
<w:LsdException Locked="false" UnhideWhenUsed="false" Name="Placeholder Text" />
<w:LsdException Locked="false" Priority="1" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="No Spacing" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 1" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 1" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 1" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 1" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 1" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 1" />
<w:LsdException Locked="false" UnhideWhenUsed="false" Name="Revision" />
<w:LsdException Locked="false" Priority="34" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="List Paragraph" />
<w:LsdException Locked="false" Priority="29" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Quote" />
<w:LsdException Locked="false" Priority="30" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Intense Quote" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 1" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 1" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 1" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 1" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 1" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 1" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 1" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 1" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 2" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 2" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 2" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 2" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 2" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 2" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 2" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 2" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 2" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 2" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 2" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 2" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 2" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 2" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 3" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 3" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 3" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 3" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 3" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 3" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 3" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 3" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 3" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 3" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 3" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 3" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 3" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 3" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 4" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 4" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 4" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 4" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 4" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 4" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 4" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 4" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 4" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 4" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 4" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 4" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 4" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 4" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 5" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 5" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 5" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 5" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 5" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 5" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 5" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 5" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 5" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 5" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 5" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 5" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 5" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 5" />
<w:LsdException Locked="false" Priority="60" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Shading Accent 6" />
<w:LsdException Locked="false" Priority="61" SemiHidden="false"
UnhideWhenUsed="false" Name="Light List Accent 6" />
<w:LsdException Locked="false" Priority="62" SemiHidden="false"
UnhideWhenUsed="false" Name="Light Grid Accent 6" />
<w:LsdException Locked="false" Priority="63" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 1 Accent 6" />
<w:LsdException Locked="false" Priority="64" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Shading 2 Accent 6" />
<w:LsdException Locked="false" Priority="65" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 1 Accent 6" />
<w:LsdException Locked="false" Priority="66" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium List 2 Accent 6" />
<w:LsdException Locked="false" Priority="67" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 1 Accent 6" />
<w:LsdException Locked="false" Priority="68" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 2 Accent 6" />
<w:LsdException Locked="false" Priority="69" SemiHidden="false"
UnhideWhenUsed="false" Name="Medium Grid 3 Accent 6" />
<w:LsdException Locked="false" Priority="70" SemiHidden="false"
UnhideWhenUsed="false" Name="Dark List Accent 6" />
<w:LsdException Locked="false" Priority="71" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Shading Accent 6" />
<w:LsdException Locked="false" Priority="72" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful List Accent 6" />
<w:LsdException Locked="false" Priority="73" SemiHidden="false"
UnhideWhenUsed="false" Name="Colorful Grid Accent 6" />
<w:LsdException Locked="false" Priority="19" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Subtle Emphasis" />
<w:LsdException Locked="false" Priority="21" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Intense Emphasis" />
<w:LsdException Locked="false" Priority="31" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Subtle Reference" />
<w:LsdException Locked="false" Priority="32" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Intense Reference" />
<w:LsdException Locked="false" Priority="33" SemiHidden="false"
UnhideWhenUsed="false" QFormat="true" Name="Book Title" />
<w:LsdException Locked="false" Priority="37" Name="Bibliography" />
<w:LsdException Locked="false" Priority="39" QFormat="true" Name="TOC Heading" />
</w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:latentstyles>
</xml><![endif]--><!--[if gte mso 10]>
<style>
/* Style Definitions */
table.MsoNormalTable
{mso-style-name:"Table Normal";
mso-tstyle-rowband-size:0;
mso-tstyle-colband-size:0;
mso-style-noshow:yes;
mso-style-priority:99;
mso-style-parent:"";
mso-padding-alt:0in 5.4pt 0in 5.4pt;
mso-para-margin-top:0in;
mso-para-margin-right:0in;
mso-para-margin-bottom:10.0pt;
mso-para-margin-left:0in;
line-height:115%;
mso-pagination:widow-orphan;
font-size:11.0pt;
font-family:"Calibri","sans-serif";
mso-ascii-font-family:Calibri;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Calibri;
mso-hansi-theme-font:minor-latin;
mso-bidi-font-family:Arial;
mso-bidi-theme-font:minor-bidi;
mso-bidi-language:AR-SA;}
</style>
<![endif]--></p>
<p class="MsoNormal"><span style="font-size: small;"><span style="font-family: Verdana;">To run the .bat file we&rsquo;ll have to use cmd.exe as NativeProcess (we cannot run .bat file directly from AS). Luckily, it&rsquo;s always there, in <strong>&quot;C:\\Windows\\System32\\cmd.exe&quot;</strong>, no matter what kind of windows, x32 or x64.</span></span></p>
<p><span style="font-size: small;"><span style="font-family: Verdana;">  <span style="line-height: 115%;">We just run the cmd.exe, catch STDOUT with all outputs and parsing to get required environment variables:</span></span></span></p>
<pre title="code" class="brush: java;">
private function getPath():void
{			
	var pathFinder:NativeProcess = new NativeProcess;
			pathFinder.addEventListener(ProgressEvent.STANDARD_ERROR_DATA, handlePathError);
			pathFinder.addEventListener(ProgressEvent.STANDARD_OUTPUT_DATA, handlePathOut);
			
	var startupInfo:NativeProcessStartupInfo = new NativeProcessStartupInfo();
	var file:File =  new File(&quot;C:\\Windows\\System32\\cmd.exe&quot;); 
	var args:Vector.&lt;String&gt; = new Vector.&lt;String&gt;();
			
	args.push(&quot;/c&quot;);
	args.push(File.applicationDirectory.nativePath +  \\bat\\pathfinder.bat&quot;);
			
	startupInfo.arguments = args;
	startupInfo.executable = file;
	try
	{				
		if (NativeProcess.isSupported)
			pathFinder.start(startupInfo);				
	}
	catch (error:Error)
	{
		Alert.show(&quot;Failed to run pathfinder&quot;,	'ERROR');
	}				
}
		
private function handlePathError(pe:ProgressEvent):void
{
	var stdio:IDataInput = (pe.currentTarget as NativeProcess).standardError;
	var error:String = stdio.readUTFBytes(stdio.bytesAvailable);
			
	Alert.show(error,	'ERROR');
}
		
private function handleDbengPathOut(pe:ProgressEvent):void
{
	var stdio:IDataInput = (pe.currentTarget as NativeProcess).standardOutput;
	var output:String = stdio.readUTFBytes(stdio.bytesAvailable);
	var outArr:Array = output.split(&quot;\n&quot;);
	for (var i:int=0; i &lt; outArr.length; i++)
	{
		if ((outArr[i] as String).indexOf(&quot;TOOL1_PATH=&quot;) &gt; -1)
		{
			toolOnePath = StringUtil.trim((outArr[i] as String).split(&quot;=&quot;)[1]);
					
			runToolOne();
		}
				
		if ((outArr[i] as String).indexOf(&quot;TOOL2_PATH=&quot;) &gt; -1)
		{
			toolTwoPath = StringUtil.trim((outArr[i] as String).split(&quot;=&quot;)[1]);	
					
			runToolTwo();
		}
	}
}
</pre>
<p>&nbsp;</p>
<p>It's ugly. But it works</p>
<!--![endif]__comment__end__</p-->
<!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if-->
<p>&nbsp;</p>
