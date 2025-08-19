// project-preview.js: Show GitHub repo metadata in a sidebar/modal and open repo in popup

document.addEventListener('DOMContentLoaded', function () {
    // Sidebar/modal setup
    let sidebar = document.createElement('div');
    sidebar.id = 'project-preview-sidebar';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '0';
    sidebar.style.width = '420px';
    sidebar.style.height = '100vh';
    sidebar.style.background = '#232946';
    sidebar.style.color = '#e6e6e6';
    sidebar.style.borderLeft = '2px solid #ffb800';
    sidebar.style.zIndex = '9999';
    sidebar.style.display = 'none';
    sidebar.style.boxShadow = '-2px 0 8px rgba(0,0,0,0.2)';
    sidebar.innerHTML = '<button id="project-preview-close" style="position:absolute;top:10px;right:10px;z-index:10000;background:#ffb800;color:#232946;border:none;padding:0.5em 1em;border-radius:4px;">Close</button><div id="project-preview-content" style="padding:4em 1.5em 1.5em 1.5em;"></div>';
    document.body.appendChild(sidebar);

    document.getElementById('project-preview-close').onclick = function () {
        sidebar.style.display = 'none';
        document.getElementById('project-preview-content').innerHTML = '';
    };

    // Intercept clicks on project links
    document.body.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && e.target.classList.contains('project-link')) {
            e.preventDefault();
            const repoUrl = e.target.href;
            const match = repoUrl.match(/github.com\/(.+?)\/(.+?)(\/|$)/);
            if (!match) return window.open(repoUrl, '_blank');
            const owner = match[1];
            const repo = match[2];
            sidebar.style.display = 'block';
            document.getElementById('project-preview-content').innerHTML = '<div>Loading project info...</div>';
            fetch(`https://api.github.com/repos/${owner}/${repo}`)
                .then(r => r.json())
                .then(data => {
                    document.getElementById('project-preview-content').innerHTML = `
            <h2 style="color:#ffb800;">${data.full_name}</h2>
            <p>${data.description || ''}</p>
            <ul style="list-style:none;padding:0;">
              <li>🕒 Updated: ${new Date(data.updated_at).toLocaleDateString()}</li>
            </ul>
            <button id="open-github-repo" style="margin-top:1em;">View on GitHub</button>
          `;
                    document.getElementById('open-github-repo').onclick = function () {
                        window.open(repoUrl, '_blank');
                    };
                })
                .catch(() => {
                    document.getElementById('project-preview-content').innerHTML = '<div>Could not load project info. <a href="' + repoUrl + '" target="_blank">Open on GitHub</a></div>';
                });
        }
    });
});
