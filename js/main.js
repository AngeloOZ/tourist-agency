import LightBox from './lightbox.js'

const navMain = document.getElementById('nav_header_main');
const btnDark = document.getElementById('btn_dark_mode');
const btnHamburger  = document.getElementById('btn_hamburger');
const placeItemsHeader = document.querySelectorAll(".place_item_header");

try {
	const images = document.querySelectorAll('img.lightbox');
	const light = new LightBox(images);
	light.init();
} catch (error) {
	console.log(error);
}

loadDarkMode();
initEvents();

function initEvents(){
	btnHamburger.addEventListener('click', ()=>{
		if(!btnHamburger.classList.contains('active')){
			btnHamburger.classList.toggle('active');
		}else{
			btnHamburger.classList.toggle('active');
			document.querySelector('body').style.transform = "translateX(0)";
		}
		const menu = document.getElementById('nav_enlaces');
		menu.classList.toggle('active')
	})
	btnDark.addEventListener('click', _=>{
		btnDark.classList.toggle('active_dark');
		if(btnDark.classList.contains('active_dark')){
			localStorage.setItem('darkMode',true)
		}else{
			localStorage.setItem('darkMode',false)
		}
		loadDarkMode();
	})
	window.addEventListener('scroll',e =>{
		const ps = navMain.getBoundingClientRect();
		if(navMain.hasAttribute('data-active-sticky')){
			(ps.y == 0) ? navMain.classList.add('sticky') : navMain.classList.remove('sticky');
		}
	});
	
	document.addEventListener('DOMContentLoaded', _ =>{
		initCarouselTestimonial();
		initParallax();	
	})

}


function initCarouselTestimonial(){
	const testCont = document.getElementById('sub_cont_test');
	const contIndicadores = document.getElementById('indicadores_test');
	if(testCont){
		const numTestimoniales = testCont.childElementCount;
		const fragment = document.createDocumentFragment();
		for (let i = 0; i < numTestimoniales; i++) {
			const span = document.createElement('SPAN');
			span.classList.add('indicador');
			span.setAttribute('num_indicador', i);
			fragment.appendChild(span);
		}
		contIndicadores.appendChild(fragment);
		contIndicadores.firstElementChild.classList.add('active')
		contIndicadores.addEventListener('click', e =>{
			if(e.target.hasAttribute('num_indicador') && e.target.classList.contains('indicador')){
				const child = contIndicadores.childNodes;
				child.forEach(element => {
					element.classList.remove('active')
				});
				e.target.classList.add('active')
				const numIndicador = parseInt(e.target.getAttribute('num_indicador'));
				testCont.style.transform = `translateX(-${numIndicador * 100}%)`;
			}
		})
	}

}
function loadDarkMode(){
	const stateDarkMode = (localStorage.getItem("darkMode")) ? 
		localStorage.getItem("darkMode"): "false";
		
	if(stateDarkMode == "true"){
		btnDark.classList.add('active_dark');
		document.documentElement.style.setProperty('--bg-blanco','#1A1A1A')
		document.documentElement.style.setProperty('--bg-blanco-f3','#313131')
		document.documentElement.style.setProperty('--color-black','#fff')
		document.documentElement.style.setProperty('--color-white','#000')
		const img = document.querySelector('#nav_header_main .logo img');
		img.src = "../image/logo_main_white.png";
	}else{
		document.documentElement.style.setProperty('--bg-blanco','#ffffff')
		document.documentElement.style.setProperty('--bg-blanco-f3','#F3F3F3')
		document.documentElement.style.setProperty('--color-black','#000')
		document.documentElement.style.setProperty('--color-white','#fff')
		const img = document.querySelector('#nav_header_main .logo img');
		img.src = "../image/logo_main_black.png";
	}	
}
function initParallax(){
    const ctn = document.querySelector('.parallax');
    if(ctn && ctn.hasAttribute('data-parallax-image')){
		const url = ctn.dataset.parallaxImage.toString().trim();
        if(url != ""){
			ctn.style.backgroundImage =`url(${url})`;
			ctn.style.backgroundRepeat = "no-repeat";
			ctn.style.backgroundSize = "cover";
			ctn.style.backgroundPosition = "center"
			ctn.style.backgroundAttachment = "fixed";
		}else{
			console.error('La url de la imagen no es valida')
		}
    }
}



/* -------------------------------------------------------------------------- */
/*                                     hol                                    */
/* -------------------------------------------------------------------------- */

placeItemsHeader.forEach(placeItem => {
  placeItem.addEventListener("click", event => {
    placeItem.classList.toggle("active");
    const itemBody = placeItem.nextElementSibling;
    if(placeItem.classList.contains("active")) {
      itemBody.style.maxHeight = itemBody.scrollHeight + "px";
    }
    else {
      itemBody.style.maxHeight = 0;
    }
    
  });
});