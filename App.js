// CSC 2053-001 - Project 3
// Names: Jon L, Alexander G, Jack T
// Date: 4/24/25

let numbers = [];
let speciesId = null;

// Load csv
async function loadIDs() {
  try {
    const res = await fetch('https://raw.githubusercontent.com/HackipGG/Project_3/main/species_ids.csv');
    const txt = await res.text();
    const lines = txt.trim().split('\n');
    numbers = lines.slice(1).map(Number);
  } 
  catch (err) {
    console.error("Failed to load IDs:", err);
  }
}

function cleanText(text){

  return text ? text.replace(/<\/?[^>]+>/g, '') : 'No summary available';
}

async function fetchData(id) {
  try {
    const res = await fetch(`https://api.inaturalist.org/v1/taxa/${id}`);
    const json = await res.json();
    const sp = json.results[0];
    console.log(sp);

    if (!sp) {
      console.warn("No results for ID", id);
      return null;
    }

    return {
      name: sp.name,
      hierarchy: sp.ancestors.map(a => a.name).join(' → '),
      photo: sp.default_photo?.medium_url || sp.default_photo?.square_url || null,
      observations: sp.observations_count,
      summary: cleanText(sp.wikipedia_summary)
    };
  } 
  catch (err) {
    console.error("Failed to fetch taxon:", err);
    return null;
  }
}

async function getRandomID() {
  if (numbers.length === 0) {
    await loadIDs();
    if (numbers.length === 0) return null;
  }
  const rIndex = Math.floor(Math.random() * numbers.length);
  speciesId = numbers[rIndex];
  return await fetchData(speciesId);
}
