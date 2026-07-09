import Header from "../components/MainPage/Header";
import MainSection from "../components/MainPage/MainSection";
import Footer from "../components/MainPage/Footer";
export default function Home() {
  return (
    <div className="flex flex-col justify-center">
        <Header />
        <MainSection />
        <Footer />
    </div>
  );
}
