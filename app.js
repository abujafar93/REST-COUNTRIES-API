const bodyClass = document.querySelector(".go");
const themer = document.querySelector(".theme_changer");
const search = document.querySelector(".form_section #search");
const regionFilter = document.querySelector(".form_section #regions");

//THEME
const themeChanger = () => {
  if (bodyClass.classList.contains("light")) {
    bodyClass.classList.remove("light");
    bodyClass.classList.add("dark");
  } else if (bodyClass.classList.contains("dark")) {
    bodyClass.classList.remove("dark");
    bodyClass.classList.add("light");
  }
};

themer.addEventListener("click", themeChanger);

//API INTEGRATION

const detail = () => {
  console.log(window.location.href);

  const urlstring = window.location.href;
  getparam = urlstring.split("?")[1];
  let query = new URLSearchParams(getparam);

  obj = {};

  for (let param of query.entries()) {
    console.log(param[0] + ":" + param[1]);

    if (param[0] == "native") {
      document.querySelector(".native").innerText = param[1];
    } else if (param[0] == "region") {
      document.querySelector(".region").innerText = param[1];
    } else if (param[0] == "subregion") {
      document.querySelector(".sub_region").innerText = param[1];
    } else if (param[0] == "capital") {
      document.querySelector(".capital").innerText = param[1];
    } else if (param[0] == "currencies") {
      document.querySelector(".currency").innerText = param[1];
    } else if (param[0] == "languages") {
      document.querySelector(".lang").innerText = param[1];
    } else if (param[0] == "domainlevel") {
      document.querySelector(".top_level_dom").innerText = param[1];
    } else if (param[0] == "flag") {
      document.getElementById("country_flag").src = param[1];
    } else if (param[0] == "population") {
      document.querySelector(".population").innerText = param[1];
    } else if (param[0] == "firstborder") {
      document.querySelector(".cty1").innerText = param[1];
    } else if (param[0] == "secondborder") {
      document.querySelector(".cty2").innerText = param[1];
    } else if (param[0] == "thirdborder") {
      document.querySelector(".cty3").innerText = param[1];
    }
  }
};

let myData = [];

const updateUI = (data) => {
  const {
    name,
    borders,
    capital,
    region,
    tld,
    flags,
    currencies,
    population,
    languages,
    subregion,
  } = data;
  console.log(data);

  let country = document.querySelector(".country_container");

  data.forEach((item) => {
    let Capital = item.hasOwnProperty("capital") ? item.capital[0] : "";

    let curr_name = "";

    if (item.hasOwnProperty("currencies")) {
      Currency = Object.keys(item.currencies);
      const curr_key = Currency[0];
      curr_name = item.currencies[curr_key].name;
    }

    let lang = "";
    if (item.hasOwnProperty("languages")) {
      Languages = Object.keys(item.languages);
      const lang_key = Languages[0];
      lang = item.languages[lang_key];
    }

    const border1 = item.hasOwnProperty("borders") ? item.borders[0] : "";

    const border2 = item.hasOwnProperty("borders") ? item.borders[1] : "";

    const border3 = item.hasOwnProperty("borders") ? item.borders[2] : "";

    let par = document.createElement("div");
    par.classList.add("card");
    par.innerHTML = `
  <a href="details.html?native=${item.name.common}&region=${item.region}&population=${item.population}&flag=${item.flags.png}&subregion=${item.subregion}&capital=${Capital}&firstborder=${border1}&secondborder=${border2}&thirdborder=${border3}&currencies=${curr_name}&languages=${lang}" target="_blank">
    <img
    src="${item.flags.png}"
    alt="country_flag"
    id="country_flag"
    width="300"
    height="200"
  />
    <div class="country_info">
      <h2 class="country_name">${item.name.common}</h2>
      <p>
        <span class="country_info-features">Population:</span>
        <span class="population">${item.population}</span>
      </p>
      <p>
        <span class="country_info-features">Region:</span>
        <span class="region">${item.region}</span>
      </p>
      <p>
        <span class="country_info-features">Capital:</span>
        <span class="capital">${item.capital}</span>
      </p>
    </div>
  </a>
    `;

    country.append(par);

    let country_name = item.name.common;
    let region_name = item.region;
    let population_name = item.population;
    let flag_name = item.flags.png;
    let sub_region_name = item.subregion;
    let capital_name = item.capital;
    let Currency_name = curr_name;
    let Language_name = lang;
    let FirstBorder = border1;
    let SecondBorder = border2;
    let ThirdBorder = border3;

    let my_object = {
      country_name,
      region_name,
      population_name,
      flag_name,
      sub_region_name,
      capital_name,
      Currency_name,
      Language_name,
      FirstBorder,
      SecondBorder,
      ThirdBorder,
    };

    myData.push(my_object);
  });
};

search.addEventListener("keyup", () => {
  let srch_txt = search.value;

  srch_filter = myData.filter(
    (item) =>
      item.country_name.toLowerCase().indexOf(srch_txt.toLowerCase()) > -1
  );

  document.querySelector(".country_container").innerHTML = "";

  let country = document.querySelector(".country_container");

  srch_filter.forEach((item) => {
    let par = document.createElement("div");
    par.classList.add("card");
    par.innerHTML = `
  <a href="details.html?native=${item.country_name}&region=${item.region_name}&population=${item.population_name}&flag=${item.flag_name}&subregion=${item.sub_region_name}&capital=${item.capital_name}&firstborder=${item.FirstBorder}&secondborder=${item.SecondBorder}&thirdborder=${item.ThirdBorder}&currencies=${item.Currency_name}&languages=${item.Language_name}" target="_blank">
    <img
    src="${item.flag_name}"
    alt="country_flag"
    id="country_flag"
    width="300"
    height="200"
  />
    <div class="country_info">
      <h2 class="country_name">${item.country_name}</h2>
      <p>
        <span class="country_info-features">Population:</span>
        <span class="population">${item.population_name}</span>
      </p>
      <p>
        <span class="country_info-features">Region:</span>
        <span class="region">${item.region_name}</span>
      </p>
      <p>
        <span class="country_info-features">Capital:</span>
        <span class="capital">${item.capital_name}</span>
      </p>
    </div>
  </a>
    `;

    country.append(par);
  });
});

regionFilter.addEventListener("change", () => {
  let rgn_txt = regionFilter.value;
  console.log(rgn_txt);

  rgn_filter = myData.filter(
    (item) => item.region_name.toLowerCase().indexOf(rgn_txt.toLowerCase()) > -1
  );

  document.querySelector(".country_container").innerHTML = "";

  let country = document.querySelector(".country_container");

  rgn_filter.forEach((item) => {
    let par = document.createElement("div");
    par.classList.add("card");
    par.innerHTML = `
  <a href="details.html?native=${item.country_name}&region=${item.region_name}&population=${item.population_name}&flag=${item.flag_name}&subregion=${item.sub_region_name}&capital=${item.capital_name}&firstborder=${item.FirstBorder}&secondborder=${item.SecondBorder}&thirdborder=${item.ThirdBorder}&currencies=${item.Currency_name}&languages=${item.Language_name}" target="_blank">
    <img
    src="${item.flag_name}"
    alt="country_flag"
    id="country_flag"
    width="300"
    height="200"
  />
    <div class="country_info">
      <h2 class="country_name">${item.country_name}</h2>
      <p>
        <span class="country_info-features">Population:</span>
        <span class="population">${item.population_name}</span>
      </p>
      <p>
        <span class="country_info-features">Region:</span>
        <span class="region">${item.region_name}</span>
      </p>
      <p>
        <span class="country_info-features">Capital:</span>
        <span class="capital">${item.capital_name}</span>
      </p>
    </div>
  </a>
    `;

    country.append(par);
  });
});

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

detail();
