let searchby = 1;
let root = document.getElementById("root"); // getting hand over div element
// function with async keyword and used fetch to fetch data 
// .then returns data and .catch runs when it does not get data---------------------------------------------
async function get() {
  const response = await fetch("https://api.openbrewerydb.org/breweries")
    .then(function (response) {
      return response.json();
    })
    .catch(function (err) {
      console.log(err.message);
    });
  return response;
}

// getdata functions renders the elements to page------------------------------------------------------------ 
async function getData() {
  header(); // calling header function
  const data = await get();
  display(data); // calling display function and pasing data to that function
  footer(); // calling footer function
  console.log(data);
}
getData(); //calling get data function

// function header is used to create brand stickey top and search --------------------------------------------
function header() {
  // -------------- creating brand stickey top-------------------------
  brand = document.createElement("div");
  brand.innerHTML = "Open Brewery";
  brand.className = "text-warning bg-dark p-3 sticky-top h2";
  root.appendChild(brand);
  // -------------creating search field --------------------------------
  searchfield = document.createElement("div");
  searchfield.id = "searchfield";
  heading = document.createElement("h5");
  heading.innerHTML = "Search by ";
  searchfield.appendChild(heading);
  // creating dropdown for search-----------------------
  dropdowm = document.createElement("select");
  dropdowm.setAttribute("onchange", "set()");
  dropdowm.id = "searchby";
  // creating option1----------------------
  op1 = document.createElement("option");
  op1.value = "1";
  op1.innerHTML = "City";
  dropdowm.appendChild(op1);
  // creating option2---------------------
  op2 = document.createElement("option");
  op2.value = "2";
  op2.innerHTML = "State";
  dropdowm.appendChild(op2);
  searchfield.appendChild(dropdowm);
  //creating input search------------------
  sfield = document.createElement("input");
  sfield.type = "text";
  sfield.id = "search";
  sfield.setAttribute("onkeyup", "search()");
  sfield.setAttribute("placeholder", "Search");
  searchfield.appendChild(sfield);
  root.appendChild(searchfield);// adding all things to main root element
}

// function footer is used to add content to the bottom part of the page----------------------------------------
function footer(){
div= document.createElement("div");
div.className="bg-dark justify-content-center p-4 ";
// adding techs used ---------------------------
tech = document.createElement("p");
tech.innerHTML=`Techs Used - <span>html,css,bootstrap,javascript</span>`;
tech.id="tech";
div.appendChild(tech);
// adding Content Disclamier---------------------
content = document.createElement("p");
content.innerHTML=`Content Disclamier - <span>The contant of this website is taken from <a href="https://api.openbrewerydb.org/breweries">Open Brewery</a></span>`;
content.id="content";
div.appendChild(content);
// adding social media icons --------------------
socialmedia = document.createElement("p");
socialmedia.innerHTML=`<a href="#" class="fab fa-facebook-f"></a> <a href="#" class="fab fa-twitter"></a> <a href="#" class="fab fa-google"></a> <a href="#" class="fab fa-linkedin-in"></a> <a href="#" class="fab fa-youtube"></a>`;
socialmedia.id="social"
div.appendChild(socialmedia);
root.appendChild(div); // adding all things to main root element 
}

// function display is used to add the data cards to html page-----------------------------------------------------
function display(data) {
  div = document.createElement("div");
  div.className = "container-fluid row justify-content-center";
  div.id = "row";
  // using foreach loop to iterate through data----------------------
  data.forEach((element) => {
    const newdiv = document.createElement("div");
    newdiv.className = "col-10 col-sm-5 col-lg-3";
    // adding name to the div----------------------------------------
    const name = document.createElement("h3");
    name.innerHTML = `${element.name}`;
    newdiv.appendChild(name);
    // adding type to div--------------------------------------------
    const type = document.createElement("p");
    type.innerHTML = `brewery type : ${element.brewery_type}`;
    type.id = "type";
    newdiv.appendChild(type);
    // adding address to div-----------------------------------------
    const address = document.createElement("p");
    // checking for street name if null it will execute if part else it will ecxecute else part.
    if (element.street == null) 
      address.innerHTML = `Address: , ${element.city}, ${element.state}, ${element.country}, ${element.postal_code.split('-')[0]}.`;
    else
      address.innerHTML = `Address: ${element.street}, ${element.city}, ${element.state}, ${element.country}, ${element.postal_code.split('-')[0]}.`;
    newdiv.appendChild(address);
    // adding website to div-----------------------------------------
    const web = document.createElement("p");
    // checking for website if null it will display Not Available  else it will display website name.
    web.id="web";
    if (element.website_url == null)
      web.innerHTML = `<i class="fa fa-globe" aria-hidden="true"></i> - Not Available`;
    else
      web.innerHTML = `<i class="fa fa-globe" aria-hidden="true"></i> ${element.website_url}`;
    newdiv.appendChild(web);
    // adding number to div------------------------------------------
    const phone = document.createElement("p");
    // checking for number if null it will display Not Available  else it will display number.
    if (element.phone == null)
      phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i> - Not Available `;
    else
      phone.innerHTML = `<i class="fa fa-phone" aria-hidden="true"></i>${element.phone}`;
    newdiv.appendChild(phone);
    div.appendChild(newdiv);
    root.appendChild(div);//appending all element to root element
  });
}
// function set is used to handle the values of dropbox-----------------------------------------------
function set() {
  searchby = document.getElementById("searchby").value;
}
// function search is used to search elements by city or state----------------------------------------
function search() {
  var search = document.getElementById("search");
  enteredvalue = search.value.toUpperCase();//getting entered value
  divelements = document.getElementById("row");
  innerdivs = divelements.getElementsByTagName("div");
  // transversing through all the div elements in the root element.
  for (let i = 0; i < innerdivs.length; i++) {
    td = innerdivs[i].getElementsByTagName("p")[1];
    valu = td.innerHTML.split(",")[searchby];//getting value of city or state using search by
    //indexof will check weather the input value is part of city or state.
    // if it is apart of city or state it will return the index 
    // else it will return the index as -1
    if (valu.toUpperCase().indexOf(enteredvalue) > -1)
      innerdivs[i].style.display = "";
    else innerdivs[i].style.display = "none"; //chaning the dispaly to none if it is not a part of the city or state field.
  }
}