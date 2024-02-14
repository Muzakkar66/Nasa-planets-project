const {parse} = require("csv-parse");
const fs = require("fs");

const result = [];

function isHabitablePlanet(planet) {
  return planet['koi_disposition'] === 'CONFIRMED';
}

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (isHabitablePlanet(data)) {
      result.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(result);
    console.log("All Done");
  });
