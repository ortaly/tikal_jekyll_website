---
layout: post
title: Run a select query with a desired range in memory on POJO.
created: 1407487201
author: olga
permalink: run-a-select-query-with-a-desired-range-in-memory-on-pojo
tags:
- JAVA
- Java
---
<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;">Case:</span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;">You have an object Game with &#39;country&#39; and &#39;timestamp&#39; fields and you are looking for all games played in Germany between 12.05.2012 and 20.05.2014.</span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><span style="line-height: 1.6em;">And for some reason you would like to do so in memory without any DB.</span></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><span style="line-height: 1.6em;">Lets say that the list of countries isn&#39;t huge and the timestamp 2014.06.25 12:45:22 is saved in the following format, by removing spaces and dots : 20140625124522 .</span></span></span></p>

<pre>
public class Game implements Comparator&lt;Game&gt;{
    public enum Country{GERMANY, BRASIL} 

    private String country;
    private String metadata;
    private long dateLong;
    
    public Game(){}
    public Game(String country, String metadata, long dateLong) {
        this.country = country;
        this.setDateLong(dateLong);
        this.metadata = metadata;
    }

    @Override
    public int compare(Game o1, Game o2) { 
        return (int) (o1.getDateLong() - o2.getDateLong()); 
    }
}</pre>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">Steps:</span></em></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">- Separate each country to </span></em><em><span style="font-style: normal">its</span></em><em><span style="font-style: normal"> own list. (save map of all these lists) </span></em></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">- Sort each list by timestamp.</span></em></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">- Extract the timestamps from each list to </span></em><em><span style="font-style: normal">an </span></em><em><span style="font-style: normal">external list (save map of them).</span></em></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">- </span></em><em><span style="font-style: normal">Run the select query on the list of timestamps and get the result sublist from the list </span></em><em><span style="font-style: normal">of </span></em><em><span style="font-style: normal">countries by using the found </span></em><em><span style="font-style: normal">corresponding </span></em><em><span style="font-style: normal">indexes.</span></em></span></span></p>

<p style="margin-bottom: 0in">&nbsp;</p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">The main point i</span></em><em><span style="font-style: normal">s</span></em><em><span style="font-style: normal"> to find the closest timestamp for the start/end date</span></em><em><span style="font-style: normal">s</span></em><em><span style="font-style: normal">. For example, you </span></em><em><span style="font-style: normal">are </span></em><em><span style="font-style: normal">look</span></em><em><span style="font-style: normal">ing</span></em><em><span style="font-style: normal"> for period </span></em><em><span style="font-style: normal">of time between</span></em><em><span style="font-style: normal"> </span></em><em><span style="font-style: normal">12.05.2012 </span></em><em><span style="font-style: normal">and </span></em><em><span style="font-style: normal">20.05.2014</span></em><em><span style="font-style: normal"> but your data </span></em><em><span style="font-style: normal">set </span></em><em><span style="font-style: normal">starts from 1.01.2013 and you have some data for 19</span></em><em><span style="font-style: normal">.05.2014 </span></em><em><span style="font-style: normal">and </span></em><em><span style="font-style: normal">2</span></em><em><span style="font-style: normal">1</span></em><em><span style="font-style: normal">.05.2014 </span></em><em><span style="font-style: normal">but not f</span></em><em><span style="font-style: normal">or</span></em><em><span style="font-style: normal"> </span></em><em><span style="font-style: normal">20.05.2014 </span></em><em><span style="font-style: normal">specifically. </span></em></span></span></p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">In this case, the closest start date </span></em><em><span style="font-style: normal">should</span></em><em><span style="font-style: normal"> be 1.01.2013 and the closest end date will be 19</span></em><em><span style="font-style: normal">.05.2014. </span></em><em><span style="font-style: normal">Now, we are able to find the right indexes of these da</span></em><em><span style="font-style: normal">te</span></em><em><span style="font-style: normal">s. </span></em><em><span style="font-style: normal">For example, we found the start index = 0 and the end index = 305 in the sorted list of timestamps, but these indexes are also </span></em><em><span style="font-style: normal">correct</span></em><em><span style="font-style: normal"> in the list </span></em><em><span style="font-style: normal">of its corresponding</span></em><em><span style="font-style: normal"> country,</span></em><em><span style="font-style: normal"> therefore you can use them in order to get the resulting sublist.</span></em></span></span></p>

<p style="margin-bottom: 0in">&nbsp;</p>

<p style="margin-bottom: 0in"><span style="font-size:14px;"><span style="font-family:tahoma,geneva,sans-serif;"><em><span style="font-style: normal">Lets see </span></em><em><span style="font-style: normal">an</span></em><em><span style="font-style: normal"> example of one country:</span></em></span></span></p>

<pre>
private List&lt;Game&gt; gameList = new ArrayList&lt;&gt;();
private List&lt;Game&gt; germanyList = new ArrayList&lt;&gt;();
private List&lt;Long&gt; germanyDateList = new ArrayList&lt;&gt;();
    

    @PostConstruct
    public void init(){
        // do: push the data to gameList
        
        for (Game game : gameList) { 
            String country = game.getCountry();
            if(country.compareTo(Game.Country.GERMANY.name().toLowerCase())==0)    {germanyList.add(game);}    

        Collections.sort(germanyList, new Game());
        

        for (Game game : germanyList) { 
            germanyDateList.add(game.getDateLong());
        }
    }

public List&lt;Game&gt; findByCountryAndLongDate(String countryName, Long start,Long finish) {
        if(start == null &amp;&amp; finish == null){
            return findByCountry(countryName);
        }
        
        if(countryName.compareTo(Game.Country.GERMANY.name().toLowerCase())==0){
            return findDataInTimeRange(germanyList, germanyDateList, start, finish);
        }

        return Collections.emptyList(); 
    }

private List&lt;Game&gt; findDataInTimeRange(List&lt;Game&gt; data, List&lt;Long&gt; dataIndex, Long start, Long finish) {
        start = start != null ? start :  dataIndex.get(0);
        finish = finish != null ? finish :  dataIndex.get(dataIndex.size()-1);
        
        int startIndex = getClosestIndex(dataIndex, start); 
        int endIndex = getClosestIndex(dataIndex, finish); 

        if(startIndex &gt;=0 &amp;&amp; endIndex &gt;=0 ){
            return data.subList(startIndex, endIndex+1);
        }
        return Collections.emptyList(); 
    }

    private int getClosestIndex(List&lt;Long&gt; data, Long wanted) {
        int endIndex;
        endIndex = Collections.binarySearch(data, wanted);
        if (endIndex &lt; 0) {
            long previousDate = data.get(Math.max(0, -endIndex - 2));
            long nextDate = data.get(Math.min(data.size() - 1, -endIndex - 1));
            endIndex = wanted - previousDate &lt; nextDate - wanted ? (Math.max(0, -endIndex - 2)) : Math.min(data.size() - 1, -endIndex - 1);
        }
        return endIndex;
    }</pre>

<p style="margin-bottom: 0in">For multiple countries you do the same but with maps:</p>

<pre style="margin-bottom: 0in;">

Map&lt;Game.Country, List&lt;Game&gt;&gt; multiCountries = new HashMap&lt;Game.Country, List&lt;Game&gt;&gt;();
Map&lt;Game.Country, List&lt;Long&gt;&gt; multiDateList = new HashMap&lt;Game.Country, List&lt;Long&gt;&gt;();</pre>
