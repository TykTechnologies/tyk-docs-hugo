const cookieContainer = document.querySelector(".cookie-container");
const cookieButton1 = document.querySelector(".cookie-btn1");
const cookieButton2 = document.querySelector(".cookie-btn2");


cookieButton1.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
});

cookieButton2.addEventListener("click", () => {
  cookieContainer.classList.remove("active");
  localStorage.setItem("cookieBannerDisplayed", "true");
  localStorage.setItem("cookieDisabled", "true");
});

setTimeout(() => {
  if (!localStorage.getItem("cookieBannerDisplayed")) {
    ///cookieContainer.classList.add("active");
  }
}, 200);