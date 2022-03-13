import defaultBlocklist from "./defaultBlocklist.json";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ blocklist: defaultBlocklist });
});
