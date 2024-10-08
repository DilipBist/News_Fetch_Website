const menuBar = document.querySelector('.menu_bar i');
const navLinks = document.querySelector('.nav_links');

// toggle menu bar 
menuBar.addEventListener('click', () => {
    navLinks.classList.toggle('hidden');
    // console.log("Btn clicked");
})

const API_KEY = "c1a5c8f3110b40df8dbad7c34e6ecdb1";
const url = "https://newsapi.org/v2/everything?q=";
const heading = document.querySelector('#heading');
const newsContainer = document.querySelector('#news_container');

window.addEventListener('load', () => fetchNews('latest nepal'));



const fetchNews = async (query) => {

    heading.innerHTML = `<p class="text-4xl text-center font-bold py-5 capitalize">fetching data...</p>`;
    
    try {
        const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        console.log(data)
        heading.innerHTML = "";
        
        if (!data.articles || data.articles.length === 0) {
            newsContainer.innerHTML = `<p class="text-4xl text-center font-bold py-5 capitalize">No news found</p>`;
            return;
        }
        newsContainer.innerHTML = '';

        data.articles.forEach(article => {
            // console.log(article.author);

            const dateString = article.publishedAt; // ISO format
            const date = new Date(dateString); // Create a Date object from the string

            // Format the date to a more readable format
            const formattedDate = date.toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true, // Use 12-hour format
            });


            newsContainer.innerHTML += `
            <div class="news_card border cursor-pointer hover:bg-red-400 shadow-2xl rounded overflow-hidden h-auto ">
                <div>
                   <img 
                     src="${article.urlToImage}" 
                     alt="" 
                     class="w-full object-cover aspect-[3/2] rounded" 
                     onerror="this.onerror=null;this.src='https://media.moddb.com/images/downloads/1/241/240998/2048px-No_image_available.svg1.png'"
                    >
                    
                </div>
                <div class="p-3">
                    <h1 class="text-xl font-bold capitalize py-2">${article.title}</h1>
                    <h3 class="font-medium py-2">${formattedDate}</h3>
                    <p>${article.description}</p>
                </div>
            </div>
            `

            // const newsCard = document.querySelectorAll('.news_card');
            // newsCard.addEventListener('click', () => {
            //     window.open(article.url, "_blank")
            // })
            const newsCards = document.querySelectorAll('.news_card');
            newsCards.forEach((card, index) => {
                card.addEventListener('click', () => {
                    window.open(data.articles[index].url, "_blank");
                });
            });

        });
    }
    catch (error) {
        heading.innerHTML = `  <div class="flex gap-10 items-center justify-center my-5 ">
        <p class="text-5xl font-bold text-center capitalize py-5">error fetching data...</p>
        <img src="https://static.vecteezy.com/system/resources/thumbnails/021/975/488/small/search-not-found-3d-render-icon-illustration-with-transparent-background-empty-state-png.png" class="aspect-[3/2] object-contain">
    </div>
        `;
        console.log(error);
    }
}

function navItemSearch (id) {
    console.log(id); 
    fetchNews(id);
    document.querySelectorAll('.nav_link').forEach(link =>{
        link.classList.remove('active');
    })
    let classAdd = document.getElementById(id);
        classAdd.classList.add('active');

}



// input search 
const searchInput = document.querySelector('#search_input');
const searchButton = document.querySelector('#search_btn');
searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim(); // Ensure the search value is up-to-date
    fetchNews(searchValue);
    console.log(searchValue);
});

// Add 'Enter' key functionality
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const searchValue = searchInput.value.trim();
        fetchNews(searchValue);
    }
});
