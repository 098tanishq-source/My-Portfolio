import{r as w,j as e,u as B,g as S,S as N}from"./index-8Tc7JJhV.js";import{b as R}from"./smoke_final-DrrBLmt4.js";const _=()=>{const d=w.useRef(null);return w.useEffect(()=>{const r=d.current;if(!r)return;const t=r.getContext("2d");let n;const s=()=>{r.width=r.offsetWidth,r.height=r.offsetHeight};s(),window.addEventListener("resize",s);const l=Array.from({length:120},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.1+.2,a:Math.random()*.6+.2,sp:Math.random()*.002+5e-4,ph:Math.random()*Math.PI*2})),o=a=>{t.clearRect(0,0,r.width,r.height),l.forEach(x=>{const j=x.a*(.4+.6*Math.sin(a*.001*x.sp*400+x.ph));t.beginPath(),t.arc(x.x*r.width,x.y*r.height,x.r,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,${j})`,t.fill()}),n=requestAnimationFrame(o)};return n=requestAnimationFrame(o),()=>{cancelAnimationFrame(n),window.removeEventListener("resize",s)}},[]),e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#080808",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Syne', system-ui, sans-serif"},children:[e.jsx("video",{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.12,zIndex:0},children:e.jsx("source",{src:R,type:"video/mp4"})}),e.jsx("style",{children:`
                @keyframes drift1 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    33%     { transform: translate(30px,-20px) scale(1.05); }
                    66%     { transform: translate(-15px,18px) scale(0.96); }
                }
                @keyframes drift2 {
                    0%,100% { transform: translate(0,0) scale(1); }
                    33%     { transform: translate(-25px,15px) scale(1.04); }
                    66%     { transform: translate(20px,-12px) scale(0.97); }
                }
                @keyframes contentUp {
                    from { opacity:0; transform:translateY(28px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq1-btn-primary {
                    padding: 13px 30px;
                    border-radius: 999px;
                    background: #fff;
                    color: #000;
                    font-size: 14px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.15),
                        0 4px 24px rgba(255,255,255,0.2),
                        inset 0 1px 0 rgba(255,255,255,1),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq1-btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -75%;
                    width: 50%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
                    transform: skewX(-20deg);
                    transition: left 0.5s ease;
                }
                .faq1-btn-primary:hover::before { left: 150%; }
                .faq1-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.25),
                        0 8px 32px rgba(255,255,255,0.35),
                        inset 0 1px 0 rgba(255,255,255,1),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                }

                .faq1-btn-ghost {
                    padding: 13px 30px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.05);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid rgba(255,255,255,0.18);
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    position: relative;
                    overflow: hidden;
                    backdrop-filter: blur(10px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.12),
                        inset 0 -1px 0 rgba(255,255,255,0.04);
                    transition: all 0.2s;
                }
                .faq1-btn-ghost:hover {
                    background: rgba(255,255,255,0.1);
                    border-color: rgba(255,255,255,0.35);
                    transform: translateY(-2px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        0 4px 20px rgba(255,255,255,0.08);
                }
            `}),e.jsx("canvas",{ref:d,style:{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",right:"-60px",top:"8%",width:"520px",height:"460px",borderRadius:"50%",background:"radial-gradient(circle, rgba(160,160,160,0.35) 0%, rgba(80,80,80,0.12) 50%, transparent 72%)",filter:"blur(56px)",animation:"drift1 8s ease-in-out infinite",pointerEvents:"none",zIndex:2,animationDelay:"-2s"}}),e.jsx("div",{style:{position:"absolute",left:"-40px",bottom:"10%",width:"300px",height:"260px",borderRadius:"50%",background:"radial-gradient(circle, rgba(100,100,100,0.25) 0%, transparent 70%)",filter:"blur(50px)",animation:"drift2 9s ease-in-out infinite",pointerEvents:"none",zIndex:2,animationDelay:"-4s"}}),e.jsxs("nav",{style:{position:"relative",zIndex:10,height:"60px",padding:"0 44px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.06)",flexShrink:0},children:[e.jsx("span",{style:{fontWeight:"800",fontSize:"15px",color:"#fff",letterSpacing:"2.5px"},children:"TANISHQ"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[["Services","Projects","Contact"].map(r=>e.jsx("span",{style:{fontSize:"12px",color:"rgba(255,255,255,0.4)",cursor:"pointer",letterSpacing:"0.5px",transition:"color 0.2s"},onMouseEnter:t=>t.currentTarget.style.color="rgba(255,255,255,0.85)",onMouseLeave:t=>t.currentTarget.style.color="rgba(255,255,255,0.4)",children:r},r)),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",style:{padding:"8px 20px",borderRadius:"999px",background:"rgba(255,255,255,0.08)",border:"1px solid rgba(255,255,255,0.15)",color:"#fff",fontSize:"13px",fontWeight:"500",textDecoration:"none",display:"flex",alignItems:"center",gap:"6px",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1)",transition:"all 0.2s"},onMouseEnter:r=>{r.currentTarget.style.background="rgba(255,255,255,0.14)",r.currentTarget.style.borderColor="rgba(255,255,255,0.28)"},onMouseLeave:r=>{r.currentTarget.style.background="rgba(255,255,255,0.08)",r.currentTarget.style.borderColor="rgba(255,255,255,0.15)"},children:"✦ Get started"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 48px 48px",position:"relative",zIndex:5,textAlign:"center",animation:"contentUp 0.9s ease forwards"},children:[e.jsxs("div",{style:{display:"inline-flex",alignItems:"center",gap:"7px",padding:"5px 16px",borderRadius:"999px",border:"1px solid rgba(255,255,255,0.12)",background:"rgba(255,255,255,0.05)",color:"rgba(255,255,255,0.65)",fontSize:"12px",marginBottom:"28px",backdropFilter:"blur(8px)",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1)"},children:[e.jsx("span",{style:{width:5,height:5,borderRadius:"50%",background:"#cc1100",boxShadow:"0 0 6px #cc1100",display:"inline-block",flexShrink:0}}),"All you need is a perfect dev. ME!"]}),e.jsxs("h1",{style:{fontSize:"clamp(2.2rem, 5.5vw, 4.2rem)",fontWeight:"800",color:"#fff",lineHeight:1.08,letterSpacing:"-1.5px",marginBottom:"18px",maxWidth:"760px"},children:["How much do i charge",e.jsx("br",{}),"for a basic site?"]}),e.jsxs("p",{style:{fontSize:"clamp(13px, 1.4vw, 16px)",color:"rgba(255,255,255,0.48)",lineHeight:"1.75",maxWidth:"560px",marginBottom:"36px"},children:["For a basic responsive website with modern design and essential sections, I charge between"," ",e.jsx("strong",{style:{color:"rgba(255,255,255,0.88)"},children:"₹2,000 – ₹4,000 INR"})," ","depending on pages and features."]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",className:"faq1-btn-primary",children:"Get Started Now"}),e.jsx("a",{href:"https://098tanishq-source.github.io/void-streetwear/",target:"_blank",rel:"noopener noreferrer",className:"faq1-btn-ghost",children:"See Projects"})]})]})]})},D=()=>{const d=w.useRef(null);return w.useEffect(()=>{const r=d.current;if(!r)return;const t=r.getContext("2d");let n;const s=()=>{r.width=r.offsetWidth,r.height=r.offsetHeight};s(),window.addEventListener("resize",s);const l=Array.from({length:130},()=>({x:Math.random(),y:Math.random(),r:Math.random()*1.1+.2,a:Math.random()*.6+.2,sp:Math.random()*.002+5e-4,ph:Math.random()*Math.PI*2})),o=a=>{t.clearRect(0,0,r.width,r.height),l.forEach(x=>{const j=x.a*(.4+.6*Math.sin(a*.001*x.sp*400+x.ph));t.beginPath(),t.arc(x.x*r.width,x.y*r.height,x.r,0,Math.PI*2),t.fillStyle=`rgba(255,255,255,${j})`,t.fill()}),n=requestAnimationFrame(o)};return n=requestAnimationFrame(o),()=>{cancelAnimationFrame(n),window.removeEventListener("resize",s)}},[]),e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#000",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Syne', system-ui, sans-serif"},children:[e.jsx("video",{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.12,zIndex:0},children:e.jsx("source",{src:R,type:"video/mp4"})}),e.jsx("style",{children:`
                @keyframes blobPulse {
                    0%,100% { transform: translate(-50%,-50%) scale(1); opacity: 0.9; }
                    50%     { transform: translate(-50%,-52%) scale(1.06); opacity: 1; }
                }
                @keyframes contentUp {
                    from { opacity:0; transform:translateY(24px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq2-btn-fill {
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: #7c3aed;
                    color: #fff;
                    font-size: 14px;
                    font-weight: 700;
                    border: none;
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(124,58,237,0.6),
                        0 0 0 1px rgba(124,58,237,0.4),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq2-btn-fill::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq2-btn-fill:hover::before { left: 160%; }
                .faq2-btn-fill:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 8px 36px rgba(124,58,237,0.75),
                        0 0 0 1px rgba(124,58,237,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                }

                .faq2-btn-ghost {
                    padding: 13px 28px;
                    border-radius: 999px;
                    background: rgba(255,255,255,0.04);
                    color: #fff;
                    font-size: 14px;
                    font-weight: 500;
                    border: 1px solid rgba(255,255,255,0.18);
                    cursor: pointer;
                    letter-spacing: 0.3px;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    position: relative;
                    backdrop-filter: blur(10px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.1),
                        inset 0 -1px 0 rgba(255,255,255,0.03);
                    transition: all 0.2s;
                }
                .faq2-btn-ghost:hover {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.32);
                    transform: translateY(-2px);
                    box-shadow:
                        inset 0 1px 0 rgba(255,255,255,0.18),
                        0 4px 18px rgba(255,255,255,0.06);
                }

                .faq2-navlink {
                    font-size: 14px;
                    color: rgba(255,255,255,0.7);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq2-navlink:hover { color: #fff; }
            `}),e.jsx("canvas",{ref:d,style:{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:"42%",left:"50%",transform:"translate(-50%, -50%)",width:"560px",height:"480px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(109,40,217,0.65) 0%, rgba(88,28,180,0.35) 35%, rgba(60,10,130,0.1) 60%, transparent 75%)",filter:"blur(28px)",animation:"blobPulse 6s ease-in-out infinite",pointerEvents:"none",zIndex:2}}),e.jsx("div",{style:{position:"absolute",top:"40%",left:"50%",transform:"translate(-50%, -50%)",width:"280px",height:"240px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(139,92,246,0.5) 0%, rgba(109,40,217,0.2) 50%, transparent 75%)",filter:"blur(20px)",animation:"blobPulse 4s ease-in-out infinite reverse",pointerEvents:"none",zIndex:2}}),e.jsxs("nav",{style:{position:"relative",zIndex:10,height:"60px",padding:"0 44px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px"},children:[e.jsx("div",{style:{width:"32px",height:"32px",background:"#7c3aed",borderRadius:"8px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",fontWeight:"900",color:"#fff"},children:"T"}),e.jsx("span",{style:{fontWeight:"800",fontSize:"15px",color:"#fff",letterSpacing:"1px"},children:"TANISHQ"})]}),e.jsxs("div",{style:{display:"flex",gap:"36px",alignItems:"center"},children:[["Home","About","Blog","Contact"].map(r=>e.jsx("a",{href:"#",className:"faq2-navlink",children:r},r)),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",style:{padding:"9px 22px",borderRadius:"10px",background:"#7c3aed",color:"#fff",fontSize:"14px",fontWeight:"600",textDecoration:"none",boxShadow:"0 4px 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",transition:"all 0.2s"},onMouseEnter:r=>{r.currentTarget.style.background="#6d28d9",r.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:r=>{r.currentTarget.style.background="#7c3aed",r.currentTarget.style.transform="translateY(0)"},children:"Book a call"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 48px 60px",position:"relative",zIndex:5,textAlign:"center",animation:"contentUp 0.9s ease forwards"},children:[e.jsx("div",{style:{display:"inline-flex",alignItems:"center",padding:"5px 16px",borderRadius:"999px",background:"#7c3aed",color:"#fff",fontSize:"13px",fontWeight:"600",marginBottom:"28px",boxShadow:"0 4px 20px rgba(124,58,237,0.5), inset 0 1px 0 rgba(255,255,255,0.25)"},children:"New"}),e.jsxs("h1",{style:{fontSize:"clamp(1.2rem, 5vh, 5rem)",fontWeight:"800",color:"#fff",lineHeight:1.08,letterSpacing:"-1.5px",marginBottom:"20px",maxWidth:"820px"},children:["how much do you charge for",e.jsx("br",{}),"animated websites ?"]}),e.jsxs("p",{style:{fontSize:"clamp(13px, 1.4vw, 16px)",color:"rgba(255,255,255,0.5)",lineHeight:"1.75",maxWidth:"540px",marginBottom:"36px"},children:["For custom layout, animations and advanced UI interactions, pricing ranges from ",e.jsx("strong",{style:{color:"rgba(255,255,255,0.88)"},children:"₹4,000 – ₹8,000 INR"})," based on complexity."]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",justifyContent:"center"},children:[e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",className:"faq2-btn-fill",children:"Get in touch ↗"}),e.jsx("a",{href:"https://098tanishq-source.github.io/void-streetwear/",target:"_blank",rel:"noopener noreferrer",className:"faq2-btn-ghost",children:"View services"})]})]})]})},Y=()=>e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#f8f8ff",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Syne', system-ui, sans-serif"},children:[e.jsx("video",{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.12,zIndex:0},children:e.jsx("source",{src:R,type:"video/mp4"})}),e.jsx("style",{children:`
                @keyframes blobDrift3 {
                    0%,100% { transform: translate(-50%,-50%) scale(1); }
                    33%     { transform: translate(-48%,-53%) scale(1.05); }
                    66%     { transform: translate(-52%,-47%) scale(0.96); }
                }
                @keyframes contentUp3 {
                    from { opacity:0; transform:translateY(24px); }
                    to   { opacity:1; transform:translateY(0); }
                }
                .faq3-navlink {
                    font-size: 14px;
                    color: rgba(0,0,0,0.55);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq3-navlink:hover { color: #000; }

                .faq3-btn {
                    padding: 15px 28px;
                    border-radius: 999px;
                    background: #7c3aed;
                    color: #fff;
                    font-size: 15px;
                    font-weight: 600;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(124,58,237,0.45),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                    transition: transform 0.2s, box-shadow 0.2s;
                    letter-spacing: 0.2px;
                }
                .faq3-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq3-btn:hover::before { left: 160%; }
                .faq3-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(124,58,237,0.6),
                        inset 0 1px 0 rgba(255,255,255,0.25),
                        inset 0 -1px 0 rgba(0,0,0,0.1);
                }
                .faq3-btn-arrow {
                    width: 30px; height: 30px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.22);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 15px;
                    box-shadow: inset 0 1px 0 rgba(255,255,255,0.3);
                    flex-shrink: 0;
                }
            `}),e.jsx("div",{style:{position:"absolute",top:"48%",left:"50%",transform:"translate(-50%, -50%)",width:"700px",height:"580px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(167,139,250,0.55) 0%, rgba(139,92,246,0.25) 40%, rgba(196,181,253,0.1) 65%, transparent 78%)",filter:"blur(40px)",animation:"blobDrift3 7s ease-in-out infinite",pointerEvents:"none",zIndex:1}}),e.jsx("div",{style:{position:"absolute",top:"44%",left:"50%",transform:"translate(-50%, -50%)",width:"400px",height:"340px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(196,181,253,0.4) 0%, transparent 70%)",filter:"blur(50px)",animation:"blobDrift3 9s ease-in-out infinite reverse",pointerEvents:"none",zIndex:1}}),e.jsxs("nav",{style:{position:"relative",zIndex:10,height:"72px",padding:"0 44px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0},children:[e.jsx("div",{style:{width:"80px",height:"52px",background:"#f0ece4",border:"1px solid rgba(0,0,0,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"10px",fontWeight:"700",color:"#333",letterSpacing:"2px",fontFamily:"monospace"},children:"TANISHQ"}),e.jsxs("div",{style:{display:"flex",gap:"36px",alignItems:"center"},children:[["About","Blog","Work","Contact"].map(d=>e.jsx("a",{href:"#",className:"faq3-navlink",children:d},d)),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",style:{padding:"10px 24px",borderRadius:"999px",background:"#111",color:"#fff",fontSize:"14px",fontWeight:"600",textDecoration:"none",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,0,0,0.2)",transition:"all 0.2s"},onMouseEnter:d=>{d.currentTarget.style.background="#333",d.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:d=>{d.currentTarget.style.background="#111",d.currentTarget.style.transform="translateY(0)"},children:"Book a call"})]})]}),e.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"0 48px 80px",position:"relative",zIndex:5,textAlign:"center",animation:"contentUp3 0.9s ease forwards"},children:[e.jsxs("h1",{style:{fontSize:"clamp(1.7rem, 5vh, 6rem)",fontWeight:"800",color:"#0a0a0a",lineHeight:1.06,letterSpacing:"-2px",marginBottom:"24px",maxWidth:"820px"},children:["What about a custom",e.jsx("br",{}),"animated site?"]}),e.jsxs("p",{style:{fontSize:"clamp(14px, 1.5vw, 17px)",color:"rgba(0,0,0,0.5)",lineHeight:"1.75",maxWidth:"620px",marginBottom:"40px"},children:["For custom layout, animations and advanced UI interactions, pricing ranges from ",e.jsx("strong",{style:{color:"rgba(0,0,0,0.8)"},children:"₹4,000 – ₹8,000 INR"})," based on complexity."]}),e.jsxs("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",className:"faq3-btn",children:["Get Started • it's affordable",e.jsx("span",{className:"faq3-btn-arrow",children:"→"})]})]})]}),H=()=>{const d=w.useRef(null),r=w.useRef(null);w.useEffect(()=>{var M;const n=d.current;if(!n)return;const s=n.getContext("2d");let l;const o=()=>{n.width=n.offsetWidth,n.height=n.offsetHeight};o(),window.addEventListener("resize",o);let a=0;const x=()=>{s.clearRect(0,0,n.width,n.height),s.strokeStyle="rgba(37,99,235,0.04)",s.lineWidth=1;for(let u=0;u<n.width;u+=60)s.beginPath(),s.moveTo(u,0),s.lineTo(u,n.height),s.stroke();for(let u=0;u<n.height;u+=60)s.beginPath(),s.moveTo(0,u),s.lineTo(n.width,u),s.stroke();const b=s.createLinearGradient(0,a-80,0,a+80);b.addColorStop(0,"transparent"),b.addColorStop(.5,"rgba(37,99,235,0.07)"),b.addColorStop(1,"transparent"),s.fillStyle=b,s.fillRect(0,a-80,n.width,160),a=(a+.8)%n.height,l=requestAnimationFrame(x)};x();const j=(M=r.current)==null?void 0:M.querySelectorAll(".tl-item");return j&&j.forEach((b,u)=>{b.style.opacity="0",b.style.transform="translateX(30px)",setTimeout(()=>{b.style.transition="opacity 0.6s ease, transform 0.6s ease",b.style.opacity="1",b.style.transform="translateX(0)"},200+u*150)}),()=>{cancelAnimationFrame(l),window.removeEventListener("resize",o)}},[]);const t=[{day:"Day 1",sub:"kickoff",desc:"Brief received, design direction locked, work begins immediately",done:!0},{day:"Day 2–3",sub:"build",desc:"Full build: layout, styles, animations, responsiveness",done:!0},{day:"Day 4",sub:"review",desc:"First preview sent — revisions noted and applied fast",done:!0},{day:"Day 5",sub:"delivery",desc:"Final files handed over. Deployed. Done.",done:!1}];return e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#03080f",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Syne', system-ui, sans-serif"},children:[e.jsx("video",{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.12,zIndex:0},children:e.jsx("source",{src:R,type:"video/mp4"})}),e.jsx("style",{children:`
                @keyframes contentLeft4 {
                    from { opacity:0; transform:translateX(-32px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes pulseRing {
                    0% { transform: scale(1); opacity: 0.6; }
                    100% { transform: scale(2.2); opacity: 0; }
                }
                @keyframes lineGrow {
                    from { height: 0; }
                    to   { height: 100%; }
                }
                .faq4-navlink {
                    font-size: 13px;
                    color: rgba(255,255,255,0.4);
                    text-decoration: none;
                    letter-spacing: 0.5px;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq4-navlink:hover { color: rgba(255,255,255,0.9); }

                .faq4-btn {
                    padding: 14px 32px;
                    background: #2563eb;
                    color: #fff;
                    font-size: 13px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(37,99,235,0.55),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.2);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq4-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq4-btn:hover::before { left: 160%; }
                .faq4-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(37,99,235,0.7),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.2);
                }

                .tl-dot-lit {
                    box-shadow: 0 0 0 4px rgba(37,99,235,0.2), 0 0 20px rgba(37,99,235,0.5);
                }
            `}),e.jsx("canvas",{ref:d,style:{position:"absolute",inset:0,width:"100%",height:"100%",zIndex:1,pointerEvents:"none"}}),e.jsx("div",{style:{position:"absolute",top:"50%",left:"-5%",transform:"translateY(-50%)",width:"600px",height:"500px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.06) 45%, transparent 70%)",filter:"blur(40px)",pointerEvents:"none",zIndex:2}}),e.jsxs("nav",{style:{position:"relative",zIndex:10,height:"64px",padding:"0 52px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0},children:[e.jsx("span",{style:{fontWeight:"800",fontSize:"15px",color:"#fff",letterSpacing:"2px"},children:"TANISHQ"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[["About","Work","Blog","Contact"].map(n=>e.jsx("a",{href:"#",className:"faq4-navlink",children:n},n)),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",style:{padding:"8px 20px",background:"rgba(37,99,235,0.15)",border:"1px solid rgba(37,99,235,0.4)",color:"#60a5fa",fontSize:"13px",fontWeight:"600",textDecoration:"none",letterSpacing:"0.5px",transition:"all 0.2s",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.05)"},onMouseEnter:n=>{n.currentTarget.style.background="rgba(37,99,235,0.3)",n.currentTarget.style.transform="translateY(-1px)"},onMouseLeave:n=>{n.currentTarget.style.background="rgba(37,99,235,0.15)",n.currentTarget.style.transform="translateY(0)"},children:"Book a call"})]})]}),e.jsxs("div",{style:{flex:1,display:"grid",gridTemplateColumns:"1fr 1.1fr",gap:"60px",alignItems:"center",padding:"0 52px 40px",position:"relative",zIndex:5,maxWidth:"1200px",margin:"0 auto",width:"100%"},children:[e.jsxs("div",{style:{animation:"contentLeft4 0.9s ease forwards"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px"},children:[e.jsx("span",{style:{fontFamily:"monospace",fontSize:"13px",color:"rgba(255,255,255,0.2)",fontWeight:"700"},children:"04"}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"10px",letterSpacing:"4px",color:"#2563eb",textTransform:"uppercase"},children:"Delivery Timeline"})]}),e.jsxs("h1",{style:{fontFamily:"'Bebas Neue', 'Syne', sans-serif",fontSize:"clamp(2.4rem, 6vh, 7rem)",fontWeight:"900",lineHeight:.9,letterSpacing:"2px",color:"#fff",marginBottom:"28px",textTransform:"uppercase"},children:["What is",e.jsx("br",{}),"your",e.jsx("br",{}),"delivery",e.jsx("br",{}),e.jsx("em",{style:{fontStyle:"normal",color:"#2563eb",display:"block"},children:"Time?"})]}),e.jsxs("p",{style:{fontSize:"14px",color:"rgba(255,255,255,0.4)",lineHeight:"1.8",maxWidth:"380px",marginBottom:"36px"},children:["Every project has a clear deadline."," ",e.jsx("strong",{style:{color:"rgba(255,255,255,0.85)"},children:"No ghosting. No delays."})," ","Rush delivery available for urgent projects — just let me know."]}),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",className:"faq4-btn",children:"Book a call"})]}),e.jsxs("div",{ref:r,style:{position:"relative",paddingLeft:"20px"},children:[e.jsx("div",{style:{position:"absolute",left:"39px",top:"20px",bottom:"20px",width:"1px",background:"linear-gradient(to bottom, #2563eb, rgba(37,99,235,0.1))",overflow:"hidden"},children:e.jsx("div",{style:{width:"100%",background:"linear-gradient(to bottom, rgba(96,165,250,0.8), transparent)",animation:"lineGrow 1.5s ease forwards",animationDelay:"0.3s",height:0}})}),t.map((n,s)=>e.jsxs("div",{className:"tl-item",style:{display:"flex",gap:"28px",alignItems:"flex-start",padding:"22px 0",position:"relative"},children:[e.jsxs("div",{style:{position:"relative",flexShrink:0},children:[e.jsx("div",{className:n.done?"tl-dot-lit":"",style:{width:"42px",height:"42px",borderRadius:"50%",background:n.done?"#2563eb":"#03080f",border:`1px solid ${n.done?"#2563eb":"rgba(37,99,235,0.4)"}`,display:"flex",alignItems:"center",justifyContent:"center",zIndex:2,position:"relative"},children:n.done?e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"#fff",strokeWidth:"2.5",strokeLinecap:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}):e.jsx("div",{style:{width:"8px",height:"8px",borderRadius:"50%",background:"#2563eb"}})}),!n.done&&e.jsx("div",{style:{position:"absolute",inset:"-4px",borderRadius:"50%",border:"1px solid rgba(37,99,235,0.5)",animation:"pulseRing 2s ease-out infinite"}})]}),e.jsxs("div",{style:{paddingTop:"4px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"baseline",gap:"8px",marginBottom:"6px"},children:[e.jsx("span",{style:{fontFamily:"'Bebas Neue', sans-serif",fontSize:"clamp(1.6rem, 3vw, 2.4rem)",lineHeight:1,letterSpacing:"2px",color:n.done?"#fff":"#2563eb",textTransform:"uppercase"},children:n.day}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"10px",letterSpacing:"2px",color:"rgba(255,255,255,0.25)",textTransform:"uppercase"},children:n.sub})]}),e.jsx("p",{style:{fontSize:"13px",color:"rgba(255,255,255,0.35)",lineHeight:"1.6",maxWidth:"360px"},children:n.desc})]})]},s))]})]})]})},L=()=>{const d=w.useRef(null);return w.useEffect(()=>{const r=d.current;if(!r)return;const t=r.getContext("2d"),n=420,s=420;r.width=n,r.height=s;const l=n/2,o=s/2,a=170;let x=0,j;const M=[];for(let p=-80;p<=80;p+=7)for(let c=-180;c<=180;c+=7){const v=p*Math.PI/180,k=c*Math.PI/180,I=p>25&&p<70&&c>-25&&c<60||p>-35&&p<15&&c>-20&&c<55||p>25&&p<75&&c>-140&&c<-50||p>-55&&p<15&&c>-80&&c<-35||p>-45&&p<-10&&c>110&&c<155;M.push({r2:v,l2:k,land:I})}const b=[{lat:28.6,lng:77.2,name:"Delhi"},{lat:40.7,lng:-74,name:"New York"},{lat:51.5,lng:-.1,name:"London"},{lat:35.7,lng:139.7,name:"Tokyo"},{lat:-33.9,lng:18.4,name:"Cape Town"},{lat:48.8,lng:2.3,name:"Paris"},{lat:1.3,lng:103.8,name:"Singapore"}],u=[[0,1],[0,2],[1,2],[2,5],[0,6],[3,6],[1,5]],A=u.map(([p,c])=>({from:p,to:c,t:Math.random(),speed:.003+Math.random()*.003})),q=(p,c)=>{const v=p*Math.PI/180,k=c*Math.PI/180+x,I=a*Math.cos(v)*Math.sin(k),i=a*Math.sin(v),f=a*Math.cos(v)*Math.cos(k);return{px:l+I,py:o-i,z:f}},E=()=>{t.clearRect(0,0,n,s);const p=t.createRadialGradient(l,o,a*.85,l,o,a*1.18);p.addColorStop(0,"rgba(13,148,136,0.12)"),p.addColorStop(.5,"rgba(13,148,136,0.05)"),p.addColorStop(1,"transparent"),t.beginPath(),t.arc(l,o,a*1.18,0,Math.PI*2),t.fillStyle=p,t.fill();const c=t.createRadialGradient(l-50,o-50,10,l,o,a);c.addColorStop(0,"rgba(10,30,30,0.95)"),c.addColorStop(.5,"rgba(3,20,20,0.98)"),c.addColorStop(1,"rgba(0,8,8,1)"),t.beginPath(),t.arc(l,o,a,0,Math.PI*2),t.fillStyle=c,t.fill(),x+=.004;for(let i=-60;i<=60;i+=30){const f=i*Math.PI/180,m=a*Math.sin(f),y=a*Math.cos(f);t.beginPath(),t.ellipse(l,o-m,y,y*.15,0,0,Math.PI*2),t.strokeStyle="rgba(13,148,136,0.07)",t.lineWidth=.5,t.stroke()}for(let i=0;i<180;i+=30){const f=i*Math.PI/180+x;t.beginPath(),t.ellipse(l,o,a*Math.abs(Math.cos(f)),a,a*Math.sin(f)>0?0:Math.PI,0,Math.PI*2),t.strokeStyle="rgba(13,148,136,0.05)",t.lineWidth=.5,t.stroke()}M.forEach(i=>{const f=i.l2+x,m=a*Math.cos(i.r2)*Math.sin(f),y=a*Math.sin(i.r2),h=a*Math.cos(i.r2)*Math.cos(f);if(h<0)return;const g=l+m,P=o-y,z=h/a;t.beginPath(),t.arc(g,P,i.land?1.6:.7,0,Math.PI*2),t.fillStyle=i.land?`rgba(13,148,136,${.25+z*.55})`:`rgba(13,148,136,${.04+z*.08})`,t.fill()}),u.forEach(([i,f])=>{const m=b[i],y=b[f],h=q(m.lat,m.lng),g=q(y.lat,y.lng);if(h.z<0||g.z<0)return;const P=(h.px+g.px)/2,z=(h.py+g.py)/2-40;t.beginPath(),t.moveTo(h.px,h.py),t.quadraticCurveTo(P,z,g.px,g.py),t.strokeStyle="rgba(13,148,136,0.2)",t.lineWidth=.8,t.stroke()}),A.forEach(i=>{i.t+=i.speed,i.t>1&&(i.t=0);const f=b[i.from],m=b[i.to],y=q(f.lat,f.lng),h=q(m.lat,m.lng);if(y.z<0||h.z<0)return;const g=i.t,P=(y.px+h.px)/2,z=(y.py+h.py)/2-40,T=(1-g)*(1-g)*y.px+2*(1-g)*g*P+g*g*h.px,W=(1-g)*(1-g)*y.py+2*(1-g)*g*z+g*g*h.py,F=t.createRadialGradient(T,W,0,T,W,5);F.addColorStop(0,"rgba(13,255,200,0.9)"),F.addColorStop(1,"transparent"),t.beginPath(),t.arc(T,W,5,0,Math.PI*2),t.fillStyle=F,t.fill(),t.beginPath(),t.arc(T,W,2,0,Math.PI*2),t.fillStyle="rgba(200,255,240,0.95)",t.fill()}),b.forEach(i=>{const{px:f,py:m,z:y}=q(i.lat,i.lng);if(y<0)return;t.beginPath(),t.arc(f,m,7,0,Math.PI*2),t.strokeStyle="rgba(13,148,136,0.3)",t.lineWidth=1,t.stroke(),t.beginPath(),t.arc(f,m,3.5,0,Math.PI*2),t.fillStyle="rgba(13,255,200,0.9)",t.fill();const h=t.createRadialGradient(f,m,0,f,m,10);h.addColorStop(0,"rgba(13,255,200,0.4)"),h.addColorStop(1,"transparent"),t.beginPath(),t.arc(f,m,10,0,Math.PI*2),t.fillStyle=h,t.fill()}),t.beginPath(),t.arc(l,o,a,0,Math.PI*2),t.strokeStyle="rgba(13,148,136,0.25)",t.lineWidth=1.5,t.stroke();const v=t.createRadialGradient(l-60,o-60,0,l-30,o-30,a*.7);v.addColorStop(0,"rgba(255,255,255,0.09)"),v.addColorStop(.3,"rgba(255,255,255,0.03)"),v.addColorStop(1,"transparent"),t.beginPath(),t.arc(l,o,a,0,Math.PI*2),t.fillStyle=v,t.fill();const k=t.createRadialGradient(l-55,o-65,0,l-55,o-65,40);k.addColorStop(0,"rgba(255,255,255,0.18)"),k.addColorStop(1,"transparent"),t.beginPath(),t.arc(l-55,o-65,40,0,Math.PI*2),t.fillStyle=k,t.fill();const I=t.createRadialGradient(l+40,o+100,0,l+40,o+100,60);I.addColorStop(0,"rgba(13,148,136,0.15)"),I.addColorStop(1,"transparent"),t.beginPath(),t.arc(l,o,a,0,Math.PI*2),t.fillStyle=I,t.fill(),j=requestAnimationFrame(E)};return E(),()=>cancelAnimationFrame(j)},[]),e.jsxs("div",{style:{position:"relative",width:"100%",height:"100vh",background:"#030d0d",overflow:"hidden",display:"flex",flexDirection:"column",fontFamily:"'Syne', system-ui, sans-serif"},children:[e.jsx("video",{autoPlay:!0,muted:!0,loop:!0,playsInline:!0,style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",opacity:.12,zIndex:0},children:e.jsx("source",{src:R,type:"video/mp4"})}),e.jsx("style",{children:`
                @keyframes contentLeft5 {
                    from { opacity:0; transform:translateX(-28px); }
                    to   { opacity:1; transform:translateX(0); }
                }
                @keyframes globeIn {
                    from { opacity:0; transform:scale(0.88); }
                    to   { opacity:1; transform:scale(1); }
                }
                @keyframes tagFloat {
                    0%,100% { transform:translateY(0); }
                    50% { transform:translateY(-4px); }
                }
                .faq5-navlink {
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    color: rgba(255,255,255,0.35);
                    text-decoration: none;
                    transition: color 0.2s;
                    cursor: pointer;
                }
                .faq5-navlink:hover { color: rgba(255,255,255,0.8); }

                .faq5-btn {
                    padding: 13px 28px;
                    background: #0d9488;
                    color: #fff;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    border: none;
                    cursor: pointer;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    position: relative;
                    overflow: hidden;
                    box-shadow:
                        0 4px 28px rgba(13,148,136,0.5),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .faq5-btn::before {
                    content: '';
                    position: absolute;
                    top: 0; left: -80%;
                    width: 55%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent);
                    transform: skewX(-18deg);
                    transition: left 0.55s ease;
                }
                .faq5-btn:hover::before { left: 160%; }
                .faq5-btn:hover {
                    transform: translateY(-2px);
                    box-shadow:
                        0 10px 40px rgba(13,148,136,0.65),
                        inset 0 1px 0 rgba(255,255,255,0.2),
                        inset 0 -1px 0 rgba(0,0,0,0.15);
                }

                .faq5-pay {
                    padding: 7px 16px;
                    border: 1px solid rgba(13,148,136,0.3);
                    color: #0d9488;
                    font-family: monospace;
                    font-size: 11px;
                    letter-spacing: 1.5px;
                    background: rgba(13,148,136,0.06);
                    transition: all 0.2s;
                    cursor: default;
                }
                .faq5-pay:hover {
                    background: rgba(13,148,136,0.14);
                    border-color: rgba(13,148,136,0.55);
                    color: #2dd4bf;
                }
            `}),e.jsx("div",{style:{position:"absolute",top:"50%",right:"-5%",transform:"translateY(-50%)",width:"600px",height:"500px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(13,148,136,0.12) 0%, transparent 70%)",filter:"blur(40px)",pointerEvents:"none",zIndex:1}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",backgroundImage:"linear-gradient(rgba(13,148,136,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(13,148,136,0.025) 1px, transparent 1px)",backgroundSize:"60px 60px"}}),e.jsxs("nav",{style:{position:"relative",zIndex:10,height:"64px",padding:"0 52px",display:"flex",alignItems:"center",justifyContent:"space-between",borderBottom:"1px solid rgba(255,255,255,0.05)",flexShrink:0},children:[e.jsx("span",{style:{fontWeight:"800",fontSize:"14px",color:"#fff",letterSpacing:"3px"},children:"TANISHQ"}),e.jsxs("div",{style:{display:"flex",gap:"32px",alignItems:"center"},children:[["About","Work","Blog"].map(r=>e.jsx("a",{href:"#",className:"faq5-navlink",children:r},r)),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",style:{padding:"8px 22px",border:"1px solid rgba(255,255,255,0.2)",color:"#fff",fontSize:"11px",fontWeight:"700",letterSpacing:"2px",textTransform:"uppercase",textDecoration:"none",background:"transparent",boxShadow:"inset 0 1px 0 rgba(255,255,255,0.08)",transition:"all 0.2s"},onMouseEnter:r=>{r.currentTarget.style.background="rgba(255,255,255,0.08)",r.currentTarget.style.borderColor="rgba(255,255,255,0.35)"},onMouseLeave:r=>{r.currentTarget.style.background="transparent",r.currentTarget.style.borderColor="rgba(255,255,255,0.2)"},children:"Book a call"})]})]}),e.jsxs("div",{style:{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"40px",alignItems:"center",padding:"0 52px 40px",position:"relative",zIndex:5,maxWidth:"1200px",margin:"0 auto",width:"100%"},children:[e.jsxs("div",{style:{animation:"contentLeft5 0.9s ease forwards"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"20px",animation:"tagFloat 3s ease-in-out infinite"},children:[e.jsx("span",{style:{fontFamily:"monospace",fontSize:"13px",color:"rgba(255,255,255,0.15)",fontWeight:"700"},children:"05"}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"10px",letterSpacing:"4px",color:"#0d9488",textTransform:"uppercase"},children:"Global Clients"})]}),e.jsxs("h1",{style:{fontFamily:"'Bebas Neue', 'Syne', sans-serif",fontSize:"clamp(2.5srem, 6vh, 7rem)",fontWeight:"900",lineHeight:.92,letterSpacing:"2px",color:"#fff",marginBottom:"28px",textTransform:"uppercase"},children:["Do you work",e.jsx("br",{}),"with",e.jsx("br",{}),e.jsx("em",{style:{fontStyle:"normal",WebkitTextStroke:"1px rgba(13,148,136,0.5)",color:"transparent",display:"block"},children:"international"}),e.jsx("span",{style:{color:"#fff"},children:"clients?"})]}),e.jsxs("p",{style:{fontSize:"14px",color:"rgba(255,255,255,0.4)",lineHeight:"1.8",maxWidth:"400px",marginBottom:"24px"},children:["100% yes. I work with clients across India, the US, Europe, and beyond."," ",e.jsx("strong",{style:{color:"rgba(255,255,255,0.82)"},children:"Payments handled seamlessly"})," ","through multiple platforms."]}),e.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"32px"},children:["PayPal","Wise","Crypto","UPI · India"].map(r=>e.jsx("div",{className:"faq5-pay",children:r},r))}),e.jsx("a",{href:"https://ig.me/m/_friendly_dev",target:"_blank",rel:"noopener noreferrer",className:"faq5-btn",children:"Get in touch ↗"})]}),e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"center",animation:"globeIn 1.2s ease forwards",position:"relative"},children:[e.jsx("div",{style:{position:"absolute",width:"440px",height:"440px",borderRadius:"50%",background:"radial-gradient(ellipse at center, rgba(13,148,136,0.08) 0%, transparent 70%)",filter:"blur(20px)",pointerEvents:"none"}}),e.jsx("canvas",{ref:d,style:{position:"relative",borderRadius:"50%",filter:"drop-shadow(0 0 30px rgba(13,148,136,0.3)) drop-shadow(0 0 60px rgba(13,148,136,0.1))"}})]})]})]})};S.registerPlugin(N);const C={position:"absolute",inset:0,width:"100%",height:"100%",overflow:"hidden"},Q=()=>{const d=w.useRef(null);return B(()=>{const r=S.utils.toArray(".faq-panel",d.current);S.set(r[0],{zIndex:5}),S.set(r[1],{x:"100%",zIndex:4}),S.set(r[2],{y:"100%",zIndex:3}),S.set(r[3],{x:"-100%",zIndex:2}),S.set(r[4],{y:"100%",zIndex:1});const t=S.timeline({scrollTrigger:{trigger:d.current,start:"top top",end:"+=400%",pin:!0,scrub:1.2,pinSpacing:!0}});return t.to(r[0],{x:"-100%",duration:1,ease:"power2.inOut"}).to(r[1],{x:"0%",duration:1,ease:"power2.inOut",zIndex:6},"<").to(r[1],{y:"-100%",duration:1,ease:"power2.inOut"},"+=0.5").to(r[2],{y:"0%",duration:1,ease:"power2.inOut",zIndex:7},"<").to(r[2],{x:"100%",duration:1,ease:"power2.inOut"},"+=0.5").to(r[3],{x:"0%",duration:1,ease:"power2.inOut",zIndex:8},"<").to(r[3],{y:"100%",duration:1,ease:"power2.inOut"},"+=0.5").to(r[4],{y:"0%",duration:1,ease:"power2.inOut",zIndex:9},"<"),()=>{N.getAll().forEach(n=>n.kill()),t.kill()}},{scope:d}),e.jsxs("section",{ref:d,className:"faq-section",style:{width:"100vw",height:"100vh",overflow:"hidden",position:"relative",background:"#060606"},children:[e.jsx("div",{className:"faq-panel",style:{...C,zIndex:5},children:e.jsx(_,{})}),e.jsx("div",{className:"faq-panel",style:{...C,zIndex:4},children:e.jsx(D,{})}),e.jsx("div",{className:"faq-panel",style:{...C,zIndex:3},children:e.jsx(Y,{})}),e.jsx("div",{className:"faq-panel",style:{...C,zIndex:2},children:e.jsx(H,{})}),e.jsx("div",{className:"faq-panel",style:{...C,zIndex:1},children:e.jsx(L,{})})]})};export{Q as default};
