import { defineStore } from "pinia";

export interface AppState {
  theme: string;
  colorWeek: boolean;
  navbar: boolean;
  menu: boolean;
  hideMenu: boolean;
  menuCollapse: boolean;
  footer: boolean;
  themelist: string;
  themeColor: string;
  themeValue: number;
  themeContent: any;
  menuWidth: number;
  Settings: boolean;
  device: string;
  tabBar: boolean;
  [key: string]: unknown;
  step: number;
  themeLightColors: any
}

export const useAppStore = defineStore('app', {
  state: (): AppState => (
    {
      "theme": "light",
      "colorWeek":false,
      "navbar": true ,
      "menu": true,
      "hideMenu": false,
      "menuCollapse": false,
      "footer": true,
      "themelist":"default",
      "themeColor": "1",
      "themeValue":0,
      "themeContent":{},
      "menuWidth": 220,
      "Settings": false,
      "device": "desktop",
      "tabBar": false,
      "step":0,
      "themeLightColors": null
    }
    
  ),

  getters: {
    appCurrentSetting(state: AppState): AppState {
      return state;
    },
    appDevice(state: AppState) {
      return state.device;
    },
  },

  actions: {
    // Update app settings
    updateSettings(partial: Partial<AppState>) {
      // @ts-ignore-next-line
      this.$patch(partial);
    },

    // updateStep
    updateStep(step: number) {
      this.step = step;
    },

    toggleDevice(device: string) {
      this.device = device;
    },
    toggleMenu(value: boolean) {
      this.hideMenu = value;
    },
    setthemeLightColors(themeLightColors: any) {
      this.themeLightColors = themeLightColors
    }
  },
});