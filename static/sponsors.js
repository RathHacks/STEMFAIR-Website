async function loadSponsors() {
    try {
        const response = await fetch('assets/sponsors.json');
        const sponsors = await response.json();
        
        const sponsorsContainer = document.querySelector('.sponsors-container');
        const benefactorSection = document.querySelector('.benefactor-showcase');
        const sponsorGrid = document.querySelector('.sponsor-cards-grid');
        
        benefactorSection.innerHTML = '';
        sponsorGrid.innerHTML = '';
        
        const benefactor = sponsors.find(s => s.tier === 'benefactor');
        const otherSponsors = sponsors.filter(s => s.tier !== 'benefactor');
        
        if (benefactor) {
            const benefactorCard = document.createElement('div');
            benefactorCard.className = 'benefactor-card';
            
            benefactorCard.innerHTML = `
                <div class="benefactor-badge">
                    <span class="badge-icon">⭐</span>
                    <span class="badge-text">Primary Benefactor</span>
                </div>
                <div class="benefactor-content">
                    <div class="benefactor-logo-wrapper">
                        <img src="${benefactor.logo}" alt="${benefactor.name} logo" class="benefactor-logo" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'logo-fallback\\'>${benefactor.name.charAt(0)}</div>';">
                    </div>
                    <h3 class="benefactor-name">${benefactor.name}</h3>
                    <p class="benefactor-description">${benefactor.description}</p>
                    <a href="${benefactor.website}" target="_blank" rel="noopener noreferrer" class="benefactor-link">Visit Website →</a>
                </div>
            `;
            
            benefactorSection.appendChild(benefactorCard);
        }
        
        otherSponsors.forEach(sponsor => {
            const sponsorCard = document.createElement('div');
            sponsorCard.className = `sponsor-card sponsor-${sponsor.tier}`;
            
            sponsorCard.innerHTML = `
                <div class="sponsor-tier-badge ${sponsor.tier}">${sponsor.tier}</div>
                <div class="sponsor-logo-wrapper">
                    <img src="${sponsor.logo}" alt="${sponsor.name} logo" class="sponsor-logo" onerror="this.style.display='none'; this.parentElement.innerHTML='<div class=\\'logo-fallback\\'>${sponsor.name.charAt(0)}</div>';">
                </div>
                <h4 class="sponsor-name">${sponsor.name}</h4>
                <p class="sponsor-description">${sponsor.description}</p>
                ${sponsor.website !== '#' ? `<a href="${sponsor.website}" target="_blank" rel="noopener noreferrer" class="sponsor-link">Learn More</a>` : ''}
            `;
            
            sponsorGrid.appendChild(sponsorCard);
        });
        
    } catch (error) {
        console.error('Error loading sponsors:', error);
        const sponsorsContainer = document.querySelector('.sponsors-container');
        sponsorsContainer.innerHTML = '<p>Unable to load sponsors at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadSponsors);
