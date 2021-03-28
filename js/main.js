// const menuToggle = document.querySelector('.toggle');
// const showcase = document.querySelector('.showcase');

// menuToggle.addEventListener('click', () => {
//   menuToggle.classList.toggle('active');
//   showcase.classList.toggle('active');
// })
const navMain = document.getElementById('nav_header_main');

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

function initCarouselTestimonial(){
	const testCont = document.getElementById('sub_cont_test');
	const contIndicadores = document.getElementById('indicadores_test');
	if(testCont){
		const numTestimoniales = testCont.childElementCount;
		testCont.style.gridTemplateColumns = `repeat(${numTestimoniales},100%)`
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