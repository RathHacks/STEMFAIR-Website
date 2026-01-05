async function loadSpecialThanks() {
    try {
        const response = await fetch('thanks.json');
        const thanksMembers = await response.json();
        
        const thanksGrid = document.querySelector('.thanks-grid');
        
        thanksGrid.innerHTML = '';
        
        thanksMembers.forEach(member => {
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
            
            thanksGrid.appendChild(memberCard);
        });
    } catch (error) {
        console.error('Error loading special thanks:', error);
        const thanksGrid = document.querySelector('.thanks-grid');
        thanksGrid.innerHTML = '<p>Unable to load special thanks at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadSpecialThanks);
