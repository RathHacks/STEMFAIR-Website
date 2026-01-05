async function loadTeamMembers() {
    try {
        const response = await fetch('assets/team.json');
        const teamMembers = await response.json();
        
        const teamGrid = document.querySelector('.team-grid');
        
        teamGrid.innerHTML = '';
        
        if (teamMembers.length > 0) {
            const leader = teamMembers[0];
            const leaderCard = document.createElement('div');
            leaderCard.className = 'team-leader';
            
            leaderCard.innerHTML = `
                <div class="portrait-wrapper">
                    <img src="${leader.image}" alt="Portrait of ${leader.name}" class="team-portrait">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${leader.name}</h3>
                    <p class="member-title">${leader.title}</p>
                </div>
            `;
            
            teamGrid.appendChild(leaderCard);
        }
        
        const remainingMembers = teamMembers.slice(1);
        remainingMembers.forEach(member => {
            const memberCard = document.createElement('div');
            memberCard.className = 'team-member';
            
            memberCard.innerHTML = `
                <div class="portrait-wrapper">
                    <img src="${member.image}" alt="Portrait of ${member.name}" class="team-portrait">
                </div>
                <div class="member-info">
                    <h3 class="member-name">${member.name}</h3>
                    <p class="member-title">${member.title}</p>
                </div>
            `;
            
            teamGrid.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error loading team members:', error);
        const teamGrid = document.querySelector('.team-grid');
        teamGrid.innerHTML = '<p>Unable to load team members at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadTeamMembers);
