---
layout: post
title: WPF - How to response to DataContextChanged?
created: 1343651627
author: ofir
permalink: /wpf-how-response-datacontextchanged
tags:
- .NET
- .Net Open Source
- WPF
- Xaml
- DataContextChanged
---
<p>I had a problem with Expander:</p>
<p>When the <strong>Expander </strong>is open, and later on, change context to something with larger content,</p>
<p>the <strong>Expander</strong>, does not resize and display partialy data with Scrollbars.</p>
<p>&nbsp;</p>
<p>User need to collapse and re-expand it so the <strong>Expander </strong>will display it's content - <span style="color: rgb(255, 0, 0); "><b><u>unacceptable</u></b></span>.</p>
<p>&nbsp;</p>
<p>See images below:</p>
<p>&nbsp;<strong><img src="/files/Expanded-Before.jpg" alt="Expanded - data context fits" width="468" height="175" /></strong></p>
<p>Expander displays all DataContext - fits.</p>
<p>&nbsp;</p>
<p><img src="/files/Expanded-After.jpg" alt="DataContext is larger than Expander size" width="556" height="228" /></p>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>The first solution that comes to mind is of course to handle event in code behind.</p>
<p>&nbsp;</p>
<p>But if you don't want to mess with code behind, than it's a little tricky.</p>
<p>&nbsp;</p>
<p><strong>DataContextChanged </strong>is a regular event and not a&nbsp;<strong>RoutedEvent</strong>, so we cannot use <strong>EventTrigers</strong>.</p>
<p>&nbsp;</p>
<p>The solution is to use a Behavior with Property and Value to be set on the&nbsp;<strong>AssociatedObject</strong> which listen to&nbsp;DataContextChanged.</p>
<p>The Value will be set for the Property of the&nbsp;<strong>AssociatedObject</strong>&nbsp;(see line 20).</p>
<p>&nbsp;</p>
<pre title="code" class="brush: csharp;highlight: [20]; ruler: true; ">
public class DataContextChangedListenerBehavior : Behavior&lt;FrameworkElement&gt;
{
    protected override void OnAttached()
    {
        base.OnAttached();
        AssociatedObject.DataContextChanged += new DependencyPropertyChangedEventHandler(OnAssociatedObjectDataContextChanged);
    }

    protected override void OnDetaching()
    {
        base.OnDetaching();
        AssociatedObject.DataContextChanged -= new DependencyPropertyChangedEventHandler(OnAssociatedObjectDataContextChanged);
    }

    void OnAssociatedObjectDataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
    {
        object oldValue = AssociatedObject.GetValue(Property);
        if (!object.Equals(oldValue, Value))
        {
            AssociatedObject.SetValue(Property, Value);                
        }
    }

    public static readonly DependencyProperty PropertyProperty =
        DependencyProperty.Register(&quot;Property&quot;, typeof(DependencyProperty), typeof(DataContextChangedListenerBehavior));

    public DependencyProperty Property
    {
        get { return (DependencyProperty) GetValue(PropertyProperty); }
        set { SetValue(PropertyProperty, value); }
    }

    public static readonly DependencyProperty ValueProperty =
        DependencyProperty.Register(&quot;Value&quot;, typeof (object), typeof (DataContextChangedListenerBehavior), 
                                    new PropertyMetadata(null, null, OnCoerceValueCallback));

    private static object OnCoerceValueCallback(DependencyObject d, object basevalue)
    {
        DependencyProperty prop = (DependencyProperty) d.GetValue(PropertyProperty);
        TypeConverter converter = TypeDescriptor.GetConverter(prop.PropertyType);
        object val;
        try
        {
            if (converter != null &amp;&amp; converter.CanConvertFrom(basevalue.GetType()))
            {
                val = converter.ConvertFrom(basevalue);
            }
            else
            {
                val = Convert.ChangeType(basevalue, prop.PropertyType);
            }
        }
        catch
        {
            val = basevalue;
        }
        return val;
    }

    public object Value
    {
        get { return GetValue(ValueProperty); }
        set { SetValue(ValueProperty, value); }
    }
}</pre>
<p>&nbsp;</p>
<p>&nbsp;Usage:</p>
<pre title="code" class="brush: xhtml;">
&lt;Expander DataContext=&quot;{Binding SomeDataContext}&quot; &gt;
    &lt;i:Interaction.Behaviors&gt;
        &lt;b:DataContextChangedListenerBehavior Property=&quot;Expander.IsExpanded&quot; Value=&quot;False&quot; /&gt;
    &lt;/i:Interaction.Behaviors&gt;
&lt;/Expander&gt;</pre>
<p>&nbsp;</p>
<p>&nbsp;</p>
<p>Enjoy,</p>
<p>Ofir</p>
