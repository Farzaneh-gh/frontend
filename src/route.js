import Index from "./pages/index/Index";
import Articles from "./pages/articles/Articles";
import CategoryInfo from "./pages/categoryInfo/CategoryInfo";
import CourseInfo from "./pages/courseInfo/CourseInfo";
import NotFound from "./pages/notFound/NotFound";
import Courses from "./pages/courses/Courses";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AllArticles from "./pages/allArticles/AllArticles";
import Contact from "./pages/contactUs/Contact";
import Search from "./pages/search/Search";
import AdminPanel from "./pages/adminPanel/index";
import Users from "./pages/adminPanel/users/User";
import AdminCourses from "./pages/adminPanel/courses/Courses";
import Menus from "./pages/adminPanel/menu/Menu";
import AdminArticles from "./pages/adminPanel/articles/Articles";
import AdminCategory from "./pages/adminPanel/category/Category";
import AdminContact from "./pages/adminPanel/contact/Contact";
import Draft from "./pages/adminPanel/articles/Draft";
import Session from "./pages/adminPanel/sesssion/Session";
import SessionPage from "./pages/session/Session";
import Discounts from "./pages/adminPanel/discounts/Discounts";
import Tickets from "./pages/adminPanel/Tickets/Tickets";
import PAdminIndex from "./pages/adminPanel/Index/Index";
import PAdminPrivate from "./components/Privates/PAdminPrivate";

import UserPanel from "./pages/userPanel/Index";
import UserPanelIndex from "./pages/userPanel/index/Index";
import UserPanelOrder from "./pages/userPanel/Orders/Orders";
import ViewOrder from "./pages/userPanel/viewOrder/ViewOrder";
import UserPanelCourses from "./pages/userPanel/Courses/Courses";
import UserPanelTickets from "./pages/userPanel/Tickets/Tickets";
import SendTicket from "./pages/userPanel/Tickets/SendTicket";
import UserPanelTicketAnswer from "./pages/userPanel/Tickets/TicketAnswer";
import UserPanelEditAccount from "./pages/userPanel/EditAccount/EditAccount";
const routes = [
  { path: "/", element: <Index /> },
  {
    path: "/article-info/:articleId",
    element: <Articles />,
  },
  {
    path: "/category-info/:categoryName",
    element: <CategoryInfo />,
  },
  {
    path: "/course-info/:courseName",
    element: <CourseInfo />,
  },
  {
    path: "/all-articles/:pageNumber",
    element: <AllArticles />,
  },
  { path: "*", element: <NotFound /> },
  { path: "/courses/:pageNumber", element: <Courses /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/contact-us", element: <Contact /> },
  { path: "/search/:value", element: <Search /> },
  { path: "/:courseName/:sessionId", element: <SessionPage /> },
  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <PAdminIndex /> },
      { path: "users/:pageNumber", element: <Users /> },
      { path: "courses", element: <AdminCourses /> },
      { path: "menus", element: <Menus /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "category", element: <AdminCategory /> },
      { path: "contacts", element: <AdminContact /> },
      { path: "articles/draft/:shortName", element: <Draft /> },
      { path: "sessions", element: <Session /> },
      { path: "discounts", element: <Discounts /> },
      { path: "tickets", element: <Tickets /> },
    ],
  },
  {
    path: "/my-account/*",
    element: <UserPanel />,
    children: [
      { path: "", element: <UserPanelIndex /> },
      { path: "orders", element: <UserPanelOrder /> },
      { path: "view-order/:id", element: <ViewOrder /> },
      { path: "buyed", element: <UserPanelCourses /> },
      { path: "tickets", element: <UserPanelTickets /> },
      { path: "send-ticket", element: <SendTicket /> },
      { path: "tickets/answer/:id", element: <UserPanelTicketAnswer /> },
      { path: "edit-account", element: <UserPanelEditAccount /> },
    ],
  },
];

export default routes;
