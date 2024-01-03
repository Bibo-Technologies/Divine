import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-storage.js";
import { getDatabase, ref, remove, push, get, update, onValue, child, set } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";
import { getAuth, onAuthStateChanged,sendPasswordResetEmail,sendEmailVerification ,createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-auth.js";
        const firebaseConfig = {
              apiKey: "AIzaSyAisBpwnYt14S4NiLbcOiAhdINsqwSYJiI",
  authDomain: "aleveltv-75194.firebaseapp.com",
  databaseURL: "https://aleveltv-75194-default-rtdb.firebaseio.com",
  projectId: "aleveltv-75194",
  storageBucket: "aleveltv-75194.appspot.com",
  messagingSenderId: "440342498130",
  appId: "1:440342498130:web:20e2eb670b1cb2c39cc88b",
  measurementId: "G-VTR1KGT4CW"
            };

          
  // ... Your existing Firebase imports ...
  const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    const auth = getAuth(app);



    document.addEventListener('DOMContentLoaded', function () {
  // Check if the welcome popup has been shown
  const hasShownPopup = localStorage.getItem('hasShownPopup');

  if (!hasShownPopup) {
    // Show the welcome popup
    const overlay = document.getElementById('overlay');
    const welcomePopup = document.getElementById('welcomePopup');
    overlay.style.display = 'block';
    welcomePopup.style.display = 'block';

    // Fade in the welcome popup
    setTimeout(() => {
      welcomePopup.classList.remove('fade-in');
    }, 1000); // Wait for 1 second (adjust as needed)

    // Set the flag to indicate that the popup has been shown
    localStorage.setItem('hasShownPopup', true);
  }
});

function closeWelcomePopup() {
  const overlay = document.getElementById('overlay');
  const welcomePopup = document.getElementById('welcomePopup');

  // Hide the overlay and the welcome popup after a delay
  setTimeout(() => {
    overlay.style.display = 'none';
    welcomePopup.style.display = 'none';
  }, 1000); // Wait for 1 second (adjust as needed)
}

document.getElementById('subscribeButton').addEventListener('click', subscribeToFirebase);
document.getElementById('closeButton').addEventListener('click', closeWelcomePopup);

function subscribeToFirebase() {
  var email = document.getElementById('email').value;

  // Show spinner and update button text
  document.getElementById('subscribeButton').style.display = 'none';
  document.getElementById('spinner').style.display = 'inline-block';

  // Push the email to Firebase Realtime Database
  const emailsRef = ref(database, 'subscribedEmails');
  push(emailsRef, email)
    .then(() => {
      // Hide spinner and show thank you message
      document.getElementById('spinner').style.display = 'none';
      document.getElementById('thankYouMessage').style.display = 'block';

      // Replace the existing content with the success message
      replaceContentWithSuccessMessage();

      // Close the welcome popup after 1 second
      setTimeout(() => {
        closeWelcomePopup();
      }, 1000);
    })
    .catch(error => {
      console.error('Error submitting email to Firebase:', error);

      // Hide spinner and show an error message (if needed)
      document.getElementById('spinner').style.display = 'none';
      alert('There was an error subscribing. Please try again.');
    });
}

function replaceContentWithSuccessMessage() {
  // Replace the content inside the subscriptionContent div with the success message
  document.getElementById('subscriptionContent').innerHTML = '';
}



// Function to create the cart dynamically
function createCart() {
  // Create the main cart div
  const cartDiv = document.createElement("div");
  cartDiv.id = "cart";
  cartDiv.classList.add("cart");

  // Create the cart count span
  const cartCountSpan = document.createElement("span");
  cartCountSpan.id = "cart-count";

  // Create the cart buttons div
  const cartButtonsDiv = document.createElement("div");
  cartButtonsDiv.id = "cart-buttons";

  // Create the open cart button
  const openCartBtn = document.createElement("button");
  openCartBtn.id = "open-cart-btn";
  openCartBtn.innerHTML = '<i class="fa fa-shopping-cart"></i>';

  // Create the close cart button
  const closeCartBtn = document.createElement("button");
  closeCartBtn.id = "close-cart-btn";
  closeCartBtn.innerHTML = '<i class="fa fa-times"></i>';

  // Append buttons to the cart buttons div
  cartButtonsDiv.appendChild(openCartBtn);
  cartButtonsDiv.appendChild(closeCartBtn);

  // Create the cart content div
  const cartContentDiv = document.createElement("div");
  cartContentDiv.id = "cart-content";

  // Create the cart items div
  const cartItemsDiv = document.createElement("div");
  cartItemsDiv.id = "cart-items";

 // Create the total price paragraph
const totalPriceParagraph = document.createElement("p");
totalPriceParagraph.id = "total-price";

// Create the checkout button
const checkoutBtn = document.createElement("button");
checkoutBtn.id = "checkout-btn";
checkoutBtn.innerHTML = '<i class="fa fa-arrow-right"></i> Checkout';

// Create a div to contain the button and total
const buttonAndTotalContainer = document.createElement("div");
buttonAndTotalContainer.classList.add("button-and-total-container");

// Append items to the cart content div
cartContentDiv.appendChild(cartItemsDiv);
cartContentDiv.appendChild(buttonAndTotalContainer);

// Append the total price and checkout button to the container
buttonAndTotalContainer.appendChild(totalPriceParagraph);
buttonAndTotalContainer.appendChild(checkoutBtn);


  // Append elements to the main cart div
  cartDiv.appendChild(cartCountSpan);
  cartDiv.appendChild(cartButtonsDiv);
  cartDiv.appendChild(cartContentDiv);

  // Append the cart to the cart container
  const cartContainer = document.getElementById("cart-container");
  cartContainer.appendChild(cartDiv);

  // Check if cart is empty and hide it initially
  if (isCartEmpty()) {
    cartDiv.style.display = "none";
  }
}

// Function to check if the cart is empty
function isCartEmpty() {
  const cartItems = document.getElementById("cart-items");
  return cartItems.children.length === 0;
}

document.addEventListener("DOMContentLoaded", () => {
    // The page has fully loaded, now you can safely create the cart
    createCart();

 // Show/hide the cart based on scroll position
 window.addEventListener("scroll", () => {
  const cart = document.getElementById("cart");
  const distanceFromTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollThreshold = 200; // Set the scroll height to trigger the cart display

  if (distanceFromTop > scrollThreshold) {
    cart.style.display = "block";
  } else {
    cart.style.display = "none";
  }
});















    // Declare userData variable in a higher scope
    let userData = {};

  // Function to show the popup with user details
async function showPopupWithUserDetails() {
    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        console.log('User not authenticated');

        // Display a message and fade it in with an overlay
        const messageContainer = document.getElementById('messageContainer');
        const messageContent = document.getElementById('messageContent');
const overlay2 = document.getElementById('overlay')
        // Set the message content HTML, including the company logo and login button
        messageContent.innerHTML = `
            <div id="companyLogo" class="company-logo">
                <img src="img/Devine Phones.png" alt="Company Logo">
            </div>
            <p>You are not signed in. Please sign in to access your account.</p>
            <button id="loginButton" class="login-button">
                <i class="fa fa-sign-in"></i> Login
            </button>
        `;

        // Add the "fade-in" class to apply the fade-in animation
        messageContainer.classList.add('fade-in');
        messageContainer.style.display = 'flex'; // Make the message container visible
overlay2.style.display = 'block'
        // Add a click event listener to the login button
        const loginButton = document.getElementById('loginButton');
        loginButton.addEventListener('click', function() {
            window.location.href = 'login.html'; // Adjust the login page URL
        });

        return;
    }



   
    // Display an overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';

    // Retrieve user details from local storage
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));

    // Display user details in the popup with lazy load effect
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
    popup.classList.add('fade-in');

    const userDetailsElement = document.getElementById('userDetails');
    userDetailsElement.innerHTML = `
        <div class="user-info">
          <p class="accountt"> Account Details </p>
            <p>Email: ${userDetails.email}</p>
        </div>
    `;

    // Fetch additional details from Firebase using the user's UID
    const userId = userDetails.uid;
    const userRef = ref(database, 'users/' + userId);

    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            const userData = snapshot.val();
            userDetailsElement.innerHTML += `
            <table class="additional-info-table">
  <tr>
    <th>First Name</th>
    <td>${userData.firstName || 'N/A'}</td>
  </tr>
  <tr>
    <th>Last Name</th>
    <td>${userData.lastName || 'N/A'}</td>
  </tr>
  <tr>
    <th>Telephone</th>
    <td>${userData.telephone || 'N/A'}</td>
  </tr>
  <tr>
    <th>Date of Birth</th>
    <td>${userData.dob || 'N/A'}</td>
  </tr>
</table>

            `;

            // Display profile picture if available or show a default profile icon
            const profilePictureElement = document.getElementById('profilePicture');
            if (user.photoURL) {
                profilePictureElement.src = user.photoURL;
                profilePictureElement.style.display = 'block';
            } else {
                // Show a default profile icon
                profilePictureElement.src = 'img/profile.png'; // Replace with your default icon path
                profilePictureElement.style.display = 'block';
            }

        } else {
            userDetailsElement.innerHTML += `<p>No user details found.</p>`;
        }
    } catch (error) {
        console.error('Error fetching user details from Firebase:', error.message);
    }

// Show the popup
document.getElementById("popup").style.display = "block";
document.body.classList.add("no-scroll"); // Disable scrolling
    }

    // Use onAuthStateChanged to check when the authentication state changes
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // User is signed in
            // You can now call showPopupWithUserDetails here or wherever appropriate
        } else {
            // User is signed out
            console.log('User signed out');
        }
    });

    // Function to close the popup
    function closePopup() {
        document.getElementById("popup").style.display = "none";
        
    }


// Event listener for the "Logout" button
document.getElementById("logoutBtn").addEventListener("click", function () {
    // Display confirmation popup
    showLogoutConfirmationPopup();
});

// Function to show the logout confirmation popup
function showLogoutConfirmationPopup() {
    const confirmationPopup = document.getElementById('confirmationPopup');
    const overlay = document.getElementById('overlay3');

    // Display the confirmation popup
    confirmationPopup.style.display = 'block';
    overlay.style.display = 'block';

    // Add event listeners to "Yes" and "No" buttons
    const yesButton = document.getElementById('confirmYesBtn');
    const noButton = document.getElementById('confirmNoBtn');

    yesButton.addEventListener('click', handleLogoutConfirmation);
    noButton.addEventListener('click', closeLogoutConfirmationPopup);
}

function handleLogoutConfirmation() {
    const overlay2 = document.getElementById('overlay2');
    // Perform logout actions here (e.g., using Firebase Auth)
    auth.signOut()
        .then(() => {
            showLoggedOutMessage();
            closePopup();
            closeLogoutConfirmationPopup();
            location.reload();  // Corrected: invoke the function
        })
        .catch((error) => {
            console.error("Error logging out:", error.message);
        });
}


// Function to close the logout confirmation popup
function closeLogoutConfirmationPopup() {
    const confirmationPopup = document.getElementById('confirmationPopup');
    const overlay = document.getElementById('overlay3');

    // Close the confirmation popup
    confirmationPopup.style.display = 'none';
    overlay.style.display = 'none';

    // Remove event listeners to prevent memory leaks
    const yesButton = document.getElementById('confirmYesBtn');
    const noButton = document.getElementById('confirmNoBtn');

    yesButton.removeEventListener('click', handleLogoutConfirmation);
    noButton.removeEventListener('click', closeLogoutConfirmationPopup);
}

// ...


// Function to show the "Added to Cart" message
function showLoggedOutMessage() {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `User Logged out!`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

// Event listener for the "Account" link
document.getElementById("accountLink").addEventListener("click", async function(event) {
    event.preventDefault();
    await showPopupWithUserDetails();
});

// Event listener for the close button using id
document.getElementById("closePopupBtn").addEventListener("click", function() {
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
    
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
    popup.classList.remove('fade-in');
    document.body.classList.remove("no-scroll"); // Enable scrolling
});

// Get the checkout button element
const checkoutBtn = document.getElementById("checkout-btn");

// Add event listener to the checkout button
checkoutBtn.addEventListener("click", () => {
  // Collect cart items and their details
  const cartItems = document.getElementsByClassName("cart-item");
  const orderSummary = [];

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const productName = cartItem.querySelector(".product-details h5").innerText;
       const price = parseFloat(cartItem.querySelector(".product-details h4").dataset.price);
    const quantity = parseInt(cartItem.querySelector(".product-details input").value);
    const total = parseFloat(cartItem.querySelector(".product-details h4").dataset.total);
    orderSummary.push({ productName, price, quantity, total });
  }

  // Get the cart total
  const cartTotal = parseFloat(document.getElementById("total-price").innerText.replace("TOTAL: UGX ", ""));

// Create the popup with the order summary and customer details
const popupContent = document.createElement("div");
popupContent.classList.add("popup-content");


// Add the title to the popup
const title = document.createElement("h4");
title.innerText = "Order Summary";
popupContent.appendChild(title);
// ...

// Add the order summary to the popup
const orderTable = document.createElement("table");
orderTable.classList.add("order-table");

// Create table header
const tableHeader = document.createElement("tr");
tableHeader.innerHTML = `
  <th>Product</th>
  <th>Price</th>
  <th>Qty</th>
  <th>Total</th>
`;
orderTable.appendChild(tableHeader);

// Iterate over the order summary and create table rows
for (let i = 0; i < orderSummary.length; i++) {
  const { productName, price, quantity, total } = orderSummary[i];
  const tableRow = document.createElement("tr");
  tableRow.innerHTML = `
    <td>${productName}</td>
    <td>UGX ${price}</td>
    <td>${quantity}</td>
    <td>UGX ${total.toFixed(2)}</td>
  `;
  orderTable.appendChild(tableRow);
}

// Append the table to the popup content
popupContent.appendChild(orderTable);

// ...


// Add the cart total to the popup
const totalElement = document.createElement("h4");
totalElement.innerText = `Total: UGX ${cartTotal.toFixed(2)}`;
totalElement.style.fontSize = "18px";
totalElement.style.marginTop = "10px";
totalElement.style.color = "#333";
popupContent.appendChild(totalElement);


// Create the popup container
const popupContainer = document.createElement("div");
popupContainer.classList.add("popup-container");


// Add the popup content to the container
popupContainer.appendChild(popupContent);


  // Add the popup container to the document body
  document.body.appendChild(popupContainer);


  
// Create the close button
const closeButton = document.createElement("button");
closeButton.classList.add("close-button");
closeButton.innerHTML = "&times; Close";

// Add event listener to close the popup when the close button is clicked
closeButton.addEventListener("click", () => {
  popupContainer.style.display = "none";
});



// Append the close button to the popup container
popupContainer.appendChild(closeButton);

// Create the customer details section
const customerDetails = document.createElement("div");
customerDetails.classList.add("customer-details");
// Create the payment options section
const paymentOptionsSection = document.createElement("div");
paymentOptionsSection.classList.add("payment-options");

// Create the title for the payment options
const paymentOptionsTitle = document.createElement("h4");
paymentOptionsTitle.innerText = "Payment Options";
paymentOptionsSection.appendChild(paymentOptionsTitle);

// Create a small note under the payment options title
const paymentOptionsNote = document.createElement("p");
paymentOptionsNote.innerText = "Click your desired payment type to reveal and copy Account Number for your goods Payment. Ensure that your selection is the one that you are going to use to pay to enable us track your payment.";
paymentOptionsNote.classList.add("payment-options-note"); // Add the desired class
paymentOptionsSection.appendChild(paymentOptionsNote);

// Create the payment options
const paymentOptions = ["Airtel Money", "Mobile Money", "Bank Transfer"];

paymentOptions.forEach((option) => {
  // Create a container for each payment option
  const paymentOptionContainer = document.createElement("div");
  paymentOptionContainer.classList.add("payment-option-container");

  // Create the payment option div
  const paymentOption = document.createElement("div");
  paymentOption.classList.add("payment-option");
  paymentOption.innerHTML = `
    <input type="radio" name="payment-option" id="${option.toLowerCase()}" value="${option.toLowerCase()}">
    <label for="${option.toLowerCase()}">${option}</label>
  `;

  // Create a div for details (copy icon and "Copy" word)
  const detailsSection = document.createElement("div");
  detailsSection.classList.add("details-section");

  // Create a copy icon
  const copyIcon = document.createElement("i");
  copyIcon.classList.add("fas", "fa-copy", "copy-icon");
  detailsSection.appendChild(copyIcon);

  // Create a "Copy" word
  const copyWord = document.createElement("span");
  copyWord.innerText = "Copy";
  detailsSection.appendChild(copyWord);

  // Append details section to payment option
  paymentOption.appendChild(detailsSection);

 // Add event listener to copy the details to clipboard when the option is selected
paymentOption.addEventListener("click", () => {
  // Assuming the merchant code is the second line in the details
  const merchantCode = receiverDetails[option.toLowerCase()].split("\n")[1].split(": ")[1];

  // Copy the merchant code to the clipboard
  copyToClipboard(merchantCode);

  // Create a message element
  const message = document.createElement("div");
  message.className = "copied-message";
  message.textContent = "Copied to clipboard";

  // Append the message element to the body
  document.body.appendChild(message);

  // Trigger the slide-in effect
  setTimeout(() => {
    message.classList.add("show");
  }, 100); // Adjust the delay to match the CSS transition duration

  // Reset the copied status and remove the message after a short delay (e.g., 2 seconds)
  setTimeout(() => {
    message.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(message);
    }, 500); // Adjust the delay to match the CSS transition duration
  }, 2000);
});

  // Append the payment option to the container
  paymentOptionContainer.appendChild(paymentOption);

  // Append the payment option container to the payment options section
  paymentOptionsSection.appendChild(paymentOptionContainer);
});

// Append the payment options section to the popup content
popupContent.appendChild(paymentOptionsSection);
// Function to copy text to clipboard
function copyToClipboard(text) {
  const tempInput = document.createElement("textarea");
  tempInput.value = text;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand("copy");
  document.body.removeChild(tempInput);
}
// Get the receiver/account details section
const receiverDetailsSection = document.createElement("div");
receiverDetailsSection.classList.add("receiver-details");

// Define the receiver/account details for each payment option
const receiverDetails = {
  "airtel money": "Receiver: Nsereko Gerald\nAirtel Number: 0753 754 254",
   "mobile money": "Receiver: Nsereko Gerald\nMTN Number: 0782 754 254",
  "bank transfer": "Centenary Bank: Nsereko Gerald\nAccount Number: 3200531896",
};

// Function to update the receiver/account details based on the selected payment option
function updateReceiverDetails() {
  // Clear the previous receiver/account details
  receiverDetailsSection.innerHTML = "";

  // Get the selected payment option
  const selectedOption = document.querySelector('input[name="payment-option"]:checked').value;

  // Create the details element
  const details = document.createElement("p");
  details.innerText = receiverDetails[selectedOption];

  // Append the details element to the receiver/account details section
  receiverDetailsSection.appendChild(details);
}

// Add event listener to each payment option radio button
const paymentOptionRadios = document.querySelectorAll('input[name="payment-option"]');
paymentOptionRadios.forEach((radio) => {
  radio.addEventListener("change", updateReceiverDetails);
});

// Append the receiver/account details section to the payment options section
paymentOptionsSection.appendChild(receiverDetailsSection);

// Add the title to the popup
const head = document.createElement("h4");
head.innerText = "Delivery details.";
popupContent.appendChild(head);

// Add note about transport and delivery costs
const note = document.createElement("p");
note.innerText = "Please note that transport and delivery costs are on the side of the customer.";
note.classList.add("order-note2");
popupContent.appendChild(note);

// Create a select element for means of transport
const transportSelect = document.createElement("select");
transportSelect.classList.add("input-field");

// Create options for the select element
const option1 = document.createElement("option");
option1.value = "taxi";
option1.text = "Taxi";
transportSelect.appendChild(option1);

const option2 = document.createElement("option");
option2.value = "boda boda";
option2.text = "Boda boda";
transportSelect.appendChild(option2);

const option3 = document.createElement("option");
option3.value = "bus";
option3.text = "Bus";
transportSelect.appendChild(option3);

const option4 = document.createElement("option");
option4.value = "foot";
option4.text = "Foot";
transportSelect.appendChild(option4);


// Set the placeholder for the select element
const defaultOption = document.createElement("option");
defaultOption.value = "";
defaultOption.text = "Select Means of Transport";
defaultOption.disabled = true;
defaultOption.selected = true;
transportSelect.appendChild(defaultOption);

// Set the required attribute for the select element
transportSelect.required = true;

// Append the select element to customerDetails
customerDetails.appendChild(transportSelect);

// Append customerDetails to popupContent
popupContent.appendChild(customerDetails);

// Create input for delivery place
const deliveryPlaceInput = document.createElement("input");
deliveryPlaceInput.type = "text";
deliveryPlaceInput.placeholder = "Delivery Place";
deliveryPlaceInput.classList.add("input-field");
deliveryPlaceInput.required = true; // Set the required attribute
customerDetails.appendChild(deliveryPlaceInput);





// Append the customer details to the popup content
popupContent.appendChild(customerDetails);

// Create input for telephone contact
const telephoneInput = document.createElement("input");
telephoneInput.type = "tel";
telephoneInput.placeholder = "Telephone Contact";
telephoneInput.classList.add("input-field");
telephoneInput.required = true; // Set the required attribute
customerDetails.appendChild(telephoneInput);

// Append the telephone input to the customer details
customerDetails.appendChild(telephoneInput);

// Create the order button
const orderButton = document.createElement("button");
orderButton.innerText = "Place Order";
orderButton.classList.add("order-button");
orderButton.style.backgroundColor = "#3f51b5";
orderButton.style.width = "fit-content";
orderButton.style.color = "#fff";
orderButton.style.padding = "10px 20px";
orderButton.style.border = "none";
orderButton.style.borderRadius = "4px";
orderButton.style.fontSize = "16px";
orderButton.style.marginTop = "20px";
// Create the order type section
const orderTypeSection = document.createElement("div");
orderTypeSection.classList.add("order-type");

// Create the title for the order type
const orderTypeTitle = document.createElement("h4");
orderTypeTitle.innerText = "Order Type";
orderTypeSection.appendChild(orderTypeTitle);

// Declare selectedOrderType outside the function scope
let selectedOrderType;

// Function to create order option with note
function createOrderOption(id, value, label, note) {
  const orderOption = document.createElement("div");
  orderOption.classList.add("order-option");

  // Create radio input
  const radioInput = document.createElement("input");
  radioInput.type = "radio";
  radioInput.name = "order-type";
  radioInput.id = id;
  radioInput.value = value;

  // Create label for radio input
  const labelElement = document.createElement("label");
  labelElement.for = id;
  labelElement.innerText = label;

  // Create note element
  const noteElement = document.createElement("p");
  noteElement.classList.add("order-note");
  noteElement.innerText = note;

  // Append elements to order option
  orderOption.appendChild(radioInput);
  orderOption.appendChild(labelElement);
  orderOption.appendChild(noteElement);

  // Append order option to order type section
  orderTypeSection.appendChild(orderOption);

  // Add event listener to show/hide notes
  radioInput.addEventListener("change", () => {
    // Set the selected order type
    selectedOrderType = radioInput.value;

    // Hide all notes
    document.querySelectorAll(".order-note").forEach((note) => {
      note.style.display = "none";
    });

    // Show the selected note
    noteElement.style.display = "block";
  });
}

// Create retail order option with note
createOrderOption("retail-order", "retail", "Retail Order", "Prices remain the same for all products.");

// Create wholesale order option with note
createOrderOption("wholesale-order", "wholesale", "Wholesale Order", "Wholesale orders have special discounts and require a minimum order quantity.");

// Append the order type section to the document or another container
popupContent.appendChild(orderTypeSection);

// Now you can use selectedOrderType globally in your code



popupContent.appendChild(orderButton);

function showNotLoggedInMessage() {
    const messageContainer = document.getElementById('messageContainer');
    const messageContent = document.getElementById('messageContent');
    const overlay = document.getElementById('overlay2'); // Add this line

    // Set the message content HTML, including the company logo and login button
    messageContent.innerHTML = `
        <div id="companyLogo" class="company-logo">
            <img src="img/Devine Phones.png" alt="Company Logo">
        </div>
        <p>You are not signed in. Please sign in to access your account and shop with us. Thank you!</p>
        <button id="loginButton" class="login-button">
            <i class="fa fa-sign-in"></i> Login
        </button>
    `;

    // Add the "fade-in" class to apply the fade-in animation
    messageContainer.classList.add('fade-in');
    messageContainer.style.display = 'flex'; // Make the message container visible
    overlay.style.display = 'block'; // Show the overlay

    // Add a click event listener to the login button
    const loginButton = document.getElementById('loginButton');
    loginButton.addEventListener('click', function() {
        window.location.href = 'login.html'; // Adjust the login page URL
    });
}




// Function to remove the loader container
function removeLoaderContainer() {
    const loaderContainer = document.querySelector(".loader-container");
    if (loaderContainer) {
        document.body.removeChild(loaderContainer);
    }
}

// Function to show the success popup
function showSuccessPopup() {
    // Remove the loader container
    removeLoaderContainer();

    // Create the success popup
    const successPopup = document.createElement("div");
    successPopup.classList.add("success-popup");

    // Create the success message
    const successMessage = document.createElement("h3");
    const successText = document.createElement("p");
    successText.innerText = "Thank you for shopping with us... You can always find your receipts in your account. Thank you.";
    successMessage.innerText = "Order Successful !";

    // Create the okay button
    const okayButton = document.createElement("button");
    okayButton.classList.add("okay-button");
    okayButton.innerText = "Okay";

    // Add event listener to the okay button
    //okayButton.addEventListener("click", () => {
    //    location.reload(); // Refresh the page
   // });

    // Append the okay button to the success popup
    successPopup.appendChild(okayButton);

    // Add event listener to close the success popup when the okay button is clicked
    okayButton.addEventListener("click", () => {
       location.reload()
        document.body.removeChild(successPopup);
       // popupContainer.style.display = "none";
       
    });

    // Append the success message and okay button to the success popup
    successPopup.appendChild(successMessage);
    successPopup.appendChild(successText);
    successPopup.appendChild(okayButton);

    // Add the success popup to the document body
    document.body.appendChild(successPopup);
}

// Function to show the error popup
function showErrorPopup() {
    // Remove the loader container
    removeLoaderContainer();

    // Create the error popup
    const errorPopup = document.createElement("div");
    errorPopup.classList.add("error-popup");

    // Create the error message
    const errorMessage = document.createElement("h3");
    errorMessage.innerText = "Oops..., something went wrong! Check your internet connection or else you have missing fields";

    // Create the okay button
    const okayButton = document.createElement("button");
    okayButton.classList.add("okay-button");
    okayButton.innerText = "Okay";

    // Add event listener to the okay button
    okayButton.addEventListener("click", () => {
       // location.reload(); // Refresh the page
       document.body.removeChild(errorPopup);
       // popupContainer.style.display = "none";
       
    });

    // Append the okay button to the error popup
    errorPopup.appendChild(okayButton);

    // Append the error message and okay button to the error popup
    errorPopup.appendChild(errorMessage);
    errorPopup.appendChild(okayButton);

    // Add the error popup to the document body
    document.body.appendChild(errorPopup);
}
// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  cartCountElement.innerText = count;
}

// Define the clearCart function
function clearCart() {
  // Remove all items from the cart
  const cartItems = document.getElementsByClassName("cart-item");

  while (cartItems.length > 0) {
    cartItems[0].remove();
    
  }
updateCartCount(0);
  // Update the total price
  const totalPriceElement = document.getElementById("total-price");
  totalPriceElement.innerText = "TOTAL: UGX 0.00";

  // Update any other necessary cart-related logic
}

// Rest of your code...

// Add event listener to the order button
orderButton.addEventListener("click", async () => {
    // Display loader while processing the order
    const loader = document.createElement("div");
    loader.classList.add("loader");
    popupContainer.appendChild(loader);

    // Check if the user is authenticated
    const user = auth.currentUser;
    if (!user) {
        // User is not authenticated, show the not logged in message
        showNotLoggedInMessage();
        return; // Stop further execution
    }

    // Get the UID of the logged-in user
    const userId = user.uid;
    const userEmail = user.email;
// Get the delivery place from the input field
const deliveryPlace = deliveryPlaceInput.value;

// Get the selected means of transport
const meansOfTransport = transportSelect.value;


// Get the selected payment option
const selectedPaymentOptionElement = document.querySelector('input[name="payment-option"]:checked');
if (!selectedPaymentOptionElement) {
    // Payment option not selected, show an error message
    showErrorPopup("Please select a payment option");
    return;
}
const selectedPaymentOption = selectedPaymentOptionElement.value;


// Initialize orderSummary as an array
const orderSummary = [];

// Iterate over the table rows and create table cells
const rows = orderTable.querySelectorAll("tr");
rows.forEach((row, index) => {
  if (index > 0) { // Skip the header row
    const columns = row.querySelectorAll("td");

    // Assuming the order of columns is Product, Price, Qty, Total
    const productName = columns[0].innerText;
    const price = parseFloat(columns[1].innerText.replace("UGX ", ""));
    const quantity = parseInt(columns[2].innerText, 10);
    const total = parseFloat(columns[3].innerText.replace("UGX ", ""));

    // Push product details to orderSummary array
    orderSummary.push({
      productName,
      price,
      quantity,
      total,
    });
  }
});


// Get the cart total from the displayed element (assuming it's already calculated and displayed)
const cartTotalElement = document.getElementById("total-price");
const cartTotal = parseFloat(cartTotalElement.innerText.replace("TOTAL: UGX ", ""));

// Rest of your code...
      
      // Create the loader container
const loaderContainer = document.createElement("div");
loaderContainer.classList.add("loader-container");

// Append the loader to the loader container
loaderContainer.appendChild(loader);

// Add the loader container to the document body
document.body.appendChild(loaderContainer);

// Push the order details to Firebase database
const orderRef = ref(database, "orders");
const newOrderRef = push(orderRef);

// Get the telephone number from the input field
const telephoneNumber = telephoneInput.value;
  // Validate required fields
  if (!deliveryPlace || !meansOfTransport || !telephoneNumber) {
        // Show an error message if any required field is empty
        showErrorPopup("Please fill in all required fields");
        return;
    }
// Get the selected order type
const selectedOrderType = document.querySelector('input[name="order-type"]:checked').value;

// Function to generate a random alphanumeric string
function generateRandomOrderId(length) {
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

// Generate a random order ID
const randomOrderId = generateRandomOrderId(10);

// Create the order data object with the random order ID
const orderData = {
    orderId: randomOrderId,
    orderDate: new Date().toLocaleDateString(),
    orderTime: new Date().toLocaleTimeString(),
    deliveryPlace,
    meansOfTransport,
    selectedPaymentOption,
    selectedOrderType, // Add the selected order type
    orderSummary,
    cartTotal,
    userId, // Add the UID of the user
    userEmail, // Add the email of the user (if needed)
    telephoneNumber, // Add the telephone number
};


    set(newOrderRef, orderData)
        .then(() => {
            // Order placed successfully
            // Save the receipt in the customer's account

            // Create a new reference to the customer's receipt in the "receipts" node
            const userReceiptRef = ref(database, `users/${userId}/receipts`);
            const newUserReceiptRef = push(userReceiptRef);

// Save the receipt data under the user's account
const receiptData = {
  orderId: randomOrderId,
    orderDate: orderData.orderDate,
    orderTime: orderData.orderTime,
    deliveryPlace: orderData.deliveryPlace,
    meansOfTransport: orderData.meansOfTransport,
    selectedPaymentOption: orderData.selectedPaymentOption,
    selectedOrderType: orderData.selectedOrderType, // Add the selected order type
    orderSummary: orderData.orderSummary,
    cartTotal: orderData.cartTotal,
    userId: userId, // Add the UID of the user
    userEmail: user.email, // Add the email of the user (if needed)
    // Add other user-related details as needed
};


set(newUserReceiptRef, receiptData)
    .then(() => {
        // Receipt saved successfully
        showSuccessPopup();
        clearCart();
    })
    .catch((error) => {
        console.error("Error saving receipt:", error.message);
        showErrorPopup();
    });

        })
        .catch((error) => {
            console.error("Error placing order:", error.message);
            showErrorPopup();
        })
        .finally(() => {
            // Remove the loader container
            document.body.removeChild(loaderContainer);
        



// Simulating the booking process
setTimeout(() => {
  // Simulate successful booking
  showSuccessPopup();

  // Simulate failed booking
  // showErrorPopup();
}, 2000);



});

// Close the cart content
const cartContent = document.getElementById("cart-content");
cartContent.style.display = "none";

});

});
});



// Event listener for the "View Purchase History" button
document.getElementById("viewPurchaseHistoryBtn").addEventListener("click", async function(event) {
  event.preventDefault();

  
  // Get the button and spinner elements
  const viewHistoryBtn = document.getElementById("viewPurchaseHistoryBtn");
  const spinner = document.getElementById("spinner2"); // Add an ID to your spinner element

  // Disable the button and show the spinner
  viewHistoryBtn.disabled = true;
  spinner.style.display = "block";


  // Check if the user is authenticated
  const user = auth.currentUser;
  if (!user) {
    console.log('User not authenticated');
    // You may want to redirect the user to the login page or handle the lack of authentication
    return;
  }

  // Fetch the user's UID
  const userId = user.uid;

  // Fetch the user's receipts from Firebase
  const userReceiptsRef = ref(database, `users/${userId}/receipts`);
  
  try {
    const userReceiptsSnapshot = await get(userReceiptsRef);

    if (userReceiptsSnapshot.exists()) {
      // User has receipts
      const userReceipts = userReceiptsSnapshot.val();

      // Display receipts in a popup
      displayReceiptsPopup(userReceipts);
    } else {
      // No receipts found
      showNoPurchaseMessage()
      // You can display a message to the user indicating no purchase history.
    }
  } catch (error) {
    console.error('Error fetching user receipts from Firebase:', error.message);
  }
  finally {
    // Enable the button and hide the spinner after loading
    viewHistoryBtn.disabled = false;
    spinner.style.display = "none";
  }
});
// Function to show the "Added to Cart" message
function showNoPurchaseMessage() {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `No purchase history found!`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}

// Function to display receipts in a popup
function displayReceiptsPopup(userReceipts) {
  // Create the popup container
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("popup-container");

  // Create the close button for the popup
  const closeButton = document.createElement("button");
  closeButton.innerText = "Close";
  closeButton.classList.add("close-button");

// Add event listener to close the popup when the close button is clicked
closeButton.addEventListener("click", () => {
  // Apply a class for the fade-out animation
  popupContainer.style.animation = "fadeOut 0.5s";
  // Remove the popup container after the animation duration
  setTimeout(() => {
    document.body.removeChild(popupContainer);
  }, 500); // 500 milliseconds (0.5 seconds) should match your animation duration
});
// Create the receipt details container
const receiptDetailsContainer = document.createElement("div");
receiptDetailsContainer.classList.add("receipt-details-container");

// Create filter by date input
const dateFilterLabel = document.createElement("label");
dateFilterLabel.innerText = "Filter by Date";
const dateFilterInput = document.createElement("input");
dateFilterInput.type = "date";
dateFilterInput.placeholder = "Filter by Date";
dateFilterInput.addEventListener("input", handleDateFilter);

// Create clear button for the date input
const clearDateButton = document.createElement("button");
clearDateButton.innerText = "Clear";
clearDateButton.classList.add("clear-button");
clearDateButton.addEventListener("click", clearDateFilter);

// Create search by order ID input
const orderIdSearchLabel = document.createElement("label");
orderIdSearchLabel.innerText = "Search by Order ID";
const orderIdSearchInput = document.createElement("input");
orderIdSearchInput.type = "text";
orderIdSearchInput.placeholder = "Search by Order ID";
orderIdSearchInput.addEventListener("input", handleOrderIdSearch);

// Append labels and inputs to the filter container
const filterContainer = document.createElement("div");
filterContainer.classList.add("filter-container");



filterContainer.appendChild(orderIdSearchLabel);
filterContainer.appendChild(orderIdSearchInput);
filterContainer.appendChild(dateFilterLabel);
filterContainer.appendChild(dateFilterInput);
filterContainer.appendChild(clearDateButton);


// Append the filter container to the document body or another container
popupContainer.appendChild(filterContainer);

// Add fade-in animation to the popup container
popupContainer.style.animation = "fadeIn 0.5s";
// Add event listeners for the filter inputs
dateFilterInput.addEventListener("input", handleDateFilter);
orderIdSearchInput.addEventListener("input", handleOrderIdSearch);

// Function to clear the date filter
function clearDateFilter() {
  dateFilterInput.value = "";
  handleDateFilter({ target: { value: "" } }); // Trigger the filter function after clearing
}

// Filter by date handler function
function handleDateFilter(event) {
  const selectedDate = event.target.value;

  // Clear previous orders
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    receiptContainer.style.display = 'none';
  });

  const receiptDetailsContainer = document.querySelector('.receipt-details-container');
  let noOrdersMessageContainer = receiptDetailsContainer.querySelector('.no-orders-message-container');

  // If the message container doesn't exist, create it
  if (!noOrdersMessageContainer) {
    noOrdersMessageContainer = document.createElement('div');
    noOrdersMessageContainer.classList.add('no-orders-message-container');
    receiptDetailsContainer.appendChild(noOrdersMessageContainer);

    // Add an image on top of the message
    const noOrdersImage = document.createElement('img');
    noOrdersImage.src = 'img/nothing found.png'; // Provide the correct path to your image
    noOrdersImage.alt = 'No Orders Image';
    noOrdersImage.classList.add('no-orders-image');
    noOrdersMessageContainer.appendChild(noOrdersImage);

    // Create a paragraph element for the message
    const noOrdersMessage = document.createElement('p');
    noOrdersMessage.classList.add('no-orders-message');
    noOrdersMessageContainer.appendChild(noOrdersMessage);
  }

  // Hide the message container initially
  noOrdersMessageContainer.style.display = 'none';

  // Clear existing content
  noOrdersMessageContainer.querySelector('.no-orders-message').textContent = '';

  // Track whether any orders are found for the selected date
  let ordersFound = false;

  // Iterate through receipt containers and filter based on date
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    const orderDateElement = receiptContainer.querySelector('.receipt-info:nth-child(2)');
    const orderDate = orderDateElement.textContent.split(": ")[1]; // Extract the date part from the receipt

    // Parse and format the orderDate to match the selectedDate format
    const formattedOrderDate = new Date(orderDate);

    // Check if formattedOrderDate is a valid date object
    if (!isNaN(formattedOrderDate.getTime())) {
      const formattedSelectedDate = formattedOrderDate.toLocaleDateString('en-US', {
        month: 'numeric',
        day: 'numeric',
        year: 'numeric'
      });

      // Convert selectedDate to a Date object
      const selectedDateObj = new Date(selectedDate);

      if (selectedDate && formattedOrderDate.toISOString().split('T')[0] !== selectedDateObj.toISOString().split('T')[0]) {
        receiptContainer.style.display = 'none'; // hide orders not matching the selected date
      } else {
        receiptContainer.style.display = 'block'; // show orders matching the selected date
        ordersFound = true; // Orders are found for the selected date
      }
    }
  });


  // Toggle the visibility of the message container based on orders found
  noOrdersMessageContainer.style.display = ordersFound ? 'none' : 'block';

  // Update the message if no orders are found for the selected date
  if (!ordersFound) {
    noOrdersMessageContainer.querySelector('.no-orders-message').textContent = 'No orders found on this date.';
  }

  // Reattach event listeners to handle further filtering
  dateFilterInput.addEventListener("input", handleDateFilter);
  orderIdSearchInput.addEventListener("input", handleOrderIdSearch);
}








// Search by order ID handler function
function handleOrderIdSearch(event) {
  const searchText = event.target.value.toLowerCase();

  // Clear previous orders and messages
  document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
    receiptContainer.style.display = 'none';
  });

  const receiptDetailsContainer = document.querySelector('.receipt-details-container');
  let searchResultsContainer = receiptDetailsContainer.querySelector('.search-results-container');

  // If the search results container doesn't exist, create it
  if (!searchResultsContainer) {
    searchResultsContainer = document.createElement('div');
    searchResultsContainer.classList.add('search-results-container');
    receiptDetailsContainer.appendChild(searchResultsContainer);

    // Add an image on top of the message
    const noOrdersImage = document.createElement('img');
    noOrdersImage.src = 'img/nothing found.png'; // Provide the correct path to your image
    noOrdersImage.alt = 'No Orders Image';
    noOrdersImage.classList.add('no-orders-image');
    searchResultsContainer.appendChild(noOrdersImage);

    // Create a paragraph element for the message
    const noOrdersMessage = document.createElement('p');
    noOrdersMessage.classList.add('no-orders-message');
    searchResultsContainer.appendChild(noOrdersMessage);
  }

  // Hide the search results container initially
  searchResultsContainer.style.display = 'none';

  // Check if the message element exists before updating its textContent
  const noOrdersMessageElement = searchResultsContainer.querySelector('.no-orders-message');
  if (noOrdersMessageElement) {
    // Clear existing content
    noOrdersMessageElement.textContent = '';

    // Track whether any orders are found for the search text
    let ordersFound = false;

    // Iterate through receipt containers and filter based on order ID
    document.querySelectorAll('.receipt-container').forEach(receiptContainer => {
      const orderId = receiptContainer.querySelector('.receipt-info:first-child').textContent;
      if (searchText && !orderId.toLowerCase().includes(`${searchText}`)) {
        receiptContainer.style.display = 'none'; // hide orders not matching the search text
      } else {
        receiptContainer.style.display = 'block'; // show orders matching the search text
        ordersFound = true; // Orders are found for the search text
      }
    });

    // Toggle the visibility of the search results container based on orders found
    searchResultsContainer.style.display = ordersFound ? 'none' : 'block';

    // Update the message if no orders are found for the search text
    if (!ordersFound) {
      noOrdersMessageElement.textContent = 'No orders found for the specified order ID.';
    }
  }

  // Reattach event listeners to handle further filtering
  dateFilterInput.addEventListener("input", handleDateFilter);
  orderIdSearchInput.addEventListener("input", handleOrderIdSearch);
}


  // Iterate through user receipts and create elements for each receipt
  for (const receiptId in userReceipts) {
    const receipt = userReceipts[receiptId];

    // Create a container for each receipt
    const receiptContainer = document.createElement("div");
    receiptContainer.classList.add("receipt-container");

    // Create elements for receipt details using template literals
    const receiptDetails = `
 
<p class="receipt-info"><span>Order ID:  </span>   ${receipt.orderId}</p>
<p class="receipt-info"><span>Order Date:  </span>   ${receipt.orderDate}</p>
<p class="receipt-info"><span>Delivery Place: </span>   ${receipt.deliveryPlace}</p>
<p class="receipt-info"><span>Means of Transport:  </span>   ${receipt.meansOfTransport}</p>
<p class="receipt-info"><span>Payment Option:  </span>   ${receipt.selectedPaymentOption}</p>
<p class="receipt-info"><span>Order Type:  </span>   ${receipt.selectedOrderType}</p>
<p class="receipt-info"><span>Order Time:  </span>   ${receipt.orderTime}</p>


      <!-- Replace the existing order summary element with this table -->
<table class="order-summary-table">
  <caption>Order Summary</caption>
  <thead>
    <tr>
      <th>Pdt</th>
      <th>Qty</th>
      <th>Price</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    <!-- Iterate through each item in the order summary -->
    ${receipt.orderSummary.map(item => `
      <tr>
        <td>${item.productName}</td>
        <td>${item.quantity}</td>
        <td>UGX ${item.price.toFixed(2)}</td>
        <td>UGX ${item.total.toFixed(2)}</td>
      </tr>
    `).join('')}
  </tbody>
</table>

      <p class="receipt-info">Cart Total: UGX ${receipt.cartTotal.toFixed(2)}</p>
    `;

    // Set innerHTML of the receipt container
    receiptContainer.innerHTML = receiptDetails;

    // Append the receipt container to the receipt details container
    receiptDetailsContainer.appendChild(receiptContainer);
  }

  // Append the close button and receipt details container to the popup container
  popupContainer.appendChild(closeButton);
  popupContainer.appendChild(filterContainer);
  popupContainer.appendChild(receiptDetailsContainer);

  // Add the popup container to the document body
  document.body.appendChild(popupContainer);
 // Add fade-in animation to the popup container
 popupContainer.style.animation = "fadeIn 0.5s";

}





  const newScreensRef = ref(database, "products/newScreens");
const gradeBScreens = ref(database, "products/gradeBScreens");
const electronicsRef = ref(database, "products/electronics");
const touchesRef = ref(database, "products/touches");
const accessoriesRef = ref(database, "products/accessories");
const portsRef = ref(database, "products/Ports");


// Define your product references
const productRefs = [
  ref(database, "products/newScreens"),
  ref(database, "products/gradeBScreens"),
  ref(database, "products/electronics"),
  ref(database, "products/touches"),
  ref(database, "products/accessories"),
  ref(database, "products/Ports"),
];

// Options for the Intersection Observer
const observerOptions = {
  root: null, // Use the viewport as the root
  rootMargin: "0px", // No margin
  threshold: 0.5, // Trigger when 50% of the target is visible
};

// Create a callback function for the Intersection Observer
const intersectionCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // If the target is intersecting, load or retrieve the products
      const productRef = entry.target.dataset.productRef;
      // Call a function to retrieve products from the specified reference
      retrieveProducts(productRef);

      // Unobserve the target to avoid unnecessary calls
      observer.unobserve(entry.target);
    }
  });
};

// Create an Intersection Observer instance
const productObserver = new IntersectionObserver(intersectionCallback, observerOptions);

// Function to create a product element and observe it
function observeProduct(productRef) {
  const productContainer = document.createElement("div");
  // Set the dataset for the product reference
  productContainer.dataset.productRef = productRef;

  // Append the product element to the DOM
  document.getElementById("products-list").appendChild(productContainer);

  // Observe the product element
  productObserver.observe(productContainer);
}




const searchBtn = document.getElementById("search-btn");
let isSearching = false;

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (isSearching) {
    // If currently searching, clear search bar and revert button
    clearSearchBar();
    revertSearchButton();
    isSearching = false;
  } else {
    // If not currently searching, append the "X" icon to the search bar and perform search
    if (shouldShowClearIcon()) {
      appendIconToSearchBar();
      isSearching = true;
    }
    searchProducts();
  }


function shouldShowClearIcon() {
  const searchBar = document.getElementById("search-bar");
  return searchBar.value.trim() !== "";
}

function appendIconToSearchBar() {
  if (!shouldShowClearIcon()) {
    return;
  }

  // Create a new element for the "X" icon
  const clearIcon = document.createElement("i");
  clearIcon.classList.add("fa", "fa-times", "clear-icon");

  // Append the "X" icon to the right side of the search bar
  const searchBar = document.getElementById("search-bar");
  searchBar.parentNode.insertBefore(clearIcon, searchBar.nextSibling);

  // Add an event listener to the "X" icon to clear the search bar
  clearIcon.addEventListener("click", function () {
    clearSearchBar();
    revertSearchButton();
    isSearching = false;
  });

  // Style the search button
  searchBtn.style.background = 'orange';
}

function revertSearchButton() {
  // Remove the icon from the search bar
  const searchBar = document.getElementById("search-bar");
  const icon = searchBar.nextSibling;
  if (icon && icon.classList.contains("clear-icon")) {
    searchBar.parentNode.removeChild(icon);
  }

  // Style the search button
  searchBtn.style.background = '#008abf';
}

function clearSearchBar() {
  const searchBar = document.getElementById("search-bar");
  searchBar.value = "";
}




const searchBar = document.getElementById("search-bar");
const suggestionsContainer = document.getElementById("suggestions-container");
const overlay = document.getElementById('overlay');

// Create a title element for suggestions
const suggestionsTitle = document.createElement("div");
suggestionsTitle.classList.add("suggestions-title");
suggestionsTitle.textContent = "Suggestions";

// Append the title to the suggestions container
suggestionsContainer.appendChild(suggestionsTitle);

// Variable to store the last search query
let lastQuery = '';

// Variable to track if suggestions have been processed
let suggestionsProcessed = true;

// Function to fetch suggestions with retries
function fetchSuggestions(query, retryCount = 100) {
    return new Promise((resolve, reject) => {
      // Define an array of Firebase node references to search through
      const firebaseNodes = [newScreensRef, gradeBScreens, accessoriesRef, portsRef, touchesRef, electronicsRef];
  
      // Create an array to store the promises returned by the Firebase queries
      const promises = [];
  
      // Flag to check if any matching products were found
      let matchingProductsFound = false;
  
      // Function to check if a string contains all words in another string
      const containsAllWords = (str, words) => {
        return words.every(word => str.includes(word));
      };
  
      // Search for the query in each relevant Firebase node
      firebaseNodes.forEach((nodeRef) => {
        const promise = get(nodeRef).then((snapshot) => {
          const data = snapshot.val();
  
          // Process the data and display matching products as suggestions
          for (let productId in data) {
            const product = data[productId];
            const name = product.name.toLowerCase();
            const description = product.description.toLowerCase();
  
            // Additional conditions for matching suggestions
            if (
              containsAllWords(name, query.toLowerCase().split(" ")) || // Matching suggestion with all words in any order
              containsAllWords(name, query.replace(/[^a-zA-Z0-9\s]/g, "").toLowerCase().split(" ")) || // Matching suggestion with all alphanumeric words in any order
              name.includes(query.toLowerCase()) || // Matching suggestion with partial name
              description.includes(query.toLowerCase()) // Matching suggestion with partial description
            ) {
              matchingProductsFound = true;
  
              // Create a suggestion element
              const suggestionItem = document.createElement("div");
              suggestionItem.classList.add("suggestion-item");
              suggestionItem.textContent = name;
  
              // Add a click event listener to log the suggestion into the search bar and perform search
              suggestionItem.addEventListener("click", function () {
                searchBar.value = name;
                suggestionsContainer.style.display = "none"; // Hide suggestions
                overlay.style.display = 'none';
                searchProducts(name); // Perform search for the selected suggestion
              });
  
              // Append the suggestion to the suggestions container
              suggestionsContainer.appendChild(suggestionItem);
            }
          }
        });
  
        promises.push(promise);
      });
  
      // Wait for all Firebase queries to complete
      Promise.all(promises).then(() => {
        // Set suggestionsProcessed to true
        suggestionsProcessed = true;
  
        // Resolve or reject based on whether matching products were found
        matchingProductsFound ? resolve() : reject();
      });
    });
  }
    
// Function to initialize Firebase data and attach event listener
function initializeSearch() {
  // Listen for input events on the search bar
  searchBar.addEventListener("input", function () {
    // Clear existing suggestions (excluding the title)
    while (suggestionsContainer.children.length > 1) {
      suggestionsContainer.removeChild(suggestionsContainer.lastChild);
    }

    // Get the user input from the search bar
    const query = searchBar.value.trim().toLowerCase();

    // If the query is empty, hide suggestions
    if (!query) {
      suggestionsContainer.style.display = "none";
      overlay.style.display = 'none';
      return;
    }

    // Update lastQuery variable
    lastQuery = query;

    // Fetch suggestions with retries only if suggestionsProcessed is true
    if (suggestionsProcessed) {
      suggestionsProcessed = false; // Set suggestionsProcessed to false before fetching suggestions
      fetchSuggestions(query)
        .then(() => {
          // Show the suggestions container if there are suggestions
          suggestionsContainer.style.display = "block";
          overlay.style.display = 'block';
        })
        .catch(() => {
          // Show a message when no matching products are found
          const noResultsMessage = document.createElement("div");
          noResultsMessage.classList.add("no-results-message");
          noResultsMessage.textContent = "No Matching products found!";

          // Append the message to the suggestions container
          suggestionsContainer.appendChild(noResultsMessage);

          // Hide suggestions and overlay
          suggestionsContainer.style.display = "block";
          overlay.style.display = 'block';
        });
    }
  });

  // Add an event listener to the document to detect clicks
  document.addEventListener("click", function (event) {
    const searchBar = document.getElementById("search-bar");
    const suggestionsContainer = document.getElementById("suggestions-container");
    const overlay = document.getElementById('overlay');

    // Check if the click target is not the search bar or suggestions container
    if (event.target !== searchBar && !searchBar.contains(event.target) && event.target !== suggestionsContainer && !suggestionsContainer.contains(event.target)) {
      // Click occurred outside the search bar and suggestions container
      suggestionsContainer.style.display = "none"; // Hide suggestions
      overlay.style.display = 'none';
    }
  });
}

// Call the function to initialize Firebase data and attach event listener
initializeSearch();


  
  function searchProducts(searchTerm) {
  const query = document.getElementById("search-bar").value.toLowerCase();
  
  // Display the loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Clear the products list
  document.getElementById("products-list").innerHTML = "";

  // Define an array of Firebase node references to search through
  const firebaseNodes = [newScreensRef, gradeBScreens, accessoriesRef,portsRef, touchesRef, electronicsRef];

  // Create an array to store the promises returned by the Firebase queries
  const promises = [];

  // Search for query in each relevant Firebase node
  firebaseNodes.forEach((nodeRef) => {
    const promise = get(nodeRef).then((snapshot) => {
      const data = snapshot.val();

// Process the data and display matching products
const productsList = document.getElementById("products-list");
for (let i in data) {
    const product = data[i];
    const name = product.name.toLowerCase();
    const description = product.description.toLowerCase();
    const queryLower = query.toLowerCase();

    if (name.includes(queryLower) || description.includes(queryLower)) {
        // Create a card for the matching product
        const card = document.createElement("div");
        card.classList.add("card1");

      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);

      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);
        // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

        // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);


      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);



// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);




// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}


const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  closeCartBtn.style.display = "inline-block";
});


closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}

      // Add card to list
      productsList.appendChild(card);
    }
      }
    });

    promises.push(promise);
  });

  // Wait for all Firebase queries to complete
  Promise.all(promises).then(() => {
    // Hide the loader
    loader.style.display = "none";
  });
}
 
  



}

);





//button for brand new//



document.querySelector("#brand-new-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
    // Display the loader
    const loader = document.getElementById("loader");
  loader.style.display = "block";


  // Get products from newPhonesRef
  get(newScreensRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>1 month Guarantee for Brand New";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


    
   
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}


// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}


const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});


//button for used //



document.querySelector("#uk-used-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Get products from newPhonesRef
  get(gradeBScreens).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge");
      badge.innerText = "Grade B";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>No Guarantee for Grade B";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);

      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}


// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});

//Phones//




document.querySelector("#newScreens-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(newScreensRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
       // Add guarantee text
      const guaranteeText = document.createElement("div");
      guaranteeText.innerHTML = "<i class='fa fa-shield'></i>1 month Guarantee for Brand New Screens";
      guaranteeText.classList.add("guarantee-text");
      card.appendChild(guaranteeText);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);  
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});




   // Get products from newPhonesRef
   get(gradeBScreens).then((snapshot) => {
    const data = snapshot.val();
     // Display the loader
  const loader = document.getElementById("loader");
  loader.style.display = "block";
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge");
      badge.innerText = "Grade B ";
      card.appendChild(badge);
       // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i> No Guarantee for Grede B";
guaranteeText.classList.add("guarantee-text");
card.appendChild(guaranteeText);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}


// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });





//tevevisions navigation//




document.querySelector("#touches-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(touchesRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);




      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



//sound navigation//



document.querySelector("#electronics-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";

  // Get products from newPhonesRef
  get(electronicsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title);
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});


//accessories Navigation//




document.querySelector("#accessories-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(accessoriesRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);


              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


    
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



//tablets Navigation//



document.querySelector("#ports-link").addEventListener("click", () => {
  // Clear the products list
  document.getElementById("products-list").innerHTML = "";
  
   // Display the loader
   const loader = document.getElementById("loader");
  loader.style.display = "block";
  // Get products from newPhonesRef
  get(portsRef).then((snapshot) => {
    const data = snapshot.val();
    const productsList = document.getElementById("products-list");
    for (let i in data) {
      const product = data[i];
      // Create a card for the product
      const card = document.createElement("div");
      card.classList.add("card1");
      // Add "Brand New" badge
      const badge = document.createElement("div");
      badge.classList.add("used-badge2");
      badge.innerText = "Brand New";
      card.appendChild(badge);
      // Add product image
      const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      // Add product name
      const title = document.createElement("h2");
      title.innerText = product.name;
      card.appendChild(title); 
      
      
      // Add star rating
      const stars = document.createElement("div");
      stars.classList.add("stars");
      for (let j = 0; j < 5; j++) {
        const star = document.createElement("span");
        star.classList.add("star");
        star.innerHTML = "&#9733;"; // Unicode character for a star
        stars.appendChild(star);
      }
      card.appendChild(stars);

              // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);



      // Add product description
      const desc = document.createElement("p");
      desc.innerText = product.description;
      card.appendChild(desc);
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);


     
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list
      productsList.appendChild(card);
      loader.style.display = "none";
    }
  });
});



           const loaderContainer = document.querySelector('.loader-container');
         //   const loader = document.querySelector('.loader');
            const productsList = document.getElementById("products-list");
            const modal = document.querySelector('.modal');
            const modalImg = document.getElementById("modalImg");
            const closeBtn = document.querySelector('.close');
      
      
          //  loaderContainer.style.display = "flex"; // show the loader


// Function to load new screens cards
function loadNewScreenCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const newScreenCard = document.createElement("div");
    newScreenCard.classList.add("card1");
                       // Add "used" badge
  const usedBadge = document.createElement("div");
  usedBadge.classList.add("used-badge2");
  usedBadge.innerText = "Brand New";
  newScreenCard.appendChild(usedBadge);
   // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>1 month Guarantee for Brand New";
guaranteeText.classList.add("guarantee-text");
newScreenCard.appendChild(guaranteeText);
                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      newScreenCard.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                newScreenCard.appendChild(title);


                      const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
newScreenCard.appendChild(stars);


        // Add fast delivery sticker with icon
        const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  newScreenCard.appendChild(stickerContainer);



                const desc = document.createElement("p");
                desc.innerText = product.description;
                newScreenCard.appendChild(desc);
      

      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
newScreenCard.appendChild(price);




      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
              
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");

    // Check if the element is found before accessing properties
    if (priceElement) {
      const totalForItem = parseFloat(priceElement.dataset.total);
      total += totalForItem;
    }
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}


  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
newScreenCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add card to list only if it's in the viewport
    if (isNewScreenElementInViewport(newScreenCard)) {
      productsList.appendChild(newScreenCard);
    }
  }
  loader.style.display = "none";
}


// Function to check if an element is in the viewport
function isNewScreenElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle scroll events for new screens
function handleNewScreenScroll() {
  const productsList = document.getElementById("products-list");
  const newScreenCards = document.querySelectorAll(".card1");

  newScreenCards.forEach((newScreenCard) => {
    if (isNewScreenElementInViewport(newScreenCard) && !productsList.contains(newScreenCard)) {
      productsList.appendChild(newScreenCard);
    }
  });
}

// Attach scroll event listener for new screens
window.addEventListener("scroll", handleNewScreenScroll);

// Function to load new screen cards with retries
function loadNewScreenCardsWithRetries(retries = 100) {
  // Retry loading new screen cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve new screens data
      get(newScreensRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadNewScreenCards(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error("Failed to load new screen cards after multiple retries");
    }
  }

  // Initial attempt to retrieve new screens data
  retryLoad();
}

// Call the function to load new screen cards with retries
loadNewScreenCardsWithRetries();





//gradeBScreens //

// Function to load gradeB screen cards
function loadGradeBScreenCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const gradeBScreenCard = document.createElement("div");
    gradeBScreenCard.classList.add("card1");


                  // Add "used" badge
  const usedBadge = document.createElement("div");
  usedBadge.classList.add("used-badge");
  usedBadge.innerText = "Grade B ";
  gradeBScreenCard.appendChild(usedBadge);
   // Add guarantee text
const guaranteeText = document.createElement("div");
guaranteeText.innerHTML = "<i class='fa fa-shield'></i>No Guarantee for Grade B";
guaranteeText.classList.add("guarantee-text");
gradeBScreenCard.appendChild(guaranteeText);
      
                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      gradeBScreenCard.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                gradeBScreenCard.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
gradeBScreenCard.appendChild(stars);

        // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  gradeBScreenCard.appendChild(stickerContainer);


                const desc = document.createElement("p");
                desc.innerText = product.description;
                gradeBScreenCard.appendChild(desc);
      
     
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
gradeBScreenCard.appendChild(price);

      





      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);
function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
gradeBScreenCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add card to list only if it's in the viewport
    if (isGradeBScreenElementInViewport(gradeBScreenCard)) {
      productsList.appendChild(gradeBScreenCard);
    }
  }
  loader.style.display = "none";
}

// Function to check if an element is in the viewport
function isGradeBScreenElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}



// Function to handle scroll events for gradeB screens
function handleGradeBScreenScroll() {
  const productsList = document.getElementById("products-list");
  const gradeBScreenCards = document.querySelectorAll(".card1");

  gradeBScreenCards.forEach((gradeBScreenCard) => {
    if (isGradeBScreenElementInViewport(gradeBScreenCard) && !productsList.contains(gradeBScreenCard)) {
      productsList.appendChild(gradeBScreenCard);
    }
  });
}

// Attach scroll event listener for gradeB screens
window.addEventListener("scroll", handleGradeBScreenScroll);

// Function to load gradeB screen cards with retries
function loadGradeBScreenCardsWithRetries(retries = 100) {
  // Retry loading gradeB screen cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve gradeB screens data
      get(gradeBScreens).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadGradeBScreenCards(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error("Failed to load gradeB screen cards after multiple retries");
    }
  }

  // Initial attempt to retrieve gradeB screens data
  retryLoad();
}

// Call the function to load gradeB screen cards with retries
loadGradeBScreenCardsWithRetries();







    //ports//


// Function to load port cards
function loadPortCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const portCard = document.createElement("div");
    portCard.classList.add("card1");

      
                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      portCard.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                portCard.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
portCard.appendChild(stars);



        // Add fast delivery sticker with icon
        const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  portCard.appendChild(stickerContainer);



                const desc = document.createElement("p");
                desc.innerText = product.description;
                portCard.appendChild(desc);
      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
portCard.appendChild(price);

      



      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
              
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);

function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
portCard.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add port card to list only if it's in the viewport
    if (isPortElementInViewport(portCard)) {
      productsList.appendChild(portCard);
    }
  }
  loader.style.display = "none";
}

   

// Function to check if an element is in the viewport
function isPortElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}




// Function to handle scroll events for ports
function handlePortScroll() {
  const productsList = document.getElementById("products-list");
  const portCards = document.querySelectorAll(".card1");

  portCards.forEach((portCard) => {
    if (isPortElementInViewport(portCard) && !productsList.contains(portCard)) {
      productsList.appendChild(portCard);
    }
  });
}

// Attach scroll event listener for ports
window.addEventListener("scroll", handlePortScroll);

// Function to load port cards with retries
function loadPortCardsWithRetries(retries = 100) {
  // Retry loading port cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve ports data
      get(portsRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadPortCards(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error("Failed to load port cards after multiple retries");
    }
  }

  // Initial attempt to retrieve ports data
  retryLoad();
}

// Call the function to load port cards with retries
loadPortCardsWithRetries();




    //touches//


// Function to load touches cards
function loadTouchesCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

      
                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);

        // Add fast delivery sticker with icon
  const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);


                const desc = document.createElement("p");
                desc.innerText = product.description;
                card.appendChild(desc);
      
      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

      



      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
   
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);


function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


    // Add touches card to list only if it's in the viewport
    if (isInViewportTouches(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}
   

// Function to check if an element is in the viewport
function isInViewportTouches(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}




// Function to handle scroll events for touches
function handleScrollTouches() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewportTouches(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener for touches
window.addEventListener("scroll", handleScrollTouches);

// Function to load touches cards with retries
function loadTouchesCardsWithRetries(retries = 1000) {
  // Retry loading touches cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve touches data
      get(touchesRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadTouchesCards(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error("Failed to load touches cards after multiple retries");
    }
  }

  // Initial attempt to retrieve touches data
  retryLoad();
}

// Call the function to load touches cards with retries
loadTouchesCardsWithRetries();




    //accessories//


function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to load cards
function loadCards(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

      
                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);

        // Add fast delivery sticker with icon
        const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);


                const desc = document.createElement("p");
                desc.innerText = product.description;
                card.appendChild(desc);
      
     
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);





      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);


function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
const cart = document.getElementById('cart-container')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});

function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


if (isInViewport(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}
// Function to handle scroll events
function handleScroll() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewport(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScroll);

// Function to load cards with retries
function loadCardsWithRetries(dataRef, loadFunction, retries = 100) {
  // Retry loading cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve data
      get(dataRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadFunction(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error(`Failed to load cards after multiple retries for ${dataRef}`);
    }
  }

  // Initial attempt to retrieve data
  retryLoad();
}

// Call the function to load cards with retries for accessories
loadCardsWithRetries(accessoriesRef, loadCards);


//electronics//

// Function to load cards
function loadCardsNew(data) {
  const productsList = document.getElementById("products-list");
  for (let i in data) {
    const product = data[i];
    const card = document.createElement("div");
    card.classList.add("card1");

                   const img = document.createElement("img");
      img.src = product.image;
      img.alt = product.name;
      img.classList.add("product-img");
      img.addEventListener("click", () => {
        const modal = document.querySelector(".modal");
        const modalImg = document.querySelector("#modalImg");
        modal.style.display = "block";
        modalImg.src = img.src;
      });
      card.appendChild(img);
      
      const modal = document.querySelector(".modal");
      const closeBtn = document.querySelector(".close");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
          
 

                const title = document.createElement("h2");
                title.innerText = product.name;
                card.appendChild(title);
      
                const stars = document.createElement("div");            
stars.classList.add("stars");
for (let j = 0; j < 5; j++) {
  const star = document.createElement("span");
  star.classList.add("star");
  star.innerHTML = "&#9733;"; // Unicode character for a star
  stars.appendChild(star);
}
card.appendChild(stars);


        // Add fast delivery sticker with icon
        const stickerContainer = document.createElement("div");
  stickerContainer.classList.add("sticker-container");

  const fastDeliverySticker = document.createElement("div");
  fastDeliverySticker.classList.add("sticker", "fast-delivery");
  fastDeliverySticker.innerHTML = '... <i class="fas fa-truck"></i> Fast Delivery';

  stickerContainer.appendChild(fastDeliverySticker);
  card.appendChild(stickerContainer);


  

                const desc = document.createElement("p");
                desc.innerText = product.description;
                card.appendChild(desc);
      
      
      
// Add product price
const price = document.createElement("h4");
const formattedPrice = parseFloat(product.price).toLocaleString('en-US');

price.innerText = `UGX ${formattedPrice}`;
card.appendChild(price);

      


      
      
      // Open the Modal
      function openModal(img) {
        document.getElementById("modalImg").src = img.src;
        document.querySelector(".modal").style.display = "block";
      }
      
      // Close the Modal
      document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".modal").style.display = "none";
      });
      
      
      
// Create the "Add to Cart" button
const addToCartBtn = document.createElement("button");
addToCartBtn.innerText = "Add to Cart";

// Add Font Awesome shopping cart icon
const icon = document.createElement("i");
icon.classList.add("fas", "fa-shopping-cart"); // Assuming you're using Font Awesome

// Append the icon to the button
addToCartBtn.prepend(icon);




function addToCart(product) {
  // Get the cart items container
  const cartItemsContainer = document.getElementById("cart-items");

  // Create a new cart item element
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Create a container for the product details (name, price, quantity, and delete button)
  const productDetails = document.createElement("div");
  productDetails.classList.add("product-details");

  // Add product name
  const productName = document.createElement("h5");
  productName.innerText = product.name;
  productDetails.appendChild(productName);

  // Add product price
  const productPrice = document.createElement("h4");
  productPrice.innerText = `UGX ${product.price}`;
  productPrice.dataset.price = product.price; // Store the price as a data attribute
  productDetails.appendChild(productPrice);

// Create a quantity input field
const quantityInput = document.createElement("input");
quantityInput.type = "number";
quantityInput.value = 1;
quantityInput.min = 1;
quantityInput.classList.add("quantity-input"); // Add the quantity-input class
quantityInput.addEventListener("input", () => {
  updateCartItemTotal(cartItem);
  updateCartTotal();
});
productDetails.appendChild(quantityInput);


function updateCartItemTotal(cartItem) {
  const priceElement = cartItem.querySelector(".product-details h4");

  // Check if the element is found before accessing properties
  if (priceElement) {
    const quantityInput = cartItem.querySelector(".product-details input");
    const quantity = parseInt(quantityInput.value);
    const price = parseFloat(priceElement.innerText.replace("UGX ", ""));
    const total = quantity * price;
    priceElement.dataset.total = total.toFixed(2);
  }
}

// Define the updateCartTotal function
function updateCartTotal() {
  const cartItems = document.getElementsByClassName("cart-item");
  const totalPriceElement = document.getElementById("total-price");
  let total = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const cartItem = cartItems[i];
    const priceElement = cartItem.querySelector(".product-details h4");
    const totalForItem = parseFloat(priceElement.dataset.total);
    total += totalForItem;
  }

  totalPriceElement.innerText = "TOTAL: UGX " + total.toFixed(2);
}

  // Create a delete button for the cart item
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("delete-button");
  deleteButton.addEventListener("click", () => {
    cartItemsContainer.removeChild(cartItem);
    updateCartTotal();
    updateCartCount(-1);
  });
  productDetails.appendChild(deleteButton);

  cartItem.appendChild(productDetails);

  // Append the cart item to the cart items container
  cartItemsContainer.appendChild(cartItem);

  // Update the cart count
  updateCartCount(1);

  // Calculate and update the total price
  updateCartItemTotal(cartItem);
  updateCartTotal();

  // Show the "Added to Cart" message
  showAddToCartMessage(product.name);
}




// Function to update the cart count
function updateCartCount(count) {
  const cartCountElement = document.getElementById("cart-count");
  const currentCount = parseInt(cartCountElement.innerText) || 0;
  cartCountElement.innerText = currentCount + count;
}

// Add the event listener to the "Add to Cart" button
// Add the event listener to the "Add to Cart" button
addToCartBtn.addEventListener("click", () => {
    const cart = document.getElementById('cart-container')
    cart.style.display = 'block';
  addToCart(product);
});

// Assuming `card` is the element representing the product card
card.appendChild(addToCartBtn);

// Function to show the "Added to Cart" message
function showAddToCartMessage(productName) {
  const messageContainer = document.getElementById("message-container");
  messageContainer.innerText = `${productName} added to cart`;
  messageContainer.style.display = "block";

  setTimeout(() => {
    messageContainer.style.display = "none";
  }, 3000);
}



const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartContent = document.getElementById("cart-content");
const overlay = document.getElementById('overlay4')
cartContent.style.display = "none"; // Hide the cart content on load

openCartBtn.addEventListener("click", () => {
  if (cartIsEmpty()) {
    cartContent.style.display = "none"; // Hide the cart content on load
 
    // Show a message or perform any desired action when cart is empty
    return;
  }
     overlay.style.display = 'block'
  cartContent.style.display = "block";
  openCartBtn.style.display = "none";
  closeCartBtn.style.display = "inline-block";
});

closeCartBtn.style.display = "none"; // Hide the close button initially

closeCartBtn.addEventListener("click", () => {
  cartContent.style.display = "none";
  closeCartBtn.style.display = "none";
  openCartBtn.style.display = "inline-block";
  overlay.style.display = 'none'

});


function cartIsEmpty() {
  const cartItems = document.getElementsByClassName("cart-item");
  return cartItems.length === 0;
}


      // Add card to list only if it's in the viewport
      if (isInViewportNew(card)) {
      productsList.appendChild(card);
    }
  }
  loader.style.display = "none";
}

  // Function to check if an element is in the viewport
function isInViewportNew(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}


  

// Function to handle scroll events
function handleScrollNew() {
  const productsList = document.getElementById("products-list");
  const cards = document.querySelectorAll(".card1");

  cards.forEach((card) => {
    if (isInViewportNew(card) && !productsList.contains(card)) {
      productsList.appendChild(card);
    }
  });
}

// Attach scroll event listener
window.addEventListener("scroll", handleScrollNew);

// Function to load cards with retries
function loadCardsWithRetry(dataRef, loadFunction, retries = 1000) {
  // Retry loading cards
  function retryLoad() {
    retries--;
    if (retries >= 0) {
      // Make the asynchronous call to retrieve data
      get(dataRef).then((snapshot) => {
        const data = snapshot.val();
        // Check if data is retrieved successfully
        if (data) {
          loadFunction(data);
        } else {
          // Retry if data is not retrieved successfully
          retryLoad();
        }
      }).catch(() => {
        // Retry if there is an error in retrieving data
        retryLoad();
      });
    } else {
      // Log an error or handle the case when retries are exhausted
      console.error(`Failed to load cards after multiple retries for ${dataRef}`);
    }
  }

  // Initial attempt to retrieve data
  retryLoad();
}

// Call the function to load cards with retries for electronics
loadCardsWithRetry(electronicsRef, loadCardsNew);




const slider = document.querySelector('.image-slider');
const images = slider.querySelectorAll('img');
const interval = 3000; // Change image every 3 seconds

let index = 0;
setInterval(() => {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}, interval);

const backToTopBtn = document.getElementById('backToTopBtn');

window.addEventListener('scroll', () => {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = 'block';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    // Use smooth scrolling to scroll to the top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});