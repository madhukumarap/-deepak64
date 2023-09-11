// Variables
const resultsContainer = document.getElementById('results');
const loader = document.getElementById('loader');
let page = 1; // Initialize the page number

// Function to highlight a plan based on the number of users
function highlightPlan(numUsers) {
  // Remove the 'highlighted' class from all plans
  const plans = document.querySelectorAll('.plan'); // Assuming your plans have a class "plan"
  plans.forEach(plan => {
    plan.classList.remove('highlighted');
  });

  // Determine which plan to highlight
  if (numUsers >= 0 && numUsers < 10) {
    document.getElementById('plan1').classList.add('highlighted');
  } else if (numUsers >= 10 && numUsers < 20) {
    document.getElementById('plan2').classList.add('highlighted');
  } // Add more conditions for other plans
}

// Event listener for Submit Button
document.getElementById('submit-button').addEventListener('click', function(event) {
  event.preventDefault(); // Prevent the form from submitting traditionally
  alert('You clicked the submit button!');
  
  // Get the form data
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const comments = document.getElementById('comments').value;

  // Create an object with the data
  const formData = {
    name,
    email,
    comments
  };

  // Send the data to the server using AJAX or other methods
  // Example using fetch:
  fetch(' VXMG3P0KYODH2FHNVCUXP58JQ', {
    method: 'POST',
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    // Handle the response from the server if needed
    if (data.success) {
      alert('Form submitted successfully');
      document.getElementById('name').value = '';
      document.getElementById('email').value = '';
      document.getElementById('comments').value = '';
    } else {
      alert('Form submission failed. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Function to fetch and append random data
function fetchRandomData() {
  // Display loading indicator
  loader.style.display = 'block';

  // Fetch random data from a publicly available API
  fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
    .then((response) => response.json())
    .then((data) => {
      // Hide loading indicator
      loader.style.display = 'none';

      // Append the new data to the results container
      data.forEach((item) => {
        const resultItem = document.createElement('div');
        resultItem.className = 'result-item';
        resultItem.textContent = item.title;
        resultsContainer.appendChild(resultItem);
      });

      // Increment the page number for the next load
      page++;
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
}

// Function to check if the user has scrolled to the end of the page
function isBottomOfPage() {
  return window.innerHeight + window.scrollY >= document.body.offsetHeight;
}

// Event listener to load more data when the user reaches the end
window.addEventListener('scroll', () => {
  if (isBottomOfPage()) {
    fetchRandomData();
  }
});

// Initial load of data
fetchRandomData();

// Example usage of highlightPlan with numUsers
const numUsers = 8; // Replace with the actual number of users
highlightPlan(numUsers);
