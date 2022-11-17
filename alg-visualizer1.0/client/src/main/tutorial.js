const tutorialSection = document.querySelector('.tutorial')
const tutorialPages = document.querySelectorAll('.tutorial-wrapper');
const tutorialNextBtn = document.querySelector('.next');
const tutorialPrevBtn = document.querySelector('.prev');
const tutorialSkipBtn = document.querySelector('.skip');


let PAGE = 0;

const handleSkip = (e) => {


    tutorialSection.style.display = 'none';
}

const handlePageChange = (e) => {

  
   
    
    const prevPage = document.querySelector('.tutorial-active');
    prevPage.classList.remove('tutorial-active');

    if (e.target.innerHTML === 'Next') {
        PAGE++;
    } else if (e.target.innerHTML === 'Previous') {
        PAGE--;
    } else if (e.target.innerHTML === 'Go') {
        handleSkip();
    }
    const currentPage = tutorialPages[PAGE];

    currentPage.classList.add('tutorial-active');

    if (PAGE == 0) {
        tutorialPrevBtn.style.opacity = 0;
        tutorialPrevBtn.style.pointerEvents = 'none';
    } else if (PAGE > 0 && PAGE < tutorialPages.length-1) {
        tutorialNextBtn.innerHTML = 'Next'
        tutorialPrevBtn.style.opacity = 1;
        tutorialPrevBtn.style.pointerEvents = 'auto';
        tutorialNextBtn.style.opacity = 1;
        tutorialNextBtn.style.pointerEvents = 'auto';
    } else if (PAGE == tutorialPages.length -1) {
        tutorialNextBtn.innerHTML = 'Go'
    }
   
}

tutorialNextBtn.onclick = handlePageChange;
tutorialPrevBtn.onclick = handlePageChange;
tutorialSkipBtn.onclick = handleSkip