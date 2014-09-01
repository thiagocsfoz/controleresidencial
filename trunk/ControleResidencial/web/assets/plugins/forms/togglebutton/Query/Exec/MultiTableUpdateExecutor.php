ache file content")
}
msWriteProfilerMark("bootCache:initialize:parseString:e")
}
that._isInitialized = true;
return WinJS.Promise.wrap(that._cacheFileParseSuccess)
}, function bootCacheInitErrorHandler(error) {
that._isInitialized = true;
msWriteProfilerMark("bootCache:error loading cache from file");
return WinJS.Promise.wrap(that._cacheFileParseSuccess)
})
}
}, addOrUpdateEntry: function addOrUpdateEntry(key, value) {
if (!key) {
return WinJS.Promise.wrap(false)
}
var that=this;
return this.initializeAsync().then(function addEntryHandler() {
that._cacheContainer[key] = value;
that._hasUnsavedData = true;
msWriteProfilerMark("bootCache:addEntry: " + key);
return true
})
}, addorUpdatePrefetchUrl: function addorUpdatePrefetchUrl(key, url) {
var that=this;
return this.initializeAsync().then(function addPrefetchHandler() {
that._prefetchUrlContainer[key] = url;
that._hasUnsavedData = true;
msWriteProfilerMark("bootCache:addPrefetchEntry: " + key + "," + url);
return true
})
}, startPrefetchRequests: function startPrefetchRequests() {
var that=this;
for (var prefetchKey in that._prefetchUrlContainer) {
this._prefetchStates[prefetchKey] = {
ready: false, data: null, error: false
}
}
this._prefetchCompletePromise = new WinJS.Promise(function(complete) {
var itemPrefetched=false;
for (var key in that._prefetchUrlContainer) {
itemPrefetched = true;
that.startPrefetchRequest(key, complete)
}
if (!itemPrefetched) {
complete(null)
}
})
}, startPrefetchRequest: function startPrefetchRequest(key, allRequestsCompletedHandler) {
var httpClient=new Windows.Web.Http.HttpClient;
var uri=new Windows.Foundation.Uri(this._prefetchUrlContainer[key]);
var that=this;
httpClient.getStringAsync(uri).done(function bootCachePrefetchComplete(result) {
var responseData=that._prefetchStates[key];
responseData.ready = true;
responseData.data = result;
var isAllCompleted=true;
for (var promiseKey in that._prefetchStates) {
isAllCompleted = isAllCompleted && that._prefetchStates[promiseKey].ready
}
if (isAllCompleted) {
allRequestsCompletedHandler(null)
}
}, function bootCachePrefetchError(result) {
var responseData=that._prefetchStates[key];
responseData.error = true;
responseData.ready = true;
var isAllCompleted=true;
for (var promiseKey in that._prefetchStates) {
isAllCompleted = isAllCompleted && that._prefetchStates[promiseKey].ready
}
if (isAllCompleted) {
allRequestsCompletedHandler(null)
}
})
}, getPrefetchRequest: function getPrefetchRequest(key) {
if (!this._isInitialized) {
throw new Error("BootCache is not yet initialized.");
}
var found=key && this._prefetchStates && this._prefetchStates.hasOwnProperty(key);
if (!found) {
return null
}
return this._prefetchStates[key]
}, isPrefetchCompleteAsync: function isPrefetchCompleteAsync() {
return this._prefetchCompletePromise
}, hasEntryAsync: function hasEntryAsync(key) {
var that=this;
return this.initializeAsync().then(function hasEntryAsyncHandler() {
return that.hasEntry(key)
})
}, hasEntry: function hasEntry(key) {
if (!this._isInitialized) {
throw new Error("BootCache is not yet initialized.");
}
var found=key && this._cacheContainer && this._cacheContainer.hasOwnProperty(key);
if (found) {
msWriteProfilerMark("bootCache:hasEntry:found: " + key)
}
else {
msWriteProfilerMark("bootCache:hasEntry:notFound: " + key)
}
return found
}, getEntry: function getEntry(key, fallbackDelegate) {
if (this.hasEntry(key)) {
return this._cacheContainer[key]
}
else if (typeof fallbackDelegate === 'function') {
var entry;
try {
entry = fallbackDelegate(key)
}
catch(exception) {
msWriteProfilerMark("bootCache:getEntry:error calling delegate");
return null
}
if (typeof entry === "undefined") {
throw new Error("The delegate returned 'undefined'");
}
else if (WinJS.Promise.is(entry)) {
throw new Error("The delegate should not return a promise. Use getEntryAsync if the delegate can return a promise.");
}
this.addOrUpdateEntry(key, entry);
msWriteProfilerMark("bootCache:getEntry:got cache entry from delegate");
return entry
}
else {
return null
}
}, getEntryAsync: function getEntryAsync(key, fallbackDelegate) {
var that=this;
return this.initializeAsync().then(function getEntryAsyncHandler() {
if (that.hasEntry(key)) {
return that._cacheContainer[key]
}
else if (typeof fallbackDelegate === 'function') {
try {
return WinJS.Promise.wrap(fallbackDelegate(key)).then(function fallbackDelegate_completion(entry) {
that.addOrUpdateEntry(key, entry);
msWriteProfilerMark("bootCache:getEntry:got cache entry from delegate");
return entry
})
}
catch(exception) {
msWriteProfilerMark("bootCache:getEntry:error calling delegate");
return null
}
}
else {
return null
}
})
}, saveCacheToDisk: function saveCacheToDisk() {
if (this._hasUnsavedData === true) {
try {
var that=this;
msWriteProfilerMark("bootCache:serializeCacheData:s");
var dataString=JSON.stringify({
cache: this._cacheContainer, prefetch: this._prefetchUrlContainer
});
msWriteProfilerMark("bootCache:serializeCacheData:e");
return WinJS.Application.local.writeText(PlatformJS.BootCache._cacheFileName, dataString).then(function writeText_CompletionHandler() {
that._hasUnsavedData = false;
msWriteProfilerMark("bootCache:saveCacheToDisk:done");
return true
}, function writeText_ErrorHandler(error) {
msWriteProfilerMark("bootCache:saveCacheToDisk:Error: " + error);
return false
})
}
catch(exception) {
msWriteProfilerMark("bootCache:saveCacheToDisk:Error stringifying the cache object")
}
}
else {
msWriteProfilerMark("bootCache:saveCacheToDisk:nothingToSave");
return WinJS.Promise.wrap(true)
}
return WinJS.Promise.wrap(false)
}, reset: function reset() {
this._cacheContainer = {};
msWriteProfilerMark("bootCache:Reset");
this._hasUnsavedData = true;
return this.saveCacheToDisk()
}, deleteEntry: function deleteEntry(key) {
if (!this.hasEntry(key)) {
msWriteProfilerMark("bootCache:delete:NoMatchFound: " + key);
return false
}
delete this._cacheContainer[key];
this._hasUnsavedData = true;
msWriteProfilerMark("bootCache:delete: " + key);
return true
}
}, {
_instanceHandle: null, _cacheFileName: "BootCache.json", instance: {get: function get() {
if (!PlatformJS.BootCache._instanceHandle) {
PlatformJS.BootCache._instanceHandle = new PlatformJS.BootCache
}
return PlatformJS.BootCache._instanceHandle
}}
})})
})();
(function() {
"use strict";
var _PrefetchStateEnum={
NotStarted: "notStarted", Partial: "partial", Completed: "completed", CompletedWithError: "completedWithError"
};
WinJS.Namespace.define("PlatformJS.PrefetchUI", {PrefetchUI: WinJS.Class.define(function prefetchUICtor(){}, {
_downloadContainerStart: null, _downloadContainerEnd: null, _savedWatermark: "", _show: true, init: function init() {
this._initEventHandlers();
this._recordPrefetchPreferences();
this._downloadContainerStart = "<div id=\"downloadPanoContainer\"><span class=\"downloadLabel\" id=\"downloadLabel\">" + PlatformJS.Services.resourceLoader.getString("DownloadingArticles") + "</span><progress class=\"downloadProgress\" id=\"downloadProgress\" value=\"";
this._downloadContainerEnd = "\" max=\"100\"></progress></div>"
}, _buildPrefetchProgressBar: function _buildPrefetchProgressBar(progressValue) {
if (PlatformJS.mainProcessManager.retailModeEnabled) {
return ""
}
return this._downloadContainerStart + progressValue + this._downloadContainerEnd
}, _buildPrefetchEndedMsg: function _buildPrefetchEndedMsg(prefetchEndState) {
if (PlatformJS.mainProcessManager.retailModeEnabled) {
return ""
}
var prefetchCompleteTime;
var message;
switch (prefetchEndState) {
case _PrefetchStateEnum.NotStarted:
prefetchCompleteTime = Windows.Storage.ApplicationData.current.localSettings.values["PrefetchLastUpdateTime"];
message = null;
break;
case