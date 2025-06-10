# RAT(E)IO
This is a big project that demonstrates my web development skills in TypeScript (React).
It also demonstrates my backend development skills in Node.js (Express).
It demonstrates my database development skills in Microsoft SQL Server (T-SQL, DDL, DML).
![logo](img/logo.png)
</br>
**CREATE AND RATE OTHER USERS' COMPANIES**
</br>
The following is an account-based application that enables users to create their own 
accounts where they can create different companies.
For every own company, they can create different criteria that can be rated by other users.
The user cannot rate his own companies (logical).
The user can search for other companies, select a criterion and rate it.
The user can also view ratings made for his companies and ratings for other companies.
The user can delete own ratings.

## Criteria types
There are for different criteria types:
* **Comment criteria:** simple comment criterion where the user can write down his complaints and 
satisfactions with the company for the given criterion 
* **Continuous criteria:** criterion where the user can express his satisfaction using a continuous
value within a defined range
* **Document-based criteria:** although rare, sometimes the user may want to express their opinion about using PDF document
* **Numeric criteria:** criterion where the user can express his satisfaction using an integer
value within a defined range
* **Text-based criteria:** criterion where the user can express his satisfaction using a text-based
value (e.g. "good", "bad", "poor" etc.)

## Used technologies
![React](https://shields.io/badge/react-black?logo=react&style=for-the-badge) ![TypeScript](https://shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF&style=for-the-badge) ![Axios](https://img.shields.io/badge/axios-green?style=for-the-badge&logo=axios)
 ![HTML](https://img.shields.io/badge/html-%23d4b655?style=for-the-badge&logo=html5)
![CSS](https://img.shields.io/badge/css-orange?style=for-the-badge&logo=css3) ![Node.js](https://img.shields.io/badge/node.js-lightblue?style=for-the-badge&logo=node.js) ![Express](https://img.shields.io/badge/express-%2317191a?style=for-the-badge&logo=express) ![JavaScript](https://img.shields.io/badge/javascript-yellow?style=for-the-badge&logo=javascript)
![Microsoft SQL Server](https://img.shields.io/badge/Microsoft%20SQL%20Server-red?style=for-the-badge) ![T-SQL](https://img.shields.io/badge/T--SQL-%23eb99f7?style=for-the-badge)
* **Database:** Microsoft SQL Server
* **Backend:** Node.js with Express
* **Web app:** React (HTTP client Axios)

## Screenshot guide
**Prerequisites:**
* Start a Microsoft SQL Server 2019 database (either standalone or Docker) and create a database
called Ratings. Execute the [script](./Database/ratings.sql).
* Start the [backend](./Backend) application. Configure all necessary information [here](./Backend/config).
You can view here the database configuration as well.
* Start the [frontend](./WebApp/ratings_web_app) application. Configure all necessary information [here](./WebApp/ratings_web_app/src/config).

If you have no account, you have to register.
</br>
![register](img/register.png)
</br>
If you are registered, you have to login.
</br>
![login](img/login.png)
</br>
The home page includes a menu, all available companies and a companies search bar.
</br>
![home1](img/home.png)
![home2](img/home_menu.png)
![home3](img/home_search.png)
</br>
If you select the "Profile" option from the menu, you can view and update your profile.
</br>
![profile](img/profile.png)
</br>
If you select the "Your companies" option from the menu, you can see the companies you registered.
</br>
![your_companies](img/your_companies.png)
</br>
Here you can either register a new company
</br>
![register_new_company](img/register_new_company.png)
</br>
or update an existing one.
</br>
![update_company](img/update_company.png)
</br>
You can also view the information about the company.
</br>
![view_company](img/view_company.png)
</br>
If you select the "Criteria" option from a company, you can view the different criteria under the mentioned categories.
</br>
![criteria1](img/company_criteria.png)
![criteria2](img/company_criteria2.png)
</br>
Create a new comment criterion.
</br>
![create_comment](img/create_comment.png)
</br>
Create a new continuous criterion.
</br>
![create_continuous](img/create_continuous.png)
</br>
Create a new document-based criterion.
</br>
![create_document](img/create_document.png)
</br>
Create a new numeric criterion.
</br>
![create_numeric](img/create_numeric.png)
</br>
Create a new text-based criterion.
</br>
![create_text1](img/create_text.png)
![create_text2](img/create_text2.png)
![create_text3](img/create_text3.png)
</br>
If you select the "About" option from the menu, you can view the about information about the application.
</br>
![about](img/about.png)
</br>
If you want to rate a company, you have to search for it.
![select_company](img/select_company.png)
If you click on the company, you can see the available criteria.
![available_criteria](img/available_criteria.png)
"View" triggers a view for the criterion information, "Ratings" triggers a view for all available ratings under that criterion (latest first), "Rate" triggers a new page where you can rate.
</br>
Demonstration for a document criterion.
</br>
![view_document](img/document_based_viewer.png)
![ratings_document](img/document_ratings.png)
![rate_document](img/document_rate.png)
</br>
Demonstration for a continuous criterion.
</br>
![view_continuous](img/continuous_viewer.png)
![ratings_continuous](img/continuous_ratings.png)
![rate_continouous](img/continuous_rate.png)
</br>
Demonstration for a numeric criterion.
</br>
![view_numeric](img/numeric_viewer.png)
![ratings_numeric](img/numeric_ratings.png)
![rate_numeric](img/numeric_rate.png)
</br>
Demonstration for a comment criterion.
</br>
![view_comment](img/comment_viewer.png)
![ratings_comment](img/comment_ratings.png)
![rate_comment](img/comment_rate.png)
</br>
Demonstration for a text-based criterion.
</br>
![view_text](img/text_viewer.png)
![ratings_text](img/text_ratings.png)
![rate_text1](img/text_rate.png)
![rate_text2](img/text_rate2.png)
</br>