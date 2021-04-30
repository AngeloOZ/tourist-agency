export default class LightBox{
    arrayImage
    contenedorLightBox
    imagenLightBox
    descripcionLightBox

    constructor(array = null){
        if(array === null || array.length === 0) throw new Error('array inicial no válido o está vacío');
        this.arrayImage = [...array];
    }
    init(){
        let contenedorLight = document.getElementById('container_lightboox')
        console.log(this.arrayImage.length);
        if(!contenedorLight){
            contenedorLight = document.createElement('DIV');
            contenedorLight.id = 'container_lightboox';
            contenedorLight.classList.add('container_lightboox')
            contenedorLight.innerHTML = `
            <div class="subcontainer_lightbox">
                <div class="lightbox_image">
                    <img class="image_light" src="" alt="">
                </div>
                <p class="lightbox_caption"></p>
            </div>`;   
            document.querySelector('body').insertAdjacentElement('afterbegin',contenedorLight);   
        }
        this.contenedorLightBox = contenedorLight;
        this.imagenLightBox = contenedorLight.querySelector('.lightbox_image .image_light');
        this.descripcionLightBox = contenedorLight.querySelector('.subcontainer_lightbox .lightbox_caption')
        this.initEvents();
        this.contenedorLightBox.style.transition = "0.3s ease all 0.2s"
    }
    initEvents(){
        this.contenedorLightBox.addEventListener('click', e =>{
            if(e.target.id == 'container_lightboox'){
                document.querySelector('body').classList.remove('no_scroll');
                this.contenedorLightBox.classList.remove('active_lightbox');
                setTimeout(() => {
                    this.imagenLightBox.src = "";
                    this.descripcionLightBox.textContent = "";
                }, 400);
            }
        });
        this.arrayImage.forEach(img => {
            img.addEventListener('click', e =>{
                this.loadImage(e.target);
            });          
        });
    }
    loadImage(imagen){
        const text = (imagen.hasAttribute('data-caption_light') && imagen.dataset.caption_light != "") ? imagen.dataset.caption_light : imagen.alt;
        this.imagenLightBox.src = imagen.src;
        this.descripcionLightBox.textContent = text;
        this.contenedorLightBox.classList.add('active_lightbox');
        document.querySelector('body').classList.add('no_scroll');
    }
}