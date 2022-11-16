import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children, submenuones, submenutwos, classNameForDiv}) => (
  <div className={classNameForDiv}>
    <Header submenuones={submenuones} submenutwos={submenutwos} />
    {children}
    <Footer />
  </div>
);

export default Layout;