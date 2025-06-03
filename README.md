## PRODUCT STORE

A comprehensive MERN stack application that simulates features of a modern e-commerce website.

## FEATURES
- Sign up / Login
- Create Product
- Edit Product Details
- Delete Products
- Add products to favourites
- Add products to the Cart

![Screenshot 2025-04-10 113652](https://github.com/user-attachments/assets/46b55e96-4fd1-4907-9c2c-1a801418ddaf)

## HOW TO USE THIS PROJECT 🛠️
1. Clone the project. Open your terminal and use the following command:
     ```bash
      git clone https://github.com/tireddev24/product-store 
    ```
2. Open the "product-store" folder in VS Code (or your preferred code editor)
   
3. Create a MongoDB database and get the connection string - [How to Create a MongoDB Database](https://youtu.be/gDOKSgqM-bQ?si=3u9rWBHa2kWREZ1w)
   
4. In the backend folder, create a file named ".env"
   ```bash
    - MONGO_URI = {{your_MongoDB_connection_string}}
    - PORT = {{your_preferred_port}}
    - JWT_SECRET= {{your_jwt_secret}}
   ```
5. Open a terminal in the directory where the project folder is located and navigate to the backend directory. Then run the command(s):
     ```bash
       npm install
       npm run dev
     ``` 
6. Open a new terminal in the same directory as the above project and navigate to the frontend directory. Then run the command(s):
    ```bash
      npm install
      npm run dev
     ```
7. View the page in the browser with the link in the terminal. It should look like this:
   
   ![image](https://github.com/user-attachments/assets/f54b2509-dea1-4458-99a0-e79f01a9151d)
