---
layout: post
title: Progressive archive loading in Flex
created: 1292773923
author: vladislavm
permalink: /js/progressive-archive-loading-flex
tags:
- JS
- serialization
---
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">There are few ways to download files in Flex, each one is good for specific case.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">&nbsp; In this post I want to share just one of those cases when we have specific constraints like download of files bundle by one download session. When it can be helpful? Encryption can be a case. Encryption is pretty expensive processing feature, especially if you are going to download a lot of files in one loading session.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">&nbsp; It's better to &quot;zip&quot; all that files in one file and to encrypt just to one archive file, than to send hundreds of files and to encrypt/decrypt files one-by-one. Not just for encryption case, but sometimes we prefer to download one archive file and to manage just one download session instead of many.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">&nbsp; Just to make life more interesting, let's take a case when we have a document of 800 pages, when every page is separate SWF file. And we want to show page 1 (MovieClip object) before page 800 will be downloaded. In that case one huge archive file supposed to be serious barrier in progressive loading. The solution is pretty simple, but a little bit tricky.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">&nbsp; I'm going to show an example with so archive (with case oriented structure). In general, gzip and tar formats allow you to implement progressive loading - extract objects from zip before its fully downloaded. You are free to create your own &quot;myzip&quot; format, in this example you can check how it's easy. In general we will use &quot;myzip&quot; archive as files container (swf is well compresses already) just to put all files together in one single data bundle:</span></p>
<p>&nbsp;</p>
<p><strong><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">GZIP from inside</span></strong><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;"> - <a href="http://en.wikipedia.org/wiki/Gzip">http://en.wikipedia.org/wiki/Gzip</a></span></p>
<p>&nbsp;</p>
<p><strong><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">MyZIP inside:</span></strong></p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">1) Some header with common archive information, for example <b>XML</b> structure with various nodes and attributes that can be used further in your application. In file beginning we have 2 values -&nbsp;some magic number in offset &quot;0&quot; that takes <b>MAGIC_NUMBER_LENGTH</b> bytes, right after is metadata size value which takes <b>METADATA_SIZE_LENGTH</b> bytes. And next after metadata size the metadata document itself. We know from metadata size value till what byte to read metadata. Just read a <b>ByteArray</b> from <b>URLStream</b></span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">2) Like in real life, usually as we read more, we know more. So when we finished with metadata reading we know many things we didn&rsquo;t before &ndash; timestamp, document version, number of files (pages) inside. Number of pages is critical parameter and it&rsquo;s going to solve mostly serious problem &ndash; the order of pages. Soon we&rsquo;ll see why so problem can appear.</span></p>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">3) The very next bit after metadata is a first bit of first chunk which contains first swf file. Every chunk contains </span></p>
<p style="margin-left: 0.5in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">chunk type (</span><b><span style="font-size: 11pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;; color: black; background: none repeat scroll 0% 0% silver;">CHUNK_TYPE_LENGTH</span></b><span style="font-size: 14pt; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;"> </span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">bytes), this value can define the type of Object (casting type) we are going to load </span></p>
<p style="margin-left: 0.5in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">chunk size (<b>CHUNK_SIZE_LENGTH</b> bytes), defines the range of bytes in <b>URLStream ByteArray</b></span></p>
<p style="margin-left: 0.5in; text-indent: -0.25in;"><span style="font-family: Symbol;"><span style="">&middot;<span style="font: 7pt &quot;Times New Roman&quot;;">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span></span></span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">the object itself, in our case swf file &ndash; the rest we will ignore</span></p>
<p style="margin-left: 0.5in; text-indent: -0.25in;">&nbsp;</p>
<p style="margin-left: 0.5in; text-indent: -0.25in;"><!--[if gte mso 9]><xml>
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
<![endif]--><span style="font-size: 11pt; line-height: 115%; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">To download the archive we&rsquo;ll use <b>URLStream</b> instance. To allow progressive pages loading we will use <a name="OLE_LINK10"></a><a name="OLE_LINK9"><b><span style="">ProgressEvent.PROGRESS</span></b></a><!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--></span><!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--></p>
<pre title="code" class="brush: java;">
&nbsp;</pre>
<pre title="code" class="brush: java;">
//URLStream instance
private var loader:URLStream = new URLStream();
//Pages array instance
private var _pages:Vector.&lt;DocPage&gt; = new Vector.&lt;DocPage&gt;();

private function onCreationComplete():void
{			
   loader.addEventListener( ProgressEvent.PROGRESS, onLoaderProgress, false, 0, true );				
   loader.addEventListener( IOErrorEvent.IO_ERROR, onLoaderError, false, 0, true );			
   loader.addEventListener( HTTPStatusEvent.HTTP_STATUS, onLoaderHttpStatus, false, 0, true );			
	
   loader.load(new URLRequest(&quot;http://mySyte.com/myzip.myz&quot;));
}
</pre>
<p>&nbsp;</p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;"><br />
</span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;"><span style="">&nbsp;</span><b>onLoaderProgress</b> handler parses currently downloaded bytes, check if next chunk is fully downloaded, and assembles <b>MovieClips</b> from <b>ByteArray</b> by <b>Loader</b> object. <a name="OLE_LINK4"></a><a name="OLE_LINK3"></a></span></p>
<p><span style=""><span style=""><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Almost </span></span></span><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">as simple as sounds. The only troubles are when <b>SWF</b> files have different sizes. It takes different (unpredictable) time to load <b>MovieClips</b> from swf files, so the addition of pages to pages array by <a name="OLE_LINK6"></a><a name="OLE_LINK5"><span style=""><b>Event.COMPLETE </b></span></a>adds your<b> MoviClips </b>to array in<b> unpredictable order</b>.</span></p>
<p><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">The solution is to cause to array to care about itself. In other words, let&rsquo;s declare DocPage class that extends UIMovieClip with<b> Event.COMPLETE</b> handler of <b>Loader </b>instances:</span></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
public class DocPage extends UIMovieClip
{
   private var _pageNumber:int;
	
   [Bindable]
   /**
   * Getter/Setter of pageNumber property 
   * @return 
   * 
   */		
   public function get pageNumber():int
   {
	return _pageNumber;
   }		
   public function set pageNumber(value:int):void
  {
	_pageNumber = value;
  }
		  	
  /**
  * Object constructor, initiates page number property 
  * @param _pageNumber
  * 
  */		
  public function DocPage(_pageNumber:int)
  {		
	super();
		
	this.pageNumber = _pageNumber;
  }
		
  /**
   * adds movieClip content into the object 
   * fires firstPageAdded 
   * @param e - event
   * 
   */		
   public function addContent(e:Event):void
   {
        var mc:MovieClip = (e.currentTarget as LoaderInfo).content as MovieClip;
        super.addChild(mc);
	mc.gotoAndPlay(1);
		
        // dispatch this event to show first page 
        //immediately after it has been loaded
        if (this.pageNumber == 0)
	{
	   this.dispatchEvent(new PageFromArchiveEvent(PageFromArchiveEvent.PAGE_ARRIVED,true));				
	}			
	//trace(&quot;Page added &quot; + pageNumber + &quot; ...&quot; );
   }
}
</pre>
<p>&nbsp;</p>
<p><!--[if gte mso 9]><xml>
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
<p class="MsoNormal"><span style="font-size: 12pt; line-height: 115%; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">Every element of array will handle swf loader by itself, so the array <a name="OLE_LINK7"><span style="">persis</span></a>ts of pages order.</span></p>
<p class="MsoNormal"><span style="font-size: 12pt; line-height: 115%; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">And following the </span><b><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">ProgressEvent.PROGRESS </span></b><span style="font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;">handler</span><span style="font-size: 12pt; line-height: 115%; font-family: &quot;Arial&quot;,&quot;sans-serif&quot;;"> that can be used in your application that progressively loads and shows the pages before the whole archive have being downloaded:</span></p>
<p class="MsoNormal">&nbsp;</p>
<pre class="brush: java; rteindent1" title="code">
private function onLoaderProgress(e:ProgressEvent=null):void 
{				
	//trace (&quot;porgress ...&quot; + e);
	if (loader.bytesAvailable)
	{
		loader.readBytes(byteArray, byteArray.length);
	}				
	var bytesToRead:uint = byteArray.length;
				
	// read from byteArray just in case it's bigger than chunk size
	while ( nextChunkPosition &lt;= byteArray.length &amp;&amp; byteArray.bytesAvailable)
	{					
		//reading archive header
		if ((bytesToRead &gt;= MAGIC_NUMBER_LENGTH + META_SIZE_LENGTH) &amp;&amp; !gotArchiveHeader)
		{
			byteArray.position = MAGIC_NUMBER_LENGTH;
			metadataSize = byteArray.readUnsignedInt();
			gotArchiveHeader = true;
		} 
		
		//reading archive metadata
		 if (gotArchiveHeader &amp;&amp; 
			!gotMetadata &amp;&amp; 
			(bytesToRead &gt;= MAGIC_NUMBER_LENGTH + META_SIZE_LENGTH + metadataSize))
		{
			byteArray.position = MAGIC_NUMBER_LENGTH + META_SIZE_LENGTH;
			metaData = new XMLDocument (byteArray.readUTFBytes(metadataSize));
								
			nextChunkPosition = MAGIC_NUMBER_LENGTH + META_SIZE_LENGTH + metadataSize;
			
			pagesInit(metaData.firstChild.attributes.pages);
			
			gotMetadata = true;
		} 
		
		//reading chunk type and size
		if (gotArchiveHeader &amp;&amp; 
			gotMetadata &amp;&amp; 	
			chunkFullyRead &amp;&amp;
			(bytesToRead &gt;=  nextChunkPosition + CHUNK_TYPE_LENGTH + CHUNK_SIZE_LENGTH ))
		{					
		        // get chunk type, 1=SWF
			chunkTypeSwf = (byteArray.readUnsignedInt() == 1); 
												
			//get chunk size						
			currentChunkSize = byteArray.readUnsignedInt();
			currentChunkPosition = nextChunkPosition + CHUNK_TYPE_LENGTH + CHUNK_SIZE_LENGTH;
			nextChunkPosition = currentChunkPosition + currentChunkSize;
					
			//if not swf ingnore the data
			if (chunkTypeSwf) 
			{
				//pages.push(new UIMovieClip());						
				chunkFullyRead = false;
			}
			else
			{
				byteArray.position = nextChunkPosition;
			}
				
		} 
					
		//reading chunk if it's swf - 1=SWF
		if (chunkTypeSwf &amp;&amp;
		!chunkFullyRead &amp;&amp;
		(bytesToRead &gt;=  nextChunkPosition))
		{
			//current chunck byte array
			var ba:ByteArray = new ByteArray();
			byteArray.readBytes(ba, 0, currentChunkSize);						
															
			try 
			{								
				var bytesLoader:Loader = new Loader();
				bytesLoader.contentLoaderInfo.addEventListener(Event.COMPLETE, pages[currentPageToAdd].addContent);
				bytesLoader.loadBytes(ba);
				currentPageToAdd++;	

                                //last chunk		
                     		if (currentPageToAdd == pages.length - 1)
				{
					// get chunk type, 1=SWF
					chunkTypeSwf = (byteArray.readUnsignedInt() == 1); 
					
					//get chunk size						
					currentChunkSize = byteArray.readUnsignedInt();
								
					currentChunkPosition = nextChunkPosition + CHUNK_TYPE_LENGTH + CHUNK_SIZE_LENGTH;
					nextChunkPosition = currentChunkPosition + currentChunkSize;
								
					chunkFullyRead = false;
				}
				else
				{
					chunkFullyRead = true;
				}
			}
			catch (e:Error)
			{
				trace (&quot;ERROR: &quot; + e);
			}
								
		} 
					
	}
				
}</pre>
<p class="MsoNormal">&nbsp;</p>
<p>the method initializes fixed size array:</p>
<p>&nbsp;</p>
<pre class="brush: java;" title="code">
        private function pagesInit(totalPagesNum:int):void
	{
		var pageNum:int = 0;
				
		while (pageNum &lt; totalPagesNum)
		{					
			pages.push(new DocPage(pageNum));
			
			pageNum++;
		}
		//add listener to show first page immediatelly after it's been loaded		
		pages[0].addEventListener(&quot;firstPageAdded&quot;, onFirstPage);
	}</pre>
<p>&nbsp;</p>
<p>hope, you will find this code useful <img alt="" src="http://www.tikalk.com/sites/all/modules/fckeditor/fckeditor/editor/images/smiley/msn/thumbs_up.gif" /></p>
<p>&nbsp;</p>
<p>Regards,</p>
<p>Vlad</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<!--![endif]__comment__end__&nbsp;</![endif]__comment__end__</p></![endif]__comment__end____comment__start__[if></![endif]__comment__end____comment__start__[if></![endif]__comment__end____comment__start__[if></p>
<!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if-->
<p>&nbsp;</p>
<!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if-->
<p>&nbsp;<!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--></p>
<!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if-->
<p>&nbsp; <!--![endif]__comment__end__<span--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--></p>
<p>&nbsp; <!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end__--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--><!--![endif]__comment__end____comment__start__[if--></p>
