import defaultBlocklist from "./defaultBlocklist.json";
import * as nsfwjs from "nsfwjs";

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.local.set({ blocklist: defaultBlocklist });
});

const model = await nsfwjs.load();
