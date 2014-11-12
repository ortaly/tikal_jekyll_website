---
layout: post
title: Getting Started with Reactive Extensions (part 3)
created: 1341778037
author: menny
permalink: /getting-started-reactive-extensions-part-3
tags:
- .NET
---
<p>This is the third post in the series about RX</p>
<ul>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions/">part 1 – Intro</a>
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-2/">part 2 – Mouse Events</a>
<li>part 3 – Complex Collection Events
<li><a href="http://www.onemenny.com/blog/getting-started-with-reactive-extensions-part-4/">part 4 – Client Server Async</a></li>
</ul>
<h1>Demo – complex collection events</h1>
<p>Consider the following window; I have a collection of filters. As a user I can add or remove a filter and set each filter value. While the user is editing I don’t want to get notified on filter change event, I only want to be notified when the user has stopped editing. Also, when a filter is removed, I want its subscription to be removed as well
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image9.png"><img style="background-image: none; border-right-width: 0px; padding-left: 0px; padding-right: 0px; display: inline; border-top-width: 0px; border-bottom-width: 0px; border-left-width: 0px; padding-top: 0px" title="image" border="0" alt="image" src="http://www.onemenny.com/blog/wp-content/uploads/2012/07/image_thumb9.png" width="569" height="286"></a></p>
<p>Again, doing such a thing without RX would be implementing many timers with a state machine. Here is the RX way</p>
<pre class="brush: csharp;">var throttle = 3; //seconds

        var filtersChanged = Observable.FromEventPattern<NotifyCollectionChangedEventHandler, NotifyCollectionChangedEventArgs>(
                               eh => Filters.CollectionChanged += eh,
                               eh => Filters.CollectionChanged -= eh);

        var filtersRemoved =
            from change in filtersChanged
            where change.EventArgs.Action == NotifyCollectionChangedAction.Remove
            from filter in change.EventArgs.OldItems.Cast<SingleFilter>()
            select filter;

        var filtersAdded =
            from change in filtersChanged
            where change.EventArgs.Action == NotifyCollectionChangedAction.Add
            from filter in change.EventArgs.NewItems.Cast<SingleFilter>()
            select filter;

        var filterPropertyChanges =
            from filter in filtersAdded
            from propertyChanged in Observable.FromEventPattern<PropertyChangedEventArgs>(filter, "PropertyChanged")
                .TakeUntil(filtersRemoved.Where(removed => removed == filter))
            select System.Reactive.Unit.Default;

        _rxFilters =
            new[]
            {
                filtersAdded.Select(_ => System.Reactive.Unit.Default), 
                filtersRemoved.Select(_ => System.Reactive.Unit.Default), 
                filterPropertyChanges,
            }
            .Merge()
            .Throttle(TimeSpan.FromSeconds(throttle))
            .ObserveOnDispatcher() //System.Reactive.Windows.Threading asm
                .Subscribe(ApplyFilter);
</pre>
<p>First I subscribe to the filter change event (filterChanged), and then I subscribe to the filter remove (filtersRemoved) and filter added (filtersAdded). This is easily done because I’m using an observable collection with supplies a CollectionChanged event. </p>
<p>Then I register to the PropertyChanged event on my object (called SingleFilter). This is a plain object with some properties. Notice the TakeUntil – which basically says: “take until the filter is removed from my filtersRemoved subscription). </p>
<p>The last step, takes all my observers and convert their selection to a default value. This is because each of my observers is of different type, and if I want all of them to subscribe to a single point of subscription I have to set them properly to the same selection. Then, I merge all the events (of the same type now), and again, Throttle till the user stops changing the filters, Observer on the UI thread and subscribe to an action. </p>
<p>Well, that’s it. Here is the complete code for reference or you can download the solution at the end of this post.</p>
<pre class="brush: csharp;"><p>using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.ComponentModel;
using System.Collections.ObjectModel;
using Microsoft.Practices.Prism.Commands;
using System.Linq;
using System.Collections.Specialized;
using System.Reactive.Linq;
using System.Reactive.Concurrency;
using System.Linq.Expressions;
using System.Reflection;
using System.Reactive.Subjects;

namespace RxDemoWpf
{
    public class MainWindowViewModel : INotifyPropertyChanged
    {
        #region Members

        private IDisposable _rxFilters;

        #endregion

        #region Properties

        public ObservableCollection<SingleFilter> Filters { get; set; }
        public ObservableCollection<string> Events { get; set; }

        public DelegateCommand AddFilterCommand { get; set; }
        public DelegateCommand<int?> DeleteFilterCommand { get; set; }
        public DelegateCommand ClearEventsCommand { get; set; }

        #endregion

        #region Ctor

        public MainWindowViewModel()
        {
            Filters = new ObservableCollection<SingleFilter>();
            Events = new ObservableCollection<string>();

            AddFilterCommand = new DelegateCommand(
                () =>
                {
                    Filters.Add(new SingleFilter());
                });

            DeleteFilterCommand = new DelegateCommand<int?>(
                (ID) =>
                {
                    Filters.Remove(
                        Filters.Where(f => f.ID == ID).First());
                });

            ClearEventsCommand = new DelegateCommand(() => Events.Clear());

            InitReactiveExtension1(); 
        }

        #endregion

        #region Methods

        private void InitReactiveExtension1()
        {
            var throttle = 3; //seconds

            var filtersChanged = Observable.FromEventPattern<NotifyCollectionChangedEventHandler, NotifyCollectionChangedEventArgs>(
                                   eh => Filters.CollectionChanged += eh,
                                   eh => Filters.CollectionChanged -= eh);

            var filtersRemoved =
                from change in filtersChanged
                where change.EventArgs.Action == NotifyCollectionChangedAction.Remove
                from filter in change.EventArgs.OldItems.Cast<SingleFilter>()
                select filter;

            var filtersAdded =
                from change in filtersChanged
                where change.EventArgs.Action == NotifyCollectionChangedAction.Add
                from filter in change.EventArgs.NewItems.Cast<SingleFilter>()
                select filter;

            var filterPropertyChanges =
                from filter in filtersAdded
                from propertyChanged in Observable.FromEventPattern<PropertyChangedEventArgs>(filter, "PropertyChanged")
                    .TakeUntil(filtersRemoved.Where(removed => removed == filter))
                select System.Reactive.Unit.Default;

            _rxFilters =
                new[]
                {
                    filtersAdded.Select(_ => System.Reactive.Unit.Default), 
                    filtersRemoved.Select(_ => System.Reactive.Unit.Default), 
                    filterPropertyChanges,
                }
                .Merge()
                .Throttle(TimeSpan.FromSeconds(throttle))
                .ObserveOnDispatcher() //System.Reactive.Windows.Threading asm
                .Subscribe(ApplyFilter);
        }

        private void ApplyFilter(SingleFilter f)
        {
            ApplyFilter(System.Reactive.Unit.Default);
        }

        public void ApplyFilter(System.Reactive.Unit e)
        {
            var res = new StringBuilder();

            foreach (var filter in Filters)
            {
                if (res.Length > 0)
                {
                    res.Append(" And ");
                }
                res.Append("(" + filter.LeftSideText + " " + filter.SelectedOperator + " " + filter.RightSideText + ")");
            }

            Events.Add(res.ToString());
        }

        #endregion

        #region Property Changed

        public event PropertyChangedEventHandler PropertyChanged;

        public void NotifyPropertyChanged(string propName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }

        #endregion
    }

    public class SingleFilter : INotifyPropertyChanged, IEqualityComparer<SingleFilter>
    {
        #region Properties

        public ObservableCollection<string> Operators { get; set; }

        private string _leftSideText;
        public string LeftSideText
        {
            get
            {
                return _leftSideText;
            }

            set
            {
                _leftSideText = value;
                NotifyPropertyChanged("LeftSideText");
            }
        }

        private string _rightSideText;
        public string RightSideText
        {
            get
            {
                return _rightSideText;
            }

            set
            {
                _rightSideText = value;
                NotifyPropertyChanged("RightSideText");
            }
        }

        private string _selectedOperator;
        public string SelectedOperator
        {
            get
            {
                return _selectedOperator;
            }

            set
            {
                _selectedOperator = value;
                NotifyPropertyChanged("SelectedOperator");
            }
        }


        public int ID { get; set; }

        #endregion

        #region Ctor

        public SingleFilter()
        {
            Operators = new ObservableCollection<string>(new string[] { ">", "<", "=" });
            ID = GetHashCode();
        }

        #endregion

        #region Property Changed

        public event PropertyChangedEventHandler PropertyChanged;

        public void NotifyPropertyChanged(string propName)
        {
            if (PropertyChanged != null)
            {
                PropertyChanged(this, new PropertyChangedEventArgs(propName));
            }
        }

        #endregion

        public bool Equals(SingleFilter x, SingleFilter y)
        {
            return 
                x.LeftSideText == y.LeftSideText && 
                x.RightSideText == y.RightSideText && 
                x.SelectedOperator == y.SelectedOperator;
        }

        public int GetHashCode(SingleFilter obj)
        {
            return obj.GetHashCode();
        }
    }
}

</p><p> </p></pre>
<p> </p>
<p><a href="http://www.onemenny.com/blog/wp-content/uploads/2012/07/RxWpfDemoComplexFilters.rar">Code for this demo here</a></p>
