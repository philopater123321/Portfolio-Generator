const nameInput = document.getElementById('name-input');
const roleInput = document.getElementById('input-role');
const bioInput = document.getElementById('input-bio');
const githubInput = document.getElementById('input-github');

const previewName = document.querySelector('.card-header h1');
const previewRole = document.querySelector('.card-header h3');
const previewBio = document.getElementById('preview-bio');
const previewGithubText = document.getElementById('github-text');
const previewGithubLink = document.getElementById('preview-github');

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