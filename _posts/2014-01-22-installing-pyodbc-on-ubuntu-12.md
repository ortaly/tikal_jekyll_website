---
layout: post
title: Installing pyodbc on ubuntu > 12
created: 1390396175
author: menny
permalink: installing-pyodbc-on-ubuntu-12
tags:
- Incubator
- Python
---
<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">I had many problems with it till I got it running, pycharm (&ldquo;intelligence&rdquo;) won&rsquo;t help you there cause you&rsquo;ll need to compile the lib for it to work first.</p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">$ sudo apt-get install unixODBC-dev</p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">$ sudo apt-get install g++</p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">$ sudo apt-get install python-dev</p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">$ sudo apt-get install tdsodbc</p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">download and extract the pyodbc source code (<a href="http://code.google.com/p/pyodbc/downloads/detail?name=pyodbc-3.0.7.zip&amp;can=2&amp;q=)" style="border: 0px; font-family: inherit; font-size: 15px; font-style: inherit; font-weight: inherit; margin: 0px; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(25, 130, 209); text-decoration: none;">http://code.google.com/p/pyodbc/downloads/detail?name=pyodbc-3.0.7.zip&amp;can=2&amp;q=)</a></p>

<p style="border: 0px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; font-style: normal; font-weight: 300; margin: 0px 0px 1.625em; outline: 0px; padding: 0px; vertical-align: baseline; color: rgb(55, 55, 55); font-variant: normal; letter-spacing: normal; line-height: 24.375px; orphans: auto; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: auto; word-spacing: 0px; -webkit-text-stroke-width: 0px; background-color: rgb(255, 255, 255);">run the setup file in the extracted directory:<br />
$ python setup.py build<br />
$ sudo python setup.py install</p>
