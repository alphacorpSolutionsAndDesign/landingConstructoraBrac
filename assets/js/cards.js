document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll("#leadershipCards .card");
    const allCardsButton = document.getElementById("allCards");

    allCardsButton.addEventListener('click', () => {
        cards.forEach(card => {
            card.classList.remove('hidden');
            allCardsButton.classList.add('hidden');
        });
    });
});