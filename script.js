const myHeaders = new Headers();
myHeaders.append("X-API-KEY", "8e209116d7fa5bb02b1901c54640deb61c2b91b9");
myHeaders.append("Content-Type", "application/json");

const newsContainer = document.getElementById("news-container");
const trendingCont = document.getElementById("trending")

const CoronaBtn = document.getElementById("Corona")
const PoliticsBtn = document.getElementById("Politics")
const SportsBtn = document.getElementById("Sports")
const BusinessBtn = document.getElementById("Business")
const WorldBtn = document.getElementById("World")
const TravelBtn = document.getElementById("Travel")
const PodcastsBtn = document.getElementById("Podcasts")

const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")


localStorage.setItem("localQuery", "Politics")
localStorage.setItem("localPage", 1)

const featuredContainer = document.getElementById("featured-news");

async function fetchNews() { 
  const raw = JSON.stringify({
    "q": localStorage.getItem("localQuery"),
    "page": localStorage.getItem("localPage")
  });
  
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow"
  };

  try {
    const response = await fetch("https://google.serper.dev/news", requestOptions);
    const result = await response.json(); 

    console.log(result);
    
    if (result.news && result.news.length > 0) {
      
      let newsList = [...result.news];

      const randomIndex = Math.floor(Math.random() * newsList.length);
     
      const randomNewsItem = newsList[randomIndex];

      newsList.splice(randomIndex, 1);

      renderFeaturedNews(randomNewsItem);


      renderNews(newsList); 
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
      featuredContainer.innerHTML = ""; 
    }
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
  }
}


function renderFeaturedNews(item) {
    featuredContainer.innerHTML = "";

    const poster = item.imageUrl ? item.imageUrl : "https://via.placeholder.com/600x400?text=No+Image";
    
   
    const heroHTML = `
        <div class="hero-card">
            <a href="${item.link}" target="_blank" style="display:contents; color:inherit; text-decoration:none;">
                <div class="hero-image-container">
                    <img src="${poster}" alt="News Image">
                </div>
                <div class="hero-content">
                    <div class="hero-header">
                        <span class="trending-tag">Trending</span>
                        <div class="hero-icons">
                            <span>♡</span>
                            <span>↥</span>
                            <span>⚑</span>
                        </div>
                    </div>
                    <div class="hero-title">${item.title}</div>
                    <div class="hero-snippet">${item.snippet}</div>
                    <div class="hero-footer">
                        <span>${item.date}</span>
                        <span>|</span>
                        <span>By ${item.source}</span>
                    </div>
                </div>
            </a>
        </div>
    `;

    featuredContainer.innerHTML = heroHTML;
}
fetchNews();



function renderNews(newsArray){ 
 newsContainer.innerHTML = ""; 

 if (!Array.isArray(newsArray)) {
  console.error("Expected an array for news rendering.");
  return;
 }

 newsArray.forEach(newsItem => { 
  const poster = newsItem.imageUrl ? newsItem.imageUrl : "https://via.placeholder.com/430x210?text=No+Image";

  const newsCard = document.createElement("div");
  newsCard.classList.add("news-card");

  
  newsCard.innerHTML = `
  
   <a href="${newsItem.link}" target="_blank" rel="noopener noreferrer" style="text-decoration:none; color:inherit;">
    <img class="poster" src="${poster}" alt="no image">
    <div class="news-info">
     <div class="news-title">${newsItem.title}</div>
     <div class="news-snippet">${newsItem.snippet}</div>
     <div class="news-date">${newsItem.date} | ${newsItem.source}</div>
    </div>
   </a>
  `;
  
 
  newsContainer.appendChild(newsCard);  
 });
}

function trendingNew(newsArray){
     if (!Array.isArray(newsArray)) {
  console.error("Expected an array for news rendering.");
  return;
 }


}

nextBtn.addEventListener("click", ()=>{
    const currentPage = localStorage.getItem("localPage") + 1;
    localStorage.setItem("localPage", currentPage)
    fetchNews();
})
prevBtn.addEventListener("click", ()=>{
    let currentPage = parseInt(localStorage.getItem("localPage")) || 1
    if (currentPage > 1) {
        currentPage = currentPage - 1;
        localStorage.setItem("localPage", currentPage);
        fetchNews();
    } else {
        console.log("Уже на первой странице.");
    }
})


CoronaBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Corona");
  fetchNews();
});

PoliticsBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Politics");
  fetchNews();
});

SportsBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Sports");
  fetchNews();
});

BusinessBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Business");
  fetchNews();
});

WorldBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "World");
  fetchNews();
});

TravelBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Travel");
  fetchNews();
});

PodcastsBtn.addEventListener("click", () => {
  localStorage.setItem("localQuery", "Podcasts");
  fetchNews();
});



