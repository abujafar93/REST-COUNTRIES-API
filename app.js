const bodyClass = document.querySelector(".go");
// console.log(bodyClass);
const themer = document.querySelector(".theme_changer");
// console.log(themer);

const themeChanger = () => {
  if (bodyClass.classList == "light") {
    bodyClass.classList.remove("light");
    bodyClass.classList.add("dark");
  } else if (bodyClass.classList == "dark") {
    bodyClass.classList.remove("dark");
    bodyClass.classList.add("light");
  }

  console.log(bodyClass);
};

themer.addEventListener("click", themeChanger);
