const nameInput = document.getElementById('name-input');
const roleInput = document.getElementById('input-role');
const bioInput = document.getElementById('input-bio');
const githubInput = document.getElementById('input-github');

const previewName = document.querySelector('.card-header h1');
const previewRole = document.querySelector('.card-header h3');
const previewBio = document.getElementById('preview-bio');
const previewGithubText = document.getElementById('github-text');
const previewGithubLink = document.getElementById('preview-github');

const headerUsername = document.getElementById('username');

const skillsInput = document.getElementById('input-skills');
const addSkillBtn = document.getElementById('add-skill-btn');
const builderSkillsList = document.getElementById('builder-skills');
const previewSkillsList = document.getElementById('preview-skills');

const themeSelect = document.getElementById('theme-select');

const createNewBtn = document.getElementById('create-new');
const form = document.getElementById('build-form');

function updatePreview() {
    const currentName = nameInput.value || 'Your Name';
    previewName.textContent = nameInput.value || 'Your Name' ;
    headerUsername.textContent = currentName;

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

function buildSkills() {
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

buildSkills();

function addSkill() {
    const newSkill = skillsInput.value.trim();
    if (newSkill !== '') {
        skillsArray.push(newSkill);
        skillsInput.value = '';
        buildSkills();
    }
}
addSkillBtn.addEventListener('click', addSkill);

skillsInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        e.preventDefault();
        addSkill()
    }
});

builderSkillsList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-skill')) {
        const index = e.target.getAttribute('data-index');
        skillsArray.splice(index, 1);
        buildSkills();
        saveData();
    }
});

function applyTheme(themeName){
    if (themeName === 'Light'){
        document.body.classList.add('light-mode');
    } else{
        document.body.classList.remove('light-mode');
    }
}

themeSelect.addEventListener('change', (e) => {
    applyTheme(e.target.value);
    saveData();
}
);

createNewBtn.addEventListener('click', () => {
    if(confirm("Are you sure you want to clear everything?")){
        form.reset();
        skillsArray = ['HTML', 'CSS', 'JavaScript'];
        themeSelect.value = 'Dark';
        applyTheme('Dark');
        updatePreview();
        buildSkills();
        localStorage.removeItem('myPortfolioData');
    }
});



function saveData() {
    const dataToSave ={
        name: nameInput.value,
        role: roleInput.value,
        bio: bioInput.value,
        github: githubInput.value,
        skills: skillsArray,
        theme: themeSelect.value
    };
    localStorage.setItem('myPortfolioData', JSON.stringify(dataToSave));
}

function loadData() {
    const saved = localStorage.getItem('myPortfolioData');
    if (saved) {
        const parsed = JSON.parse(saved);
        nameInput.value = parsed.name || '';
        roleInput.value = parsed.role || '';
        bioInput.value = parsed.bio || '';
        githubInput.value = parsed.github || '';
        skillsArray = parsed.skills || ['HTML', 'CSS', 'JavaScript'];
        themeSelect.value = parsed.theme || 'Dark';

        updatePreview();
        buildSkills();
        applyTheme(themeSelect.value);
    }
}

document.getElementById('build-form').addEventListener('input', saveData);
document.getElementById('build-form').addEventListener('click', () => setTimeout(saveData, 50));

loadData();