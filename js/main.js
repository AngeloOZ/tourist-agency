const navMain = document.getElementById('nav_header_main');
const btnDark = document.getElementById('btn_dark_mode');
const btnHamburger  = document.getElementById('btn_hamburger');

loadDarkMode();
initEvents();

function initEvents(){
	btnHamburger.addEventListener('click', ()=>{
		if(!btnHamburger.classList.contains('active')){
			setTimeout(() => {
				btnHamburger.classList.toggle('active');
			}, 500);
		}else{
			btnHamburger.classList.toggle('active');
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
		const scrollY = window.scrollY;
		if(scrollY <= 75){
			navMain.style.top = `${75 - scrollY}px`;
			navMain.classList.remove('sticky');
		}else{
			navMain.style.top = `0`;
			navMain.classList.add('sticky');
		}
	});
	
	document.addEventListener('DOMContentLoaded', _ =>{
		initCarouselTestimonial();	
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
	const stateDarkMode = localStorage.getItem("darkMode");
	if(stateDarkMode){
		if(stateDarkMode == "true"){
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
	}else{
		localStorage.setItem("darkMode",false)
		console.log("creado");
	}
}
