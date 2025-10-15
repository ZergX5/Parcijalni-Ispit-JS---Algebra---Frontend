var input = document.getElementById("searchInput");
var resultsDiv = document.getElementById("results");

function search(term) {
  resultsDiv.innerHTML = "Učitavanje podataka...";

  fetch("https://itunes.apple.com/search?term=" + term + "&entity=song")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      if (data.results.length === 0) {
        resultsDiv.innerHTML = "Nema pronađenih pjesama za taj pojam.";
        return;
      }

      var table = "<table><tr><th>Pjesma</th><th>Izvođač</th></tr>";

      for (var i = 0; i < data.results.length; i++) {
        var song = data.results[i];
        table += "<tr><td>" + song.trackName + "</td><td>" + song.artistName + "</td></tr>";
      }

      table += "</table>";
      resultsDiv.innerHTML = table;
    })
    .catch(function(error) {
      resultsDiv.innerHTML = "Došlo je do greške: " + error.message;
    });
}

input.addEventListener("input", function() {
  var term = input.value.trim();

  if (term === "") {
    resultsDiv.innerHTML = "Upiši pojam za pretraživanje.";
  } else {
    search(term);
  }
});

