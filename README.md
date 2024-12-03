# CPIT 405 Group Project 
### Group Members 
- [Amr Mahmoud](https://github.com/AmrMahmoud28)'s Contribution: Structuring, Designing, UI Interaction, Handling User Events, Organizing React Components, Managing Props and State Management, Navigation Route Creation, Deployment.
- [Hamza Sebaih](https://github.com/Senku150)'s Contribution: API Fetching with async/await, Handling Allergen List Logic, Handling Halal or Harem Logic  
- [Saher Marsi](https://github.com/SaherMarsi)'s Contribution: Authentication, Firebase Database Management, Creation of User, Creation of User's History Data, Reading and Display User's History Data.
# DESCRIPTION
The main problem is most people tend to eat specific products without reading the
label where important information is presented, unknowingly consume undesired
ingredients whether they are high in sugar, high in sodium, or containing haram
substances. Also, people who suffer from allergies can consume substances that they’re
allergic to. In general, labels can be hard to read most of the time because they are small,
and it can be hard for people who have weak eyesight. Additionally, some ingredients are
ambiguous, so people don’t know the exact ingredients they’re consuming, for example
E120 is a substance that is considered haram.

Our project aims to solve this particular problem by offering the community access
to a summary of the food products/items by providing the web application with a barcode
that can be found on the product. We’ll be using an API; OpenFoodFacts API
which provides us with full details about the product by using the user input (barcode), it
will return a JSON object, afterwards we’ll extract the product’s ingredients, then we’ll return a readable summary.

# INSTRUCTIONS
A general idea of how we started our project and built it.
## FIREBASE
When it comes to authentication and securely storing user information, such as user history and personal information we used Firebase.
Firebase offers an efficient and scalable solution for handling these tasks, making it easier to develop while ensuring data security and real-time synchronization!
### FIREBASE AUTHENTICATION
- We enabled email/password authentication method in Firebase, and created a Firebase config file.
- Afterwards we also created a contexts directory which has an authentication context file.
- Created a custom component that wraps the protected routes called ProtectedRoute.
- Created a login and register form components which we used the authentication context in.
- Set up the main app with authentication and protected routes.
  
### FIREBASE DATABASE
We set up and used the realtime database provided by Firebase. Within our components we created 2 functions, one function creates and stores user's history in the database whenever that user searches a product, however that user must have an account. The other function simply reads and displays that user's history in the history page.

## API
### Open Food Facts API
The Open Food Facts API enabled us to get information like ingredients and nutritional facts of products. We used the API to build the search component that allow users to search the for specific products and save their history to make healthier food choices. This is also great for users with specific allergies such as peanut allergy and for all muslims who live/traveled abroad, this will help navigate through the non-halal/haram products and completely avoid it. 

## Main Page
The main page, also known as the landing page, has the search bar available for users and non-users (guests). Also has logo which takes you to the main page and the login button on the navigation bar.

![image](https://github.com/user-attachments/assets/dba99205-ddeb-40fb-810f-0650c78991c5)
## Login Form
The login pages allows recurring users to login and view their history. Additionally we added the option for non-users to sign up, so the button takes them to the sign up form. 

![image](https://github.com/user-attachments/assets/03b5c7e5-f33f-4d56-8aa1-6296a7dcb6ad)
## Sign Up Form
The sign up form allows non-users to sign up, so they can have the privilege of saving their history data to check whenever needed.
![image](https://github.com/user-attachments/assets/cf0a16c2-fe80-4c80-8194-fd8b4d33204f)
## Search Result
Once the user types in the barcode, a result will be presented in front of them, that will illustrate the product's picture, followed by suspected allergens and a view nutrition button which will provide the user additional nutritional information.

![image](https://github.com/user-attachments/assets/8870ec6a-5bba-4190-b6b0-c96e5757d558)
## History Page
If the user wants to view their own history, they can do so by clicking on history in the navigation bar. Once they do, their history will be displayed with pictures of the products and if they're halal or haram. Also the view nutrition button.

![image](https://github.com/user-attachments/assets/b9845967-def1-46f6-b984-d221c0c5dc43)


