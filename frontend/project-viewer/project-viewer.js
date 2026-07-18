const projectViewerLink = document.createElement('link');

projectViewerLink.rel = 'stylesheet';
projectViewerLink.href = 'project-viewer/project-viewer.css';

document.head.appendChild(projectViewerLink);

fetch('project-viewer/project-viewer.html')
.then(response => response.text())
.then(data => {

    document.body.insertAdjacentHTML(
        'beforeend',
        data
    );

    startProjectViewer();

});

let currentProject = null;

let currentImage = 0;

let carouselInterval = null;

function startProjectViewer(){

    document
        .getElementById('closeProject')
        .addEventListener(
            'click',
            closeProject
        );

    document
        .getElementById('previousImage')
        .addEventListener(
            'click',
            previousImage
        );

    document
        .getElementById('nextImage')
        .addEventListener(
            'click',
            nextImage
        );

    document
        .getElementById('projectModal')
        .addEventListener(
            'click',
            event=>{

                if(
                    event.target.id==="projectModal"
                ){

                    closeProject();

                }

            }
        );

}

function openProject(project){

    currentProject = project;

    currentImage = 0;

    document.getElementById(
        'projectTitle'
    ).textContent = project.title;

    document.getElementById(
        'projectDescription'
    ).textContent = project.longDescription;

    document.getElementById(
        'githubButton'
    ).href = project.github;

    loadTags();

    loadCarousel();

    startCarousel();

    document
        .getElementById('projectModal')
        .classList.add('show');

}

function closeProject(){

    stopCarousel();

    document
        .getElementById('projectModal')
        .classList.remove('show');

}

function loadTags(){

    const container = document.getElementById('projectTags');

    container.innerHTML = '';

    if (!currentProject.tags) return;

    currentProject.tags.forEach(tag => {

        const div = document.createElement('div');

        div.className = 'project-tag';

        div.textContent = tag;

        container.appendChild(div);

    });
}

function loadCarousel(){

    if (!currentProject.images || currentProject.images.length === 0) return;

    const image = document.getElementById('carouselImage');

    image.src = currentProject.images[currentImage];

    const dots = document.getElementById('carouselDots');

    dots.innerHTML = '';

    currentProject.images.forEach((_, index) => {

        const dot = document.createElement("div");
        
        dot.className = "carousel-dot";
        
        if(index === currentImage){
            dot.classList.add("active");
        }
    
        dot.addEventListener("click", () => {
        
            currentImage = index;
        
            loadCarousel();
        
            restartCarousel();
        
        });
    
        dots.appendChild(dot);
    
    });
}

function nextImage(){

    currentImage++;

    if(
        currentImage>=
        currentProject.images.length
    ){

        currentImage=0;

    }

    loadCarousel();

}

function previousImage(){

    currentImage--;

    if(currentImage<0){

        currentImage=
            currentProject.images.length-1;

    }

    loadCarousel();

}

function startCarousel(){

    stopCarousel();

    carouselInterval = setInterval(() => {

        nextImage();

    }, 5000); // cada 5 segundos

}

function stopCarousel(){

    clearInterval(carouselInterval);

}

function restartCarousel(){

    startCarousel();

}
