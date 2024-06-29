import { servicesProduct } from "../services/product-services.js";

const productContainer = document.querySelector("[data_product]");
const form = document.querySelector("[data-form");

function createCard(name, precio, imagen, id) {
    const card = document.createElement("div");  //aca creo un html desde JS
    card.classList.add("card");

    card.innerHTML = `
                    <div class="img-container">
                        <img class="img-cont" src="${imagen}" alt="${name}">
                    </div>
                    <div class="card-container--info">
                        <p>${name}</p>
                        <div class="card-container--value">
                            <p>$ ${precio}</p>
                            <button class="delete-button" data-del="${id}">
                                <img src="./imagenes/🦆 icon _trash 2_trash.png"  alt="eliminar"/>
                            </button>
                           
                        </div>
                    </div>
    `;

    const deleteButton = card.querySelector(".delete-button");
    deleteButton.addEventListener("click", async () => {
        try{
        await servicesProduct.deleteProduct(id);
        card.remove();
        }catch(error){
            console.log(error);
            }
            });

    productContainer.appendChild(card); //produccontainer agrega como hijo a card
    return card;

}


const render = async () =>{
    try {
        const listProducts = await servicesProduct.productList();

        listProducts.forEach(product => {
            productContainer.appendChild(
                createCard(
                    product.name,
                    product.precio,
                    product.imagen,
                    product.id
                )              
            )
    });
        
    } catch (error){
        console.log(err)
    } 
};

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("[data-name]").value;
    const precio = document.querySelector("[data-precio]").value;
    const imagen = document.querySelector("[data-image]").value;

    servicesProduct
        .createProducts(name, precio, imagen)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
});

render();