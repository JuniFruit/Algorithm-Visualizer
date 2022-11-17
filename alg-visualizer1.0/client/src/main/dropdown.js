const menu = document.querySelectorAll('.menu');

const clearPrevDropDown = () => {
    const prev = document.querySelector('.dropdown-menu-open');
    prev ? prev.classList.remove('dropdown-menu-open') : null;
}
const handleClick = (e) => {
    clearPrevDropDown();
    const dropdownMenu = e.currentTarget.children[e.currentTarget.children.length -1];   
    if (e.target.parentNode === dropdownMenu) return;
    dropdownMenu.classList.toggle('dropdown-menu-open');
    
}

document.onclick = (e) => {
    if (e.target.className !== 'nav-button') clearPrevDropDown();
}

menu.forEach(menu => menu.onclick = handleClick);
