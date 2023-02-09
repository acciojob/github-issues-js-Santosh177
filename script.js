
//your code here
let nextButton = document.querySelector("#load_next");
let previousButton = document.querySelector("#load_prev");
let pageNumber = document.querySelector("#page-number");
let ol = document.querySelector("ol");

nextButton.addEventListener("click", handleClick);
previousButton.addEventListener("click", handleClick);

async function handleClick(event) {
  let action = event.target.innerText;
  let currentCount = Number(pageNumber.innerText);

  if (action == "Next Page") {
    // increment page
    pageNumber.innerText = currentCount + 1;
    const issues = await getGithubIssuesTitle(currentCount + 1);
    renderLists(issues);
  } else if (action == "Previous Page" && currentCount != 1) {
    // decrease page
    pageNumber.innerText = currentCount - 1;
    const issues = await getGithubIssuesTitle(currentCount - 1);
    renderLists(issues);
  }
}

function renderLists(issues) {
  ol.innerText = "";
  for (let issueName of issues) {
    let li = document.createElement("li");
    li.innerText = issueName;
    ol.append(li);
  }
}
async function getGithubIssuesTitle(pageNum = 1) {
  const response = await fetch(
    `https://api.github.com/repositories/1296269/issues?page=${pageNum}&per_page=5`
  );

  const result = await response.json();
  return result.map((obj) => obj.title);
}

// on page load
getGithubIssuesTitle().then((data) => renderLists(data));



// const pNoSpan = document.getElementById("pNo"),
//   listElement = document.getElementById("list"),
//   nextBtn = document.getElementById("load_next"),
//   prevBtn = document.getElementById("load_prev");

// let pageNumber = 1;

// const renderIssues = (issues) => {
//   while (listElement.firstChild) {
//     listElement.removeChild(listElement.firstChild);
//   }
//   issues.forEach((issue) => {
//     const li = document.createElement("li");
//     li.textContent = issue.title;
//     listElement.appendChild(li);
//   });
// };

// const fetchIssues = async () => {
//   pNoSpan.textContent = pageNumber;
//   const url = `https://api.github.com/repositories/1296269/issues?page=${pageNumber}&per_page=5`;
//   const res = await fetch(url);
//   const data = await res.json();

//   renderIssues(data);
// };

// const handleNextClick = () => {
//   pageNumber += 1;
//   fetchIssues();
// };

// const handlePrevClick = () => {
//   pageNumber -= 1;
//   fetchIssues();
// };

// document.addEventListener("DOMContentLoaded", fetchIssues);
// nextBtn.addEventListener("click", handleNextClick);
// prevBtn.addEventListener("click", handlePrevClick);
