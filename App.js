// CSC 2053-002 - Project 3
// Names: Jack T, Jon L, Alexander G
// Date: 4/22/25

fetch('https://raw.githubusercontent.com/HackipGG/Project_3/refs/heads/main/species_ids.csv')
.then(response => response.text())
.then(data => {
    const lines = data.trim().split('\n');
    const numbers = lines.slice(1).map(Number);
    console.log(numbers);
})

speciesId = 7;

fetch(`https://api.inaturalist.org/v1/taxa/${speciesId}`)
  .then(response => response.json())
  .then(data => {
      console.log(data);
      const species = data.results[0];
      console.log('Name:', species.name);
      //console.log('Rank:', species.rank);
      console.log('Taxon Hierarchy:', species.ancestors);
      if (species.common_name) {
        console.log('Common Name:', species.common_name);
      }
  })