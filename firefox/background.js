const twitchUrl = "https://www.twitch.tv";

const queryInfo = {
  url: `${twitchUrl}/*`,
};

const muteAllTabs = (tabs) => {
  for (let tab of tabs) {
    browser.tabs.update(tab.id, { muted: true });
  }
};

const unMuteTab = (tab) => {
  browser.tabs.update(tab.id, { muted: false });
};

const onTabFocused = async (activeInfo) => {
  try {
    const { enabled } = await browser.storage.local.get("enabled");
    if (enabled) {
      const activeTab = await browser.tabs.get(activeInfo.tabId);
      if (activeTab.url && activeTab.url.startsWith(twitchUrl)) {
        const tabs = await browser.tabs.query(queryInfo);
        muteAllTabs(tabs);
        unMuteTab(activeTab);
      }
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

browser.tabs.onActivated.addListener(onTabFocused);