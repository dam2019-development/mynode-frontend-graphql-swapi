var express = require("express");
var app = express();
const fetch = require("node-fetch");

const getMovies = async () => {
  const query = `
  query {
    getPersons {
    name
    homeworld
    films {
      title
      episode_id
      opening_crawl
    }
  }
}
  `;

  const variables = {
    first: 3
  };

  const result = await fetch("https://graphql-swapi.rainerdeyerling.now.sh", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(e => {
      console.log(e);
    });

  return result.data;
};

app.get("/", function(req, res) {
  res.send("Hello World! test 2");
});
app.get("/getMovies", function(req, res) {
  const main = async () => {
    const data = await getMovies();
    console.log("get" + data.getPersons[0]);

    //return "data";
    res.json(data.getPersons);
  };
  //res.json(main());
  main();
});

app.listen(8080, function() {
  console.log("Example app listening on port 8080!");
});
