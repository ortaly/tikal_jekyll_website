---
layout: post
title: WPF - Get Grid's row and column indices by mouse position
created: 1341731628
author: ofir
permalink: /wpf-get-grids-row-and-column-indices-mouse-position
tags:
- .NET
- WPF
- Row index
- Mouse position
- Grid
- Column index
- .Net Open Source
---
<p>&nbsp;I'm trying to find out what are the row index and column index of a grid by given mouse position.</p>
<p>&nbsp;</p>
<p>Every search I tried ot me these options:</p>
<pre title="code" class="brush: csharp;">

int rowIndex = Grid.GetRow(myButton);</pre>
<p>or</p>
<pre title="code" class="brush: csharp;">
private void OnMouseMove(object sender, MouseEventArgs e)
{
    var element = (UIElement)e.Source;

    int c = Grid.GetColumn(element);
    int r = Grid.GetRow(element);
}</pre>
<p>&nbsp;</p>
<p>Which are nice, but what if I don't have any elements in grid?</p>
<p>&nbsp;</p>
<p>Here comes my solution, its based on Grid's ColumnDefinition and&nbsp;RowDefinition:</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;">
public static void GetRowColumn(this Grid @this, Point position, out int row, out int column)
{
    column = -1;
    double total = 0;
    foreach (ColumnDefinition clm in @this.ColumnDefinitions)
    {
        if (position.X &lt; total)
        {
            break;
        }
        column++;
        total += clm.ActualWidth;
    }
    row = -1;
    total = 0;
    foreach (RowDefinition rowDef in @this.RowDefinitions)
    {
        if (position.Y &lt; total)
        {
            break;
        }
        row++;
        total += rowDef.ActualHeight;
    }
}</pre>
<p>&nbsp;</p>
<p>Hope it helps all you guys like me.</p>
<p>Ofir</p>
<p>&nbsp;</p>
