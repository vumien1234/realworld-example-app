import Header from '../Header/header';
import Footer from '../Footer/footer';
function DefaultLayout({children}) {
    return (
        <div>
            <Header/>
            <div>
                {children}
            </div>
            <Footer/>
        </div>
    );
}

export default DefaultLayout;