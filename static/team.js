function createMemberCard(member, isLeader = false) {
    const card = document.createElement('div');
    card.className = isLeader ? 'team-leader' : 'team-member';
    
    card.innerHTML = `
        <div class="portrait-wrapper">
            <img src="${member.image}" alt="Portrait of ${member.name}" class="team-portrait" onerror="this.src='https://api.dicebear.com/7.x/avataaars/svg?seed=${member.name.replace(/\s+/g, '')}'">
        </div>
        <div class="member-info">
            <h3 class="member-name">${member.name}</h3>
            <p class="member-title">${member.title}</p>
        </div>
    `;
    
    return card;
}

async function loadOrganizers() {
    try {
        const response = await fetch('assets/team.json');
        const teamMembers = await response.json();
        
        const organizersGrid = document.querySelector('.organizers-grid');
        
        organizersGrid.innerHTML = '';
        
        if (teamMembers.length > 0) {
            const leader = teamMembers[0];
            const leaderCard = createMemberCard(leader, true);
            organizersGrid.appendChild(leaderCard);
        }
        
        const remainingMembers = teamMembers.slice(1);
        remainingMembers.forEach(member => {
            const memberCard = createMemberCard(member, false);
            organizersGrid.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error loading organizers:', error);
        const organizersGrid = document.querySelector('.organizers-grid');
        organizersGrid.innerHTML = '<p>Unable to load organizers at this time.</p>';
    }
}

async function loadOnSiteStaff() {
    try {
        const response = await fetch('assets/staff.json');
        const staffMembers = await response.json();
        
        const staffGrid = document.querySelector('.staff-grid');
        
        staffGrid.innerHTML = '';
        
        staffMembers.forEach(staff => {
            const staffCard = createMemberCard(staff, false);
            staffGrid.appendChild(staffCard);
        });
    } catch (error) {
        console.error('Error loading on-site staff:', error);
        const staffGrid = document.querySelector('.staff-grid');
        staffGrid.innerHTML = '<p>Unable to load on-site staff at this time.</p>';
    }
}

function loadTeamMembers() {
    loadOrganizers();
    loadOnSiteStaff();
}

document.addEventListener('DOMContentLoaded', loadTeamMembers);
