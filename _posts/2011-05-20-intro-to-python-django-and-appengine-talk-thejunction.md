---
layout: post
title: Intro to Python, Django & AppEngine talk @ TheJunction
created: 1305898763
author: udib
permalink: /incubator/intro-python-django-appengine-talk-thejunction
tags:
- Incubator
- talk
- Python
- introduction
- Django
- AppEngine
---
<p>&nbsp;</p>
<p>Some notes &amp;&nbsp;source-code from the <a href="http://www.meetup.com/The-Junction/events/17967481/">talk</a> given in <a href="http://thejunction.co.il/">TheJunction</a>. Links to more source code &amp; resources can be found at the bottom of this post.</p>
<p>&nbsp;</p>
<p><span style="color: rgb(0, 0, 255); ">Screencast recording</span></p>
<p>(not the actual talk, but almost identical):</p>
<embed src="http://blip.tv/play/grVLgrz9UAA" type="application/x-shockwave-flash" width="450" height="359" wmode="transparent" allowscriptaccess="always" allowfullscreen="true"></embed>
<p>&nbsp;</p>
<ul>
    <li><span style="color: rgb(0, 51, 255); font-size: 150%; font-family: SansSerif,sans-serif;">messages</span></li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Python is great</span></li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Django is great</span></li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">AppEngine is great</span></li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">but in order not to lock-in, use Django there</span></li>
    <li><span style="color: rgb(0, 51, 255); font-size: 150%; font-family: SansSerif,sans-serif;"><br />
    </span></li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">shell</span>
    <ul>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">מאפשר פיתוח&nbsp;אינטראקטיבי&nbsp;מהיר, בו&nbsp;הסייקל&nbsp;של&nbsp;כתיבה&nbsp;בדיקה&nbsp;והרצה&nbsp;מהיר&nbsp;ביותר</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17);">exploratory coding</span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Python overview</span>
    <ul>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">shell</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; x = 1</p>
            <p>&gt;&gt;&gt; x</p>
            <p>1</p>
            <p>&gt;&gt;&gt; x == 1</p>
            <p>True</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; type(x)</p>
            <p>&lt;type 'int'&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; dir(x)</p>
            <p>['__abs__', '__add__', '__and__', '__class__', '__cmp__', '__coerce__', '__delattr__', '__div__', '__divmod__', '__doc__', '__float__', '__floordiv__', '__format__', '__getattribute__', '__getnewargs__', '__hash__', '__hex__', '__index__', '__init__', '__int__', '__invert__', '__long__', '__lshift__', '__mod__', '__mul__', '__neg__', '__new__', '__nonzero__', '__oct__', '__or__', '__pos__', '__pow__', '__radd__', '__rand__', '__rdiv__', '__rdivmod__', '__reduce__', '__reduce_ex__', '__repr__', '__rfloordiv__', '__rlshift__', '__rmod__', '__rmul__', '__ror__', '__rpow__', '__rrshift__', '__rshift__', '__rsub__', '__rtruediv__', '__rxor__', '__setattr__', '__sizeof__', '__str__', '__sub__', '__subclasshook__', '__truediv__', '__trunc__', '__xor__', 'conjugate', 'denominator', 'imag', 'numerator', 'real']</p>
            <p>&gt;&gt;&gt; x.imag()</p>
            <p>Traceback (most recent call last):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;</p>
            <p>TypeError: 'int' object is not callable</p>
            <p>&gt;&gt;&gt; x.imag</p>
            <p>0</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; if x == 2:</p>
            <p>...&nbsp;&nbsp;&nbsp;print &quot;Yes&quot;</p>
            <p>... else:</p>
            <p>...&nbsp;&nbsp;&nbsp;print &quot;No&quot;</p>
            <p>...</p>
            <p>No</p>
            <p>&gt;&gt;&gt; while x &lt; 10:</p>
            <p>...&nbsp;&nbsp;&nbsp;x += 1</p>
            <p>...&nbsp;&nbsp;&nbsp;print x</p>
            <p>...</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; l = [1, 2, 3, 4]</p>
            <p>&gt;&gt;&gt; len(l)</p>
            <p>4</p>
            <p>&gt;&gt;&gt; l.append(&quot;a&quot;)</p>
            <p>&gt;&gt;&gt; l</p>
            <p>[1, 2, 3, 4, 'a']</p>
            <p>&gt;&gt;&gt; for x in l:</p>
            <p>...&nbsp;&nbsp;&nbsp;print x</p>
            <p>...</p>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>a</p>
            <p>&gt;&gt;&gt; t = (1, 2, 3, 4)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; len(t)</p>
            <p>4</p>
            <p>&gt;&gt;&gt; t.append(&quot;a&quot;)</p>
            <p>Traceback (most recent call last):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;</p>
            <p>AttributeError: 'tuple' object has no attribute 'append'</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; l * 2</p>
            <p>[1, 2, 3, 4, 'a', 1, 2, 3, 4, 'a']</p>
            <p>&gt;&gt;&gt; l</p>
            <p>[1, 2, 3, 4, 'a']</p>
            <p>&gt;&gt;&gt; l + [4, 5, 6]</p>
            <p>[1, 2, 3, 4, 'a', 4, 5, 6]</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; l2 = [x**2 for x in l if type(x) == int]</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; 10**2</p>
            <p>100</p>
            <p>&gt;&gt;&gt; l2</p>
            <p>[1, 4, 9, 16]</p>
            <p>&gt;&gt;&gt; l2 = [x**2 for x in l]</p>
            <p>Traceback (most recent call last):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;</p>
            <p>TypeError: unsupported operand type(s) for ** or pow(): 'str' and 'int'</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; def add(x, y):</p>
            <p>...&nbsp;&nbsp;&nbsp;return x + y</p>
            <p>...</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; add(10)</p>
            <p>Traceback (most recent call last):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;</p>
            <p>TypeError: add() takes exactly 2 arguments (1 given)</p>
            <p>&gt;&gt;&gt; add(10, 12)</p>
            <p>22</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; def (*args):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;def (*args):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;^</p>
            <p>SyntaxError: invalid syntax</p>
            <p>&gt;&gt;&gt; def add(*args):</p>
            <p>...&nbsp;&nbsp;&nbsp;return sum(args)</p>
            <p>...</p>
            <p>&gt;&gt;&gt; add(10)</p>
            <p>10</p>
            <p>&gt;&gt;&gt; add(10, 20, 30)</p>
            <p>60</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; def add_and_multiply(x, y):</p>
            <p>...&nbsp;&nbsp;&nbsp;return x + y, x * y</p>
            <p>...</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; add_and_multiply(10, 20)</p>
            <p>(30, 200)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; a, b = add_and_multiply(10, 20)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; b</p>
            <p>200</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; class MyClass():</p>
            <p>...&nbsp;&nbsp;&nbsp;def __init__(v):</p>
            <p>...</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 3</p>
            <p>&nbsp;&nbsp;&nbsp;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;^</p>
            <p>IndentationError: expected an indented block</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; class MyClass():</p>
            <p>...&nbsp;&nbsp;&nbsp;def __init__(self, v):</p>
            <p>...&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.v = v</p>
            <p>...</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; x = MyClass(5)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; x</p>
            <p>&lt;__main__.MyClass instance at 0x39a670&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; dir(x)</p>
            <p>['__doc__', '__init__', '__module__', 'v']</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; x.v</p>
            <p>5</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt;</p>
            </span></li>
        </ul>
        </li>
        <li>&nbsp;</li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">Python module&nbsp;</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">
            <p>&nbsp;</p>
            <p>def add_and_multiply(x, y):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Returns the sum &amp; product of given 2 numbers</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;return x + y, x * y</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>if __name__ == &quot;__main__&quot;:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;print add_and_multiply(10, 20)</p>
            <p>&nbsp;&nbsp;&nbsp;</p>
            </span></li>
        </ul>
        </li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">self in methods is derived from the python principle of:</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17);">Explicit is better than implicit</span></li>
        </ul>
        </li>
        <li>&nbsp;</li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">See the rest of the principles</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif; font-weight: bold;">import this</span></li>
        </ul>
        </li>
        <li>&nbsp;</li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">list comprehension</span>
        <ul>
            <li>
            <p><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">כפי ששפת&nbsp;אם&nbsp;משחררת&nbsp;את&nbsp;המחשבה, ומאפשרת&nbsp;לדבר&nbsp;במהירות, קצר, יפה&nbsp;וקולע</span></p>
            <p><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">ככה גם&nbsp;פייתון</span></p>
            <p><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">נגיד שיש&nbsp;לכם&nbsp;שתי&nbsp;רשימות&nbsp;של&nbsp;מספרים&nbsp;ואתם&nbsp;צריכים&nbsp;לחשב&nbsp;ממוצע&nbsp;של&nbsp;סכום&nbsp;כל&nbsp;2 מספרים&nbsp;באותו&nbsp;מיקום&nbsp;ברשימות, במידה&nbsp;ושניהם&nbsp;גדולים&nbsp;מ-0</span></p>
            <p><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">בכמה שורות&nbsp;תכתבו&nbsp;את&nbsp;זה&nbsp;בשפה&nbsp;שאתם&nbsp;מכירים?</span></p>
            <p><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">בפייתון מספיקה&nbsp;1</span></p>
            <ul>
                <li><span style="color: rgb(17, 17, 17);">sum([i+j for i, j in zip(l1, l2) if a*b&gt;0]) / len(l1)</span></li>
                <li>&nbsp;</li>
            </ul>
            </li>
        </ul>
        </li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">פונקציה</span></li>
        <li>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">def add</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">ניתן גם&nbsp;להחזיר&nbsp;יותר&nbsp;מערך&nbsp;אחד</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">def add_and_multiply</span></li>
            <li>&nbsp;</li>
        </ul>
        </li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">doctest</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">על  מנת&nbsp;לוודא&nbsp;שנכונות&nbsp;של&nbsp;פונקציות&nbsp;לא&nbsp;נשברת&nbsp;בריפקטורינג,  חשוב&nbsp;לכתוב&nbsp;יוניט&nbsp;טסטס</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">נניח שאנחנו&nbsp;רוצים&nbsp;להכין&nbsp;אחד&nbsp;לפונקציה&nbsp;שהכנו&nbsp;קודם</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">קודם כל, בואו&nbsp;נבדוק&nbsp;קצת&nbsp;את&nbsp;הפונקציה&nbsp;בשל</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">עכשיו  נעתיק&nbsp;את&nbsp;הבדיקה&nbsp;הידנית&nbsp;לתוך&nbsp;הערה&nbsp;בהתחלת&nbsp;הפונקציה</span></li>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;"><br />
            </span></li>
        </ul>
        </li>
        <li>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">
            <p>&nbsp;</p>
            <p>def add_and_multiply(x, y):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;Returns the sum &amp; product of given 2 numbers</p>
            <p>&gt;&gt;&gt; add_and_multiply(10, 20)</p>
            <p>(30, 200)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; add_and_multiply(0, 0)</p>
            <p>(0, 0)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; add_and_multiply(10, 0)</p>
            <p>(10, 0)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&gt;&gt;&gt; add_and_multiply(10)</p>
            <p>Traceback (most recent call last):</p>
            <p>&nbsp;&nbsp;File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;</p>
            <p>TypeError: add_and_multiply() takes exactly 2 arguments (1 given)</p>
            <p>&gt;&gt;&gt;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&quot;&quot;&quot;</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;return x + y, x * y</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>if __name__ == &quot;__main__&quot;:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;print add_and_multiply(10, 20)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;doctest.testmod()</p>
            <p>&nbsp;&nbsp;&nbsp;</p>
            </span><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;"><br />
            </span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Django overview</span>
    <ul>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">installation</span></li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">django-admin.py</span></li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">commands</span>
        <ul>
            <li><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">manage.py</span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">PyCharm</span>
    <ul>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">live templates</span></li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">debugging</span></li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">error highlighting</span></li>
        <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">django &amp; appengine support</span></li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">AppEngine</span></li>
    <li>
    <ul>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">manage.py deploy</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">will run syncdb &amp; createsuperuser</span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 51, 255); font-size: 150%; font-family: SansSerif,sans-serif;">code</span>
    <ul>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">settings.py</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">
            <p># setup default datastore paths</p>
            <p>_ds_pathinfo = {</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;'datastore_path': '../data/waybetter.datastore',</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;'history_path': '../data/waybetter.datastore.history',</p>
            <p>}</p>
            <p>&nbsp;</p>
            <p>DATABASES['gae'].update(_ds_pathinfo)</p>
            </span></li>
        </ul>
        </li>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">urls.py</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;"> &nbsp;&nbsp;&nbsp;url(r'^problem/(?P&lt;problem_id&gt;\d+)/$', 'haditbefore.views.view_problem'), </span></li>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;"> &nbsp;&nbsp;&nbsp;(r'^_ah/xmpp/message/chat/', 'haditbefore.services.handle_message'), </span></li>
        </ul>
        </li>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">app.yaml</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">Inbound services</span>
            <ul>
                <li><span style="color: rgb(17, 17, 17);">
                <p>- xmpp_message</p>
                <p>- xmpp_presence</p>
                </span></li>
            </ul>
            </li>
        </ul>
        </li>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">unit test</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">
            <p>from django.test import TestCase</p>
            <p>from django.test.client import Client</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>class SimpleTest(TestCase):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;def test_basic_addition(self):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;client = Client()</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;response = client.get(&quot;/&quot;)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.assertEqual(len(response.context[&quot;problems&quot;]), 2, &quot;Expected 2 problems!&quot;)</p>
            </span></li>
        </ul>
        </li>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">views</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">
            <p>from django.http import HttpResponseNotFound, HttpResponseRedirect</p>
            <p>from django.shortcuts import render_to_response, get_object_or_404</p>
            <p>from django.template.context import RequestContext</p>
            <p>from haditbefore_app.forms import ProblemForm</p>
            <p>from haditbefore_app.models import Problem</p>
            <p>&nbsp;</p>
            <p>def home(request):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;problems = Problem.objects.all().order_by(&quot;-update_date&quot;)[:10]</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;return render_to_response('home.html', locals())</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>def view_problem(request, problem_id):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;query = Problem.objects.filter(id=problem_id)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;if query.count():</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;problem = query[0]</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;else:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return HttpResponseNotFound(&quot;No such problem&quot;)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;return render_to_response('view_problem.html', locals())</p>
            <p>&nbsp;</p>
            <p>&nbsp;</p>
            <p>def edit_problem(request, problem_id):</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;problem = get_object_or_404(Problem, id=problem_id)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;form = ProblemForm(instance=problem)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;if request.method == &quot;POST&quot;:</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;form = ProblemForm(request.POST, instance=problem)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if form.is_valid():</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;form.save()</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;return HttpResponseRedirect(&quot;/&quot;)</p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;return render_to_response('edit_problem.html', locals(), context_instance=RequestContext(request))</p>
            </span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 51, 255); font-size: 150%; font-family: SansSerif,sans-serif;">indices problem</span>
    <ul>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">high replication</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">A problem with composite indexes, don't use it for now with django-nonrel</span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li>&nbsp;</li>
    <li><span style="color: rgb(0, 51, 255); font-size: 150%; font-family: SansSerif,sans-serif;">Links</span>
    <ul>
        <li>&nbsp;</li>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Books</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">Python</span>
            <ul>
                <li>
                <ul>
                    <li><a href="http://learnpythonthehardway.org/index"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">Learn Python the hard way</span></a></li>
                </ul>
                <ul>
                    <li><a href="http://diveintopython.org/"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">Dive into Python</span></a></li>
                    <li><a href="http://code.google.com/edu/languages/google-python-class/index.html">Google Python Course</a></li>
                </ul>
                </li>
                <li>
                <ul>
                    <li><a href="http://oreilly.com/catalog/9780596513986"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">Learn Python</span></a></li>
                </ul>
                </li>
                <li>
                <ul>
                    <li><a href="http://us.pycon.org/2010/tutorials/williams_python101/"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">Tutorial given at PyCon</span></a> (video at the bottom)</li>
                </ul>
                </li>
                <li>
                <ul>
                    <li>&nbsp;</li>
                </ul>
                </li>
            </ul>
            </li>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">Django</span><span style="color: rgb(17, 17, 17);"><br />
            </span><a href="http://www.djangobook.com/en/2.0/"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">The Django Book 2</span></a>
            <ul>
                <li><span style="color: rgb(17, 17, 17);"><a href="http://www.amazon.com/Definitive-Guide-Django-Development-Right/dp/1590597257">Django:&nbsp;The definitive guide</a><br />
                </span><a href="http://prodjango.com/"><span style="color: rgb(17, 17, 17); font-family: SansSerif,sans-serif;">Pro Django</span></a></li>
            </ul>
            </li>
            <li>&nbsp;</li>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">AppEngine</span></li>
        </ul>
        </li>
    </ul>
    </li>
    <li><a href="http://code.google.com/appengine/docs/python/overview.html">Documentation</a></li>
    <li><a href="http://www.youtube.com/results?search_query=AppEngine+i%2FO+2011&amp;aq=f">Google I/O 2011 Videos</a></li>
    <li>
    <ul>
        <li><span style="color: rgb(0, 180, 57); font-size: 133%; font-family: SansSerif,sans-serif;">Had it before</span>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">Source</span></li>
        </ul>
        </li>
        <li><a href="https://bitbucket.org/dibau/haditbefore/">https://bitbucket.org/dibau/haditbefore/</a></li>
        <li>&nbsp;</li>
        <li>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;">App</span>
            <ul>
                <li><a href="http://haditbefore-demo.appspot.com"><span style="color: rgb(17, 17, 17);">http://haditbefore-demo.appspot.com</span></a></li>
            </ul>
            </li>
            <li>&nbsp;</li>
        </ul>
        </li>
        <li>
        <ul>
            <li><span style="color: rgb(153, 0, 0); font-size: 116%; font-family: SansSerif,sans-serif;"><br />
            </span></li>
        </ul>
        </li>
    </ul>
    </li>
</ul>
