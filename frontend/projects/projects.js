const projectsLink = document.createElement('link');

projectsLink.rel = 'stylesheet';
projectsLink.href = 'projects/projects.css';

document.head.appendChild(projectsLink);

fetch('projects/projects.html')
.then(response => response.text())
.then(data =>{

    document.getElementById('projects-container').innerHTML = data;

    startProjects();

});

let projects = [];

let currentPage = 0;

const projectsPerPage = 4;

async function startProjects(){

    const response = await fetch('projects/projects.json');

    projects = await response.json();

    renderProjects();

    document
        .getElementById('prevProjects')
        .addEventListener('click',previousProjects);

    document
        .getElementById('nextProjects')
        .addEventListener('click',nextProjects);

}

function renderProjects(){

    const grid = document.getElementById('projectsGrid');

    grid.innerHTML = '';

    const start = currentPage * projectsPerPage;

    const end = start + projectsPerPage;

    const currentProjects = projects.slice(start,end);

    currentProjects.forEach(project=>{

        const scale = project.scale || 1;

        const card = document.createElement('div');

        card.className = 'project-card';

        card.innerHTML = `

            <h3 class="project-title">

                ${project.title}

            </h3>

            <div class="project-image">

                <img src="${project.image}" alt="${project.title}" style="transform: scale(${scale});">

            </div>

            <div class="project-description">

                ${project.description}

            </div>
        `;

        const button = document.createElement("button");

        button.className = "project-button";

        button.textContent = "Show more";

        button.addEventListener("click", () => {
        
            openProject(project);
        
        });

        card.appendChild(button);

        grid.appendChild(card);

    });

    document.getElementById('prevProjects').disabled =
        currentPage === 0;

    document.getElementById('nextProjects').disabled =
        end >= projects.length;

}

function nextProjects(){

    currentPage++;

    renderProjects();

}

function previousProjects(){

    currentPage--;

    renderProjects();

}