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