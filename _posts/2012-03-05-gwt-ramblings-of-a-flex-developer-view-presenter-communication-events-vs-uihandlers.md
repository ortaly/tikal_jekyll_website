---
layout: post
title: GWT ramblings of a Flex developer - View / Presenter communication (events
  vs. UiHandlers)
created: 1330942734
author: sefi
permalink: /gwt-ramblings-flex-developer-view-presenter-communication-events-vs-uihandlers
tags:
- JAVA
- view
- uihandler
- puremvc
- proxy
- presenter
- mediator
- GWTP
- gwt
- flex
- event
---
<p>&nbsp;<span style="text-align: left; ">&nbsp;Hello again!</span></p>
<p>&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">This will be part 6 of the series, you can check out the previous ones&nbsp;<a href="http://www.tikalk.com/java/forums/gwt-ramblings-flex-developer-intro"><span style="color: windowtext; ">here</span></a>.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">Today, we'll discuss View-Presenter communication (events and other alternatives).</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">I'll be comparing Flex implementation for PureMVC vs. GWTP View-Presenter paradigms.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<!--break-->
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">When using Flex PureMVC, the actors are the Model (Proxies), the Control (Commands) and the View (Mediators and their corresponding view components). Proxies, Commands and Mediators communicate amongst themselves using a notification mechanism (which is essentially business logic events). An actor registers to listen for a specific notification, and when that notification is fired &ndash; it has an opportunity to react.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">Mediators and their corresponding views communicate in a special way. Mediators know their views intimately, and so they can invoke public functionalities implemented in the view directly. The views, however, are oblivious of the Mediator and as such dispatch events (either Flex/Flash events or custom events), which the Mediator listens to and reacts accordingly.<o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">With GWTP, the MVC pattern is replaced with MVP pattern (Model, View, Presenter) &ndash; where the Presenter acts as the Mediator but also has some of the responsibilities of the Control. Unlike Flex above, where the view does not know the Medaitor, here the view and the Presenter have means to communicate without events but rather with a &quot;two way communication contract&quot; of sorts. <o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">Let's review this contract. I said it's two way &ndash; that means that the Presenter has the means to <i>communicate</i> with the view and cause functionalities to run on the view, but also the view has the means to <i>communicate</i> with the presenter and cause functionalities to run on the Presenter. I use the term <i>communicate</i> loosely here, and you will soon see why.<o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><b>Presenter -&gt; View direction:</b></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">The Presenter defines an internal public interface, usually named MyView, which includes the API the Presenter expects its view to implement (ignore the <span style="font-size: 8pt; line-height: 115%; font-family: Consolas; color: black; ">HasUiHandlers&lt;MyUiHandlers&gt;</span> code for now, we'll talk about it in a sec):</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<pre title="code" class="brush: java;">
	public interface MyView extends View, HasUiHandlers&lt;MyUiHandlers&gt; {
		void doSomethingOnView(String arg1);
	}
</pre>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">The view should implement this interface and presto! You have the first direction of the communication.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">All you have to do in the Presenter code is:</p>
<pre title="code" class="brush: java;">
getView().doSomethingOnView(arg);</pre>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><b>View -&gt; Presenter direction:<o:p></o:p></b></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">This direction is a little trickier, but still not complicated.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">First, we create an interface that extends UiHandlers:</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<pre title="code" class="brush: java;">
public interface MyUiHandlers extends UiHandlers {
        void DoSomethingOnPresenter();
}
</pre>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">This interface will include the API the view expects its Presenter to implement.</p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-align:
left;line-height:normal;mso-layout-grid-align:none;text-autospace:none;
direction:ltr;unicode-bidi:embed">The Presenter implements it:</p>
<pre title="code" class="brush: java;">
public class MyPresenter extends PresenterWidget&lt;MyPresenter.MyView&gt; implements MyUiHandlers {
</pre>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-align:
left;line-height:normal;mso-layout-grid-align:none;text-autospace:none;
direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-align:
left;line-height:normal;mso-layout-grid-align:none;text-autospace:none;
direction:ltr;unicode-bidi:embed">But that in itself, is not enough.<br />
The Presenter should also, in its constructor, call:</p>
<pre title="code" class="brush: java;">
                getView().setUiHandlers(this);
</pre>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-align:
left;line-height:normal;mso-layout-grid-align:none;text-autospace:none;
direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="margin-bottom:0in;margin-bottom:.0001pt;text-align:
left;line-height:normal;mso-layout-grid-align:none;text-autospace:none;
direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">And this will 'seal the deal', letting the view know that the Presenter is its UiHandler. Remember that in the first code snippet we saw that the MyView interface also extends HasUiHandlers&lt;MyUiHandlers&gt;? This is where it comes in.</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">Now, the view code can invoke Presenter functionality using:</p>
<pre title="code" class="brush: java;">
getUiHandlers().DoSomethingOnPresenter();</pre>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">&nbsp;</p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed">So, the Presenter <i>communicates</i> with its View through the MyView interface and the View <i>communicates</i> with its presenter using the UiHandlers interface &ndash; no events required!<o:p></o:p></p>
<p class="MsoNormal" style="text-align:left;direction:ltr;unicode-bidi:embed"><o:p>&nbsp;</o:p></p>
<p>&nbsp;</p>
