const GITHUB_USERNAME = 'AyeongKwon';

async function fetchProfile() {
    const container = document.getElementById('github-profile-container');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();

        container.innerHTML = `
            <div class="github-profile">
                <img src="${data.avatar_url}" alt="${data.name}'s avatar">
                <div class="github-profile-info">
                    <h3>${data.name || data.login}</h3>
                    <p class="bio">${data.bio || 'No bio available.'}</p>
                    <div class="github-stats">
                        <div class="stat-item">
                            <span class="stat-number">${data.public_repos}</span>
                            <span class="stat-label">Repos</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${data.followers}</span>
                            <span class="stat-label">Followers</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">${data.following}</span>
                            <span class="stat-label">Following</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

    } catch (error) {
        container.innerHTML = `<p class="github-error">⚠️ Could not load profile: ${error.message}</p>`;
    }
}

async function fetchRepos() {
    const container = document.getElementById('github-repos-container');

    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`);

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const repos = await response.json();

        const cards = repos.map(repo => `
            <div class="repo-card">
                <h4><a href="${repo.html_url}" target="_blank">📁 ${repo.name}</a></h4>
                <p>${repo.description || 'No description provided.'}</p>
                <div class="repo-meta">
                    ${repo.language ? `<span>🔵 ${repo.language}</span>` : ''}
                    <span>⭐ ${repo.stargazers_count}</span>
                    <span>🍴 ${repo.forks_count}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = `<div class="repo-grid">${cards}</div>`;

    } catch (error) {
        container.innerHTML = `<p class="github-error">⚠️ Could not load repositories: ${error.message}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchProfile();
    fetchRepos();
});