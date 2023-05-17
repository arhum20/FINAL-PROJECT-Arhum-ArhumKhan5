// visualization.js

function visualizeLifeExpectancy(data, currentYear) {
  let lifeExpectancyData = [];
  let life = d3.select("#life");
  for (let id in data) {
    let life = data[id][currentYear] || 0;
    lifeExpectancyData.push({ id: id, lifeExpectancy: life });
  }

  lifeExpectancyData.sort((a, b) => b.lifeExpectancy - a.lifeExpectancy);
  console.log(lifeExpectancyData);
  let lifeExpectancyString = "";

  for (let i = 0; i < lifeExpectancyData.length; i++) {
    let countryId = lifeExpectancyData[i].id;
    let lifeExpectancy = lifeExpectancyData[i].lifeExpectancy.toFixed(1);
    if (lifeExpectancy > 80) {
      lifeExpectancyString += `${countryNames[countryId]}: ${lifeExpectancy} years <img src="https://c8.alamy.com/zooms/9/71d877e48fa845db82c8a36c049c7626/2ga6ypr.jpg" alt="80s" width="50" height="50">`;
    } else if (70 < lifeExpectancy && lifeExpectancy < 80) {
      lifeExpectancyString += `${countryNames[countryId]}: ${lifeExpectancy} years <img src="https://img.freepik.com/premium-vector/cute-old-woman-cartoon-with-cane_43605-3934.jpg" alt="70s" width="30" height="40">`;
    } else if (60 < lifeExpectancy && lifeExpectancy < 70) {
      lifeExpectancyString += `${countryNames[countryId]}: ${lifeExpectancy} years <img src="https://static.wikia.nocookie.net/nickelodeon/images/6/67/Betsy_Krabs_Trans.png" alt="60s" width="50" height="50">`;
    } else if (50 < lifeExpectancy && lifeExpectancy < 60) {
      lifeExpectancyString += `${countryNames[countryId]}: ${lifeExpectancy} years <img src="https://media.istockphoto.com/id/1167698837/vector/senior-man-using-laptop.jpg?s=612x612&w=0&k=20&c=IQIeo1F2RbEICwgzsxUfZdwxW9yeRz_i56aWaHhiC2w=" alt="50s" width="50" height="50">`;
    }
  }

  life.html(`<b>Life expectancy in ${currentYear}:</b><br>${lifeExpectancyString}`);
}
