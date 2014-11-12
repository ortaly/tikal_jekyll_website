---
layout: post
title: Flex Auto Complete Control
created: 1281445253
permalink: /js/flex-auto-complete-control
tags:
- JS
- flex
---
<p>&nbsp;Hello all,</p>
<p>&nbsp;</p>
<p>I have been working on a project that involves allot of data input through a flex GUI. &nbsp;The most common control for input that we use is an Auto Complete control. &nbsp;The way this works is by providing a data source of items to suggest as the user inputs text. &nbsp;As matches are found the results are displayed to the user similar to the GUI of the ComboBox control.</p>
<p>&nbsp;</p>
<p>The control that was used in the project worked in that it displayed the suggestions and allowed the user to select more than one option. &nbsp;However, &nbsp;there were a few drawbacks:</p>
<p>1) Directional arrow input did not cycle through the visible suggestion.</p>
<p>2) The backspace button didn't erase the text of an item in a manageable way.</p>
<p>3) The results were displayed as just text. &nbsp;I wanted to display items like on Facebook with blue circle borders.</p>
<p>4) If there were a significant number of suggestions the control would hang the browser.</p>
<p>&nbsp;</p>
<p>The last problem was of course a show stopper.</p>
<p>&nbsp;</p>
<p>To solve the first three issues I found a control created by another Flex Programmer, Hillel Coren. &nbsp;His page can be found here: &nbsp;http://hillelcoren.com/flex-autocomplete/ &nbsp;</p>
<p>&nbsp;</p>
<p>He worked on this Auto Complete control through many versions and the control is quite extensible. &nbsp;Feel free to view his documentation for more details.</p>
<p>&nbsp;</p>
<p>To solve the large amounts of data I used the following technique. &nbsp;I had some constraints since I wanted the structure of the auto complete suggestions to be similar to how I get the data from the server. &nbsp;The project I am working on uses BlazeDS and large arrays of data are translated into DataFacade data type on the flex side. &nbsp;What I did was create a Dictionary and used the first letter of each suggestion as the key. &nbsp;This way I would have up to 26 DataFacades in my Dictionary. &nbsp;When the user started typing the amount of data to search was restricted to the first letter. &nbsp;This helped allot when some of the lists contained more than 50,000 suggestions total and all I needed to search were items starting with A, for example. &nbsp;</p>
<p>&nbsp;</p>
<p>So thank you to Hillel for his amazing work. &nbsp;I hope this reference helps someone else out</p>
<p>&nbsp;</p>
<p>Happy Coding,</p>
<p>&nbsp;</p>
<p>Dov</p>
<p>&nbsp;</p>
<p>&nbsp;</p>
