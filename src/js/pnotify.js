import { notice, error, success } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export default class Notifications {
  constructor() {}

  showNotice() {
    notice({ text: "Please, enter some text 🔤", hide: true, delay: 2000 });
  }

  showError() {
    error({
      text: "Please, do NOT use empty values!",
      hide: true,
      delay: 2000,
    });
  }

  showSuccess() {
    success({
      text: "Here some images for you 🚀",
      delay: 3000,
      hide: true,
    });
  }
}
