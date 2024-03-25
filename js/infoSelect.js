import infoHome from "./components/info.js";

document.addEventListener("DOMContentLoaded", function () {
    const info = document.getElementById("info")
    info.innerHTML = infoHome
    const homebutton = document.getElementById("home_button_link")
    const sidebarButtons = document.querySelectorAll("#sidebar button");

    sidebarButtons.forEach((button) => {

        button.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            const moduleName = `${button.value}`;

            import(`./components/${moduleName}.js`)
                .then((modul) => {
                    info.innerHTML = modul.default;
                    Prism.highlightAll();

                    const ejText = document.querySelector("#enunciado");
                    ejText.style.textAlign = "justify";

                    const copyButtons = document.querySelectorAll('.copy-button');
                    const codeBlocks = document.querySelectorAll('.code-container');
                    copyButtons.forEach((button, index) => {
                        button.addEventListener('click', () => {

                            const codeBlock = codeBlocks[index].querySelector('code');
                            const tempTextArea = document.createElement('textarea');
                            tempTextArea.value = codeBlock.textContent;
                            document.body.appendChild(tempTextArea);
                            tempTextArea.select();
                            document.execCommand('copy');
                            document.body.removeChild(tempTextArea);
                            button.textContent = 'Copiado';
                            setTimeout(() => { button.textContent = 'Copiar'; }, "2000")
                        });
                    });

                })
                .catch((error) => {
                    console.error({ error });
                    info.innerHTML = /*html*/`
                    <h1>Estamos trabajando en esta seccion</h1>
                    <img src="../imgs/roborError.gif"></img>
                    `;
                });

        });
    });

    homebutton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        info.innerHTML = infoHome
    })

});