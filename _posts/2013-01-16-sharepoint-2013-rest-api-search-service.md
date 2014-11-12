---
layout: post
title: SharePoint 2013 Rest API – Search Service
created: 1358330176
author: menny
permalink: /net/sharepoint-2013-rest-api-–-search-service
tags:
- .NET
---
<p>REST was available in SharePoint 2010 and could be made via calls to the various “svc” end points. But it was more like under the rug kind of thing. In 2013 the Rest API are put in front and the Search service in particular is deprecated, and my few tryouts shows that its rather obsolete than deprecated. <a href="http://blogs.architectingconnectedsystems.com/blogs/cjg/archive/2012/08/14/SharePoint-2013-REST-endpoints-and-more_2E002E002E00_.aspx">Under the hood it seems that MS added an HTPP module</a> to rewrite calls directly to the old services but that does not matter. In the future MS plans to migrate all functionality to Rest services, here is what we have so fat:
<p>There are 5 access points for the _api service:
<ul>
<li>Site Collections – <a href="http://server/site/_api/site">http://server/site/_api/site</a>
<li>Webs – <a href="http://server/site/_api/web">http://server/site/_api/web</a>
<li>User Profiles – <a href="http://server/site/_api/userProfiles">http://server/site/_api/userProfiles</a>
<li>Search – <a href="http://server/site/_api/search">http://server/site/_api/search</a>
<li>Publishing – <a href="http://server/site/_api/publishing">http://server/site/_api/publishing</a></li>
</ul>
<p>Notice that all these services support OData protocol to query the end points while the search service supports <b>only <a href="http://msdn.microsoft.com/en-us/library/ee558911.aspx">KQL</a> and <a href="msdn.microsoft.com/en-us/library/ff394606.aspx">FQL</a></b> (will explain further on). The reason the search is <b>not OData oriented</b> is because the OData is used for CRUD operations over the other services (like creating a new list or checking in a document) – this is not clear from the <a href="http://www.mindsharp.com/blog/2012/07/sharepoints-rest-an-odata-overview/">documentation</a> that makes it look like OData is also a part of the search service.<br />
<h2>The Rest Uri syntax structure</h2>
<p>One other important thing is the misleading image above – the site variant is not relevant for the search. When sending a rest search request the site is ignored and not treated as part of the query, at least in all my tryouts it failed to reflect on the specific URI results.
<p>Useful links:
<ul>
<li>SharePoint Rest services – <a href="http://msdn.microsoft.com/en-us/library/fp142385.aspx">here</a>
<li>SharePoint search service <a href="http://blogs.msdn.com/b/nadeemis/archive/2012/08/24/sharepoint-2013-search-rest-api.aspx">here</a> where one of MS programmers explains about the new search features in SharePoint.
<li>Changes from SharePoint 2010 to SharePoint 2013 look <a href="http://technet.microsoft.com/en-us/library/ff607742.aspx">here</a> (see that string contains is no longer available) </li>
</ul>
<h2>Search Tool</h2>
<p>There is a great search tool you can use for inquiries to the search server. The tool is available on <a href="http://sp2013searchtool.codeplex.com/">CodePlex</a> (code is available) and was written (apparently) by a MS employee in the search team. You should also follow <a href="http://blogs.msdn.com/b/nadeemis/archive/2012/08/24/sharepoint-2013-search-rest-api.aspx">this link</a> to learn more about each properties of the search.<br />
<h2>The search service</h2>
<p>Here are some search references to what I had to accomplish.<br />
<h2>Searching in all the site</h2>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:9d6ebf73-8962-43e9-a000-6bac5252d828" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="xml">https://myhost.com/rnd/mennySite1/_api/search/query?querytext='menny+AND+-ContentClass="STS_List_850"+AND+-ContentClass="STS_List_Announcements"+AND+-ContentClass="STS_List_Contacts"+AND+-ContentClass="STS_List_DiscussionBoard"+ AND+-ContentClass="STS_ListItem_Tasks"+AND+-ContentClass="STS_ListItem_XMLForm"'&enablestemming=false&enablephonetic=true&enablenicknames=true&rowlimit=100&selectproperties='SiteName,Author,Title,Path,Description,Wite,Rank,Size,HITHIGHLIGHTEDSUMMARY,IsDocument,ContentClass'&clienttype='Custom'&culture=0409 </pre>
</div>
<p>Ok what to notice here: </p>
<ul>
<li>You can just ignore the + sign cause it’s just the HTTP Get escape string representation of the space char
<li>Notice the – (minus) sign to dismiss various content classes. The pitfall here is that you have to figure out yourself what the content class are (using the search tool for instance) and if you want to use a black list (minus) or a white list (just AND operators). My case was complex, usually you will just want to set “IsDocument=true”
<li>Notice that the rnd/mennySite1 in the Uri are redundant and does not influence the final query results
<li>You can also figure out that the operators are
<ul>
<li>AND
<li>OR
<li>=
<li>: -> meaning contains</li>
</ul>
<li>Selectproperties – the properties to return</li>
</ul>
<p><b><u></u></b></p>
<h2>LIST Search (document library)</h2>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:7138b8f1-79c9-453f-bc65-955af4f75637" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="xml">https:// myhost.com /rnd/mennysite1/_api/search/query?querytext='horses+AND+ListId:4f87042a-22cb-4c45-b043-972bd1b414b7'&clienttype='Custom' </pre>
</div>
<p>Things to notice: </p>
<ul>
<li>Notice the listId property is using “:” (contains) and not equals. For some strange reason this is how it works, the equals returns nothing L</li>
</ul>
<p><b><u></u></b></p>
<h2>Specific Site & it’s sub sites recursively </h2>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:40acf5e0-a75a-4179-ab10-02cfd8567abf" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="xml">https:// myhost.com /rnd/_api/search/query?querytext='horses+path:"https://1harmonie.sharepoint.com/rnd/mennysite1"'&selectproperties='title,webid,siteid,listid,contentclass,site,web' </pre>
</div>
<p>Things to notice: </p>
<ul>
<li>Notice the path property is using “:” (contains) and not equals. This is the only “elegant” way I found to do this since I want the results item path to start with the specific path. SharePoint knows how disregard ports and security so if I wrote path:<a href="https://1harmonie.sharepoint.com:443/rnd/mennysite1">https://1harmonie.sharepoint.com:443/rnd/mennysite1</a> I would end up with the same results</li>
</ul>
<p><b><u></u></b></p>
<h2>Search Specific site (direct document libraries)</h2>
<p>This is for searching directly under a specific site without sub sites or sub document libraries. </p>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:62fca18b-62f0-48b9-9ef5-3fb006b50d5f" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="xml">https:// myhost.com /rnd/mennysite1/_api/search/query?querytext='horses+webID:18afc7ee-3e99-445f-b4aa-726542d0fd9d'&selectproperties='Title,SiteName,SiteId,WebId,Path,contentclass,isdocument'&clienttype='Custom' </pre>
</div>
<p>Things to notice: </p>
<ul>
<li>Notice the webId property. Each site under SharePoint has a webId and all sites share the same siteId, which is the installation ID actually. This is a bit confusing since I expected the siteId to be unique for each site. </li>
</ul>
<p><b><u></u></b></p>
<h2>People Search</h2>
<p>Default people search (sourceID): </p>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:01b44dd2-8f13-479b-85f3-6467917da26c" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="xml">https:// myhost.com /rnd/mennySite1/_api/search/query?querytext='menny'&sourceid='B09A7990-05EA-4AF9-81EF-EDFAB16C4E31'&clienttype='Custom' </pre>
</div>
<p>Things to notice </p>
<ul>
<li>Notice the sourceId property that is part of the query string. I could have used the “ContentClass=urn:content-class:SPSPeople” instead but SharePoint 2013 exposes the sourceId of my results (what used to be Scopes). My experience shows that the sourceId for people is the same for all installations (B09A7990-05EA-4AF9-81EF-EDFAB16C4E31) although <a href="http://social.msdn.microsoft.com/Forums/sv-SE/sharepointdevpreview/thread/58e66246-3bed-4eec-a623-1410819bbbb2">I have been told</a> that the sourceId are determined suring the installation. </li>
</ul>
<h2>KQL & FQL</h2>
<p>The specs indicate that the FQL should be used for programming since its more programmable oriented, but still, MS suggest the use of KQL as the best practice. The strange thing is that they expect the users to write something like “’horses<b>+</b>AND+webID:18afc7ee-3e99-445f-b4aa-726542d0fd9d” inside the search text box… go figures, I can’t think on one “normal” person using SharePoint producing these queries. </p>
<h2>Further On</h2>
<h4>Suffix and prefix matching</h4>
<p>I noticed that the specs indicated that there are no prefix searches (*123) and only suffix searches (123*) due to performance reasons. I have to say that searching for * (only) works fine. </p>
<h4>A bit more syntax </h4>
<p>He following are equivalent for the querytext property (you can try it in SP search text box at your site) </p>
<ul>
<li>horses<b>+</b>webID:18afc7ee-3e99-445f-b4aa-726542d0fd9d
<li>horses<b>+</b>AND+webID:18afc7ee-3e99-445f-b4aa-726542d0fd9d
<li>horses<b>+</b>AND+webID:”18afc7ee-3e99-445f-b4aa-726542d0fd9d”</li>
</ul>
<h4>How do I know what properties exists?</h4>
<p>The short answer is – you have to guess, but here are the properties I extracted using reflection from MS code. Not all properties are valid for each search since they correspond to the search result. You just have to try and figure out what works for you</p>
<p> </p>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:2cf8bc1d-a8c2-4b55-be9c-f951278e3323" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="c#:nogutter:nocontrols:collapse">public static class AlternateUrlPropertyNames
{
    // Fields
    public const string Uri = "Uri";
    public const string UrlZone = "UrlZone";
}

public static class AppInstanceErrorDetailsPropertyNames
{
    // Fields
    public const string CorrelationId = "CorrelationId";
    public const string ErrorDetail = "ErrorDetail";
    public const string ErrorType = "ErrorType";
    public const string ExceptionMessage = "ExceptionMessage";
    public const string Source = "Source";
    public const string SourceName = "SourceName";
}

public static class AppInstancePropertyNames
{
    // Fields
    public const string AppPrincipalId = "AppPrincipalId";
    public const string AppWebFullUrl = "AppWebFullUrl";
    public const string Id = "Id";
    public const string InError = "InError";
    public const string RemoteAppUrl = "RemoteAppUrl";
    public const string SiteId = "SiteId";
    public const string StartPage = "StartPage";
    public const string Status = "Status";
    public const string Title = "Title";
    public const string WebId = "WebId";
}
public static class AttachmentPropertyNames
{
    // Fields
    public const string FileName = "FileName";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
}
public static class ChangeAlertPropertyNames
{
    // Fields
    public const string AlertId = "AlertId";
    public const string WebId = "WebId";
}
public static class ChangeContentTypePropertyNames
{
    // Fields
    public const string ContentTypeId = "ContentTypeId";
    public const string WebId = "WebId";
}

public static class ChangeFieldPropertyNames
{
    // Fields
    public const string FieldId = "FieldId";
    public const string WebId = "WebId";
}
public static class ChangeFilePropertyNames
{
    // Fields
    public const string UniqueId = "UniqueId";
    public const string WebId = "WebId";
}

public static class ChangeFolderPropertyNames
{
    // Fields
    public const string UniqueId = "UniqueId";
    public const string WebId = "WebId";
}
public static class ChangeGroupPropertyNames
{
    // Fields
    public const string GroupId = "GroupId";
}
public static class ChangeItemPropertyNames
{
    // Fields
    public const string ItemId = "ItemId";
    public const string ListId = "ListId";
    public const string WebId = "WebId";
}
public static class ChangeListPropertyNames
{
    // Fields
    public const string ListId = "ListId";
    public const string WebId = "WebId";
}
public static class ChangePropertyNames
{
    // Fields
    public const string ChangeToken = "ChangeToken";
    public const string ChangeType = "ChangeType";
    public const string SiteId = "SiteId";
    public const string Time = "Time";
}
public static class ChangeUserPropertyNames
{
    // Fields
    public const string Activate = "Activate";
    public const string UserId = "UserId";
}
public static class ChangeViewPropertyNames
{
    // Fields
    public const string ListId = "ListId";
    public const string ViewId = "ViewId";
    public const string WebId = "WebId";
}
public static class ChangeWebPropertyNames
{
    // Fields
    public const string WebId = "WebId";
}
public static class ContentTypeObjectPropertyNames
{
    // Fields
    public const string FieldLinks = "FieldLinks";
    public const string Fields = "Fields";
    public const string Parent = "Parent";
    public const string WorkflowAssociations = "WorkflowAssociations";
}
public static class ContentTypePropertyNames
{
    // Fields
    public const string Description = "Description";
    public const string DisplayFormTemplateName = "DisplayFormTemplateName";
    public const string DisplayFormUrl = "DisplayFormUrl";
    public const string DocumentTemplate = "DocumentTemplate";
    public const string DocumentTemplateUrl = "DocumentTemplateUrl";
    public const string EditFormTemplateName = "EditFormTemplateName";
    public const string EditFormUrl = "EditFormUrl";
    public const string Group = "Group";
    public const string Hidden = "Hidden";
    public const string Id = "Id";
    public const string JSLink = "JSLink";
    public const string Name = "Name";
    public const string NewFormTemplateName = "NewFormTemplateName";
    public const string NewFormUrl = "NewFormUrl";
    public const string ReadOnly = "ReadOnly";
    public const string SchemaXml = "SchemaXml";
    public const string Scope = "Scope";
    public const string Sealed = "Sealed";
    public const string StringId = "StringId";
}
public static class EventReceiverDefinitionPropertyNames
{
    // Fields
    public const string EventType = "EventType";
    public const string ReceiverAssembly = "ReceiverAssembly";
    public const string ReceiverClass = "ReceiverClass";
    public const string ReceiverId = "ReceiverId";
    public const string ReceiverName = "ReceiverName";
    public const string ReceiverUrl = "ReceiverUrl";
    public const string SequenceNumber = "SequenceNumber";
    public const string Synchronization = "Synchronization";
}
public static class FeaturePropertyNames
{
    // Fields
    public const string DefinitionId = "DefinitionId";
}

public static class FieldCalculatedPropertyNames
{
    // Fields
    public const string DateFormat = "DateFormat";
    public const string Formula = "Formula";
    public const string OutputType = "OutputType";
}

public static class FieldChoicePropertyNames
{
    // Fields
    public const string EditFormat = "EditFormat";
}
public static class FieldCollectionPropertyNames
{
    // Fields
    public const string SchemaXml = "SchemaXml";
}
public static class FieldComputedPropertyNames
{
    // Fields
    public const string EnableLookup = "EnableLookup";
}
public static class FieldCurrencyPropertyNames
{
    // Fields
    public const string CurrencyLocaleId = "CurrencyLocaleId";
}
public static class FieldDateTimePropertyNames
{
    // Fields
    public const string DateTimeCalendarType = "DateTimeCalendarType";
    public const string DisplayFormat = "DisplayFormat";
    public const string FriendlyDisplayFormat = "FriendlyDisplayFormat";
}
public static class FieldLinkPropertyNames
{
    // Fields
    public const string Hidden = "Hidden";
    public const string Id = "Id";
    public const string Name = "Name";
    public const string Required = "Required";
}
public static class FieldLookupPropertyNames
{
    // Fields
    public const string AllowMultipleValues = "AllowMultipleValues";
    public const string IsRelationship = "IsRelationship";
    public const string LookupField = "LookupField";
    public const string LookupList = "LookupList";
    public const string LookupWebId = "LookupWebId";
    public const string PrimaryFieldId = "PrimaryFieldId";
    public const string RelationshipDeleteBehavior = "RelationshipDeleteBehavior";
}
public static class FieldMultiChoicePropertyNames
{
    // Fields
    public const string Choices = "Choices";
    public const string FillInChoice = "FillInChoice";
    public const string Mappings = "Mappings";
}

public static class FieldMultiLineTextPropertyNames
{
    // Fields
    public const string AllowHyperlink = "AllowHyperlink";
    public const string AppendOnly = "AppendOnly";
    public const string NumberOfLines = "NumberOfLines";
    public const string RestrictedMode = "RestrictedMode";
    public const string RichText = "RichText";
    public const string WikiLinking = "WikiLinking";
}

public static class FieldNumberPropertyNames
{
    // Fields
    public const string MaximumValue = "MaximumValue";
    public const string MinimumValue = "MinimumValue";
}
public static class FieldPropertyNames
{
    // Fields
    public const string CanBeDeleted = "CanBeDeleted";
    public const string DefaultValue = "DefaultValue";
    public const string Description = "Description";
    public const string Direction = "Direction";
    public const string EnforceUniqueValues = "EnforceUniqueValues";
    public const string EntityPropertyName = "EntityPropertyName";
    public const string FieldTypeKind = "FieldTypeKind";
    public const string Filterable = "Filterable";
    public const string FromBaseType = "FromBaseType";
    public const string Group = "Group";
    public const string Hidden = "Hidden";
    public const string Id = "Id";
    public const string InternalName = "InternalName";
    public const string JSLink = "JSLink";
    public const string ReadOnlyField = "ReadOnlyField";
    public const string Required = "Required";
    public const string SchemaXml = "SchemaXml";
    public const string Scope = "Scope";
    public const string Sealed = "Sealed";
    public const string Sortable = "Sortable";
    public const string StaticName = "StaticName";
    public const string Title = "Title";
    public const string TypeAsString = "TypeAsString";
    public const string TypeDisplayName = "TypeDisplayName";
    public const string TypeShortDescription = "TypeShortDescription";
    public const string ValidationFormula = "ValidationFormula";
    public const string ValidationMessage = "ValidationMessage";
}

public static class FieldRatingScalePropertyNames
{
    // Fields
    public const string GridEndNumber = "GridEndNumber";
    public const string GridNAOptionText = "GridNAOptionText";
    public const string GridStartNumber = "GridStartNumber";
    public const string GridTextRangeAverage = "GridTextRangeAverage";
    public const string GridTextRangeHigh = "GridTextRangeHigh";
    public const string GridTextRangeLow = "GridTextRangeLow";
    public const string RangeCount = "RangeCount";
}
public static class FieldTextPropertyNames
{
    // Fields
    public const string MaxLength = "MaxLength";
}

public static class FieldUrlPropertyNames
{
    // Fields
    public const string DisplayFormat = "DisplayFormat";
}
public static class FieldUserPropertyNames
{
    // Fields
    public const string AllowDisplay = "AllowDisplay";
    public const string Presence = "Presence";
    public const string SelectionGroup = "SelectionGroup";
    public const string SelectionMode = "SelectionMode";
}
public static class FileObjectPropertyNames
{
    // Fields
    public const string Author = "Author";
    public const string CheckedOutByUser = "CheckedOutByUser";
    public const string ListItemAllFields = "ListItemAllFields";
    public const string LockedByUser = "LockedByUser";
    public const string ModifiedBy = "ModifiedBy";
    public const string Versions = "Versions";
}

public static class FileVersionObjectPropertyNames
{
    // Fields
    public const string CreatedBy = "CreatedBy";
}

public static class FileVersionPropertyNames
{
    // Fields
    public const string CheckInComment = "CheckInComment";
    public const string Created = "Created";
    public const string ID = "ID";
    public const string IsCurrentVersion = "IsCurrentVersion";
    public const string Size = "Size";
    public const string Url = "Url";
    public const string VersionLabel = "VersionLabel";
}

public static class FolderObjectPropertyNames
{
    // Fields
    public const string Files = "Files";
    public const string Folders = "Folders";
    public const string ListItemAllFields = "ListItemAllFields";
    public const string ParentFolder = "ParentFolder";
    public const string Properties = "Properties";
}

public static class FolderPropertyNames
{
    // Fields
    public const string ContentTypeOrder = "ContentTypeOrder";
    public const string ItemCount = "ItemCount";
    public const string Name = "Name";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
    public const string UniqueContentTypeOrder = "UniqueContentTypeOrder";
    public const string WelcomePage = "WelcomePage";
}
public static class FormPropertyNames
{
    // Fields
    public const string FormType = "FormType";
    public const string Id = "Id";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
}

public static class GroupObjectPropertyNames
{
    // Fields
    public const string Owner = "Owner";
    public const string Users = "Users";
}

public static class GroupPropertyNames
{
    // Fields
    public const string AllowMembersEditMembership = "AllowMembersEditMembership";
    public const string AllowRequestToJoinLeave = "AllowRequestToJoinLeave";
    public const string AutoAcceptRequestToJoinLeave = "AutoAcceptRequestToJoinLeave";
    public const string CanCurrentUserEditMembership = "CanCurrentUserEditMembership";
    public const string CanCurrentUserManageGroup = "CanCurrentUserManageGroup";
    public const string CanCurrentUserViewMembership = "CanCurrentUserViewMembership";
    public const string Description = "Description";
    public const string OnlyAllowMembersViewMembership = "OnlyAllowMembersViewMembership";
    public const string OwnerTitle = "OwnerTitle";
    public const string RequestToJoinLeaveEmailSetting = "RequestToJoinLeaveEmailSetting";
}
public static class InformationRightsManagementSettingsPropertyNames
{
    // Fields
    public const string AllowPrint = "AllowPrint";
    public const string AllowScript = "AllowScript";
    public const string AllowWriteCopy = "AllowWriteCopy";
    public const string DisableWac = "DisableWac";
    public const string DocumentAccessExpireDays = "DocumentAccessExpireDays";
    public const string DocumentLibraryProtectionExpireDate = "DocumentLibraryProtectionExpireDate";
    public const string EnableDocumentAccessExpire = "EnableDocumentAccessExpire";
    public const string EnableGroupProtection = "EnableGroupProtection";
    public const string EnableLicenseCacheExpire = "EnableLicenseCacheExpire";
    public const string GroupName = "GroupName";
    public const string LicenseCacheExpireDays = "LicenseCacheExpireDays";
    public const string PolicyDescription = "PolicyDescription";
    public const string PolicyTitle = "PolicyTitle";
}
public static class ListItemCollectionPropertyNames
{
    // Fields
    public const string ListItemCollectionPosition = "ListItemCollectionPosition";
}

public static class ListItemObjectPropertyNames
{
    // Fields
    public const string AttachmentFiles = "AttachmentFiles";
    public const string ContentType = "ContentType";
    public const string FieldValuesAsHtml = "FieldValuesAsHtml";
    public const string FieldValuesAsText = "FieldValuesAsText";
    public const string FieldValuesForEdit = "FieldValuesForEdit";
    public const string File = "File";
    public const string Folder = "Folder";
    public const string ParentList = "ParentList";
}
public static class ListItemPropertyNames
{
    // Fields
    public const string DisplayName = "DisplayName";
    public const string EffectiveBasePermissions = "EffectiveBasePermissions";
    public const string EffectiveBasePermissionsForUI = "EffectiveBasePermissionsForUI";
    public const string FileSystemObjectType = "FileSystemObjectType";
    public const string Id = "Id";
}

public static class ListObjectPropertyNames
{
    // Fields
    public const string ContentTypes = "ContentTypes";
    public const string EventReceivers = "EventReceivers";
    public const string Fields = "Fields";
    public const string Forms = "Forms";
    public const string InformationRightsManagementSettings = "InformationRightsManagementSettings";
    public const string ParentWeb = "ParentWeb";
    public const string RootFolder = "RootFolder";
    public const string UserCustomActions = "UserCustomActions";
    public const string Views = "Views";
    public const string WorkflowAssociations = "WorkflowAssociations";
}
public static class ListPropertyNames
{
    // Fields
    public const string AllowContentTypes = "AllowContentTypes";
    public const string BaseTemplate = "BaseTemplate";
    public const string BaseType = "BaseType";
    public const string BrowserFileHandling = "BrowserFileHandling";
    public const string ContentTypesEnabled = "ContentTypesEnabled";
    public const string Created = "Created";
    public const string DataSource = "DataSource";
    public const string DefaultContentApprovalWorkflowId = "DefaultContentApprovalWorkflowId";
    public const string DefaultDisplayFormUrl = "DefaultDisplayFormUrl";
    public const string DefaultEditFormUrl = "DefaultEditFormUrl";
    public const string DefaultNewFormUrl = "DefaultNewFormUrl";
    public const string DefaultViewUrl = "DefaultViewUrl";
    public const string Description = "Description";
    public const string Direction = "Direction";
    public const string DocumentTemplateUrl = "DocumentTemplateUrl";
    public const string DraftVersionVisibility = "DraftVersionVisibility";
    public const string EffectiveBasePermissions = "EffectiveBasePermissions";
    public const string EffectiveBasePermissionsForUI = "EffectiveBasePermissionsForUI";
    public const string EnableAttachments = "EnableAttachments";
    public const string EnableFolderCreation = "EnableFolderCreation";
    public const string EnableMinorVersions = "EnableMinorVersions";
    public const string EnableModeration = "EnableModeration";
    public const string EnableVersioning = "EnableVersioning";
    public const string EntityTypeName = "EntityTypeName";
    public const string ForceCheckout = "ForceCheckout";
    public const string HasExternalDataSource = "HasExternalDataSource";
    public const string Hidden = "Hidden";
    public const string Id = "Id";
    public const string ImageUrl = "ImageUrl";
    public const string IrmEnabled = "IrmEnabled";
    public const string IrmExpire = "IrmExpire";
    public const string IrmReject = "IrmReject";
    public const string IsApplicationList = "IsApplicationList";
    public const string IsCatalog = "IsCatalog";
    public const string IsPrivate = "IsPrivate";
    public const string IsSiteAssetsLibrary = "IsSiteAssetsLibrary";
    public const string ItemCount = "ItemCount";
    public const string LastItemDeletedDate = "LastItemDeletedDate";
    public const string LastItemModifiedDate = "LastItemModifiedDate";
    public const string ListItemEntityTypeFullName = "ListItemEntityTypeFullName";
    public const string MultipleDataList = "MultipleDataList";
    public const string NoCrawl = "NoCrawl";
    public const string OnQuickLaunch = "OnQuickLaunch";
    public const string ParentWebUrl = "ParentWebUrl";
    public const string SchemaXml = "SchemaXml";
    public const string ServerTemplateCanCreateFolders = "ServerTemplateCanCreateFolders";
    public const string TemplateFeatureId = "TemplateFeatureId";
    public const string Title = "Title";
    public const string ValidationFormula = "ValidationFormula";
    public const string ValidationMessage = "ValidationMessage";
}
public static class ListTemplatePropertyNames
{
    // Fields
    public const string AllowsFolderCreation = "AllowsFolderCreation";
    public const string BaseType = "BaseType";
    public const string Description = "Description";
    public const string FeatureId = "FeatureId";
    public const string Hidden = "Hidden";
    public const string ImageUrl = "ImageUrl";
    public const string InternalName = "InternalName";
    public const string IsCustomTemplate = "IsCustomTemplate";
    public const string ListTemplateTypeKind = "ListTemplateTypeKind";
    public const string Name = "Name";
    public const string OnQuickLaunch = "OnQuickLaunch";
    public const string Unique = "Unique";
}

public static class NavigationNodeObjectPropertyNames
{
    // Fields
    public const string Children = "Children";
}

public static class NavigationNodePropertyNames
{
    // Fields
    public const string Id = "Id";
    public const string IsDocLib = "IsDocLib";
    public const string IsExternal = "IsExternal";
    public const string IsVisible = "IsVisible";
    public const string Title = "Title";
    public const string Url = "Url";
}

public static class NavigationObjectPropertyNames
{
    // Fields
    public const string QuickLaunch = "QuickLaunch";
    public const string TopNavigationBar = "TopNavigationBar";
}

public static class NavigationPropertyNames
{
    // Fields
    public const string UseShared = "UseShared";
}

public static class ObjectSharingInformationPropertyNames
{
    // Fields
    public const string AnonymousEditLink = "AnonymousEditLink";
    public const string AnonymousViewLink = "AnonymousViewLink";
    public const string CanManagePermissions = "CanManagePermissions";
    public const string HasPendingAccessRequests = "HasPendingAccessRequests";
    public const string HasPermissionLevels = "HasPermissionLevels";
    public const string IsSharedWithCurrentUser = "IsSharedWithCurrentUser";
    public const string IsSharedWithGuest = "IsSharedWithGuest";
    public const string IsSharedWithMany = "IsSharedWithMany";
    public const string IsSharedWithSecurityGroup = "IsSharedWithSecurityGroup";
    public const string PendingAccessRequestsLink = "PendingAccessRequestsLink";
}

public static class ObjectSharingInformationUserObjectPropertyNames
{
    // Fields
    public const string Principal = "Principal";
    public const string User = "User";
}

public static class ObjectSharingInformationUserPropertyNames
{
    // Fields
    public const string CustomRoleNames = "CustomRoleNames";
    public const string Department = "Department";
    public const string Email = "Email";
    public const string HasEditPermission = "HasEditPermission";
    public const string HasViewPermission = "HasViewPermission";
    public const string Id = "Id";
    public const string IsSiteAdmin = "IsSiteAdmin";
    public const string JobTitle = "JobTitle";
    public const string LoginName = "LoginName";
    public const string Name = "Name";
    public const string Picture = "Picture";
    public const string SipAddress = "SipAddress";
}

public static class PrincipalPropertyNames
{
    // Fields
    public const string Id = "Id";
    public const string IsHiddenInUI = "IsHiddenInUI";
    public const string LoginName = "LoginName";
    public const string PrincipalType = "PrincipalType";
    public const string Title = "Title";
}

public static class PushNotificationSubscriberObjectPropertyNames
{
    // Fields
    public const string User = "User";
}
public static class PushNotificationSubscriberPropertyNames
{
    // Fields
    public const string CustomArgs = "CustomArgs";
    public const string DeviceAppInstanceId = "DeviceAppInstanceId";
    public const string LastModifiedTimeStamp = "LastModifiedTimeStamp";
    public const string RegistrationTimeStamp = "RegistrationTimeStamp";
    public const string ServiceToken = "ServiceToken";
    public const string SubscriberType = "SubscriberType";
}

public static class RecycleBinItemObjectPropertyNames
{
    // Fields
    public const string Author = "Author";
    public const string DeletedBy = "DeletedBy";
}

public static class RecycleBinItemPropertyNames
{
    // Fields
    public const string DeletedDate = "DeletedDate";
    public const string DirName = "DirName";
    public const string Id = "Id";
    public const string ItemState = "ItemState";
    public const string ItemType = "ItemType";
    public const string LeafName = "LeafName";
    public const string Size = "Size";
    public const string Title = "Title";
}

public static class RegionalSettingsObjectPropertyNames
{
    // Fields
    public const string TimeZone = "TimeZone";
    public const string TimeZones = "TimeZones";
}


public static class RegionalSettingsPropertyNames
{
    // Fields
    public const string AdjustHijriDays = "AdjustHijriDays";
    public const string AlternateCalendarType = "AlternateCalendarType";
    public const string AM = "AM";
    public const string CalendarType = "CalendarType";
    public const string Collation = "Collation";
    public const string CollationLCID = "CollationLCID";
    public const string DateFormat = "DateFormat";
    public const string DateSeparator = "DateSeparator";
    public const string DecimalSeparator = "DecimalSeparator";
    public const string DigitGrouping = "DigitGrouping";
    public const string FirstDayOfWeek = "FirstDayOfWeek";
    public const string FirstWeekOfYear = "FirstWeekOfYear";
    public const string IsEastAsia = "IsEastAsia";
    public const string IsRightToLeft = "IsRightToLeft";
    public const string IsUIRightToLeft = "IsUIRightToLeft";
    public const string ListSeparator = "ListSeparator";
    public const string LocaleId = "LocaleId";
    public const string NegativeSign = "NegativeSign";
    public const string NegNumberMode = "NegNumberMode";
    public const string PM = "PM";
    public const string PositiveSign = "PositiveSign";
    public const string ShowWeeks = "ShowWeeks";
    public const string ThousandSeparator = "ThousandSeparator";
    public const string Time24 = "Time24";
    public const string TimeMarkerPosition = "TimeMarkerPosition";
    public const string TimeSeparator = "TimeSeparator";
    public const string WorkDayEndHour = "WorkDayEndHour";
    public const string WorkDays = "WorkDays";
    public const string WorkDayStartHour = "WorkDayStartHour";
}

public static class RelatedFieldObjectPropertyNames
{
    // Fields
    public const string LookupList = "LookupList";
}
public static class RelatedFieldPropertyNames
{
    // Fields
    public const string FieldId = "FieldId";
    public const string ListId = "ListId";
    public const string RelationshipDeleteBehavior = "RelationshipDeleteBehavior";
    public const string WebId = "WebId";
}

public static class RequestContextObjectPropertyNames
{
    // Fields
    public const string Site = "Site";
    public const string Web = "Web";
}

public static class RequestVariablePropertyNames
{
    // Fields
    public const string Value = "Value";
}
public static class RoleAssignmentCollectionObjectPropertyNames
{
    // Fields
    public const string Groups = "Groups";
}
public static class RoleAssignmentObjectPropertyNames
{
    // Fields
    public const string Member = "Member";
    public const string RoleDefinitionBindings = "RoleDefinitionBindings";
}
public static class RoleAssignmentPropertyNames
{
    // Fields
    public const string PrincipalId = "PrincipalId";
}
public static class RoleDefinitionPropertyNames
{
    // Fields
    public const string BasePermissions = "BasePermissions";
    public const string Description = "Description";
    public const string Hidden = "Hidden";
    public const string Id = "Id";
    public const string Name = "Name";
    public const string Order = "Order";
    public const string RoleTypeKind = "RoleTypeKind";
}
public static class SecurableObjectObjectPropertyNames
{
    // Fields
    public const string FirstUniqueAncestorSecurableObject = "FirstUniqueAncestorSecurableObject";
    public const string RoleAssignments = "RoleAssignments";
}
public static class SecurableObjectPropertyNames
{
    // Fields
    public const string HasUniqueRoleAssignments = "HasUniqueRoleAssignments";
}
public static class SiteObjectPropertyNames
{
    // Fields
    public const string EventReceivers = "EventReceivers";
    public const string Features = "Features";
    public const string Owner = "Owner";
    public const string RecycleBin = "RecycleBin";
    public const string RootWeb = "RootWeb";
    public const string UserCustomActions = "UserCustomActions";
}
public static class SitePropertyNames
{
    // Fields
    public const string AllowDesigner = "AllowDesigner";
    public const string AllowMasterPageEditing = "AllowMasterPageEditing";
    public const string AllowRevertFromTemplate = "AllowRevertFromTemplate";
    public const string AllowSelfServiceUpgrade = "AllowSelfServiceUpgrade";
    public const string AllowSelfServiceUpgradeEvaluation = "AllowSelfServiceUpgradeEvaluation";
    public const string CanUpgrade = "CanUpgrade";
    public const string CompatibilityLevel = "CompatibilityLevel";
    public const string Id = "Id";
    public const string LockIssue = "LockIssue";
    public const string MaxItemsPerThrottledOperation = "MaxItemsPerThrottledOperation";
    public const string PrimaryUri = "PrimaryUri";
    public const string ReadOnly = "ReadOnly";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
    public const string ShowUrlStructure = "ShowUrlStructure";
    public const string UIVersionConfigurationEnabled = "UIVersionConfigurationEnabled";
    public const string UpgradeInfo = "UpgradeInfo";
    public const string UpgradeReminderDate = "UpgradeReminderDate";
    public const string Url = "Url";
    public const string Usage = "Usage";
}
public static class ThemeInfoPropertyNames
{
    // Fields
    public const string AccessibleDescription = "AccessibleDescription";
    public const string ThemeBackgroundImageUri = "ThemeBackgroundImageUri";
}
public static class TimeZonePropertyNames
{
    // Fields
    public const string Description = "Description";
    public const string Id = "Id";
    public const string Information = "Information";
}
public static class UserCustomActionPropertyNames
{
    // Fields
    public const string CommandUIExtension = "CommandUIExtension";
    public const string Description = "Description";
    public const string Group = "Group";
    public const string Id = "Id";
    public const string ImageUrl = "ImageUrl";
    public const string Location = "Location";
    public const string Name = "Name";
    public const string RegistrationId = "RegistrationId";
    public const string RegistrationType = "RegistrationType";
    public const string Rights = "Rights";
    public const string Scope = "Scope";
    public const string ScriptBlock = "ScriptBlock";
    public const string ScriptSrc = "ScriptSrc";
    public const string Sequence = "Sequence";
    public const string Title = "Title";
    public const string Url = "Url";
    public const string VersionOfUserCustomAction = "VersionOfUserCustomAction";
}
public static class UserObjectPropertyNames
{
    // Fields
    public const string Groups = "Groups";
}
public static class UserPropertyNames
{
    // Fields
    public const string Email = "Email";
    public const string IsSiteAdmin = "IsSiteAdmin";
    public const string UserId = "UserId";
}
public static class ViewFieldCollectionPropertyNames
{
    // Fields
    public const string SchemaXml = "SchemaXml";
}
public static class ViewObjectPropertyNames
{
    // Fields
    public const string ViewFields = "ViewFields";
}
public static class ViewPropertyNames
{
    // Fields
    public const string Aggregations = "Aggregations";
    public const string AggregationsStatus = "AggregationsStatus";
    public const string BaseViewId = "BaseViewId";
    public const string ContentTypeId = "ContentTypeId";
    public const string DefaultView = "DefaultView";
    public const string DefaultViewForContentType = "DefaultViewForContentType";
    public const string EditorModified = "EditorModified";
    public const string Formats = "Formats";
    public const string Hidden = "Hidden";
    public const string HtmlSchemaXml = "HtmlSchemaXml";
    public const string Id = "Id";
    public const string ImageUrl = "ImageUrl";
    public const string IncludeRootFolder = "IncludeRootFolder";
    public const string JSLink = "JSLink";
    public const string ListViewXml = "ListViewXml";
    public const string Method = "Method";
    public const string MobileDefaultView = "MobileDefaultView";
    public const string MobileView = "MobileView";
    public const string ModerationType = "ModerationType";
    public const string OrderedView = "OrderedView";
    public const string Paged = "Paged";
    public const string PersonalView = "PersonalView";
    public const string ReadOnlyView = "ReadOnlyView";
    public const string RequiresClientIntegration = "RequiresClientIntegration";
    public const string RowLimit = "RowLimit";
    public const string Scope = "Scope";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
    public const string StyleId = "StyleId";
    public const string Threaded = "Threaded";
    public const string Title = "Title";
    public const string Toolbar = "Toolbar";
    public const string ToolbarTemplateName = "ToolbarTemplateName";
    public const string ViewData = "ViewData";
    public const string ViewJoins = "ViewJoins";
    public const string ViewProjectedFields = "ViewProjectedFields";
    public const string ViewQuery = "ViewQuery";
    public const string ViewType = "ViewType";
}
public static class WebInformationPropertyNames
{
    // Fields
    public const string Configuration = "Configuration";
    public const string Created = "Created";
    public const string Description = "Description";
    public const string Id = "Id";
    public const string Language = "Language";
    public const string LastItemModifiedDate = "LastItemModifiedDate";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
    public const string Title = "Title";
    public const string WebTemplate = "WebTemplate";
    public const string WebTemplateId = "WebTemplateId";
}
public static class WebObjectPropertyNames
{
    // Fields
    public const string AllProperties = "AllProperties";
    public const string AssociatedMemberGroup = "AssociatedMemberGroup";
    public const string AssociatedOwnerGroup = "AssociatedOwnerGroup";
    public const string AssociatedVisitorGroup = "AssociatedVisitorGroup";
    public const string AvailableContentTypes = "AvailableContentTypes";
    public const string AvailableFields = "AvailableFields";
    public const string ContentTypes = "ContentTypes";
    public const string CurrentUser = "CurrentUser";
    public const string EventReceivers = "EventReceivers";
    public const string Features = "Features";
    public const string Fields = "Fields";
    public const string Folders = "Folders";
    public const string Lists = "Lists";
    public const string ListTemplates = "ListTemplates";
    public const string Navigation = "Navigation";
    public const string ParentWeb = "ParentWeb";
    public const string PushNotificationSubscribers = "PushNotificationSubscribers";
    public const string RecycleBin = "RecycleBin";
    public const string RegionalSettings = "RegionalSettings";
    public const string RoleDefinitions = "RoleDefinitions";
    public const string RootFolder = "RootFolder";
    public const string SiteGroups = "SiteGroups";
    public const string SiteUserInfoList = "SiteUserInfoList";
    public const string SiteUsers = "SiteUsers";
    public const string ThemeInfo = "ThemeInfo";
    public const string UserCustomActions = "UserCustomActions";
    public const string Webs = "Webs";
    public const string WorkflowAssociations = "WorkflowAssociations";
    public const string WorkflowTemplates = "WorkflowTemplates";
}
public static class WebPropertyNames
{
    // Fields
    public const string AllowDesignerForCurrentUser = "AllowDesignerForCurrentUser";
    public const string AllowMasterPageEditingForCurrentUser = "AllowMasterPageEditingForCurrentUser";
    public const string AllowRevertFromTemplateForCurrentUser = "AllowRevertFromTemplateForCurrentUser";
    public const string AllowRssFeeds = "AllowRssFeeds";
    public const string AppInstanceId = "AppInstanceId";
    public const string Configuration = "Configuration";
    public const string Created = "Created";
    public const string CustomMasterUrl = "CustomMasterUrl";
    public const string Description = "Description";
    public const string DocumentLibraryCalloutOfficeWebAppPreviewersDisabled = "DocumentLibraryCalloutOfficeWebAppPreviewersDisabled";
    public const string EffectiveBasePermissions = "EffectiveBasePermissions";
    public const string EnableMinimalDownload = "EnableMinimalDownload";
    public const string Id = "Id";
    public const string Language = "Language";
    public const string LastItemModifiedDate = "LastItemModifiedDate";
    public const string MasterUrl = "MasterUrl";
    public const string QuickLaunchEnabled = "QuickLaunchEnabled";
    public const string RecycleBinEnabled = "RecycleBinEnabled";
    public const string SaveSiteAsTemplateEnabled = "SaveSiteAsTemplateEnabled";
    public const string ServerRelativeUrl = "ServerRelativeUrl";
    public const string ShowUrlStructureForCurrentUser = "ShowUrlStructureForCurrentUser";
    public const string SyndicationEnabled = "SyndicationEnabled";
    public const string Title = "Title";
    public const string TreeViewEnabled = "TreeViewEnabled";
    public const string UIVersion = "UIVersion";
    public const string UIVersionConfigurationEnabled = "UIVersionConfigurationEnabled";
    public const string Url = "Url";
    public const string WebTemplate = "WebTemplate";
}
public static class WebTemplatePropertyNames
{
    // Fields
    public const string Description = "Description";
    public const string DisplayCategory = "DisplayCategory";
    public const string Id = "Id";
    public const string ImageUrl = "ImageUrl";
    public const string IsHidden = "IsHidden";
    public const string IsRootWebOnly = "IsRootWebOnly";
    public const string IsSubWebOnly = "IsSubWebOnly";
    public const string Lcid = "Lcid";
    public const string Name = "Name";
    public const string Title = "Title";
}
</pre>
</div>
<h4>How do I know what are the various content-class out there?</h4>
<p>Again – no good way to figure them out and it seems that in SP 2013 new ones have been added to the list. Here is what I have so far</p>
<div id="scid:812469c5-0cb0-4c63-8c15-c81123a09de7:291de96d-ed05-451f-8343-e428cf6c7388" class="wlWriterEditableSmartContent" style="float: none; padding-bottom: 0px; padding-top: 0px; padding-left: 0px; margin: 0px; display: inline; padding-right: 0px">
<pre name="code" class="c:collapse">case “STS_Web”:                             // Site
        case “STS_List_850″:                        // Page Library
        case “STS_ListItem_850″:                    // Page
        case “STS_List_DocumentLibrary”:            // Document Library
        case “STS_ListItem_DocumentLibrary”:        // Document Library Items
        case “STS_List”:                            // Custom List
        case “STS_ListItem”:                        // Custom List Item
        case “STS_List_Links”:                      // Links List
        case “STS_ListItem_Links”:                  // Links List Item
        case “STS_List_Tasks”:                      // Tasks List
        case “STS_ListItem_Tasks”:                  // Tasks List Item
        case “STS_List_Events”:                     // Events List
        case “STS_ListItem_Events”:                 // Events List Item
        case “STS_List_Announcements”:              // Announcements List
        case “STS_ListItem_Announcements”:          // Announcements List Item
        case “STS_List_Contacts”:                   // Contacts List
        case “STS_ListItem_Contacts”:               // Contacts List Item
        case “STS_List_DiscussionBoard”:            // Discussion List
        case “STS_ListItem_DiscussionBoard”:        // Discussion List Item
        case “STS_List_IssueTracking”:              // Issue Tracking List
        case “STS_ListItem_IssueTracking”:          // Issue Tracking List Item
        case “STS_List_GanttTasks”:                 // Project Tasks List
        case “STS_ListItem_GanttTasks”:             // Project Tasks List Item
        case “STS_List_Survey”:                     // Survey List
        case “STS_ListItem_Survey”:                 // Survey List Item
        case “STS_List_PictureLibrary”:             // Picture Library
        case “STS_ListItem_PictureLibrary”:         // Picture Library Item
        case “STS_List_WebPageLibrary”:             // Web Page Library
        case “STS_ListItem_WebPageLibrary”:         // Web Page Library Item
        case “STS_List_XMLForm”:                    // Form Library
        case “STS_ListItem_XMLForm”:                // Form Library Item
        case “urn:content-class:SPSSearchQuery”:    // Search Query
        case “urn:content-class:SPSListing:News”:   // News Listing
        case “urn:content-class:SPSPeople”:         // People
        case “urn:content-classes:SPSCategory”:     // Category
        case “urn:content-classes:SPSListing”:      // Listing
        case “urn:content-classes:SPSPersonListing”:// Person Listing
        case “urn:content-classes:SPSTextListing”:  // Text Listing
        case “urn:content-classes:SPSSiteListing”:  // Site Listing
        case “urn:content-classes:SPSSiteRegistry”: // Site Registry Listing
</pre>
</div>
<h4>Search template</h4>
<p>In SP 2013 each result is different by nature from other results: person is different from document. So the concept of templates was introduced to expose various templates for each unique result type.</p>
