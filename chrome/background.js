const twitchUrl = "https://www.twitch.tv";

const queryInfo = {
  url: `${twitchUrl}/*`,
};

const muteAllTabs = (tabs) => {
  for (let tab of tabs) {
    chrome.tabs.update(tab.id, { muted: true });
  }
};

const unMuteTab = (tab) => {
  chrome.tabs.update(tab.id, { muted: false });
};

const onTabFocused = (activeInfo) => {
  chrome.storage.local.get("enabled", (data) => {
    if (data.enabled) {
      chrome.tabs.get(activeInfo.tabId, (activeTab) => {
        if (activeTab.url.startsWith(twitchUrl)) {
          chrome.tabs.query(queryInfo, (tabs) => {
            muteAllTabs(tabs);
            unMuteTab(activeTab);
          });
        }
      });
    }
  });
};

chrome.tabs.onActivated.addListener(onTabFocused);