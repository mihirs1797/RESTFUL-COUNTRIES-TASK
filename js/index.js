async function getCountriesData(){
  try{
    var countriesResponse = await fetch("https://restcountries.eu/rest/v2/all");
    var countriesData = await countriesResponse.json();
    // console.log(countriesData); //countriesData holds all info    
    createHTML(countriesData);
  }
  catch(err){
    console.error(err);
  }
}

function createCard(country){
  var card = document.createElement('div');
  card.classList.add('card');
  var cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header','text-center');
  cardHeader.style.backgroundColor = "black";
  cardHeader.style.color = "white";
  cardHeader.innerHTML = country.name; 
  var cardImg = document.createElement('img');
  cardImg.classList.add('card-img-top','img-fluid');
  cardImg.src = country.flag;
  cardImg.style.height = '200px'
  var cardBody = document.createElement('div');
  cardBody.className = 'card-body';
  var cardtitle = document.createElement('h5');
  cardtitle.classList.add('card-title','text-left');
  cardtitle.innerHTML = 'Details:';
  var capital = document.createElement('p');
  capital.className='card-text';
  capital.innerHTML = 'Capital: '+country.capital;
  var region = document.createElement('p');
  region.className='card-text';
  region.innerHTML = 'Region: '+country.region;
  var countryCode = document.createElement('p');
  countryCode.className='card-text';
  countryCode.innerHTML = 'Country-Code: '+country.alpha3Code;
  var latlong = document.createElement('p');
  latlong.className='card-text';  
  var arr = country.latlng;
  latlong.innerHTML = 'Latitude: '+(parseInt(arr[0]).toFixed(2))+' Longitude: '+(parseInt(arr[1]).toFixed(2));
  var cardFooter = document.createElement('div');
  cardFooter.classList.add('card-footer','text-muted','text-center');
  var weatherButton = document.createElement('button');
  weatherButton.setAttribute('type','button');
  weatherButton.setAttribute('id','weather');
  weatherButton.setAttribute('data-toggle','modal');
  weatherButton.setAttribute('data-target','#displayWeather');
  weatherButton.classList.add('btn','btn-primary','weatherButton');
  weatherButton.innerHTML = 'Click for Weather!';
  weatherButton.addEventListener('click',function(){
    var temp = getWeatherData(arr,cardHeader);
    console.log(temp);
  })
  cardFooter.append(weatherButton);
  cardBody.append(cardtitle,capital,region,countryCode,latlong);
  card.append(cardHeader,cardImg,cardBody,cardFooter);
  return card;
}

function createHTML(countriesData){
  var container = document.createElement('div');
  container.classList.add('container','mx-auto');
  var row = document.createElement('div');
  row.className = 'row';
  var column = document.createElement('div');
  column.className = 'col-lg-12';
  var cardRow = document.createElement('div');
  cardRow.className = 'row';
  countriesData.forEach((country)=>{
    var cardColumn = document.createElement('div');
    cardColumn.classList.add('col-lg-4','col-md-6','col-sm-12','mt-5');
    var cardCreate = createCard(country); 
    cardColumn.append(cardCreate);
    cardRow.append(cardColumn);
  });
  column.append(cardRow);
  row.append(column);
  container.append(row);
  document.body.append(container);

}


function getWeatherData(arr,countryName){
  let lat = +arr[0].toFixed(2);
  let lon = +arr[1].toFixed(2);
  let url = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=3ce1c849f7784212f2497377c2ef5afa";
  var request = new XMLHttpRequest;
  request.open('GET',url,true);
  request.send();

  request.onload = function(){
    var data = JSON.parse(this.response);
    console.log(data);
    var report = data.main.temp;
    var report2 = data.weather[0].description;
    console.log((report-273).toFixed(2));
    alert("Weather is "+(report-273).toFixed(2)+" degree celsius with "+report2);
  }
}

getCountriesData();
