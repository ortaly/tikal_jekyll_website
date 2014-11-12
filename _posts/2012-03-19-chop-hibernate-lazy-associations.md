---
layout: post
title: Chop Hibernate Lazy Associations
created: 1332189595
author: yanai
permalink: /chop-hibernate-lazy-associations
tags:
- JAVA
- Hibernate JPA Lazy Associations
---
<p>&nbsp;</p>
<!--[if gte mso 9]><xml>
<o:DocumentProperties>
<o:Revision>0</o:revision>
<o:TotalTime>0</o:totaltime>
<o:Pages>1</o:pages>
<o:Words>639</o:words>
<o:Characters>3645</o:characters>
<o:Company>Tikal</o:company>
<o:Lines>30</o:lines>
<o:Paragraphs>8</o:paragraphs>
<o:CharactersWithSpaces>4276</o:characterswithspaces>
<o:Version>14.0</o:version>
</o:documentproperties>
<o:OfficeDocumentSettings>
<o:AllowPNG />
</o:allowpng></o:officedocumentsettings>
</xml><![endif]-->  <!--[if gte mso 9]><xml>
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
<w:LidThemeAsian>JA</w:lidthemeasian>
<w:LidThemeComplexScript>X-NONE</w:lidthemecomplexscript>
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
<w:UseFELayout />
</w:usefelayout></w:overridetablestylehps></w:dontflipmirrorindents></w:enableopentypekerning></w:splitpgbreakandparamark></w:dontgrowautofit></w:useasianbreakrules></w:wraptextwithpunct></w:snaptogridincell></w:breakwrappedtables></w:compatibility>
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
LatentStyleCount="276">
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
</xml><![endif]-->  <!--[if gte mso 10]>
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
mso-para-margin:0in;
mso-para-margin-bottom:.0001pt;
mso-pagination:widow-orphan;
font-size:12.0pt;
font-family:Cambria;
mso-ascii-font-family:Cambria;
mso-ascii-theme-font:minor-latin;
mso-hansi-font-family:Cambria;
mso-hansi-theme-font:minor-latin;}
</style>
<![endif]-->    <!--StartFragment-->
<p class="MsoNormal"><o:p></o:p></p>
<p class="MsoNormal"><!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Revision>0</o:revision>
  <o:TotalTime>0</o:totaltime>
  <o:Pages>1</o:pages>
  <o:Words>639</o:words>
  <o:Characters>3645</o:characters>
  <o:Company>Tikal</o:company>
  <o:Lines>30</o:lines>
  <o:Paragraphs>8</o:paragraphs>
  <o:CharactersWithSpaces>4276</o:characterswithspaces>
  <o:Version>14.0</o:version>
 </o:documentproperties>
 <o:OfficeDocumentSettings>
  <o:AllowPNG/>
 </o:allowpng/></o:officedocumentsettings>
</xml><![endif]-->  <!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:View>Normal</w:view>
  <w:Zoom>0</w:zoom>
  <w:TrackMoves/>
  <w:TrackFormatting/>
  <w:PunctuationKerning/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:saveifxmlinvalid>
  <w:IgnoreMixedContent>false</w:ignoremixedcontent>
  <w:AlwaysShowPlaceholderText>false</w:alwaysshowplaceholdertext>
  <w:DoNotPromoteQF/>
  <w:LidThemeOther>EN-US</w:lidthemeother>
  <w:LidThemeAsian>JA</w:lidthemeasian>
  <w:LidThemeComplexScript>X-NONE</w:lidthemecomplexscript>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:EnableOpenTypeKerning/>
   <w:DontFlipMirrorIndents/>
   <w:OverrideTableStyleHps/>
   <w:UseFELayout/>
  </w:usefelayout/></w:overridetablestylehps/></w:dontflipmirrorindents/></w:enableopentypekerning/></w:splitpgbreakandparamark/></w:dontgrowautofit/></w:useasianbreakrules/></w:wraptextwithpunct/></w:snaptogridincell/></w:breakwrappedtables/></w:compatibility>
  <m:mathPr>
   <m:mathFont m:val="Cambria Math"/>
   <m:brkBin m:val="before"/>
   <m:brkBinSub m:val="&#45;-"/>
   <m:smallFrac m:val="off"/>
   <m:dispDef/>
   <m:lMargin m:val="0"/>
   <m:rMargin m:val="0"/>
   <m:defJc m:val="centerGroup"/>
   <m:wrapIndent m:val="1440"/>
   <m:intLim m:val="subSup"/>
   <m:naryLim m:val="undOvr"/>
  </m:narylim></m:intlim></m:wrapindent></m:defjc></m:rmargin></m:lmargin></m:dispdef/></m:smallfrac></m:brkbinsub></m:brkbin></m:mathfont></m:mathpr></w:donotpromoteqf/></w:validateagainstschemas/></w:punctuationkerning/></w:trackformatting/></w:trackmoves/></w:worddocument>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="true"
  DefSemiHidden="true" DefQFormat="false" DefPriority="99"
  LatentStyleCount="276">
  <w:LsdException Locked="false" Priority="0" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Normal"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="heading 1"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 2"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 3"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 4"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 5"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 6"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 7"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 8"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 9"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 1"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 2"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 3"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 4"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 5"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 6"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 7"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 8"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 9"/>
  <w:LsdException Locked="false" Priority="35" QFormat="true" Name="caption"/>
  <w:LsdException Locked="false" Priority="10" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Title"/>
  <w:LsdException Locked="false" Priority="1" Name="Default Paragraph Font"/>
  <w:LsdException Locked="false" Priority="11" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtitle"/>
  <w:LsdException Locked="false" Priority="22" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Strong"/>
  <w:LsdException Locked="false" Priority="20" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Emphasis"/>
  <w:LsdException Locked="false" Priority="59" SemiHidden="false"
   UnhideWhenUsed="false" Name="Table Grid"/>
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Placeholder Text"/>
  <w:LsdException Locked="false" Priority="1" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="No Spacing"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 1"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 1"/>
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Revision"/>
  <w:LsdException Locked="false" Priority="34" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="List Paragraph"/>
  <w:LsdException Locked="false" Priority="29" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Quote"/>
  <w:LsdException Locked="false" Priority="30" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Quote"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 1"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 1"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 2"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 2"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 2"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 3"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 3"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 3"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 4"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 4"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 4"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 5"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 5"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 5"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 6"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 6"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 6"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="19" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Emphasis"/>
  <w:LsdException Locked="false" Priority="21" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Emphasis"/>
  <w:LsdException Locked="false" Priority="31" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Reference"/>
  <w:LsdException Locked="false" Priority="32" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Reference"/>
  <w:LsdException Locked="false" Priority="33" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Book Title"/>
  <w:LsdException Locked="false" Priority="37" Name="Bibliography"/>
  <w:LsdException Locked="false" Priority="39" QFormat="true" Name="TOC Heading"/>
 </w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:latentstyles>
</xml><![endif]-->  <!--[if gte mso 10]>
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
	mso-para-margin:0in;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;}
</style>
<![endif]-->    <!--StartFragment--></p>
<p class="MsoNormal"><!--[if gte mso 9]><xml>
 <o:DocumentProperties>
  <o:Revision>0</o:revision>
  <o:TotalTime>0</o:totaltime>
  <o:Pages>1</o:pages>
  <o:Words>1042</o:words>
  <o:Characters>5941</o:characters>
  <o:Company>Tikal</o:company>
  <o:Lines>49</o:lines>
  <o:Paragraphs>13</o:paragraphs>
  <o:CharactersWithSpaces>6970</o:characterswithspaces>
  <o:Version>14.0</o:version>
 </o:documentproperties>
 <o:OfficeDocumentSettings>
  <o:AllowPNG/>
 </o:allowpng/></o:officedocumentsettings>
</xml><![endif]-->  <!--[if gte mso 9]><xml>
 <w:WordDocument>
  <w:View>Normal</w:view>
  <w:Zoom>0</w:zoom>
  <w:TrackMoves/>
  <w:TrackFormatting/>
  <w:PunctuationKerning/>
  <w:ValidateAgainstSchemas/>
  <w:SaveIfXMLInvalid>false</w:saveifxmlinvalid>
  <w:IgnoreMixedContent>false</w:ignoremixedcontent>
  <w:AlwaysShowPlaceholderText>false</w:alwaysshowplaceholdertext>
  <w:DoNotPromoteQF/>
  <w:LidThemeOther>EN-US</w:lidthemeother>
  <w:LidThemeAsian>JA</w:lidthemeasian>
  <w:LidThemeComplexScript>X-NONE</w:lidthemecomplexscript>
  <w:Compatibility>
   <w:BreakWrappedTables/>
   <w:SnapToGridInCell/>
   <w:WrapTextWithPunct/>
   <w:UseAsianBreakRules/>
   <w:DontGrowAutofit/>
   <w:SplitPgBreakAndParaMark/>
   <w:EnableOpenTypeKerning/>
   <w:DontFlipMirrorIndents/>
   <w:OverrideTableStyleHps/>
   <w:UseFELayout/>
  </w:usefelayout/></w:overridetablestylehps/></w:dontflipmirrorindents/></w:enableopentypekerning/></w:splitpgbreakandparamark/></w:dontgrowautofit/></w:useasianbreakrules/></w:wraptextwithpunct/></w:snaptogridincell/></w:breakwrappedtables/></w:compatibility>
  <m:mathPr>
   <m:mathFont m:val="Cambria Math"/>
   <m:brkBin m:val="before"/>
   <m:brkBinSub m:val="&#45;-"/>
   <m:smallFrac m:val="off"/>
   <m:dispDef/>
   <m:lMargin m:val="0"/>
   <m:rMargin m:val="0"/>
   <m:defJc m:val="centerGroup"/>
   <m:wrapIndent m:val="1440"/>
   <m:intLim m:val="subSup"/>
   <m:naryLim m:val="undOvr"/>
  </m:narylim></m:intlim></m:wrapindent></m:defjc></m:rmargin></m:lmargin></m:dispdef/></m:smallfrac></m:brkbinsub></m:brkbin></m:mathfont></m:mathpr></w:donotpromoteqf/></w:validateagainstschemas/></w:punctuationkerning/></w:trackformatting/></w:trackmoves/></w:worddocument>
</xml><![endif]--><!--[if gte mso 9]><xml>
 <w:LatentStyles DefLockedState="false" DefUnhideWhenUsed="true"
  DefSemiHidden="true" DefQFormat="false" DefPriority="99"
  LatentStyleCount="276">
  <w:LsdException Locked="false" Priority="0" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Normal"/>
  <w:LsdException Locked="false" Priority="9" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="heading 1"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 2"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 3"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 4"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 5"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 6"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 7"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 8"/>
  <w:LsdException Locked="false" Priority="9" QFormat="true" Name="heading 9"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 1"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 2"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 3"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 4"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 5"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 6"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 7"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 8"/>
  <w:LsdException Locked="false" Priority="39" Name="toc 9"/>
  <w:LsdException Locked="false" Priority="35" QFormat="true" Name="caption"/>
  <w:LsdException Locked="false" Priority="10" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Title"/>
  <w:LsdException Locked="false" Priority="1" Name="Default Paragraph Font"/>
  <w:LsdException Locked="false" Priority="11" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtitle"/>
  <w:LsdException Locked="false" Priority="22" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Strong"/>
  <w:LsdException Locked="false" Priority="20" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Emphasis"/>
  <w:LsdException Locked="false" Priority="59" SemiHidden="false"
   UnhideWhenUsed="false" Name="Table Grid"/>
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Placeholder Text"/>
  <w:LsdException Locked="false" Priority="1" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="No Spacing"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 1"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 1"/>
  <w:LsdException Locked="false" UnhideWhenUsed="false" Name="Revision"/>
  <w:LsdException Locked="false" Priority="34" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="List Paragraph"/>
  <w:LsdException Locked="false" Priority="29" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Quote"/>
  <w:LsdException Locked="false" Priority="30" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Quote"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 1"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 1"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 1"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 1"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 1"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 1"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 1"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 2"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 2"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 2"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 2"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 2"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 2"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 2"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 2"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 3"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 3"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 3"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 3"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 3"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 3"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 3"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 3"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 4"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 4"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 4"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 4"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 4"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 4"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 4"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 4"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 5"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 5"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 5"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 5"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 5"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 5"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 5"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 5"/>
  <w:LsdException Locked="false" Priority="60" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="61" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light List Accent 6"/>
  <w:LsdException Locked="false" Priority="62" SemiHidden="false"
   UnhideWhenUsed="false" Name="Light Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="63" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="64" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Shading 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="65" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="66" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium List 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="67" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 1 Accent 6"/>
  <w:LsdException Locked="false" Priority="68" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 2 Accent 6"/>
  <w:LsdException Locked="false" Priority="69" SemiHidden="false"
   UnhideWhenUsed="false" Name="Medium Grid 3 Accent 6"/>
  <w:LsdException Locked="false" Priority="70" SemiHidden="false"
   UnhideWhenUsed="false" Name="Dark List Accent 6"/>
  <w:LsdException Locked="false" Priority="71" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Shading Accent 6"/>
  <w:LsdException Locked="false" Priority="72" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful List Accent 6"/>
  <w:LsdException Locked="false" Priority="73" SemiHidden="false"
   UnhideWhenUsed="false" Name="Colorful Grid Accent 6"/>
  <w:LsdException Locked="false" Priority="19" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Emphasis"/>
  <w:LsdException Locked="false" Priority="21" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Emphasis"/>
  <w:LsdException Locked="false" Priority="31" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Subtle Reference"/>
  <w:LsdException Locked="false" Priority="32" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Intense Reference"/>
  <w:LsdException Locked="false" Priority="33" SemiHidden="false"
   UnhideWhenUsed="false" QFormat="true" Name="Book Title"/>
  <w:LsdException Locked="false" Priority="37" Name="Bibliography"/>
  <w:LsdException Locked="false" Priority="39" QFormat="true" Name="TOC Heading"/>
 </w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:lsdexception></w:latentstyles>
</xml><![endif]-->  <!--[if gte mso 10]>
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
	mso-para-margin:0in;
	mso-para-margin-bottom:.0001pt;
	mso-pagination:widow-orphan;
	font-size:12.0pt;
	font-family:Cambria;
	mso-ascii-font-family:Cambria;
	mso-ascii-theme-font:minor-latin;
	mso-hansi-font-family:Cambria;
	mso-hansi-theme-font:minor-latin;}
</style>
<![endif]-->    <!--StartFragment--></p>
<p class="MsoNormal">In many Java application architectures, the domain model is been used by the presentation tier as the &ldquo;Model&rdquo; in MVC architecture. This can be done with various Java Web Framework: Spring-MVC, JSF, GWT etc. <o:p></o:p></p>
<p class="MsoNormal">However, in many cases this is not the case, and you have different client-server architecture. The presentation tier might reside in a different process, for example: JavaScript, Flex, Silverlight and have their own process (or at least &ldquo;live&rdquo; within the browser process). In this case the client has its &ldquo;own&rdquo; model, which resides in a different address space at runtime than the server. The server may use one or more serialization libraries to marshal/unmashal its domain model to the client. For example, if you use <a href="http://en.wikipedia.org/wiki/Representational_state_transfer">REST</a> as your client-server architecture, you may use <a href="http://jackson.codehaus.org/">Jackson</a>. If you use <a href="http://en.wikipedia.org/wiki/SOAP">SOAP</a> as your communication protocol, you may use <a href="http://jaxb.java.net/">JAXB</a>. If you have FLEX client, you may use <a href="http://opensource.adobe.com/wiki/display/blazeds/BlazeDS">BlazeDS</a>. Sometimes, you may even use a few serialization mechanisms in the same application, since you may have more than client type.<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">And here comes the problem&hellip;<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">If you reuse your Hibernate entities as an output of your api to the client, you will probably probably face &ldquo;org.hibernate.LazyInitializationException&rdquo;. <o:p></o:p></p>
<p class="MsoNormal">The reason for this, is the way Hibernate load entities from the DB: Whenever you use a persistent Collection or MAP in your domain model, Hibernate will use its own implementation, and by default will NOT load this map or collection, unless you explicitly load it, or request it in your query. More than that &ndash; &ldquo;ManyToOne&rdquo; and &ldquo;OneToOne&rdquo; association can also be declared as lazy. In this case Hiberante will use a Proxy, which will act as a &ldquo;lazy&rdquo; mediator, and will load the lazy association only upon request. <o:p></o:p></p>
<p class="MsoNormal">In general, this Hibernate &ldquo;laziness&rdquo; approach is great &ndash; You can load lazy associations on the server while your code is in the transaction boundaries. As long as your presentation layer is in the same address space as the server, it doesn&rsquo;t make any problem to the client - The presentation layer will render only the loaded entities graph, which was fetched by Hibernate at the server tier.<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">But what should we do in the second architecture type? What should we do when the client tier is on a different address space than our Java server &ndash; i.e. Silverlight, JavaScript, Flex or any external application? How can the serialization frameworks translate the results from the server to the client, when the output from the server contains lazy Hibernate associations?<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">There are several approaches to this. One of them is simply decouple the domain model completely from the clients by using yet another layer &ndash; <a href="http://en.wikipedia.org/wiki/Data_transfer_object">DTO (Data Transfer Objects)</a>. This decouple is an advantage, since there is a separation between the client and server code. However, personally, I don&rsquo;t like them much, since they put a parallel hierarchy to the domain model. A change in one place usually makes a change in the second hierarchy, and there is a lot of code to translate from and back the domain model to the DTOs. Even with libraries like <a href="http://dozer.sourceforge.net/">Dozer</a>, you will still have to maintain a parallel hierarchy.<o:p></o:p></p>
<p class="MsoNormal">Many times it&rsquo;s easier to use the same model all over. So I looked for a solution that &ldquo;chop&rdquo; all lazy associations, just before marshaling the entities to the client. Since I haven&rsquo;t found any library that does it, I decided to develop such a &ldquo;chopping library&rdquo;, and this is what we did in one of our customers. <o:p></o:p></p>
<p class="MsoNormal">We called it &ldquo;Hibernate Lazy Chopper&rdquo; &ndash; and the idea is simple: Whenever the results comes out of the server to the client, just before the serialization framework apply its marshaling, the framework goes over all the object graph recursively, and &ldquo;chop&rdquo; lazy associations. This chopping works on both Hibernate lazy collections and Hibernate lazy proxies, and uses Spring AOP mechanism.<o:p></o:p></p>
<p class="MsoNormal"><o:p>&nbsp;</o:p></p>
<p class="MsoNormal">Here are the technical details, for how you should use the lazy chopper:<o:p></o:p></p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpFirst"><!--[if !supportLists]--><span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;;
mso-fareast-font-family:&quot;Andale Mono&quot;;mso-bidi-font-family:&quot;Andale Mono&quot;">1.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp; </span></span><!--[endif]-->Add Tikal Maven Repository with the following URL : <a href="http://network.tikalk.com/release/repository">http://network.tikalk.com/release/repository</a></p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpFirst">&nbsp;</p>
<pre class="brush: java;" title="code">
&lt;repositories&gt;
       &lt;repository&gt;
              &lt;id&gt;tikalnet-release&lt;/id&gt;
             &lt;name&gt;tikalnet-release&lt;/name&gt;
             &lt;url&gt;
               http://network.tikalk.com/release/repository            
            &lt;/url&gt; 
      &lt;/repository&gt;
&lt;/repositories&gt;</pre>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpFirst"><font face="'Andale Mono'"><span style="font-size: 12px;"> </span></font><span style="font-size:9.0pt;mso-bidi-font-size:
12.0pt;font-family:&quot;Andale Mono&quot;"><br />
<!--[endif]--><o:p></o:p></span></p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpLast"><!--[if !supportLists]--><span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;;
mso-fareast-font-family:&quot;Andale Mono&quot;;mso-bidi-font-family:&quot;Andale Mono&quot;">2.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp; </span></span><!--[endif]-->Add it as a Maven dependency to your project:<br />
<font face="'Andale Mono'"><span style="font-size: 12px;"><br />
</span></font></p>
<pre class="brush: java;" title="code">
&lt;dependency&gt;
           &lt;groupId&gt;com.tikal.lazychopper&lt;/groupId&gt;
           &lt;artifactId&gt;lazy-chopper&lt;/artifactId&gt;
           &lt;version&gt;1.1.8&lt;/version&gt;
&lt;/dependency&gt;</pre>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpFirst"><!--[if !supportLists]--><span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;;
mso-fareast-font-family:&quot;Andale Mono&quot;;mso-bidi-font-family:&quot;Andale Mono&quot;">3.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp; </span></span><!--[endif]-->Add lazy chopper beans to your application by including its application context file:<br />
<font face="'Andale Mono'"><span style="font-size: 12px;"><br />
</span></font></p>
<pre class="brush: java;" title="code">
&lt;import resource=&quot;classpath:lazychopper-ApplicationContext.xml&quot;/&gt;</pre>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpMiddle">&nbsp;</p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpMiddle"><!--[if !supportLists]-->4.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]-->Declare 2 properties on your application properties file (I assume you already included this file with PropertyPlaceHolderConfigurer)<o:p></o:p></p>
<p style="margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level2 lfo1" class="MsoListParagraphCxSpMiddle"><!--[if !supportLists]-->a.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]-->modelpackage -&nbsp; This is the package to scan lazy entities on your domain model. For example: <br />
<span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;">modelpackage=com.mycompany.myproduct</span><o:p></o:p></p>
<p style="margin-left:1.0in;mso-add-space:
auto;text-indent:-.25in;mso-list:l0 level2 lfo1" class="MsoListParagraphCxSpMiddle"><!--[if !supportLists]-->b.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp;&nbsp;&nbsp;&nbsp; </span><!--[endif]-->abstractEntityClass &ndash; Your base class for your entities, that each entity &nbsp;that is scanned for lazy associations should be inherited from. For example:<br />
<span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;">abstractEntityClass=com.mycompany.myproduct.common.model.entity.AbstractEntity</span><o:p></o:p></p>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraphCxSpLast"><!--[if !supportLists]--><span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;;
mso-fareast-font-family:&quot;Andale Mono&quot;;mso-bidi-font-family:&quot;Andale Mono&quot;">5.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp; </span></span><!--[endif]-->Declare a pointcut named &ldquo;<i>allServices&rdquo; in </i>your application context<i> </i>that represent your service layer. This Pointcut will be use to apply the lazy chopping &ndash; When a service in this layer finishes, the lazy chopper will apply the chopping the output graph. Here is an example<br />
<font face="'Andale Mono'"><span style="font-size: 12px;"><br />
</span></font></p>
<pre class="brush: java;" title="code">
&lt;aop:config&gt;
  &lt;aop:pointcut id=&quot;allServices&quot; expression=&quot;execution(*  com.mycompany.myproduct.server.services..*Service.*(..))&quot; /&gt;
&lt;/aop:config&gt;</pre>
<p style="text-indent:-.25in;mso-list:l0 level1 lfo1" class="MsoListParagraph"><!--[if !supportLists]--><span style="font-size:9.0pt;mso-bidi-font-size:12.0pt;font-family:&quot;Andale Mono&quot;;
mso-fareast-font-family:&quot;Andale Mono&quot;;mso-bidi-font-family:&quot;Andale Mono&quot;">6.<span style="font-family: 'Times New Roman'; font-size: 7pt; ">&nbsp; </span></span><!--[endif]-->Configure your transaction advice to be higher order number than 10 (the choppingAdvice&rsquo;s order value) &ndash; This makes sure, the chopping advice should take place **after** the transaction advice. Otherwise the chopped entities would have been be modified in the DB, since they would have been in the transaction context. So change the aop:config above and add the transaction advice as follow:<br />
<font face="'Andale Mono'"><span style="font-size: 12px;"><br />
</span></font></p>
<pre class="brush: java;" title="code">
&lt;aop:config&gt;
  &lt;aop:pointcut id=&quot;allServices&quot; expression=&quot;execution(* com.mycompany.myproduct.server.services..*Service.*(..))&quot; /&gt;
&lt;aop:advisor advice-ref=&quot;txAdvice&quot; pointcut-ref=&quot;allServices&quot; order=&quot;200&quot; /&gt;
&lt;/aop:config&gt;</pre>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpFirst"><o:p>&nbsp;</o:p></p>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpMiddle">That&rsquo;s it!<o:p></o:p></p>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpMiddle"><o:p>&nbsp;</o:p></p>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpMiddle">Now whenever, a client will call your server, you will NOT get the LazyIntinalizationException. You can use this library from against any client or external system to your server, and it does NOT matter which protocol or serialization mechanism is been used.<o:p></o:p></p>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpMiddle"><o:p>&nbsp;</o:p></p>
<p style="margin-left:0in;mso-add-space:auto" class="MsoListParagraphCxSpLast">The sources for the project can be downloaded <a href="https://github.com/tikalk/Hibernate-Lazy-Chopper">from GitHub here</a>.<o:p></o:p></p>
<!--EndFragment-->
<p>&nbsp;</p>
<!--EndFragment-->
<p>&nbsp;</p>
<p class="MsoNormal"><o:p></o:p></p>
<!--EndFragment-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
<p>&nbsp;</p>
<!--![endif]__comment__end__--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__-->
