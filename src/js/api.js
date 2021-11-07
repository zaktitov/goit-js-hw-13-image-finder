import NewApiService from "./apiService";
import { refs } from "./refss";
import { debounce } from "lodash";
import card from "../templates/card";
import Notifications from "./pnotify";
const { input, btn, ul } = refs;

const newApiService = new NewApiService();
const notifications = new Notifications();
input.addEventListener("input", debounce(onSearch, 500));
refs.btn.addEventListener("click", loadMore);
window.addEventListener("keydown", blockEnterReset);
refs.btn.style.display = "none";

async function onSearch(e) {
  newApiService.query = e.target.value;

  if (newApiService.query !== "") {
    newApiService.resetPage();
    ftIMg()
    // newApiService
    //   .fetchImages()
    //   .then(creatCard)
    //   .catch((error) => {
    //     notifications.showError();
    //   });
    notifications.showSuccess();
    // refs.btn.style.display = "block";
  }

  resetMrkUp();
}

async function ftIMg() {
  try {
    creatCard(await newApiService.fetchImages());
  } catch (error) {}
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
    refs.btn.style.display = "none";
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

const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting && newApiService.query !== "") {

      ftIMg()
      // newApiService
      //   .fetchImages()
      //   .then(creatCard)
      //   .catch((error) => {
      //     notifications.showError();
      //   });
    }
  });
};

const options = {
  rootMargin: "200px",
  // threshold: 0.5,
};

const observer = new IntersectionObserver(callback, options);

observer.observe(document.querySelector(".observer"));
