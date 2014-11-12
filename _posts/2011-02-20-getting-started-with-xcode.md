---
layout: post
title: Getting Started With Xcode
created: 1298192519
permalink: /js/getting-started-xcode
tags:
- JS
- iphone xcode sdk apple mvc
---
<p>&nbsp;I have been developing for iPhone for almost 2 years now.&nbsp; I got started when my company asked if anyone had experience in iPhone development and of course I raised my hand and said &quot;I do&quot;!&nbsp; Little did they know,&nbsp; I had never opened xcode let alone compiled a single iPhone app.</p>
<p>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Style-Type" content="text/css">
<title></title>
<meta name="Generator" content="Cocoa HTML Writer">
<meta name="CocoaVersion" content="1038.35"> <style type="text/css">
p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica; min-height: 14.0px}
p.p3 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px 'Lucida Grande'}
p.p4 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px 'Lucida Grande'; min-height: 16.0px}
p.p5 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo}
p.p6 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; min-height: 16.0px}
p.p7 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #008517}
p.p8 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #4e8187}
p.p9 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #411a7f}
p.p10 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #bd23a0}
p.p11 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #743aa7}
p.p12 {margin: 0.0px 0.0px 0.0px 0.0px; font: 14.0px Menlo; color: #008517; min-height: 16.0px}
span.s1 {color: #bd23a0}
span.s2 {color: #743aa7}
span.s3 {color: #000000}
span.s4 {color: #411a7f}
span.s5 {color: #31595d}
span.s6 {font: 14.0px Menlo; color: #31595d}
span.s7 {color: #d22723}
span.s8 {color: #008517}
</style>                        </meta>
</meta>
</meta>
</meta>
</p>
<p class="p2">&nbsp;</p>
<p class="p1">I spent the next two weeks watching Stanford University's iPhone lectures during my train rides to work each day.&nbsp; I quickly learned all about Objective C and Apple's strict guidelines for deploying apps on the Apple App Store.&nbsp; I would like to share some of my experiences with you here.</p>
<p class="p2">&nbsp;</p>
<p class="p1">If you are serious about iPhone development then the following are absolutely required:</p>
<p class="p1">1) Mac - for developing</p>
<p class="p1">2) iPhone - for debugging</p>
<p class="p1">3) Apple Developer Account - to install apps on your iPhone</p>
<p class="p1">4) xcode - iPhone SDK version</p>
<p class="p1">5) a little patience ;)</p>
<p class="p2">&nbsp;</p>
<p class="p1">OK,&nbsp; now I am sure some of you are not thrilled at the idea of having to shell out your hard earned cash on that Mac you are going to need.&nbsp; Some of you might even think about taking a PC and &quot;turning&quot; it into a Mac by downloading some version of the OSX86 project.&nbsp; I highly recommend getting a Mac that supports the latest version of xcode.&nbsp; Your life as an iPhone developer will be much easier. &nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p1">Next you should get yourself an iPhone.&nbsp; This is important since you will need to test any app you create on a device before you upload it to apple for approval.&nbsp; The simulator included with xcode is great but, it will not come close to showing you what your actual user experience is going to be.&nbsp; The simulator is running on your computer and therefore the CPU is faster,&nbsp; battery is a non-issue and any animations you create will perform very well.&nbsp; Testing on a device will also reveal any memory leaks you may have so you can figure out how to fix 'em.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Next I recommend getting a developer license.&nbsp; Head on over to: <a href="http://developer.apple.com/devcenter/ios/index.action">http://developer.apple.com/devcenter/ios/index.action</a>.&nbsp; Here you will find a great deal of help.&nbsp; Take some time to read some of the How-Tos and watch some of the videos. &nbsp; If you don't already have an Apple ID create one and login.&nbsp; You don't have to pay any money just yet.&nbsp; You can download xcode for free.&nbsp; The first time you will have to worry about money is when you want to start testing on your device.&nbsp; You will need to purchase an annual license to be a member of the Apple Developer Program.&nbsp; The cost is 99 dollars. &nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p1">Once you download xcode run the installer.&nbsp; When it is done find it in your Application folder and run it.&nbsp; You will get the following window:</p>
<p class="p1">See image list: Xcode Opening Window.</p>
<p class="p2">&nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p1">Click on: Create a new Xcode project.</p>
<p class="p2">&nbsp;</p>
<p class="p1">The next window will look something like this:</p>
<p class="p2">&nbsp;See image list: Xcode Project Types.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Go ahead and select Navigation based application.&nbsp; Also,&nbsp; select the check box for Core Data.&nbsp; Core Data is described here: <a href="http://en.wikipedia.org/wiki/Core_Data">http://en.wikipedia.org/wiki/Core_Data</a> and a great tutorial is here: <a href="http://blog.sallarp.com/iphone-core-data-uitableview-drill-down/">http://blog.sallarp.com/iphone-core-data-uitableview-drill-down/</a>.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Once you complete the new project wizard your xcode window will look something like this:</p>
<p class="p2">&nbsp;See image list: Xcode Project Window.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Now I will briefly explain what the folders and items are in the xcode project.&nbsp; The blue icon at the top represents the project and double clicking on it will open a window to configure project properties.&nbsp; In this window you will be able to configure things like build output folder,&nbsp; target os,&nbsp; and developer certificate configuration.&nbsp; It is a good idea to open this window and look through it to familiarize yourself with what is available.&nbsp; However,&nbsp; when getting started it is not likely you will have to touch any of these settings.</p>
<p class="p2">&nbsp;</p>
<p class="p1">The next folder is called Classes.&nbsp; This is where you can (and should) store all your classes that will make up your models, controllers, and views.&nbsp; Xcode won't enforce any of this, but it is a good idea to keep your code organized into logical sections. &nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p1">Other sources starts out containing a *.pch file and your application's main.m file.&nbsp; Your application will run in a loop.&nbsp; It will listen for user interaction and other events from the system and process them in the main run loop.&nbsp; You will most likely never touch this file.&nbsp; The *.pch file is your pre compiled header.&nbsp; It is not necessary to ever edit this file.&nbsp; However,&nbsp; sometimes you will want to define some application level constants using #define and this is a good place to put them.&nbsp; This way all your constants will be available throughout your application.</p>
<p class="p2">&nbsp;</p>
<p class="p1">The resources folder will contain your application images,&nbsp; sounds,&nbsp; database diagrams (if using core data) and any XIB files you create to represent your views.&nbsp; I usually add subfolders to store the images and XIBs separately so I can easily find the file I want to work on later.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Frameworks contains libraries that are used in your application.&nbsp; For example, if you want to add support for Maps to your application you would right click on this folder and select add existing Framework.&nbsp; In the popup that shows next select the MapKit.framwork folder and click OK.&nbsp; The folder already comes configured with the most commonly used Frameworks.&nbsp; UIKit contains the views like buttons,&nbsp; switches,&nbsp; view controllers and labels your app will use.&nbsp; Foundation contains objects to represent strings,&nbsp; url requests,&nbsp; dates and other such datatypes.&nbsp; If you open the folder with the arrow next to it you can see the header files included with each framework.&nbsp; This will help determine what each framework can do.&nbsp; Coregraphics is used to draw on the screen.&nbsp; Lastly,&nbsp; CoreData contains the headers to support the coredata feature we selected when opting for coredata support when we created our app.</p>
<p class="p2">&nbsp;</p>
<p class="p1">The Products folder contains a shortcut to your app.&nbsp; Until you first compile your app it will show up in red text indicating that Xcode cannot find it in the specified location.&nbsp; This is fine.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Targets contains references to your application bundle.&nbsp; Here you can configure what headers and source files and XIBs will get compiled into your app.&nbsp; More often this will just happen on its own and it will be rare that you have to even venture inside this folder.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Executibles contains a reference to you app as an executable.&nbsp; Double clicking on the contents will show a window where you can configure items such as launch parameters.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Find results will contain active project searches.&nbsp; Select Edit -&gt; Find -&gt; Find In Project&hellip;&nbsp; to bring up the project find window.&nbsp; Once you do a search you can close the window and the results will appear here as well.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Bookmarks will contain your project bookmarks.&nbsp; To add a bookmark simply press Command+D while at a particular line of code and type a name.&nbsp; The newly created bookmark will appear in the Bookmarks folder of your Xcode project.</p>
<p class="p2">&nbsp;</p>
<p class="p1">SCM will contain information regarding source control management.&nbsp; I will not go into particulars here but it is worth looking up.</p>
<p class="p2">&nbsp;</p>
<p class="p3">The Project Symbols smart group, one of the built-in smart groups provided by Xcode, allows you to view all of the symbols defined in your project. You can sort symbols by type, name, file, and file path, and you can search for symbols that match a string. To see the symbols defined in your project, select the Project Symbols smart group in the Groups &amp; Files list. The detail view displays the symbols in your project.</p>
<p class="p4">&nbsp;</p>
<p class="p3">The last two items are smart folders that contain your projects implementation (*.m) and XIB files.</p>
<p class="p4">&nbsp;</p>
<p class="p3">The project that we added sets up a basic app for you that contains the following important classes</p>
<p class="p4">&nbsp;</p>
<p class="p3">1) DemoAppDelegate - This is your app's delegate class. &nbsp;</p>
<p class="p3">2) RootViewController - This is the view controller that is first displayed.</p>
<p class="p3">3) Demo.xcdatamodel - This contains the CoreData Entity Diagram. &nbsp;</p>
<p class="p3">4) MainWindow.xib - the first XIB file used to define the view.</p>
<p class="p3">5) RootViewController.xib - Defines the view used in the RootViewController.</p>
<p class="p4">&nbsp;</p>
<p class="p3">If you click the build and run button you will see the following running inside the simulator window:</p>
<p class="p2">&nbsp;See image list: Xcode Simulator Window.</p>
<p class="p2">&nbsp;</p>
<p class="p1">This is what you for free when creating a new UINavigation based project. &nbsp;</p>
<p class="p2">&nbsp;</p>
<p class="p1">To get you started I will show you the code that gets the view up and the code that handles the buttons displayed.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Inside the DemoAppDelegate.m file you will see a function like this:</p>
<p class="p2">&nbsp;</p>
<p class="p5">- (<span class="s1">BOOL</span>)application:(<span class="s2">UIApplication</span> *)application didFinishLaunchingWithOptions:(<span class="s2">NSDictionary</span> *)launchOptions { &nbsp; &nbsp;</p>
<p class="p6">&nbsp;&nbsp; &nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// Override point for customization after application launch.</p>
<p class="p6">&nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// Add the navigation controller's view to the window and display.</p>
<p class="p8"><span class="s3">&nbsp; &nbsp; [</span><span class="s1">self</span><span class="s3">.</span><span class="s2">window</span><span class="s3"> </span><span class="s4">addSubview</span><span class="s3">:</span>navigationController<span class="s3">.</span><span class="s4">view</span><span class="s3">];</span></p>
<p class="p9"><span class="s3">&nbsp; &nbsp; [</span><span class="s1">self</span><span class="s3">.</span><span class="s2">window</span><span class="s3"> </span>makeKeyAndVisible<span class="s3">];</span></p>
<p class="p6">&nbsp;</p>
<p class="p10"><span class="s3">&nbsp; &nbsp; </span>return<span class="s3"> </span>YES<span class="s3">;</span></p>
<p class="p5">}</p>
<p class="p6">&nbsp;</p>
<p class="p1">As the name implies this function is run when the application is done starting up for the first time. &nbsp;The navigationController which is defined inside the MainWindow.xib file is added as the main view of the window.&nbsp; The navigationController contains a root view controller called RootViewController that contains the code for the buttons that are used to edit and add new items to the table view.</p>
<p class="p2">&nbsp;</p>
<p class="p1">Inside the RootViewController.m file there is a function:</p>
<p class="p2">&nbsp;</p>
<p class="p5">- (<span class="s1">void</span>)viewDidLoad {</p>
<p class="p9"><span class="s3">&nbsp; &nbsp; [</span><span class="s1">super</span><span class="s3"> </span>viewDidLoad<span class="s3">];</span></p>
<p class="p6">&nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// Set up the edit and add buttons.</p>
<p class="p11"><span class="s3">&nbsp; &nbsp; </span><span class="s1">self</span><span class="s3">.</span>navigationItem<span class="s3">.</span>leftBarButtonItem<span class="s3"> = </span><span class="s1">self</span><span class="s3">.editButtonItem;</span></p>
<p class="p6">&nbsp;&nbsp; &nbsp;</p>
<p class="p9"><span class="s3">&nbsp; &nbsp; </span><span class="s2">UIBarButtonItem</span><span class="s3"> *addButton = [[</span><span class="s2">UIBarButtonItem</span><span class="s3"> </span>alloc<span class="s3">] </span>initWithBarButtonSystemItem<span class="s3">:</span>UIBarButtonSystemItemAdd<span class="s3"> </span>target<span class="s3">:</span><span class="s1">self</span><span class="s3"> </span>action<span class="s3">:</span><span class="s1">@selector</span><span class="s3">(</span><span class="s5">insertNewObject</span><span class="s3">)];</span></p>
<p class="p11"><span class="s3">&nbsp; &nbsp; </span><span class="s1">self</span><span class="s3">.</span>navigationItem<span class="s3">.</span>rightBarButtonItem<span class="s3"> = addButton;</span></p>
<p class="p5">&nbsp; &nbsp; [addButton <span class="s4">release</span>];</p>
<p class="p5">}</p>
<p class="p6">&nbsp;</p>
<p class="p1">This function adds the edit button defined in the RootViewController.xib file as the navigation bar's left bar button item.&nbsp; A new add button is added with an action of <span class="s6">insertNewObject.&nbsp;</span></p>
<p class="p2">&nbsp;</p>
<p class="p5">- (<span class="s1">void</span>)insertNewObject {</p>
<p class="p6">&nbsp;&nbsp; &nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// Create a new instance of the entity managed by the fetched results controller.</p>
<p class="p8"><span class="s3">&nbsp; &nbsp; </span><span class="s2">NSManagedObjectContext</span><span class="s3"> *context = [</span><span class="s1">self</span><span class="s3">.</span>fetchedResultsController<span class="s3"> </span><span class="s4">managedObjectContext</span><span class="s3">];</span></p>
<p class="p8"><span class="s3">&nbsp; &nbsp; </span><span class="s2">NSEntityDescription</span><span class="s3"> *entity = [[</span><span class="s1">self</span><span class="s3">.</span>fetchedResultsController<span class="s3"> </span><span class="s4">fetchRequest</span><span class="s3">] </span><span class="s4">entity</span><span class="s3">];</span></p>
<p class="p9"><span class="s3">&nbsp; &nbsp; </span><span class="s2">NSManagedObject</span><span class="s3"> *newManagedObject = [</span><span class="s2">NSEntityDescription</span><span class="s3"> </span>insertNewObjectForEntityForName<span class="s3">:[entity </span>name<span class="s3">] </span>inManagedObjectContext<span class="s3">:context];</span></p>
<p class="p6">&nbsp;&nbsp; &nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// If appropriate, configure the new managed object.</p>
<p class="p5">&nbsp; &nbsp; [newManagedObject <span class="s4">setValue</span>:[<span class="s2">NSDate</span> <span class="s4">date</span>] <span class="s4">forKey</span>:<span class="s7">@&quot;timeStamp&quot;</span>];</p>
<p class="p6">&nbsp;&nbsp; &nbsp;</p>
<p class="p7"><span class="s3">&nbsp; &nbsp; </span>// Save the context.</p>
<p class="p5">&nbsp; &nbsp; <span class="s2">NSError</span> *error = <span class="s1">nil</span>;</p>
<p class="p5">&nbsp; &nbsp; <span class="s1">if</span> (![context <span class="s4">save</span>:&amp;error]) {</p>
<p class="p5">&nbsp; &nbsp; &nbsp; &nbsp; <span class="s8">/*</span></p>
<p class="p7">&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; Replace this implementation with code to handle the error appropriately.</p>
<p class="p12">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</p>
<p class="p7">&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; abort() causes the application to generate a crash log and terminate. You should not use this function in a shipping application, although it may be useful during development. If it is not possible to recover from the error, display an alert panel that instructs the user to quit the application by pressing the Home button.</p>
<p class="p7">&nbsp;&nbsp; &nbsp; &nbsp; &nbsp; */</p>
<p class="p5">&nbsp; &nbsp; &nbsp; &nbsp; <span class="s4">NSLog</span>(<span class="s7">@&quot;Unresolved error %@, %@&quot;</span>, error, [error <span class="s4">userInfo</span>]);</p>
<p class="p5">&nbsp; &nbsp; &nbsp; &nbsp; <span class="s4">abort</span>();</p>
<p class="p5">&nbsp; &nbsp; }</p>
<p class="p5">}</p>
<p class="p6">&nbsp;</p>
<p class="p1">This function accesses the Managed Context and adds a new item to the database.&nbsp; If you read the tutorial on CoreData provided above, you will know all about how the table view is automatically updated. &nbsp;</p>
<p class="p2">&nbsp;</p>
<p>&nbsp;Please go through the rest of the code.&nbsp; This project is a great starting point and will get you started as an iPhone developer.</p>
<p>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Content-Style-Type" content="text/css">
<title></title>
<meta name="Generator" content="Cocoa HTML Writer">
<meta name="CocoaVersion" content="1038.35"> <style type="text/css">
p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 12.0px Helvetica}
</style>                </meta>
</meta>
</meta>
</meta>
</p>
