import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { initLenis } from "../lib/lenis";
import PreloaderII from "../components/Preloader/PreloaderII";
import ReserveBtn from "../components/Buttons/ReserveBtn";
import Logo from "../components/Buttons/Logo";
import Footer from "../components/Footer/Footer";
import FooterTitle from "../components/Footer/FooterTitle";

gsap.registerPlugin(ScrollTrigger);

const MainLayout = () => {
    useEffect(() => {
        const lenis = initLenis();
        return () => lenis.destroy();
    }, []);

    return (
        <>
            <PreloaderII />
            <Logo />
            <ReserveBtn />
            <main>
                <Outlet />
                <Footer />
                <FooterTitle />
            </main>
        </>
    );
};

export default MainLayout;