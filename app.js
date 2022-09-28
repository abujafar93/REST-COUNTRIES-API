const bodyClass = document.querySelector(".go");
// console.log(bodyClass);
const themer = document.querySelector(".theme_changer");
// console.log(themer);

//THEME
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

//API INTEGRATION

const updateUI = (data) => {
  console.log(data);
  const {
    length,
    // capital,
    // borders,
    // name,
    // region,
    // tld,
    // flags,
    // currencies,
    // population,
    // languages,
    // subregion,
  } = data;

  document.querySelector(".country_container").innerHTML = `
  <div class="card">
  <a href="details.html">
    <div class="country_info">
      <h2 class="country_name">${length.name}</h2>
      <p>
        <span class="country_info-features">Population:</span>
        <span class="population">${length.population}</span>
      </p>
      <p>
        <span class="country_info-features">Region:</span>
        <span class="region">${length.region}</span>
      </p>
      <p>
        <span class="country_info-features">Capital:</span>
        <span class="capital">${length.capital}</span>
      </p>
    </div>
  </a>
</div>
  `;
};

const getCountry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (response.status !== 200) {
    throw new Error("Cannot fetch the data");
  }

  const data = await response.json();

  return data;
};

getCountry()
  .then((data) => updateUI(data))
  .catch((err) => console.log(err));
