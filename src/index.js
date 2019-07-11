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
  var content = "<hmtl><header><title>my graphql-swapi demo app</title></header><body><h1>test graphql</h1>";
  content += "<a href='/getMovies' target='_blank'>getMovies</a>";
  content +=
    "<div> <a target='blank' href='https://graphql-swapi.rainerdeyerling.now.sh/'>graphql-swapi</a>";
    content += "<div>footer etc.</div> </body></html>";
  res.send(content);
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
