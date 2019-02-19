// VARIABLES
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');

// LISTENERS

loadEventListeneers();

function loadEventListeneers() {
    // Whe a new course is added
    courses.addEventListener('click',buyCourse);

    // When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear Cart Button
    clearCartBtn.addEventListener('click', clearCart);

    // Document Ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}



// FUNCTIONS

function buyCourse(e) {
    e.preventDefault();
    // Use delegation to find the couse that was added
    if(e.target.classList.contains('add-to-cart')){
        //read the course values
        // console.log(e.target.parentElement);
        const course = e.target.parentElement.parentElement;

        //read values
        getCourseInfo(course);
    };
}

// Reads the HTML info of the selected course
function getCourseInfo(course) {
    //Create an Object w/ Course Data
    const courseInfo = {
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id')
    }

    // Insert to Shopping Cart
    addIntoCart(courseInfo);
}

function addIntoCart(course) {
// Create a <tr>
const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width = 100></img>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into Storage
    saveIntoStorage(course);
}

// Add courses into local Storage

function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    // add course to array
    courses.push(course);

    // Strorage only saves strings 
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get contents from storage

function getCoursesFromStorage() {
    let courses;

    // if something exists then we get the value otherwise it creates empty array
    if (localStorage.getItem('courses') === null){
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//remove course from DOM
function removeCourse(e) {
    let course,courseId;

    //removes from the DOM
   if( e.target.classList.contains('remove')) {
       e.target.parentElement.parentElement.remove();
       course = e.target.parentElement.parentElement;
       courseId = course.querySelector('a').getAttribute('data-id');
   }
   console.log(course);

   // remove from local storage
   removeCourseLocalStorage(courseId);
   
}

// remove from loca storage
function removeCourseLocalStorage(id) {
    //get data from local storage
    let coursesLS = getCoursesFromStorage();

    // loop throughout the array to find the index to remove
    coursesLS.forEach(function(courseLS,index) {
        if (courseLS.id === id) {
            courseLS.splice(index,1);
        }
    });

    // Add the remaining array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}


// Clears the Cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';

    // Recommended
    while(shoppingCartContent.firstChild) {
      shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    //Clear from LS
    clearLocalStorage();
}

// Clears local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is read and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();

    // Loop throughout the courses and prints into cart
    coursesLS.forEach(function(course) {
        // create the <tr>
        const row = document.createElement('tr');

        // print
        row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width = 100></img>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
            <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
         </tr>
    `;
    shoppingCartContent.appendChild(row);
    });
}
