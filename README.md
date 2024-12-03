# CPIT 405 Group Project 
### Group Members 
- Amr Mahmoud
- Hamza Sebaih
- Saher Marsi
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
that can be found on the product. We’ll be using 2 APIs; the first one is OpenFoodFacts API
which provides us with full details about the product by using the user input (barcode), it
will return a JSON object, afterwards we’ll extract the product’s ingredients, then we’ll send
it to another API that will analyze and return a readable summary.

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
We set up and used the realtime database provided by Firebase. Within our components we created 2 functions, one functions creates and stores user's history in the database whenever that user searches a product, however that user must have an account. The other function simply reads and displays that user's history in the history page.
![image](https://github.com/user-attachments/assets/cc65c68f-9c73-46e5-8818-a1d33ca9c9a5)

## API
### Open Food Facts API
The Open Food Facts API enabled us to get information like ingredients and nutritional facts of products. We used the API to build the search component that allow users to search the for specific products and save their history to make healthier food choices. This is also great for users with specific allergies such as peanut allergy and for all muslims who live abroad, this will help navigate through the non-halal/haram products and completely avoid it. 
