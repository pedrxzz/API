document.addEventListener('DOMContentLoaded', () => {
    const breedsContainer = document.getElementById('breeds');
    const apiKey = 'live_PmSLjKcvgOk2aOAjKZpvsHCzVHN1al7Fby1crfOKXSkt3XLyv6VAonXWipkEpVNP';

    const curiosities = {
        "Affenpinscher": "Affenpinschers são conhecidos como 'macacos pequenos' por causa de suas expressões faciais.",
        "Akita": "Akitas são conhecidos por sua lealdade e coragem.",
        "Beagle": "Beagles têm um olfato incrivelmente aguçado e são frequentemente usados como cães farejadores.",
        "Golden Retriever": "São excelentes cães-guia e de terapia devido à sua natureza gentil e paciente.",
        "Bulldog Frances": "Apesar de sua aparência robusta, são muito afetuosos e adoram a companhia humana.",
        "Husky Siberiano": "São conhecidos por seu uivo característico e foram usados como cães de trenó na Sibéria.",
        "Chihuahua": "É a menor raça de cachorro do mundo e tem uma personalidade corajosa e confiante.",
        "Dálmata": "Famosos por seu papel no filme “101 Dálmatas”, são cães muito ativos e precisam de bastante exercício.",
        "Basenji": "É a única raça de cachorro que não sabe latir. Em vez disso, emite um som conhecido como barroo."
    };

    const fetchBreeds = async () => {
        try {
            const response = await fetch('https://api.thedogapi.com/v1/breeds', {
                headers: {
                    'x-api-key': apiKey
                }
            });
            const data = await response.json();

            data.forEach(breed => {
                const breedElement = document.createElement('div');
                breedElement.classList.add('breed');

                breedElement.innerHTML = `
                    <img src="${breed.image.url}" alt="${breed.name}">
                    <h2>${breed.name}</h2>
                    <p>Temperament: ${breed.temperament}</p>
                    <p>Life Span: ${breed.life_span}</p>
                    <p>Origin: ${breed.origin || 'Unknown'}</p>
                    <button onclick="showCuriosity('${breed.name}')">Show Curiosity</button>
                    <p class="curiosity" id="curiosity-${breed.name}" style="display: none;"></p>
                `;

                breedsContainer.appendChild(breedElement);
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    window.showCuriosity = (breedName) => {
        const curiosityElement = document.getElementById(`curiosity-${breedName}`);
        curiosityElement.textContent = curiosities[breedName] || 'No curiosity available for this breed.';
        curiosityElement.style.display = 'block';
    };

    fetchBreeds();
});
