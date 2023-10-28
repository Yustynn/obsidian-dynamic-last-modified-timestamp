/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => LastModifiedTimestampInStatusBar
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  createdPrepend: "Created: ",
  createdTimestampFormat: "YYYY-MM-DD H:mm:ss",
  createdEnabled: true,
  lastModifiedEnabled: true,
  lastModifiedPrepend: "Last Modified: ",
  lastModifiedTimestampFormat: "YYYY-MM-DD H:mm:ss",
  refreshIntervalSeconds: 2,
  cycleOnClickEnabled: false
};
var LastModifiedTimestampInStatusBar = class extends import_obsidian.Plugin {
  constructor() {
    super(...arguments);
    this.lastModifiedStatusBarItemEl = this.addStatusBarItem();
    this.createdStatusBarItemEl = this.addStatusBarItem();
  }
  cycleDisplayedStatus() {
    if (this.settings.lastModifiedEnabled && this.settings.createdEnabled) {
      this.settings.lastModifiedEnabled = true;
      this.settings.createdEnabled = false;
    } else if (this.settings.lastModifiedEnabled && !this.settings.createdEnabled) {
      this.settings.lastModifiedEnabled = false;
      this.settings.createdEnabled = true;
    } else if (!this.settings.lastModifiedEnabled && this.settings.createdEnabled) {
      this.settings.lastModifiedEnabled = true;
      this.settings.createdEnabled = true;
    } else {
      this.settings.lastModifiedEnabled = true;
      this.settings.createdEnabled = false;
    }
    this.updateLastModified();
    this.updateCreated();
    this.saveSettings();
  }
  updateLastModifiedDisplay() {
    if (this.lastModifiedTimestamp && this.settings.lastModifiedEnabled) {
      if (this.lastModifiedStatusBarItemEl === null) {
        this.lastModifiedStatusBarItemEl = this.addStatusBarItem();
      }
      this.lastModifiedStatusBarItemEl.setText(this.settings.lastModifiedPrepend + this.lastModifiedTimestamp);
      this.lastModifiedStatusBarItemEl.onclick = () => {
        if (this.settings.cycleOnClickEnabled)
          this.cycleDisplayedStatus();
      };
      if (this.settings.lastModifiedEnabled)
        this.lastModifiedStatusBarItemEl.show();
    }
    if (this.lastModifiedStatusBarItemEl !== null && !this.settings.lastModifiedEnabled) {
      this.lastModifiedStatusBarItemEl.hide();
    }
  }
  updateCreatedDisplay() {
    if (this.createdTimestamp && this.settings.createdEnabled) {
      if (this.createdStatusBarItemEl === null) {
        this.createdStatusBarItemEl = this.addStatusBarItem();
      }
      this.createdStatusBarItemEl.setText(this.settings.createdPrepend + this.createdTimestamp);
      this.createdStatusBarItemEl.onclick = () => {
        if (this.settings.cycleOnClickEnabled)
          this.cycleDisplayedStatus();
      };
      if (this.settings.createdEnabled)
        this.createdStatusBarItemEl.show();
    }
    if (this.createdStatusBarItemEl !== null && !this.settings.createdEnabled) {
      this.createdStatusBarItemEl.hide();
    }
  }
  updateCreatedTimestamp() {
    const file = this.app.workspace.getActiveFile();
    if (file) {
      const timestamp = (0, import_obsidian.moment)(file.stat.ctime).format(this.settings.createdTimestampFormat);
      this.createdTimestamp = timestamp;
    }
  }
  updateCreated() {
    this.updateCreatedTimestamp();
    this.updateCreatedDisplay();
  }
  updateLastModified() {
    this.updateLastModifiedTimestamp();
    this.updateLastModifiedDisplay();
  }
  updateLastModifiedTimestamp(hook = null) {
    const file = this.app.workspace.getActiveFile();
    if (file) {
      const timestamp = (0, import_obsidian.moment)(file.stat.mtime).format(this.settings.lastModifiedTimestampFormat);
      const isTimestampChanged = timestamp != this.lastModifiedTimestamp;
      this.lastModifiedTimestamp = timestamp;
      if (hook)
        hook(isTimestampChanged);
    }
  }
  removeLastModifiedRefreshInterval() {
    if (this.lastModifiedRefreshInterval !== null) {
      window.clearInterval(this.lastModifiedRefreshInterval);
    }
  }
  updateLastModifiedRefreshInterval() {
    this.removeLastModifiedRefreshInterval();
    this.lastModifiedRefreshInterval = window.setInterval(
      () => this.updateLastModifiedTimestamp((u) => {
        if (!u)
          return;
        this.updateLastModifiedDisplay();
      }),
      this.settings.refreshIntervalSeconds * 1e3
    );
    this.registerInterval(this.lastModifiedRefreshInterval);
  }
  async onload() {
    await this.loadSettings();
    if (this.settings.lastModifiedEnabled) {
      this.updateLastModifiedRefreshInterval();
      this.updateLastModified();
    }
    if (this.settings.createdEnabled) {
      this.updateCreated();
    }
    this.app.workspace.on("active-leaf-change", () => {
      if (this.settings.lastModifiedEnabled) {
        this.updateLastModifiedTimestamp();
        this.updateLastModifiedDisplay();
      }
      if (this.settings.createdEnabled) {
        this.updateCreatedTimestamp();
        this.updateCreatedDisplay();
      }
    });
    this.addSettingTab(new LastModifiedTimestampInStatusBarSettingTab(this.app, this));
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var LastModifiedTimestampInStatusBarSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h3", { text: "Last Modified Timestamp" });
    new import_obsidian.Setting(containerEl).setName("Enabled").setDesc("Turn the display on or off in your status bar.").addToggle(
      (bool) => bool.setValue(this.plugin.settings.lastModifiedEnabled).onChange(async (value) => {
        this.plugin.settings.lastModifiedEnabled = value;
        await this.plugin.saveSettings();
        this.plugin.updateLastModified();
        if (!value) {
          this.plugin.removeLastModifiedRefreshInterval();
        } else {
          this.plugin.updateLastModifiedRefreshInterval();
        }
      })
    );
    new import_obsidian.Setting(containerEl).setName("Timestamp Format").setDesc("Compatible with Moment.js formats, e.g. YYYY-MM-DD H:mm:ss").addText(
      (text) => text.setPlaceholder("Enter format").setValue(this.plugin.settings.lastModifiedTimestampFormat).onChange(async (value) => {
        this.plugin.settings.lastModifiedTimestampFormat = value;
        await this.plugin.saveSettings();
        this.plugin.updateLastModified();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Title in Status Bar").addText(
      (text) => text.setPlaceholder("Last Modified: ").setValue(this.plugin.settings.lastModifiedPrepend).onChange(async (value) => {
        this.plugin.settings.lastModifiedPrepend = value;
        await this.plugin.saveSettings();
        this.plugin.updateLastModified();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Timestamp Update Interval (in seconds)").setDesc("Note: Effectively, the minimum update interval seems to be 2s.").addText(
      (text) => text.setPlaceholder("2.0").setValue(this.plugin.settings.refreshIntervalSeconds.toString()).onChange(async (value) => {
        try {
          this.plugin.settings.refreshIntervalSeconds = +value;
          await this.plugin.saveSettings();
          if (this.plugin.settings.lastModifiedEnabled) {
            this.plugin.updateLastModifiedRefreshInterval();
          }
        } finally {
        }
      })
    );
    containerEl.createEl("h3", { text: "Created Timestamp" });
    new import_obsidian.Setting(containerEl).setName("Enabled").setDesc("Turn the display on or off in your status bar.").addToggle(
      (bool) => bool.setValue(this.plugin.settings.createdEnabled).onChange(async (value) => {
        this.plugin.settings.createdEnabled = value;
        await this.plugin.saveSettings();
        this.plugin.updateCreated();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Timestamp Format").setDesc("Compatible with Moment.js formats, e.g. YYYY-MM-DD H:mm:ss").addText(
      (text) => text.setPlaceholder("Enter format").setValue(this.plugin.settings.createdTimestampFormat).onChange(async (value) => {
        this.plugin.settings.createdTimestampFormat = value;
        await this.plugin.saveSettings();
        this.plugin.updateCreated();
      })
    );
    new import_obsidian.Setting(containerEl).setName("Title in Status Bar").addText(
      (text) => text.setPlaceholder("Created: ").setValue(this.plugin.settings.createdPrepend).onChange(async (value) => {
        this.plugin.settings.createdPrepend = value;
        await this.plugin.saveSettings();
        this.plugin.updateCreated();
      })
    );
    containerEl.createEl("h3", { text: "Cycle Displayed Timestamp On Click" });
    new import_obsidian.Setting(containerEl).setName("Enabled").setDesc("Enable cycling between the last modified and created timestamp on click in status bar.").addToggle(
      (bool) => bool.setValue(this.plugin.settings.cycleOnClickEnabled).onChange(async (value) => {
        this.plugin.settings.cycleOnClickEnabled = value;
        await this.plugin.saveSettings();
      })
    );
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcblx0QXBwLFxuXHRQbHVnaW4sXG5cdFBsdWdpblNldHRpbmdUYWIsXG5cdFNldHRpbmcsXG5cdFRGaWxlLFxuXHRtb21lbnRcbn0gZnJvbSAnb2JzaWRpYW4nO1xuXG5cbnR5cGUgTGFzdE1vZGlmaWVkaW1lc3RhbXBDaGFuZ2VIb29rID0gKGlzVGltZXN0YW1wQ2hhbmdlZDogYm9vbGVhbikgPT4gdm9pZDtcbmludGVyZmFjZSBMYXN0TW9kaWZpZWRUaW1lc3RhbXBJblN0YXR1c0JhclNldHRpbmdzIHtcblx0Y3JlYXRlZEVuYWJsZWQ6IGJvb2xlYW47XG5cdGNyZWF0ZWRQcmVwZW5kOiBzdHJpbmc7XG5cdGNyZWF0ZWRUaW1lc3RhbXBGb3JtYXQ6IHN0cmluZztcblx0bGFzdE1vZGlmaWVkRW5hYmxlZDogYm9vbGVhbjtcblx0bGFzdE1vZGlmaWVkUHJlcGVuZDogc3RyaW5nO1xuXHRsYXN0TW9kaWZpZWRUaW1lc3RhbXBGb3JtYXQ6IHN0cmluZztcblx0cmVmcmVzaEludGVydmFsU2Vjb25kczogbnVtYmVyO1xuXHRjeWNsZU9uQ2xpY2tFbmFibGVkOiBib29sZWFuO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBMYXN0TW9kaWZpZWRUaW1lc3RhbXBJblN0YXR1c0JhclNldHRpbmdzID0ge1xuXHRjcmVhdGVkUHJlcGVuZDogJ0NyZWF0ZWQ6ICcsXG5cdGNyZWF0ZWRUaW1lc3RhbXBGb3JtYXQ6ICdZWVlZLU1NLUREIEg6bW06c3MnLFxuXHRjcmVhdGVkRW5hYmxlZDogdHJ1ZSxcblx0bGFzdE1vZGlmaWVkRW5hYmxlZDogdHJ1ZSxcblx0bGFzdE1vZGlmaWVkUHJlcGVuZDogJ0xhc3QgTW9kaWZpZWQ6ICcsXG5cdGxhc3RNb2RpZmllZFRpbWVzdGFtcEZvcm1hdDogJ1lZWVktTU0tREQgSDptbTpzcycsXG5cdHJlZnJlc2hJbnRlcnZhbFNlY29uZHM6IDIsXG5cdGN5Y2xlT25DbGlja0VuYWJsZWQ6IGZhbHNlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBMYXN0TW9kaWZpZWRUaW1lc3RhbXBJblN0YXR1c0JhciBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBMYXN0TW9kaWZpZWRUaW1lc3RhbXBJblN0YXR1c0JhclNldHRpbmdzO1xuXG5cdGNyZWF0ZWRUaW1lc3RhbXA6IHN0cmluZyB8IG51bGw7XG5cdGxhc3RNb2RpZmllZFRpbWVzdGFtcDogc3RyaW5nIHwgbnVsbDtcblx0bGFzdE1vZGlmaWVkUmVmcmVzaEludGVydmFsOiBudW1iZXIgfCBudWxsO1xuXHRcblx0bGFzdE1vZGlmaWVkU3RhdHVzQmFySXRlbUVsOiBIVE1MRWxlbWVudCB8IG51bGwgPSB0aGlzLmFkZFN0YXR1c0Jhckl0ZW0oKTtcblx0Y3JlYXRlZFN0YXR1c0Jhckl0ZW1FbCA6IEhUTUxFbGVtZW50IHwgbnVsbCA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpO1xuXG5cdGN5Y2xlRGlzcGxheWVkU3RhdHVzKCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZEVuYWJsZWQgJiYgdGhpcy5zZXR0aW5ncy5jcmVhdGVkRW5hYmxlZCkge1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkID0gdHJ1ZTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQgPSBmYWxzZTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAodGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkICYmICF0aGlzLnNldHRpbmdzLmNyZWF0ZWRFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZEVuYWJsZWQgPSBmYWxzZTtcblx0XHRcdHRoaXMuc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQgPSB0cnVlO1xuXHRcdH1cblx0XHRlbHNlIGlmICghdGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkICYmIHRoaXMuc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQpIHtcblx0XHRcdHRoaXMuc2V0dGluZ3MubGFzdE1vZGlmaWVkRW5hYmxlZCA9IHRydWU7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmNyZWF0ZWRFbmFibGVkID0gdHJ1ZTtcblx0XHR9XG5cdFx0ZWxzZSB7XG5cdFx0XHR0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZEVuYWJsZWQgPSB0cnVlO1xuXHRcdFx0dGhpcy5zZXR0aW5ncy5jcmVhdGVkRW5hYmxlZCA9IGZhbHNlO1xuXHRcdH1cblxuXHRcdHRoaXMudXBkYXRlTGFzdE1vZGlmaWVkKCk7XG5cdFx0dGhpcy51cGRhdGVDcmVhdGVkKCk7XG5cdFx0dGhpcy5zYXZlU2V0dGluZ3MoKTtcblx0fVxuXHR1cGRhdGVMYXN0TW9kaWZpZWREaXNwbGF5KCk6IHZvaWQge1xuXHRcdGlmICh0aGlzLmxhc3RNb2RpZmllZFRpbWVzdGFtcCAmJiB0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZEVuYWJsZWQpIHtcblx0XHRcdGlmICh0aGlzLmxhc3RNb2RpZmllZFN0YXR1c0Jhckl0ZW1FbCA9PT0gbnVsbCkge1xuXHRcdFx0XHR0aGlzLmxhc3RNb2RpZmllZFN0YXR1c0Jhckl0ZW1FbCA9IHRoaXMuYWRkU3RhdHVzQmFySXRlbSgpO1xuXHRcdFx0fVxuXHRcdFx0dGhpcy5sYXN0TW9kaWZpZWRTdGF0dXNCYXJJdGVtRWwuc2V0VGV4dCh0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZFByZXBlbmQgKyB0aGlzLmxhc3RNb2RpZmllZFRpbWVzdGFtcCk7XG5cdFx0XHR0aGlzLmxhc3RNb2RpZmllZFN0YXR1c0Jhckl0ZW1FbC5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5jeWNsZU9uQ2xpY2tFbmFibGVkKVxuXHRcdFx0XHRcdHRoaXMuY3ljbGVEaXNwbGF5ZWRTdGF0dXMoKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MubGFzdE1vZGlmaWVkRW5hYmxlZClcblx0XHRcdFx0dGhpcy5sYXN0TW9kaWZpZWRTdGF0dXNCYXJJdGVtRWwuc2hvdygpXG5cdFx0fVxuXHRcdGlmICh0aGlzLmxhc3RNb2RpZmllZFN0YXR1c0Jhckl0ZW1FbCAhPT0gbnVsbCAmJiAhdGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkKSB7XG5cdFx0XHR0aGlzLmxhc3RNb2RpZmllZFN0YXR1c0Jhckl0ZW1FbC5oaWRlKClcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVDcmVhdGVkRGlzcGxheSgpOiB2b2lkIHtcblx0XHRpZiAodGhpcy5jcmVhdGVkVGltZXN0YW1wICYmIHRoaXMuc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQpIHtcblx0XHRcdGlmICh0aGlzLmNyZWF0ZWRTdGF0dXNCYXJJdGVtRWwgPT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5jcmVhdGVkU3RhdHVzQmFySXRlbUVsID0gdGhpcy5hZGRTdGF0dXNCYXJJdGVtKCk7XG5cdFx0XHR9XG5cdFx0XHR0aGlzLmNyZWF0ZWRTdGF0dXNCYXJJdGVtRWwuc2V0VGV4dCh0aGlzLnNldHRpbmdzLmNyZWF0ZWRQcmVwZW5kICsgdGhpcy5jcmVhdGVkVGltZXN0YW1wKTtcblx0XHRcdHRoaXMuY3JlYXRlZFN0YXR1c0Jhckl0ZW1FbC5vbmNsaWNrID0gKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5jeWNsZU9uQ2xpY2tFbmFibGVkKVxuXHRcdFx0XHRcdHRoaXMuY3ljbGVEaXNwbGF5ZWRTdGF0dXMoKTtcblx0XHRcdH1cblx0XHRcdGlmKHRoaXMuc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQpXG5cdFx0XHRcdHRoaXMuY3JlYXRlZFN0YXR1c0Jhckl0ZW1FbC5zaG93KClcblx0XHR9XG5cdFx0aWYodGhpcy5jcmVhdGVkU3RhdHVzQmFySXRlbUVsICE9PSBudWxsICYmICF0aGlzLnNldHRpbmdzLmNyZWF0ZWRFbmFibGVkKXtcblx0XHRcdHRoaXMuY3JlYXRlZFN0YXR1c0Jhckl0ZW1FbC5oaWRlKClcblx0XHR9XG5cdH1cblxuXHR1cGRhdGVDcmVhdGVkVGltZXN0YW1wKCk6IHZvaWQge1xuXHRcdGNvbnN0IGZpbGU6IFRGaWxlIHwgbnVsbCA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKClcblx0XHRpZiAoZmlsZSkge1xuXHRcdFx0Y29uc3QgdGltZXN0YW1wID0gbW9tZW50KGZpbGUuc3RhdC5jdGltZSlcblx0XHRcdFx0LmZvcm1hdCh0aGlzLnNldHRpbmdzLmNyZWF0ZWRUaW1lc3RhbXBGb3JtYXQpO1xuXG5cdFx0XHR0aGlzLmNyZWF0ZWRUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XG5cdFx0fVxuXHR9XG5cblx0dXBkYXRlQ3JlYXRlZCgpOiB2b2lkIHtcblx0XHR0aGlzLnVwZGF0ZUNyZWF0ZWRUaW1lc3RhbXAoKTtcblx0XHR0aGlzLnVwZGF0ZUNyZWF0ZWREaXNwbGF5KCk7XG5cdH1cblxuXHR1cGRhdGVMYXN0TW9kaWZpZWQoKTogdm9pZCB7XG5cdFx0dGhpcy51cGRhdGVMYXN0TW9kaWZpZWRUaW1lc3RhbXAoKTtcblx0XHR0aGlzLnVwZGF0ZUxhc3RNb2RpZmllZERpc3BsYXkoKTtcblx0fVxuXG5cdHVwZGF0ZUxhc3RNb2RpZmllZFRpbWVzdGFtcChob29rOiBMYXN0TW9kaWZpZWRpbWVzdGFtcENoYW5nZUhvb2sgfCBudWxsID0gbnVsbCk6IHZvaWQge1xuXHRcdGNvbnN0IGZpbGU6IFRGaWxlIHwgbnVsbCA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVGaWxlKClcblx0XHRpZiAoZmlsZSkge1xuXHRcdFx0Y29uc3QgdGltZXN0YW1wID0gbW9tZW50KGZpbGUuc3RhdC5tdGltZSlcblx0XHRcdFx0LmZvcm1hdCh0aGlzLnNldHRpbmdzLmxhc3RNb2RpZmllZFRpbWVzdGFtcEZvcm1hdCk7XG5cblx0XHRcdGNvbnN0IGlzVGltZXN0YW1wQ2hhbmdlZCA9IHRpbWVzdGFtcCAhPSB0aGlzLmxhc3RNb2RpZmllZFRpbWVzdGFtcDtcblx0XHRcdHRoaXMubGFzdE1vZGlmaWVkVGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG5cdFx0XHRpZiAoaG9vaykgaG9vayhpc1RpbWVzdGFtcENoYW5nZWQpXG5cdFx0fVxuXHR9XG5cblx0cmVtb3ZlTGFzdE1vZGlmaWVkUmVmcmVzaEludGVydmFsKCkge1xuXHRcdGlmICh0aGlzLmxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCAhPT0gbnVsbCkge1xuXHRcdFx0d2luZG93LmNsZWFySW50ZXJ2YWwodGhpcy5sYXN0TW9kaWZpZWRSZWZyZXNoSW50ZXJ2YWwpO1xuXHRcdH1cblx0fVxuXG5cdHVwZGF0ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpIHtcblx0XHR0aGlzLnJlbW92ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpO1xuXHRcdHRoaXMubGFzdE1vZGlmaWVkUmVmcmVzaEludGVydmFsID0gd2luZG93LnNldEludGVydmFsKFxuXHRcdFx0KCkgPT4gdGhpcy51cGRhdGVMYXN0TW9kaWZpZWRUaW1lc3RhbXAoKHUpID0+IHtcblx0XHRcdFx0aWYgKCF1KSByZXR1cm47XG5cdFx0XHRcdHRoaXMudXBkYXRlTGFzdE1vZGlmaWVkRGlzcGxheSgpO1xuXHRcdFx0fSksXG5cdFx0XHR0aGlzLnNldHRpbmdzLnJlZnJlc2hJbnRlcnZhbFNlY29uZHMqMTAwMCxcblx0XHQpO1xuXG5cdFx0dGhpcy5yZWdpc3RlckludGVydmFsKHRoaXMubGFzdE1vZGlmaWVkUmVmcmVzaEludGVydmFsKTtcblx0fVxuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gbGFzdCBtb2RpZmllZCB0aW1lc3RhbXBcblx0XHRpZiAodGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpO1xuXHRcdFx0dGhpcy51cGRhdGVMYXN0TW9kaWZpZWQoKTtcblx0XHR9XG5cblx0XHQvLyBjcmVhdGVkIHRpbWVzdGFtcFxuXHRcdGlmICh0aGlzLnNldHRpbmdzLmNyZWF0ZWRFbmFibGVkKSB7XG5cdFx0XHR0aGlzLnVwZGF0ZUNyZWF0ZWQoKTtcblx0XHR9XG5cblx0XHR0aGlzLmFwcC53b3Jrc3BhY2Uub24oJ2FjdGl2ZS1sZWFmLWNoYW5nZScsICgpID0+IHtcblx0XHRcdC8vIGxhc3QgbW9kaWZpZWQgdGltZXN0YW1wXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkKSB7XG5cdFx0XHRcdHRoaXMudXBkYXRlTGFzdE1vZGlmaWVkVGltZXN0YW1wKCk7XG5cdFx0XHRcdHRoaXMudXBkYXRlTGFzdE1vZGlmaWVkRGlzcGxheSgpXG5cdFx0XHR9XG5cblx0XHRcdC8vIGNyZWF0ZWQgdGltZXN0YW1wXG5cdFx0XHRpZiAodGhpcy5zZXR0aW5ncy5jcmVhdGVkRW5hYmxlZCkge1xuXHRcdFx0XHR0aGlzLnVwZGF0ZUNyZWF0ZWRUaW1lc3RhbXAoKTtcblx0XHRcdFx0dGhpcy51cGRhdGVDcmVhdGVkRGlzcGxheSgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBMYXN0TW9kaWZpZWRUaW1lc3RhbXBJblN0YXR1c0JhclNldHRpbmdUYWIodGhpcy5hcHAsIHRoaXMpKTtcblx0fVxuXG5cdGFzeW5jIGxvYWRTZXR0aW5ncygpIHtcblx0XHR0aGlzLnNldHRpbmdzID0gT2JqZWN0LmFzc2lnbih7fSwgREVGQVVMVF9TRVRUSU5HUywgYXdhaXQgdGhpcy5sb2FkRGF0YSgpKTtcblx0fVxuXG5cdGFzeW5jIHNhdmVTZXR0aW5ncygpIHtcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xuXHR9XG59XG5cbmNsYXNzIExhc3RNb2RpZmllZFRpbWVzdGFtcEluU3RhdHVzQmFyU2V0dGluZ1RhYiBleHRlbmRzIFBsdWdpblNldHRpbmdUYWIge1xuXHRwbHVnaW46IExhc3RNb2RpZmllZFRpbWVzdGFtcEluU3RhdHVzQmFyO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IExhc3RNb2RpZmllZFRpbWVzdGFtcEluU3RhdHVzQmFyKSB7XG5cdFx0c3VwZXIoYXBwLCBwbHVnaW4pO1xuXHRcdHRoaXMucGx1Z2luID0gcGx1Z2luO1xuXHR9XG5cblx0ZGlzcGxheSgpOiB2b2lkIHtcblx0XHRjb25zdCB7Y29udGFpbmVyRWx9ID0gdGhpcztcblxuXHRcdGNvbnRhaW5lckVsLmVtcHR5KCk7XG5cblx0XHRjb250YWluZXJFbC5jcmVhdGVFbCgnaDMnLCB7dGV4dDogJ0xhc3QgTW9kaWZpZWQgVGltZXN0YW1wJ30pO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnRW5hYmxlZCcpXG5cdFx0XHQuc2V0RGVzYygnVHVybiB0aGUgZGlzcGxheSBvbiBvciBvZmYgaW4geW91ciBzdGF0dXMgYmFyLicpXG5cdFx0XHQuYWRkVG9nZ2xlKGJvb2wgPT4gYm9vbFxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGFzdE1vZGlmaWVkRW5hYmxlZClcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmxhc3RNb2RpZmllZEVuYWJsZWQgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi51cGRhdGVMYXN0TW9kaWZpZWQoKTtcblxuXHRcdFx0XHRcdGlmICghdmFsdWUpIHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnJlbW92ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNlIHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnVwZGF0ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSlcblx0XHRcdClcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1RpbWVzdGFtcCBGb3JtYXQnKVxuXHRcdFx0LnNldERlc2MoJ0NvbXBhdGlibGUgd2l0aCBNb21lbnQuanMgZm9ybWF0cywgZS5nLiBZWVlZLU1NLUREIEg6bW06c3MnKVxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgZm9ybWF0Jylcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmxhc3RNb2RpZmllZFRpbWVzdGFtcEZvcm1hdClcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmxhc3RNb2RpZmllZFRpbWVzdGFtcEZvcm1hdCA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnVwZGF0ZUxhc3RNb2RpZmllZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KVxuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnVGl0bGUgaW4gU3RhdHVzIEJhcicpXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCdMYXN0IE1vZGlmaWVkOiAnKVxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGFzdE1vZGlmaWVkUHJlcGVuZClcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLmxhc3RNb2RpZmllZFByZXBlbmQgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi51cGRhdGVMYXN0TW9kaWZpZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1RpbWVzdGFtcCBVcGRhdGUgSW50ZXJ2YWwgKGluIHNlY29uZHMpJylcblx0XHRcdC5zZXREZXNjKCdOb3RlOiBFZmZlY3RpdmVseSwgdGhlIG1pbmltdW0gdXBkYXRlIGludGVydmFsIHNlZW1zIHRvIGJlIDJzLicpXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCcyLjAnKVxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MucmVmcmVzaEludGVydmFsU2Vjb25kcy50b1N0cmluZygpKVxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnJlZnJlc2hJbnRlcnZhbFNlY29uZHMgPSArdmFsdWU7XG5cdFx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHRcdGlmICh0aGlzLnBsdWdpbi5zZXR0aW5ncy5sYXN0TW9kaWZpZWRFbmFibGVkKSB7XG5cdFx0XHRcdFx0XHRcdHRoaXMucGx1Z2luLnVwZGF0ZUxhc3RNb2RpZmllZFJlZnJlc2hJbnRlcnZhbCgpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmaW5hbGx5IHt9XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gzJywge3RleHQ6ICdDcmVhdGVkIFRpbWVzdGFtcCd9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0VuYWJsZWQnKVxuXHRcdFx0LnNldERlc2MoJ1R1cm4gdGhlIGRpc3BsYXkgb24gb3Igb2ZmIGluIHlvdXIgc3RhdHVzIGJhci4nKVxuXHRcdFx0LmFkZFRvZ2dsZShib29sID0+IGJvb2xcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZWRFbmFibGVkKVxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlZEVuYWJsZWQgPSB2YWx1ZTtcblx0XHRcdFx0XHRhd2FpdCB0aGlzLnBsdWdpbi5zYXZlU2V0dGluZ3MoKTtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi51cGRhdGVDcmVhdGVkKCk7XG5cdFx0XHRcdH0pXG5cdFx0XHQpXG5cblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1RpbWVzdGFtcCBGb3JtYXQnKVxuXHRcdFx0LnNldERlc2MoJ0NvbXBhdGlibGUgd2l0aCBNb21lbnQuanMgZm9ybWF0cywgZS5nLiBZWVlZLU1NLUREIEg6bW06c3MnKVxuXHRcdFx0LmFkZFRleHQodGV4dCA9PiB0ZXh0XG5cdFx0XHRcdC5zZXRQbGFjZWhvbGRlcignRW50ZXIgZm9ybWF0Jylcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLmNyZWF0ZWRUaW1lc3RhbXBGb3JtYXQpXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVkVGltZXN0YW1wRm9ybWF0ID0gdmFsdWU7XG5cdFx0XHRcdFx0YXdhaXQgdGhpcy5wbHVnaW4uc2F2ZVNldHRpbmdzKCk7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4udXBkYXRlQ3JlYXRlZCgpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KVxuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnVGl0bGUgaW4gU3RhdHVzIEJhcicpXG5cdFx0XHQuYWRkVGV4dCh0ZXh0ID0+IHRleHRcblx0XHRcdFx0LnNldFBsYWNlaG9sZGVyKCdDcmVhdGVkOiAnKVxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MuY3JlYXRlZFByZXBlbmQpXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5jcmVhdGVkUHJlcGVuZCA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnVwZGF0ZUNyZWF0ZWQoKTtcblx0XHRcdFx0fSlcblx0XHRcdCk7XG5cdFx0XHRcdFxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMycsIHt0ZXh0OiAnQ3ljbGUgRGlzcGxheWVkIFRpbWVzdGFtcCBPbiBDbGljayd9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ0VuYWJsZWQnKVxuXHRcdFx0LnNldERlc2MoJ0VuYWJsZSBjeWNsaW5nIGJldHdlZW4gdGhlIGxhc3QgbW9kaWZpZWQgYW5kIGNyZWF0ZWQgdGltZXN0YW1wIG9uIGNsaWNrIGluIHN0YXR1cyBiYXIuJylcblx0XHRcdC5hZGRUb2dnbGUoYm9vbCA9PiBib29sXG5cdFx0XHRcdC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5jeWNsZU9uQ2xpY2tFbmFibGVkKVxuXHRcdFx0XHQub25DaGFuZ2UoYXN5bmMgKHZhbHVlKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5wbHVnaW4uc2V0dGluZ3MuY3ljbGVPbkNsaWNrRW5hYmxlZCA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHR9KVxuXHRcdFx0KVxuXHR9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBT087QUFlUCxJQUFNLG1CQUE2RDtBQUFBLEVBQ2xFLGdCQUFn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
