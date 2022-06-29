var ghpages = require("gh-pages");
ghpages.publish("build", function (err) {
  if (err) {
    console.error(err);
  } else {
    console.log("Successfully published");
  }
});
