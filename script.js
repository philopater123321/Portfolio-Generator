const nameInput = document.getElementById('name-input');
const roleInput = document.getElementById('input-role');
const bioInput = document.getElementById('input-bio');
const githubInput = document.getElementById('input-github');

const previewName = document.querySelector('.card-header h1');
const previewRole = document.querySelector('.card-header h3');
const previewBio = document.getElementById('preview-bio');
const previewGithubText = document.getElementById('github-text');
const previewGithubLink = document.getElementById('preview-github');

const skillsInput = document.getElementById('input-skills');
const addSkillBtn = document.getElementById('add-skill-btn');
const builderSkillsList = document.getElementById('builder-skills');
const previewSkillsList = document.getElementById('preview-skills');


function updatePreview() {
    previewName.textContent = nameInput.value || 'Your Name' ;
    previewRole.textContent = roleInput.value || 'Your Role / Title';
    previewBio.textContent = bioInput.value || 'Your Bio will appear here...';

    const url = githubInput.value;
    const username = url.split('github.com/').pop().replace('/', '');
    previewGithubText.textContent = username || 'Github Profile';
    previewGithubLink.href = url || '#';
}

[nameInput, roleInput, bioInput, githubInput].forEach(input => {
    input.addEventListener('input', updatePreview)
}
);

updatePreview()

let skillsArray = ['HTML', 'CSS', 'JavaScript'];

function addSkills() {
    builderSkillsList.innerHTML = '';
    previewSkillsList.innerHTML = '';

    skillsArray.forEach((skill, index) => {
        const builderLi = document.createElement('li');
        builderLi.innerHTML = `${skill} <span class="delete-skill" style="cursor: pointer; color: cyan; margin-left: 8px; font-size: 20px;" data-index="${index}">x</span>`;
        builderLi.style.cssText = "background:rgb(20, 77, 104); padding: 6px 12px; border-radius: 15px; border: 1px solid rgb(68, 157, 160); display: flex; align-items: center;";
        builderSkillsList.appendChild(builderLi);

        const previewLi = document.createElement('li');
        previewLi.textContent = skill;
        previewSkillsList.appendChild(previewLi);
    });
}

addSkills();