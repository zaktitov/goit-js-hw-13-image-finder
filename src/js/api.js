import NewApiService from "./apiService";
import { refs } from "./refss";
import { debounce } from "lodash";
import card from "../templates/card";
import Notifications from "./pnotify";
const { input, btn, ul } = refs;

const newApiService = new NewApiService();
const notifications = new Notifications();
input.addEventListener("input", debounce(onSearch, 700));
btn.addEventListener("click", loadMore);

function onSearch(e) {
  newApiService.query = e.target.value;

  if (newApiService.query !== "") {
    newApiService.resetPage();
    newApiService
      .fetchImages()
      .then(creatCard)
      .catch((error) => {
        notifications.showError();
      });
    notifications.showSuccess();
  }

  resetMrkUp();
}

function loadMore(e) {
  e.preventDefault();

  setTimeout(() => {
    if (newApiService.query !== "") {
      newApiService.fetchImages().then(creatCard).then(handleBtnClick);
      btn.removeEventListener("click", notifications.showNotice);
    } else {
      btn.addEventListener("click", notifications.showNotice);
    }
  }, 100);
}

function creatCard(image) {
  if (image.length > 1 && image.length < 13) {
    createMkUp(image);
  }
}

function createMkUp(image) {
  return ul.insertAdjacentHTML("beforeend", card(image));
}

function resetMrkUp() {
  ul.innerHTML = "";
}

function handleBtnClick() {
  btn.scrollIntoView({
    behavior: "smooth",
    block: "end",
  });
}

window.addEventListener("keydown", (e) => {});
