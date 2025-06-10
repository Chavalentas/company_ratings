import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './components/login_page_component/login_page_component';
import RegisterPage from './components/register_page_component/register_page_component';
import HomePage from './components/home_page_component/home_page_component';
import UsersCompaniesPage from './components/users_companies_page_component/users_companies_page_component';
import AddCompanyPage from './components/add_company_page_component/add_company_page_component';
import ViewCompanyPage from './components/view_company_page_component/view_company_page_component';
import UpdateCompanypage from './components/update_company_page_component/update_company_page_component';
import ProfilePage from './components/profile_page_component/profile_page_component';
import UsersCompanyCriteriaPage from './components/users_company_criteria_page_component/users_company_criteria_page_component';
import ViewCriterionPage from './components/view_criterion_page_component/view_criterion_page_component';
import AddNumericCriterionPage from './components/add_numeric_criterion_page_component/add_numeric_criterion_page_component';
import AddFloatCriterionPage from './components/add_float_criterion_page_component/add_float_criterion_page_component';
import AddCommentCriterionPage from './components/add_comment_criterion_page_component/add_comment_criterion_page_component';
import AddTextValueCriterionPage from './components/add_text_value_criterion_page_component/add_text_value_criterion_page_component';
import CompanyCriteriaPage from './components/company_criteria_page_component/company_criteria_page_component';
import RateCriterionPage from './components/rate_criterion_page_component/rate_criterion_page_component';
import ViewRatingsPage from './components/view_ratings_page_component/view_ratings_page_component';
import AboutPage from './components/about_page_component/about_page_component';
import AddDocumentCriterionPage from './components/add_document_criterion_page_component/add_document_criterion_page_component';

function App() {
  return (
    <div className="app">
    <BrowserRouter>
       <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/about" element={<AboutPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/yourcompanies" element={<UsersCompaniesPage/>}/>
          <Route path="/addcompany" element={<AddCompanyPage/>}/>
          <Route path="/viewcompany" element={<ViewCompanyPage/>}/>
          <Route path="/updatecompany" element={<UpdateCompanypage/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          <Route path="/userscompanycriteria" element={<UsersCompanyCriteriaPage/>}/>
          <Route path="/companycriteria" element={<CompanyCriteriaPage/>}/>
          <Route path="/viewcriterion" element={<ViewCriterionPage/>}/>
          <Route path="/viewratings" element={<ViewRatingsPage/>}/>
          <Route path="/newnumeric" element={<AddNumericCriterionPage/>}/>
          <Route path="/newfloat" element={<AddFloatCriterionPage/>}/>
          <Route path="/newcomment" element={<AddCommentCriterionPage/>}/>
          <Route path="/newtext" element={<AddTextValueCriterionPage/>}/>
          <Route path="/newdocument" element={<AddDocumentCriterionPage/>}/>
          <Route path="/rate" element={<RateCriterionPage/>}/>
          <Route path="*" element={<HomePage/>}/>
       </Routes>
    </BrowserRouter>
  </div>
  );
}

export default App
