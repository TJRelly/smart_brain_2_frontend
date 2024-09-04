import { Routes, Route } from "react-router-dom";
import Homepage from "../components/homepage/Homepage";
import NotFound from "../components/notFound/NotFound";
import ImageLinkForm from "../components/imageLinkForm/ImageLinkForm";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";
// import ProfileForm from "../profiles/ProfileForm";
// import PrivateRoute from "./PrivateRoute";

/** Site-wide routes.
 *
 * Parts of the site should only be visitable when logged in. Those routes are
 * wrapped by <PrivateRoute>, which is an authorization component.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

const AppRoutes = ({ login, signup }) => {
  console.debug("Routes", { login: typeof login, signup: typeof signup });

  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/detect" element={<ImageLinkForm />}/>
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/register" element={<RegisterForm signup={signup} />} />
        {/* <Route path="/profile" element={<ProfileForm />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;