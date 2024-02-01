document.querySelector('#date').innerHTML = (new Date()).getFullYear();

const getProducts = async () => {
    const url = `https://fakestoreapi.com/products`;   
    const response = await fetch(url);

    if (response.status === 200) {
        const data = await response.json();
        renderCard(data);
    } else {
        renderCard(false);
    }
}

const renderCard = (data) => {
    const container = document.querySelector('.container');
    container.innerHTML = '';
    if (!data) {
        container.innerHTML = `<h2 style='color:red;text-align:center'>Erro ao carregar os Produtos. Tente Novamente.</h2>`;
    } else {

        for (let i=0; i<data.length; i++) {
            const {image,description,title,price,category,rating} = data[i];

            const containerCard = document.createElement('section');
            containerCard.className = 'container__card';
    
            const cardImage = document.createElement('section');
            cardImage.className = 'card__image';
            cardImage.style =`background-image: url('${image}');`;

            const cardValues = document.createElement('ul');
            cardValues.className = 'card__values';

            const valuesTitle = document.createElement('li');
            valuesTitle.className = 'values__title';
            valuesTitle.innerText = title;
            cardValues.appendChild(valuesTitle);

            const valuesPrice = document.createElement('li');
            valuesPrice.className = 'values__price';
            valuesPrice.innerText = `$ ${price}`;
            cardValues.appendChild(valuesPrice);

            const valuesDescription = document.createElement('li');
            valuesDescription.className = 'values__description';
            valuesDescription.innerText = description;
            cardValues.appendChild(valuesDescription);

            const valuesCategory = document.createElement('li');
            valuesCategory.className = 'values__category';
            valuesCategory.innerText = `Categoria: ${category}`;
            cardValues.appendChild(valuesCategory);

            const valuesRate = document.createElement('li');
            valuesRate.className = 'values__rate';
            const rateStars = document.createElement('div');
            rateStars.className = 'rate__stars';
            rateStars.style = `--rating: ${rating.rate};`;
            rateStars.ariaLabel = `Classificação do produto: ${rating.rate} de 5 estrelas.`;
            rateStars.title = `Classificação do produto: ${rating.rate} de 5 estrelas.`;
            valuesRate.appendChild(rateStars);
            cardValues.appendChild(valuesRate);

            containerCard.appendChild(cardImage);
            containerCard.appendChild(cardValues);
            container.appendChild(containerCard);
        }



    }
}

getProducts();