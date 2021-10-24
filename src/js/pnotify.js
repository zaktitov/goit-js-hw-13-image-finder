import { error } from "@pnotify/core";
import "@pnotify/core/dist/PNotify.css";
import "@pnotify/core/dist/BrightTheme.css";

export default function showNotice() {
  return error({
    text: "Too many matches found. Please enter a more specific query!",
    hide: true,
    delay: 3000,
  });
}
