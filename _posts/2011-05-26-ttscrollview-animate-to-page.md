---
layout: post
title: TTScrollView animate to page
created: 1306396536
permalink: ttscrollview-animate-to-page
tags:
- Incubator
- Mobile
- iOS
---
<p>I have been using Three20′s TTScrollView for some time now.  I really enjoy the way I can use it like a UITableViewController and set the delegate and datasource.  It is quite memory efficient with it’s ability to reuse views.</p>
<p>In my last project, my client wanted me to display photos is a timeline horizontally.  In addition to flicking the photos I needed to support a next and previous button.  I implemented this by calling [self.scrollView moveToPageAtIndex:currentPage+1 resetEdges:YES]; on my scrollview.  This worked to show the next photo however, it did not animate the scroll.  This was a big problem for the client.  </p>
<p>I went about searching the internet for solutions.  I only found others asking the same question. So i proceded to create my own solution.</p>
<p>I didn’t want to do anything too fancy so I came up with this code for my next and previous button handlers:<br />
<code><br />
-(IBAction)nextImage:(id)sender<br />
{<br />
    UIView *nextView = [self.scrollView pageAtIndex:currentPage + 1];<br />
    UIView *thisView = [self.scrollView pageAtIndex:currentPage];</p>
<p>    CGRect thisFrame = thisView.frame;<br />
    CGRect previousFrame = CGRectMake(thisFrame.origin.x - thisFrame.size.width, thisFrame.origin.y, thisFrame.size.width, thisFrame.size.height);</p>
<p>    [UIView beginAnimations:@"next" context:NULL];<br />
    [UIView setAnimationDuration:0.3];<br />
    [UIView setAnimationBeginsFromCurrentState:YES];</p>
<p>    nextView.frame = thisFrame;<br />
    thisView.frame = previousFrame;</p>
<p>    [UIView commitAnimations];</p>
<p>    [self.scrollView moveToPageAtIndex:currentPage+1 resetEdges:YES];<br />
}</p>
<p>-(IBAction)previousImage:(id)sender<br />
{<br />
    UIView *nextView = [self.scrollView pageAtIndex:currentPage - 1];<br />
    UIView *thisView = [self.scrollView pageAtIndex:currentPage];</p>
<p>    CGRect thisFrame = thisView.frame;<br />
    CGRect previousFrame = CGRectMake(thisFrame.origin.x + thisFrame.size.width, thisFrame.origin.y, thisFrame.size.width, thisFrame.size.height);</p>
<p>    [UIView beginAnimations:@"previous" context:NULL];<br />
    [UIView setAnimationDuration:0.3];<br />
    [UIView setAnimationBeginsFromCurrentState:YES];</p>
<p>    nextView.frame = thisFrame;<br />
    thisView.frame = previousFrame;</p>
<p>    [UIView commitAnimations];</p>
<p>    [self.scrollView moveToPageAtIndex:currentPage-1 resetEdges:YES];<br />
}<br />
</code></p>
<p>The code is pretty straightforward. It does the following:<br />
1) Retrieve a pointer to the current and next/previous view.<br />
2) Create CGRects to indicate where the two views will move to.<br />
3) Set up UIView animations to animate the movement of the two views.<br />
4) Finally, call moveToPageAtIndex on the scrollview to update the scrollview.</p>
<p>This works quite nicely.  I would like to hear your comments and any other solutions you come up with.  Feel free to comment.</p>
<p>I hope this helps out,</p>
<p>Dov</p>
