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
window.addEventListener("keydown", blockEnterReset);
btn.style.display = "none";

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
    btn.style.display = "block";
  }

  resetMrkUp();
}

function loadMore(e) {
  e.preventDefault();
  newApiService.fetchImages().then(creatCard).then(handleBtnClick);
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
  if (newApiService.query === "") {
    btn.style.display = "none";
  }
}

function handleBtnClick() {
  setTimeout(() => {
    btn.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, 800);
}

function blockEnterReset(e) {
  const keyValue = e.code;

  if (keyValue === "Enter") {
    e.preventDefault();
  }
}
