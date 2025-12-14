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


localStorage.setItem("localQuery", "Politics")

async function fetchNews() { 
  const raw = JSON.stringify({
    "q": localStorage.getItem("localQuery")
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
    
    if (result.news) {
      renderNews(result.news); 
    } else {
      newsContainer.innerHTML = "<p>No news articles found.</p>";
    }
  } catch (error) {
    console.error(error);
    newsContainer.innerHTML = `<p>Error fetching news: ${error.message}</p>`;
  }
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



