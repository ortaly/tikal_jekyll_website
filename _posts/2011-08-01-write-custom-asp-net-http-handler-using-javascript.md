---
layout: post
title: 'Write custom ASP.NET HTTP Handler using JavaScript '
created: 1312194893
author: igorz
permalink: /write-custom-aspnet-http-handler-using-javascript
tags:
- ASP.NET
- .Net Open Source
---
<p>JavaScript is extremely popular language and already has implementations for server-side programming. For example <a href="http://nodejs.org/">Node.js</a>&nbsp; - a server-side JavaScript environment that utilizes Goggle's <a href="http://code.google.com/p/v8/">V8 JavaScript Engine</a>.<br />
<br />
<br />
I am an ASP.NET developer and want to use JavaScript in the ASP.NET environment. I found<a href="http://javascriptdotnet.codeplex.com/"> Javascript .NET</a> project, that bring Google's V8 to the .NET world and I started with a simple task - to write a custom ASP.NET HTTP Handler using JavaScript. (I had done <a href="http://igorzelmanovich.blogspot.com/2010/11/write-custom-aspnet-http-handler-with.html">similar task with IronPython</a> before)<br />
<br />
<b>Setup requirements</b><br />
<br />
1. I want *.js file to be processed on server (like *.aspx or *.ashx)<br />
2. I want to access server side objects (such HttpContext, HttpRequest and HttpResponse) from javascript code.<br />
<br />
<b>Implementation</b><br />
<br />
First of all, download <a class="SelectedRelease" href="http://javascriptdotnet.codeplex.com/" id="ReleaseLinkStable0" title="Recommended Release: Javascript .NET v0.4">Javascript .NET</a> and add the reference to Noesis.Javascript.dll. It embeds Google's V8 and contains an API required to run JavaScript code</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://2.bp.blogspot.com/-cX03YTr1g00/TjZh_KVCyRI/AAAAAAAALNE/h7UflLMSluk/s1600/2011-08-01+11h20_21.png" alt="" /></div>
<p><br />
<br />
Setup custom HTTP Handler in web.config. It will handle any request of *.js file under App folder. I configure it this way to allow other javascript files (not under App folder) to be processed as static content for being used in browser.</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://4.bp.blogspot.com/-RP3eDupl-fs/TjZXyWPiGjI/AAAAAAAALM4/ai1bTVP0ncU/s1600/2011-08-01%2B10h27_14.png" alt="" /></div>
<p><br />
Next step - create App folder and&nbsp; HelloWorld.js file:</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://2.bp.blogspot.com/-HowrTrFMODg/TjZX2TfMfvI/AAAAAAAALNA/9ZpMpd_mozU/s1600/2011-08-01%2B10h28_06.png" alt="" /></div>
<p><br />
Write the single line code:</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://2.bp.blogspot.com/--q_2r5cys0w/TjZkLtQyKGI/AAAAAAAALNQ/DoKnUhXUJgg/s1600/2011-08-01+11h30_19.png" alt="" /></div>
<div class="separator" style="clear: both; text-align: center;">&nbsp;</div>
<p><br />
At this moment I expect this code run on server and produce simple 'Hello World!' html.<br />
But to make it works I have to implement JavaScriptHttpHandlerFactory - the core of all this. <br />
<br />
<b>JavaScriptHttpHandlerFactory</b><br />
<br />
Implementation is listed below:</p>
<pre class="prettyprint"><span class="kwd"><br /></span></pre>
<pre title="code" class="brush: csharp;">
using System.IO;
using System.Web;
using Noesis.Javascript;

namespace Web
{
    public class JavaScriptHttpHandlerFactory : IHttpHandlerFactory
    {
        public IHttpHandler GetHandler(HttpContext context, 
                   string requestType, string url, string pathTranslated)
        {
            return new JavaScriptHttpHandler(pathTranslated);
        }

        public void ReleaseHandler(IHttpHandler handler)
        {
        }
    }

    public class JavaScriptHttpHandler : IHttpHandler
    {
        private readonly string pathTranslated;

        public JavaScriptHttpHandler(string pathTranslated)
        {
            this.pathTranslated = pathTranslated;
        }

        public void ProcessRequest(HttpContext context)
        {
            var scriptCode = File.ReadAllText(pathTranslated);

            using (var jsContext = new JavascriptContext())
            {
                jsContext.SetParameter(&quot;context&quot;, context);
                jsContext.SetParameter(&quot;request&quot;, context.Request);
                jsContext.SetParameter(&quot;response&quot;, context.Response);

                try
                {
                    jsContext.Run(scriptCode);
                }
                catch (JavascriptException ex)
                {
                    throw new HttpParseException(ex.Message, ex, 
                      pathTranslated, scriptCode, ex.Line);
                }
            }
        }

        public bool IsReusable
        {
            get { return false; }
        }
    }
}</pre>
<p><br />
As you may see, implementation of JavaScriptHttpHandlerFactory is pretty simple. Read the js file, create JavascriptContext, setup context parameters and finally execute.<br />
<br />
Now when you run HelloWorld.js you get &quot;Hello World!&quot; in browser:</p>
<p>&nbsp;</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://3.bp.blogspot.com/-urCn1croTtg/TjZmzZpGwaI/AAAAAAAALNU/0b7QBSlntMs/s1600/2011-08-01+11h41_31.png" alt="" /></div>
<p><br />
<b>Error handling</b><br />
<br />
But all of this worth nothing if we are not able to debug javascript easily.<br />
Javascript.NET allows us to handle javascript errors and even points to source code line where error was occurred.<br />
<br />
I used this feature to expose a javascript error in convenient format of &quot;yellow screen of death&quot;:</p>
<div class="separator" style="clear: both; text-align: center;"><img border="0" src="http://1.bp.blogspot.com/-Qkh9r3yZ-OE/TjZrG4dLcXI/AAAAAAAALNc/uk93n6GktOk/s1600/2011-08-01+11h58_42.png" alt="" /></div>
<div class="separator" style="clear: both; text-align: center;"><a href="http://3.bp.blogspot.com/-vXGCE_ficO4/TjZqfaIEXuI/AAAAAAAALNY/63OivaHqQ8Q/s1600/2011-08-01+11h57_03.png" imageanchor="1" style="margin-left: 1em; margin-right: 1em;"><br />
</a></div>
<p><br />
<br />
<b>Conclusion</b><br />
<br />
Integration of JavaScript into ASP.NET environment is possible and not so hard<br />
<br />
BTW, Javascript.NET is not only technology allows it. There is <a href="https://github.com/fholm/IronJS">IronJS</a> wich runs javascript over DLR. May be in one next posts will play with it.</p>
<p>&nbsp;</p>
<p>(<a href="http://igorzelmanovich.blogspot.com/2011/08/write-custom-aspnet-http-handler-using.html">original post</a>)</p>
