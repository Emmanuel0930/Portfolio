const skillsLink = document.createElement('link');

skillsLink.rel = 'stylesheet';
skillsLink.href = 'skills/skills.css';

document.head.appendChild(skillsLink);

fetch('skills/skills.html')
    .then(response => response.text())
    .then(data => {

        document.getElementById('skills-container').innerHTML = data;

        startSkills();

    });

async function startSkills() {

    await loadSkills(
        'skills/technical-skills.json',
        'technicalSkills'
    );

    await loadSkills(
        'skills/other-skills.json',
        'otherSkills'
    );
}

async function loadSkills(jsonPath, containerId) {

    const container =
        document.getElementById(containerId);

    const response =
        await fetch(jsonPath);

    const skills =
        await response.json();

    skills.forEach(skill => {

        const card = document.createElement('div');

        card.className = 'skill-card';

        const scale = skill.scale || 0.7;

        card.innerHTML = `
            <div class="skill-image">
                <img
                    src="${skill.image}"
                    alt="${skill.name}"
                    style="transform: scale(${scale});"
                >
            </div>

            <span class="skill-name">
                ${skill.name}
            </span>
        `;

        container.appendChild(card);

    });
}