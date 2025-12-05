const enabledSwitch = document.getElementById("enabled-switch");

chrome.storage.local.get("enabled", (data) => {
  enabledSwitch.checked = !!data.enabled;
});

enabledSwitch.addEventListener("change", () => {
  chrome.storage.local.set({ enabled: enabledSwitch.checked });
});