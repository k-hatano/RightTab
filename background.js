
chrome.browserAction.onClicked.addListener(function(tabId, info){
	chrome.windows.getCurrent(null, function(currentWindow){
		chrome.tabs.getAllInWindow(window.id, function(tabs){
			var tabsCount = tabs.length;
			chrome.tabs.getSelected(null, function(selectedTab){
				var tabIndex = selectedTab.index;
				var nextTabIndex = (tabIndex + 1) % tabsCount;
				var nextTab = null;
				for (var i = 0; i < tabsCount; i++) {
					if (tabs[i].index == nextTabIndex) {
						nextTab = tabs[i];
						break;
					}
				}
				if (nextTab == null) {
					return;
				}
				chrome.tabs.update(nextTab.id, {active:true});
			});
		});
	});
});

chrome.contextMenus.onClicked.addListener(function(item){
	if (item.menuItemId == 'newTab') {
		chrome.tabs.create({}, function(e){});
		return;
	}
	if (item.menuItemId == 'topOfThisPage') {
		chrome.tabs.getSelected(null, function(tab){
    		chrome.tabs.executeScript(tab.id, {code: "window.scrollTo(0,0);"}, function(response){});
		});
		return;
	}
	if (item.menuItemId == 'bottomOfThisPage') {
		chrome.tabs.getSelected(null, function(tab){
    		chrome.tabs.executeScript(tab.id, {code: "window.scrollTo(0,document.body.scrollHeight);"}, function(response){});
		});
		return;
	}
	chrome.windows.getCurrent(null, function(currentWindow){
		chrome.tabs.getAllInWindow(window.id, function(tabs){
			var tabsCount = tabs.length;
			chrome.tabs.getSelected(null, function(selectedTab){
				var tabIndex = selectedTab.index;
				var nextTabIndex = 0;
				if (item.menuItemId == 'firstTab') {
					nextTabIndex = 0;
				} else if (item.menuItemId == 'previousTab') {
					nextTabIndex = (tabIndex - 1 + tabsCount) % tabsCount;
				} else if (item.menuItemId == 'nextTab') {
					nextTabIndex = (tabIndex + 1) % tabsCount;
				} else if (item.menuItemId == 'lastTab') {
					nextTabIndex = tabsCount - 1;
				}
				var nextTab = null;
				for (var i = 0; i < tabsCount; i++) {
					if (tabs[i].index == nextTabIndex) {
						nextTab = tabs[i];
						break;
					}
				}
				if (nextTab == null) {
					return;
				}
				chrome.tabs.update(nextTab.id, {active:true});
			});
		});
	});
});

chrome.contextMenus.create({
	title: "Switch to",
	contexts: ["all"],
	id: "parent"
});

chrome.contextMenus.create({
	title: "First Tab",
	contexts: ["all"],
	parentId: "parent",
	id: "firstTab"
});

chrome.contextMenus.create({
	title: "Previous Tab",
	contexts: ["all"],
	parentId: "parent",
	id: "previousTab"
});

chrome.contextMenus.create({
	title: "Next Tab",
	contexts: ["all"],
	parentId: "parent",
	id: "nextTab"
});

chrome.contextMenus.create({
	title: "Last Tab",
	contexts: ["all"],
	parentId: "parent",
	id: "lastTab"
});

chrome.contextMenus.create({
	type: "separator",
	title: "Separator",
	contexts: ["all"],
	parentId: "parent",
	id: "separator1"
});

chrome.contextMenus.create({
	title: "New Tab",
	contexts: ["all"],
	parentId: "parent",
	id: "newTab"
});

chrome.contextMenus.create({
	type: "separator",
	title: "Separator",
	contexts: ["all"],
	parentId: "parent",
	id: "separator2"
});

chrome.contextMenus.create({
	title: "Top of This Page",
	contexts: ["all"],
	parentId: "parent",
	id: "topOfThisPage"
});

chrome.contextMenus.create({
	title: "Bottom of This Page",
	contexts: ["all"],
	parentId: "parent",
	id: "bottomOfThisPage"
});
