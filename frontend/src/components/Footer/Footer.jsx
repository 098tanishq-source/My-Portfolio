 import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

import MarqueeText from '../Marquee/MarqueeText';

const Footer = () => {
    return (
        <section className='w-screen h-dvh px-6 mt-10'>
            <p className='text-[.7rem] text-[#eae5dd] choose-subtitle mt-10'>
                Interested in working together?<br />
                Let's build something great.
            </p>
            <div>
                <MarqueeText />
            </div>

            <div className='flex justify-between items-center text-2xl mt-14'>
                <h3 className='text-[#b1a696]'>
                    I am currently available for<br />
                    freelance website projects and<br />
                    design collaborations.<br /><br />
                    If you have a project or idea—<a href="mailto:yourgmail@gmail.com" className='text-[#f4efe7] hover:text-[#c4c1b9] underline'>contact me.</a>
                </h3>

                <div className='flex flex-col justify-center items-end'>
                    <a href="#hero" className='text-[#f2ede5] text-2xl'>Home</a>
                    <a href="#welcome" className='text-[#f2ede5] text-2xl'>About</a>
                    <a href="#showcase" className='text-[#f2ede5] text-2xl'>Projects</a>
                    <a href="#activities" className='text-[#f2ede5] text-2xl'>Skills</a>
                    <a href="#feedback" className='text-[#f2ede5] text-2xl'>Services</a>
                </div>
            </div>

            <div className="w-full flex justify-between items-center mt-20">
                <div className="flex justify-center items-center gap-1">
                    <a href="https://instagram.com/_friendly_dev" target="_blank" rel="noopener noreferrer" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5] hover:bg-[#f2ede5] hover:text-black transition-all duration-300'>
                        <FaInstagram className="text-xl" />
                    </a>
                    <a href="https://github.com/098tanishq-source" target="_blank" rel="noopener noreferrer" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5] hover:bg-[#f2ede5] hover:text-black transition-all duration-300'>
                        <FaGithub className="text-xl" />
                    </a>
                    <a href="mailto:098tanishq@gmail.com" className='border-[1px] border-[#c4c1b9] rounded-full p-3 text-[#f2ede5] hover:bg-[#f2ede5] hover:text-black transition-all duration-300'>
                        <MdOutlineEmail className="text-xl" />
                    </a>
                </div>

                <div>
                    <p className="text-[0.8rem] text-[#b1a696] text-right">
                        Designing clean, modern and responsive<br />
                        websites — one pixel at a time.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default Footer;