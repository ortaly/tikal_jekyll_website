---
layout: post
title: Flex chart effects with dynamically added series
created: 1228222392
permalink: flex-chart-effects-with-dynamically-added-series
tags:
- JS
---
<div>I had a requirement for dynamic add, hide and reveal line series from a chart, in addition to change the entire data, and wanted to apply chart effects which will visualize the change.</div>
<div>I searched the web to find a demo but didn't find one. It took me a while to get this all going, so hopefully my work will save you the time in case you run into a similar requirement.</div>
<div>Here's the code:</div>
<div>&nbsp;</div>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>
<code>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="vertical"> 

<mx:Script>

	<![CDATA[ 

 import mx.states.SetProperty;

 import mx.charts.series.LineSeries;

 import mx.collections.ArrayCollection;

 

 [Bindable]

 private var dp:ArrayCollection = new ArrayCollection ([{"date":"1.1.08", "First":Math.random() * 100},{"date":"1.2.08", "First":Math.random() * 100},{"date":"1.3.08", "First":Math.random() * 100},{"date":"1.4.08", "First":Math.random() * 100},{"date":"1.5.08", "First":Math.random() * 100},{"date":"1.6.08", "First":Math.random() * 100},{"date":"1.7.08", "First":Math.random() * 100},{"date":"1.8.08", "First":Math.random() * 100}]);

 

 private var dp2:ArrayCollection = new ArrayCollection ([{"date":"1.1.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.2.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.3.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.4.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.5.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.6.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.7.08", "First":Math.random() * 100, "Second":Math.random() * 100},{"date":"1.8.08", "First":Math.random() * 100, "Second":Math.random() * 100}]);

 

 private var removedFlag:Boolean = false;

 

 private var currentData:ArrayCollection = dp;

 

 private var slideEffect:Boolean = false;

 

 private function addSeries():void

 { 

 	applyInterpolateEffect(); 

 	

 	var lineSeries:LineSeries = new LineSeries();

 	lineSeries.yField = "Second";

 	lineSeries.displayName = "Second";

 	lineSeries.setStyle("showDataEffect",rearange);

 	 

 	 for each (var obj:Object in currentData)

 	 {

 	 	obj.Second = Math.random() * 100;

  	 }

  	 currentData.refresh();

 	

 	var series:Array = chart.series;

 	series.push(lineSeries);

 	chart.series = series;

 	

 }

 

 

  private function showSeries():void

  { 

  	applyInterpolateEffect();  

  	

    for each (var obj:Object in currentData)

    {

    	obj.Second = Math.random() * 100;

    }

    currentData.refresh();  

    

    var series:Array = chart.series;

    for (var i:int=0;i<series.length;i++)

    {

    	if (series[i].yField == "Second")

    	{

    		LineSeries(series[i]).alpha = 1; 

    		break;

		}

  	}

 } 

   private function removeSeries():void

   { 

    applyInterpolateEffect(); 

    for each (var obj:Object in currentData)

    {

    	obj.Second = 0;

    }

    currentData.refresh();

    

    //if (slideEffect)

  	 removedFlag = true  

  

   }

   private function interpolateEndHandler():void

   {    

    	if (!removedFlag)

   			return; 

 		

 		var series:Array = chart.series;

   		for (var i:int=0;i<series.length;i++)

   	    {

   			if (series[i].yField == "Second")

   			{

   				LineSeries(series[i]).alpha = 0;

   				break;

   			}

   	    }

   		removedFlag = false; 

   	

   		 

   }

   		

   	

   	private function changeDataHandler():void

    {  

   		var series:Array = chart.series;

   		for each(var lineSeries:LineSeries in series)

   		{

   			lineSeries.setStyle("hideDataEffect",slide)

   			lineSeries.setStyle("showDataEffect",slide)

   		}

   		chart.dataProvider = dp2;

   		currentData = dp2;

   		slideEffect =true; 

    } 

  

   

   private function applyInterpolateEffect():void

   {  

  	 var series:Array = chart.series;

  	 for each(var lineSeries:LineSeries in series)

   	 {

   	 	lineSeries.setStyle("showDataEffect",rearange);

   	 	lineSeries.setStyle("hideDataEffect",null);

   	 	slideEffect = false;

   	 }

   }

   ]]>

   </mx:Script> 

   

   <mx:SeriesInterpolate id="rearange" effectEnd="interpolateEndHandler()"/> 

   <mx:SeriesSlide id="slide"/> 

   

   <mx:Button label="1. Add series" click="addSeries()"/> 

   <mx:Button label="2. change data" click="changeDataHandler()"/> 

   <mx:Button label="3. hide series" click="removeSeries()"/> 

   <mx:Button label="4. reveal series" click="showSeries()"/>  

   

   <mx:LineChart id="chart" dataProvider="{dp}" >

	 <mx:series> 

	    	<mx:LineSeries yField="First" displayName="First" showDataEffect="{rearange}"/> 

	 </mx:series>

	 <mx:horizontalAxis> 

	 	<mx:CategoryAxis categoryField="date" /> 

	 </mx:horizontalAxis> 

 </mx:LineChart>

 

 </mx:Application>



</code>
