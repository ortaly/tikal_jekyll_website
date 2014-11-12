---
layout: post
title: Namespace for Extension Methods
created: 1343894364
author: amiram
permalink: /net/namespace-extension-methods
tags:
- .NET
---
<p>Recently We had a discussion about what namespace would you give to an extension method. Most answers to this question say you should put it in something like “<strong>Extensions</strong>” or “<strong>YourCompany.Technology.Extensions</strong>” (like <a href="http://msdn.microsoft.com/en-us/library/bb383977.aspx" target="_blank">here</a> and <a href="http://stackoverflow.com/a/1226203/1495902" target="_blank">here</a>).</p>
<p>The problem with that is probably known to any developer. Since Visual Studio 97 where IntelliSense was added, you learn about the class functionality from the Intellisense list, but the extension method won’t appear in the list until you add the extension method namespace in your using list. Sure it happened to you when you wrote something like “myControl.Nodes.” and you were surprised to see there is no “<strong>Where</strong>” method. You must have asked yourself “Did they forget to implement IEnumerable<T> when .NET 2.0 was out?”, and after that you try to find the “<strong>OfType</strong>“ method but you don’t find it either. A quick look will show you that the “<strong>using System.Linq;</strong>” statement is missing.</p>
<p>This namespace is not there because of possible two reasons:</p>
<ol>
<li>This file was created before .NET 3.5 where Microsoft added this namespace to any C# file template.</li>
<li>You used the “<strong>Remove Unused Usings</strong>” feature when no IEnumerable<T> was in use in that file. (Use <a href="http://visualstudiogallery.msdn.microsoft.com/76293c4d-8c16-4f4a-aee6-21f83a571496/" target="_blank">CodeMaid </a>to do that. It has a white list for that, among many other great features). BTW, unused usings don’t have any effect on run time, only design and compile time. Look <a href="http://stackoverflow.com/questions/1162766/how-is-performance-affected-by-an-unused-using-statement" target="_blank">here</a> and <a href="http://stackoverflow.com/questions/641234/overhead-to-unused-using-declarations" target="_blank">here</a>.</li>
</ol>
<p>Same goes for any extension method you write. If your colleague won’t remember the method you wrote (and probably you either won’t remember it after a while), he won’t have any clue about its existence. Even if you add this namespace to any C# template in your organization (Try to change the namespace after that!), it could be deleted.</p>
<p>So why won’t we go back to the days of the big Utils class?</p>
<p>I think we should name extension method namespace after the first parameter (the one with “<strong>this</strong>“) type namespace. For example, if you’re extending <strong>DataObjects.Person</strong>, give your extension method the <strong>DataObjects</strong> namespace. Most times when you use a class in your code you have its namespace inside a using statement (unless you got the instance from somewhere else).</p>
<p></p><pre class="crayon-plain-tag">namespace DataObjects
{
    public static class PersonExtensions
    {
        public static string GetFullName(this Person p)
        {
            return p.FirstName + &quot; &quot; + p.LastName;
        }
    }
}</pre><p></p>
<p>Now what if you want to extend <strong>System.String</strong>. Someone might think that writing your extension method in <strong>System</strong> namespace is not allowed / won’t compile / not possible. Well, it is possible and won’t cause you any problem (I’m not an attorney, though).</p>
<p>Think of an extension method as a method you want to inject into the class being extended, so why not inject it into its namespace also?</p>
<p><a href="http://msdn.microsoft.com/en-us/library/ms229026.aspx" target="_blank">MSDN namespace naming guidelines</a> say:</p>
<blockquote><p>You should make every effort to avoid name collisions with types in the core namespaces</p></blockquote>
<p>As for extension methods, this is not going to cause any collision at all. The thing your should be aware of, is that if Microsoft will ever write a method with the same name and parameters in the class you’ve extended, all your method calls will now go to their code, ignoring your extension method without any compile error or warning. However, it doesn’t matter what is the namespace you have chosen, or which using statement you added.</p>
<p>You just need to find a class name and a method that won’t collide with the core types ever. “<strong>iPhoneGoogleFacebook</strong>” might be a good prefix. They are not going to buy all of them, don’t they?</p>
