
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