const enabledSwitch = document.getElementById("enabled-switch");

browser.storage.local.get("enabled").then((data) => {
  enabledSwitch.checked = !!data.enabled;
});

enabledSwitch.addEventListener("change", () => {
  browser.storage.local.set({ enabled: enabledSwitch.checked });
});