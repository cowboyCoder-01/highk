const trails = [
    {
        id: 1,
        name: "West Gate Park",
        image: "https://lh3.googleusercontent.com/p/AF1QipMADSjsTE_MgOb0jdUaj1Q00lkjVZ7IMaX1U9Zz=s1360-w1360-h1020",
        chatRoomId: "West Gate Park",
        description: "Located: 1045 Dreher Ave, Stroudsburg, PA 18360",
        phonenumber: "(570) 435-2542"
    },
    {
        id: 2,
        name: "Glen Run",
        image: "https://lh3.googleusercontent.com/p/AF1QipMb1ptKNQoLE5iqi9ckGOfA5gb9u92LBK3ZPoU6=s1360-w1360-h1020",
        chatRoomId: "Glen Run",
        description: "Located: 740 Bangor Mountain Rd, Stroudsburg, PA 18360",
        phonenumber: "(570) 226-1112"
    },
    {
        id: 3,
        name: "Kovarick Park Lands",
        image: "https://lh3.googleusercontent.com/p/AF1QipPm2AzApc54H8ECMjCOsUjjh--8R-MtMzm112qx=s1360-w1360-h1020",
        chatRoomId: "Kovarick Park Lands",
        description: "Located: 138 McMichael Dr, Stroudsburg, PA 18360 ",
        phonenumber: "(570) 567-1432"
    },
    {
        id: 4,
        name: "Ann Street Park",
        image: "https://lh3.googleusercontent.com/p/AF1QipNB-bvE7QFHAJ6bNtDraL07g7Expt1vAttuHR_h=s1360-w1360-h1020",
        chatRoomId: "Ann Street Park",
        description: "Located: Ann St, Stroudsburg, PA 18360 ",
        phonenumber: "(570) 426-1512"
    }
];

let currentIndex = 0;

function createTrailList() {
    const trailList = document.getElementById('trailList');
    if (!trailList) {
        console.error('Element with id "trailList" not found.');
        return;
    }
    trailList.innerHTML = '';

    trails.slice(currentIndex, currentIndex + 2).forEach(trail => {
        if (!trail.id || !trail.name || !trail.image || !trail.description || !trail.phonenumber) {
            console.error('Missing trail property:', trail);
            return;
        }

        const trailDiv = document.createElement('div');
        trailDiv.classList.add('trail');

        trailDiv.innerHTML = `
            <h2>${trail.name}</h2>
            <img src="${trail.image}" alt="${trail.name}">
            <h3>${trail.description}</h3>
            <h3>${trail.phonenumber}</h3>
            <div class="star-rating" data-trail-id="${trail.id}">
                <span class="star" data-value="1">&#9733;</span>
                <span class="star" data-value="2">&#9733;</span>
                <span class="star" data-value="3">&#9733;</span>
                <span class="star" data-value="4">&#9733;</span>
                <span class="star" data-value="5">&#9733;</span>
            </div>
        `;

        // Add click event listener to open the corresponding chat room
        trailDiv.addEventListener('click', () => openChatRoom(trail.chatRoomId));
        trailList.appendChild(trailDiv);
    });

    // Attach event listeners to stars to handle ratings
    document.querySelectorAll('.star-rating .star').forEach(star => {
        star.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents click from propagating to trailDiv
            const trailId = event.target.parentElement.getAttribute('data-trail-id');
            const starValue = parseInt(event.target.getAttribute('data-value'), 10);
            handleRating(trailId, starValue);
        });
    });

    updateButtons();
}

function handleRating(trailId, starValue) {
    const ratingContainer = document.querySelector(`.star-rating[data-trail-id="${trailId}"]`);
    if (ratingContainer) {
        const stars = ratingContainer.querySelectorAll('.star');
        stars.forEach(star => {
            const value = parseInt(star.getAttribute('data-value'), 10);
            star.classList.toggle('selected', value <= starValue);
        });
        console.log(`Trail ${trailId} rated with ${starValue} stars`);
    }
}

function openChatRoom(chatRoomId) {
    window.location.href = `chatroom?room=${encodeURIComponent(chatRoomId)}`;
}

function updateButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex + 2 >= trails.length;
}

document.addEventListener('DOMContentLoaded', () => {
    createTrailList();

    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex -= 2;
                createTrailList();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex + 2 < trails.length) {
                currentIndex += 2;
                createTrailList();
            }
        });
    }
});

function logout() {
    sessionStorage.clear();
    window.location.href = '/index';
}
