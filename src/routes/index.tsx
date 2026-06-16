import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

const PAGE_CSS = String.raw`
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --deep:#fff2ec;
  --dark:#fbe1d4;
  --panel:rgba(192,57,15,0.04);
  --border:rgba(192,57,15,0.16);
  --red:#c0390f;
  --red-mid:#d4450f;
  --red-bright:#ff5520;
  --amber:#f5893a;
  --amber-bright:#ffaa44;
  --green:#2eb87a;
  --green-bright:#3dd68c;
  --blue:#3b82f6;
  --purple:#a855f7;
  --yellow:#fbbf24;
  --text:#2a0a04;
  --muted:#7a4a3e;
  --dim:#a8786a;
  --ff-display:'Poppins',system-ui,sans-serif;
  --ff-body:'Poppins',system-ui,sans-serif;
  --r-sm:8px;--r-md:14px;--r-lg:20px;--r-xl:28px
}
html{scroll-behavior:smooth}
body{background:linear-gradient(180deg,#fff2ec 0%,#ffe2d3 55%,#ffd0b8 100%);background-attachment:fixed;color:var(--text);font-family:var(--ff-body);line-height:1.65;overflow-x:hidden}
::-webkit-scrollbar{width:4px}
::-webkit-scrollbar-thumb{background:rgba(192,57,15,0.4);border-radius:2px}

/* NAV */
nav{
  position:fixed;top:1.1rem;left:50%;transform:translateX(-50%);z-index:100;
  display:flex;align-items:center;justify-content:space-between;gap:2rem;
  padding:0.45rem 0.55rem 0.45rem 2rem;height:56px;
  background:rgba(255,242,236,0.7);backdrop-filter:blur(22px) saturate(1.5);
  border:1px solid rgba(192,57,15,0.18);border-radius:50px;
  box-shadow:0 8px 30px rgba(192,57,15,0.18);
  transition:background 0.3s
}
.logo{font-family:var(--ff-display);font-style:italic;font-size:1.45rem;font-weight:900;letter-spacing:0.04em;color:var(--text);text-decoration:none}
.logo span{color:var(--red-bright)}
nav ul{list-style:none;display:flex;gap:2.5rem}
nav ul a{color:var(--muted);text-decoration:none;font-size:0.85rem;font-weight:500;transition:color 0.2s}
nav ul a:hover{color:var(--text)}
.nav-btn{
  background:var(--red-bright);color:#fff;border:1px solid rgba(255,85,32,0.5);
  padding:0.55rem 1.4rem;border-radius:50px;font-size:0.85rem;
  font-weight:600;cursor:pointer;text-decoration:none;
  box-shadow:0 4px 18px rgba(255,85,32,0.4);
  transition:all 0.2s
}
.nav-btn:hover{background:#ff6b38;transform:translateY(-1px);box-shadow:0 6px 24px rgba(255,85,32,0.55)}

/* HERO */
.hero{
  min-height:100vh;display:flex;flex-direction:column;
  align-items:center;justify-content:center;
  padding:8rem 2rem 5rem;text-align:center;
  position:relative;overflow:hidden;
  background:transparent
}
/* animated grid */
.hero::before{
  content:'';position:absolute;inset:0;pointer-events:none;
  background-image:linear-gradient(rgba(192,57,15,1) 1px,transparent 1px),
                   linear-gradient(90deg,rgba(192,57,15,1) 1px,transparent 1px);
  background-size:60px 60px;opacity:0.04;
  mask-image:radial-gradient(ellipse 80% 70% at 50% 35%,#000 0%,transparent 70%)
}

.eyebrow{
  position:relative;z-index:1;
  display:inline-flex;align-items:center;gap:0.6rem;
  font-family:var(--ff-display);font-style:italic;font-size:1.05rem;
  color:var(--red);letter-spacing:0.01em;
  margin-bottom:1.5rem
}
.eyebrow::before,.eyebrow::after{content:'—';color:var(--red);opacity:0.65}
.eyebrow i{display:none}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:0.3;transform:scale(0.7)}}

h1{
  position:relative;z-index:1;
  font-family:var(--ff-display);font-style:italic;
  font-size:clamp(3.4rem,9vw,7rem);
  font-weight:700;line-height:1.02;letter-spacing:-0.01em;
  max-width:900px;margin-bottom:1.5rem;color:var(--text)
}
h1 em{font-style:italic;color:var(--red-bright)}
h1 .highlight-amber{color:var(--amber-bright)}

.hero-sub{
  position:relative;z-index:1;
  font-size:clamp(1rem,2vw,1.2rem);color:var(--muted);
  max-width:560px;margin-bottom:3rem;line-height:1.8;font-weight:300
}

/* HERO ILLUSTRATION STRIP */
.hero-scene{
  position:relative;z-index:1;
  width:100%;max-width:780px;
  margin-bottom:3rem;
  border-radius:var(--r-xl);
  overflow:hidden;
  border:1px solid rgba(255,255,255,0.08);
  background:rgba(255,255,255,0.03)
}

/* ORB */
.orb-wrap{
  position:relative;z-index:1;
  display:flex;align-items:center;justify-content:center;
  width:280px;height:280px;margin-bottom:3rem
}
.ring{position:absolute;border-radius:50%;border:1px solid rgba(255,85,32,0.25);animation:ripple 3.5s ease-out infinite}
.ring:nth-child(1){width:150px;height:150px;animation-delay:0s}
.ring:nth-child(2){width:212px;height:212px;animation-delay:0.9s}
.ring:nth-child(3){width:278px;height:278px;animation-delay:1.8s}
@keyframes ripple{0%{opacity:.8;transform:scale(.88)}100%{opacity:0;transform:scale(1.06)}}

.orb{
  position:relative;z-index:2;
  width:124px;height:124px;border-radius:50%;
  background:conic-gradient(from 200deg,#ff6b38,#d4450f,#ff5520,#ff8c55,#ff5520,#d4450f);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:4px;text-decoration:none;
  box-shadow:0 0 0 5px rgba(255,85,32,0.16),0 0 55px rgba(255,85,32,0.52),0 0 100px rgba(255,85,32,0.2);
  animation:orbpulse 3s ease-in-out infinite;
  transition:transform 0.2s cubic-bezier(.34,1.56,.64,1)
}
@keyframes orbpulse{0%,100%{box-shadow:0 0 0 5px rgba(255,85,32,0.16),0 0 55px rgba(255,85,32,0.52),0 0 100px rgba(255,85,32,0.2)}50%{box-shadow:0 0 0 8px rgba(255,85,32,0.22),0 0 75px rgba(255,85,32,0.68),0 0 130px rgba(255,85,32,0.28)}}
.orb{cursor:default}
.orb-icon{width:38px;height:38px;line-height:1}
.orb-text{font-family:var(--ff-display);font-size:0.63rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:rgba(255,255,255,0.95);margin-top:4px}

.cta-btn{
  position:relative;z-index:1;
  display:inline-flex;align-items:center;gap:0.6rem;
  background:var(--red-bright);color:#fff;
  padding:0.95rem 2.4rem;border-radius:50px;
  font-size:1rem;font-weight:600;text-decoration:none;
  box-shadow:0 4px 26px rgba(255,85,32,0.48);
  transition:all 0.2s;margin-bottom:3rem
}
.cta-btn:hover{background:#ff6b38;transform:translateY(-2px);box-shadow:0 8px 36px rgba(255,85,32,0.62)}
.cta-btn:active{transform:translateY(0)}
.cta-btn svg{width:17px;height:17px}

.taglines{position:relative;z-index:1;display:flex;gap:0.4rem 1.5rem;flex-wrap:wrap;justify-content:center;max-width:600px}
.tagline{font-size:0.78rem;color:var(--dim);font-style:italic}
.tagline b{color:var(--amber);font-style:normal;font-weight:700;margin-right:0.3rem;font-size:0.7rem;letter-spacing:0.04em}

.scroll-hint{
  position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);
  display:flex;flex-direction:column;align-items:center;gap:0.4rem;
  color:var(--dim);font-size:0.67rem;letter-spacing:0.14em;text-transform:uppercase;
  animation:bob 2.8s ease-in-out infinite
}
.scroll-hint-bar{width:1px;height:34px;background:linear-gradient(to bottom,rgba(255,85,32,0.6),transparent)}
@keyframes bob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(7px)}}

/* DIVIDER */
hr{border:none;height:1px;background:linear-gradient(to right,transparent,rgba(255,85,32,0.2) 35%,rgba(255,85,32,0.2) 65%,transparent)}

/* SECTIONS */
.section{padding:6rem 2rem}
.section.alt{background:rgba(192,57,15,0.05)}
.wrap{max-width:1100px;margin:0 auto}
.section-label{
  display:inline-flex;align-items:center;gap:0.6rem;
  font-size:0.68rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;
  color:var(--red-bright);margin-bottom:0.9rem
}
.section-label::before{content:'';display:block;width:20px;height:1.5px;background:var(--red-bright);border-radius:2px}
h2{font-family:var(--ff-display);font-style:italic;font-size:clamp(2.2rem,5vw,3.4rem);font-weight:700;line-height:1.08;color:var(--text);margin-bottom:1rem}
.lead{font-size:1rem;color:var(--muted);max-width:480px;line-height:1.85}

/* HOW IT WORKS — horizontal illustrated steps */
.steps-row{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:3.5rem;position:relative}
.steps-row::before{
  content:'';position:absolute;top:52px;left:12.5%;right:12.5%;height:2px;
  background:linear-gradient(to right,var(--red-bright),var(--amber),var(--green-bright));
  z-index:0;border-radius:2px
}
.step{
  background:transparent;
  padding:0 1rem 2rem;position:relative;z-index:1;
  display:flex;flex-direction:column;align-items:center;text-align:center
}
.step-icon-wrap{
  width:106px;height:106px;border-radius:50%;
  background:var(--dark);border:2px solid rgba(192,57,15,0.18);
  display:flex;align-items:center;justify-content:center;
  margin-bottom:1.4rem;position:relative;overflow:hidden
}
.step-icon-wrap svg{width:100%;height:100%}
.step-t{font-size:0.95rem;font-weight:600;color:var(--text);margin-bottom:0.45rem}
.step-d{font-size:0.82rem;color:var(--muted);line-height:1.68}
.step-num{
  position:absolute;top:-4px;right:-4px;
  width:26px;height:26px;border-radius:50%;
  font-size:0.68rem;font-weight:700;
  display:flex;align-items:center;justify-content:center;
  border:2px solid var(--dark)
}

/* FEATURE CARDS */
.grid-3{display:grid;grid-template-columns:repeat(auto-fit,minmax(310px,1fr));gap:1.25rem;margin-top:3.5rem}
.card{
  background:var(--panel);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:1.9rem;
  display:flex;flex-direction:column;
  transition:border-color 0.22s,transform 0.2s,box-shadow 0.2s;
  position:relative;overflow:hidden
}
.card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px}
.card.c-red::before{background:linear-gradient(to right,var(--red-bright),transparent 70%)}
.card.c-green::before{background:linear-gradient(to right,var(--green-bright),transparent 70%)}
.card.c-amber::before{background:linear-gradient(to right,var(--amber-bright),transparent 70%)}
.card.c-blue::before{background:linear-gradient(to right,var(--blue),transparent 70%)}
.card.c-purple::before{background:linear-gradient(to right,var(--purple),transparent 70%)}
.card:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.16);box-shadow:0 16px 48px rgba(0,0,0,0.4)}
.icon-box{
  width:48px;height:48px;border-radius:var(--r-md);
  display:flex;align-items:center;justify-content:center;margin-bottom:1.1rem
}
.icon-box svg{width:22px;height:22px;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
.card.c-red .icon-box{background:rgba(255,85,32,0.14);border:1px solid rgba(255,85,32,0.22)}
.card.c-red .icon-box svg{stroke:var(--red-bright)}
.card.c-green .icon-box{background:rgba(61,214,140,0.12);border:1px solid rgba(61,214,140,0.2)}
.card.c-green .icon-box svg{stroke:var(--green-bright)}
.card.c-amber .icon-box{background:rgba(255,170,68,0.12);border:1px solid rgba(255,170,68,0.2)}
.card.c-amber .icon-box svg{stroke:var(--amber-bright)}
.card.c-blue .icon-box{background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.2)}
.card.c-blue .icon-box svg{stroke:var(--blue)}
.card.c-purple .icon-box{background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.2)}
.card.c-purple .icon-box svg{stroke:var(--purple)}
.card-t{font-size:0.98rem;font-weight:600;color:var(--text);margin-bottom:0.5rem}
.card-d{font-size:0.86rem;color:var(--muted);line-height:1.72;flex:1}
.tag{
  display:inline-block;margin-top:1rem;
  font-size:0.66rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
  border-radius:50px;padding:0.2rem 0.65rem;
  border:1px solid
}
.tag-red{color:var(--red-bright);background:rgba(255,85,32,0.1);border-color:rgba(255,85,32,0.22)}
.tag-green{color:var(--green-bright);background:rgba(61,214,140,0.1);border-color:rgba(61,214,140,0.22)}
.tag-amber{color:var(--amber-bright);background:rgba(255,170,68,0.1);border-color:rgba(255,170,68,0.22)}
.tag-blue{color:var(--blue);background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.22)}
.tag-purple{color:var(--purple);background:rgba(168,85,247,0.1);border-color:rgba(168,85,247,0.22)}

/* WHO IT'S FOR */
.who-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(290px,1fr));gap:1.5rem;margin-top:3.5rem}
.who-card{
  border-radius:var(--r-xl);padding:2.2rem 2rem;border:1px solid var(--border);
  display:flex;flex-direction:column;gap:0.55rem;
  position:relative;overflow:hidden;
  transition:border-color 0.22s,transform 0.2s
}
.who-card:hover{transform:translateY(-4px)}
.who-card-art{position:absolute;top:0;right:0;width:160px;height:160px;opacity:0.12;pointer-events:none}
.who-card.s{background:linear-gradient(135deg,rgba(255,85,32,0.06) 0%,rgba(0,0,0,0) 60%);border-color:rgba(255,85,32,0.28)}
.who-card.s:hover{border-color:rgba(255,85,32,0.6)}
.who-card.r{background:linear-gradient(135deg,rgba(61,214,140,0.06) 0%,rgba(0,0,0,0) 60%);border-color:rgba(61,214,140,0.25)}
.who-card.r:hover{border-color:rgba(61,214,140,0.55)}
.who-card.a{background:linear-gradient(135deg,rgba(255,170,68,0.06) 0%,rgba(0,0,0,0) 60%);border-color:rgba(255,170,68,0.25)}
.who-card.a:hover{border-color:rgba(255,170,68,0.55)}
.badge{
  font-size:0.66rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
  padding:0.26rem 0.7rem;border-radius:50px;align-self:flex-start;border:1px solid;margin-bottom:0.3rem
}
.s .badge{color:var(--red-bright);background:rgba(255,85,32,0.12);border-color:rgba(255,85,32,0.25)}
.r .badge{color:var(--green-bright);background:rgba(61,214,140,0.1);border-color:rgba(61,214,140,0.22)}
.a .badge{color:var(--amber-bright);background:rgba(255,170,68,0.1);border-color:rgba(255,170,68,0.22)}
.who-title{font-family:var(--ff-display);font-size:1.4rem;font-weight:700;color:var(--text)}
.who-desc{font-size:0.87rem;color:var(--muted);line-height:1.72}
.who-list{list-style:none;margin-top:0.6rem;display:flex;flex-direction:column;gap:0.45rem}
.who-list li{font-size:0.82rem;color:var(--muted);padding-left:1.3rem;position:relative;line-height:1.5}
.who-list li::before{content:'→';position:absolute;left:0;font-size:0.72rem;top:1px}
.s .who-list li::before{color:var(--red-bright)}
.r .who-list li::before{color:var(--green-bright)}
.a .who-list li::before{color:var(--amber-bright)}

/* LANGUAGES + CHANNELS */
.two-col{display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start}
.chips{display:flex;flex-wrap:wrap;gap:0.6rem;margin-top:1.8rem}
.chip{
  background:var(--panel);border:1px solid var(--border);
  border-radius:50px;padding:0.42rem 1rem;
  font-size:0.84rem;color:var(--muted);font-style:italic;
  transition:border-color 0.2s,color 0.2s
}
.chip:hover{border-color:rgba(255,85,32,0.4);color:var(--text)}
.chip strong{color:var(--red-bright);font-style:normal;font-weight:700;font-size:0.7rem;margin-right:0.35rem;letter-spacing:0.06em}
.channels{display:grid;grid-template-columns:1fr 1fr;gap:0.65rem;margin-top:1.8rem}
.ch{
  display:flex;align-items:center;gap:0.6rem;
  background:var(--panel);border:1px solid var(--border);
  border-radius:var(--r-md);padding:0.7rem 1rem;
  font-size:0.84rem;color:var(--muted);
  transition:border-color 0.2s
}
.ch:hover{border-color:rgba(255,85,32,0.35)}
.ch svg{width:16px;height:16px;stroke:var(--red-bright);fill:none;stroke-width:1.8;stroke-linecap:round;flex-shrink:0}
.ch span{color:var(--text);font-weight:500;font-size:0.84rem}

.incident-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(175px,1fr));gap:0.65rem;margin-top:2.5rem}
.incident-chip{
  background:var(--panel);border:1px solid var(--border);
  border-radius:var(--r-md);padding:0.75rem 1rem;
  font-size:0.8rem;color:var(--muted);line-height:1.4;
  transition:border-color 0.2s,color 0.2s
}
.incident-chip:hover{border-color:rgba(255,85,32,0.4);color:var(--text)}

/* IMPACT NUMBERS */
.numbers-strip{
  display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;
  margin-top:3.5rem;text-align:center
}
.num-card{
  padding:2.5rem 1.5rem;border-radius:var(--r-xl);
  border:1px solid var(--border);background:var(--panel);
  transition:border-color 0.22s,transform 0.2s
}
.num-card:hover{border-color:rgba(255,85,32,0.35);transform:translateY(-3px)}
.num-big{font-family:var(--ff-display);font-size:3.2rem;font-weight:900;line-height:1;margin-bottom:0.45rem}
.num-big.r{color:var(--red-bright)}
.num-big.g{color:var(--green-bright)}
.num-big.a{color:var(--amber-bright)}
.num-label{font-size:0.85rem;color:var(--muted);line-height:1.6}

/* QUOTE */
.quote-wrap{
  padding:6rem 2rem;text-align:center;
  background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(192,57,15,0.12) 0%,transparent 65%)
}
.quote-inner{max-width:700px;margin:0 auto}
.q-mark{font-family:var(--ff-display);font-size:6rem;line-height:0.35;color:rgba(255,85,32,0.25);display:block;margin-bottom:1.8rem}
.q-rule{width:42px;height:2px;background:var(--red-bright);border-radius:2px;margin:0 auto 1.4rem}
.q-text{font-family:var(--ff-display);font-size:clamp(1.25rem,3.5vw,1.95rem);font-weight:700;font-style:italic;line-height:1.48;color:var(--text);margin-bottom:1.4rem}
.q-attr{font-size:0.76rem;color:var(--dim);letter-spacing:0.1em;text-transform:uppercase}

/* FINAL CTA */
.final-cta{
  padding:7rem 2rem;text-align:center;
  background:rgba(192,57,15,0.05);border-top:1px solid var(--border);
  position:relative;overflow:hidden
}
.final-cta::before{
  content:'';position:absolute;top:-140px;left:50%;transform:translateX(-50%);
  width:800px;height:600px;pointer-events:none;
  background:radial-gradient(ellipse,rgba(255,85,32,0.18) 0%,transparent 62%)
}
.final-cta .section-label{justify-content:center}
.final-cta h2{position:relative;font-size:clamp(2rem,5vw,3.4rem);max-width:600px;margin:0 auto 1.1rem}
.final-cta p{position:relative;color:var(--muted);font-size:1rem;max-width:440px;margin:0 auto 2.8rem;line-height:1.8}
.app-url{
  position:relative;display:inline-flex;align-items:center;gap:0.35rem;
  color:var(--red-bright);text-decoration:none;font-size:0.85rem;font-weight:600;margin-top:1.5rem;
  border-bottom:1.5px solid rgba(255,85,32,0.3);padding-bottom:2px;
  transition:all 0.2s
}
.app-url:hover{color:var(--amber-bright);border-color:var(--amber-bright)}
.app-url svg{width:12px;height:12px}

/* FOOTER */
footer{background:rgba(192,57,15,0.08);border-top:1px solid var(--border);padding:3.5rem 2rem 2.5rem}
.footer-wrap{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:2fr 1fr 1fr;gap:3rem}
.foot-logo{font-family:var(--ff-display);font-size:1.3rem;font-weight:900;letter-spacing:0.07em;color:var(--muted);margin-bottom:0.7rem}
.foot-logo span{color:var(--red-bright)}
.foot-desc{font-size:0.8rem;color:var(--dim);line-height:1.68;max-width:220px}
.foot-col h4{font-size:0.68rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:var(--muted);margin-bottom:1rem}
.foot-col a{display:block;color:var(--dim);text-decoration:none;font-size:0.82rem;margin-bottom:0.55rem;transition:color 0.2s}
.foot-col a:hover{color:var(--text)}
.foot-bottom{
  max-width:1100px;margin:2.5rem auto 0;
  border-top:1px solid var(--border);padding-top:1.5rem;
  display:flex;justify-content:space-between;align-items:center;
  font-size:0.76rem;color:var(--dim);flex-wrap:wrap;gap:0.5rem
}

@media(max-width:900px){
  .steps-row{grid-template-columns:1fr 1fr;gap:1.5rem}
  .steps-row::before{display:none}
  .two-col{grid-template-columns:1fr;gap:3rem}
}
@media(max-width:768px){
  nav{padding:0.4rem 0.4rem 0.4rem 1.2rem;gap:0.8rem;width:calc(100% - 1.5rem);max-width:440px}
  nav ul{display:none}
  .nav-btn{padding:0.5rem 1rem;font-size:0.78rem}
  .logo{font-size:1.2rem}
  .section{padding:4rem 1.1rem}
  .hero{padding:6rem 1.1rem 4rem}
  .channels{grid-template-columns:1fr}
  .numbers-strip{grid-template-columns:1fr;gap:1rem}
  .footer-wrap{grid-template-columns:1fr;gap:2rem}
  .foot-bottom{flex-direction:column;text-align:center}
  .steps-row{grid-template-columns:1fr 1fr;gap:2rem}
  .grid-3,.who-grid{grid-template-columns:1fr;gap:1rem}
  .incident-grid{grid-template-columns:1fr 1fr}
  .quote-wrap,.final-cta{padding:4.5rem 1.1rem}
}
@media(max-width:500px){
  h1{font-size:clamp(2.4rem,11vw,3.4rem);line-height:1.05}
  .hero-sub{font-size:0.95rem;margin-bottom:2rem}
  .eyebrow{font-size:0.82rem;text-align:center;padding:0 0.5rem;gap:0.4rem}
  .eyebrow::before,.eyebrow::after{display:none}
  .orb-wrap{width:220px;height:220px;margin-bottom:2rem}
  .ring:nth-child(1){width:120px;height:120px}
  .ring:nth-child(2){width:170px;height:170px}
  .ring:nth-child(3){width:220px;height:220px}
  .orb{width:104px;height:104px}
  .orb-icon{width:32px;height:32px}
  .phones-row{gap:0.7rem;margin-bottom:2rem}
  .phone-shot{flex:1 1 130px;max-width:180px;border-radius:22px}
  .phone-shot img{border-radius:22px}
  .phone-shot.mid{transform:none}
  .phone-shot:hover,.phone-shot.mid:hover{transform:translateY(-6px) scale(1.02)}
  .cta-btn{padding:0.85rem 1.8rem;font-size:0.95rem;margin-bottom:2rem}
  .taglines{gap:0.3rem 1rem}
  .tagline{font-size:0.74rem}
  .store-badges{gap:0.5rem}
  .store-badge{padding:0.5rem 0.85rem}
  .store-badge strong{font-size:0.85rem}
  .num-big{font-size:2.6rem}
  .num-card{padding:1.8rem 1.2rem}
  .who-card{padding:1.8rem 1.4rem}
  .card{padding:1.5rem}
  .step-icon-wrap{width:86px;height:86px;margin-bottom:1rem}
  h2{font-size:clamp(1.8rem,7vw,2.4rem)}
  .q-text{font-size:1.15rem}
  .q-mark{font-size:4.5rem}
  .quote-wrap,.final-cta{padding:4rem 1.1rem}
  .scroll-hint{display:none}
}

.store-badges{position:relative;z-index:1;display:inline-flex;gap:0.8rem;flex-wrap:wrap;justify-content:center;margin:0 auto 1.4rem}
.store-badge{
  display:inline-flex;align-items:center;gap:0.7rem;
  background:#1a0805;color:#fff;text-decoration:none;
  padding:0.6rem 1.15rem;border-radius:12px;
  border:1px solid rgba(0,0,0,0.6);
  box-shadow:0 6px 22px rgba(42,10,4,0.18);
  transition:transform 0.2s, box-shadow 0.2s;
}
.store-badge:hover{transform:translateY(-2px);box-shadow:0 10px 28px rgba(42,10,4,0.28)}
.store-badge svg{width:22px;height:22px;fill:#fff;flex-shrink:0}
.store-badge span{display:flex;flex-direction:column;line-height:1.05;text-align:left}
.store-badge small{font-size:0.62rem;font-weight:400;opacity:0.85;letter-spacing:0.04em}
.store-badge strong{font-size:0.98rem;font-weight:700;letter-spacing:0.01em;margin-top:1px}

/* SCREENSHOT GALLERY */
.phones-row{
  position:relative;z-index:1;
  display:flex;justify-content:center;align-items:flex-end;
  gap:1.5rem;flex-wrap:wrap;
  max-width:1000px;margin:0 auto 3rem;width:100%
}
.phone-shot{
  flex:1 1 220px;max-width:280px;
  border-radius:32px;overflow:hidden;
  filter:drop-shadow(0 22px 40px rgba(192,57,15,0.28));
  transition:transform 0.4s cubic-bezier(.34,1.56,.64,1)
}
.phone-shot img{display:block;width:100%;height:auto;border-radius:32px}
.phone-shot.mid{transform:translateY(-30px) scale(1.06)}
.phone-shot:hover{transform:translateY(-44px) scale(1.08)}
.phone-shot.mid:hover{transform:translateY(-50px) scale(1.12)}
@media(max-width:768px){
  .phone-shot.mid{transform:none}
  .phone-shot.mid:hover{transform:translateY(-8px) scale(1.02)}
}
h1 em,h2 em{font-style:normal;color:var(--red-bright)}
.eyebrow,.tagline,.chip,.q-text{font-style:normal !important}

/* PHONE FLOAT */
@keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
@keyframes floatyMid{0%,100%{transform:translateY(-30px) scale(1.06)}50%{transform:translateY(-46px) scale(1.06)}}
.phone-shot{animation:floaty 5.5s ease-in-out infinite}
.phone-shot:nth-child(1){animation-delay:-1.5s}
.phone-shot:nth-child(3){animation-delay:-3s}
.phone-shot.mid{animation:floatyMid 5.5s ease-in-out infinite}

/* HERO GRADIENT TEXT SHEEN */
h1 em{background:linear-gradient(90deg,#ff5520 0%,#ffaa44 50%,#ff5520 100%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:sheen 4s ease-in-out infinite}
@keyframes sheen{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

/* SCROLL REVEAL */
.reveal{opacity:0;transform:translateY(28px);transition:opacity 0.9s cubic-bezier(.2,.7,.2,1),transform 0.9s cubic-bezier(.2,.7,.2,1)}
.reveal.in{opacity:1;transform:translateY(0)}
.reveal-delay-1{transition-delay:0.08s}
.reveal-delay-2{transition-delay:0.16s}
.reveal-delay-3{transition-delay:0.24s}

/* CARD SHEEN ON HOVER */
.card,.who-card,.num-card{position:relative;overflow:hidden}
.card::after,.who-card::after,.num-card::after{content:'';position:absolute;top:0;left:-75%;width:50%;height:100%;background:linear-gradient(120deg,transparent,rgba(255,255,255,0.35),transparent);transform:skewX(-20deg);transition:left 0.7s ease;pointer-events:none;z-index:1}
.card:hover::after,.who-card:hover::after,.num-card:hover::after{left:130%}
.card:hover{transform:translateY(-6px);border-color:rgba(255,85,32,0.4);box-shadow:0 18px 50px rgba(192,57,15,0.18)}

/* ORB ICON GLOW */
.orb-icon{filter:drop-shadow(0 2px 6px rgba(0,0,0,0.25))}

/* STORE BADGE BOUNCE */
.store-badge{animation:floaty 4s ease-in-out infinite}
.store-badge:nth-child(2){animation-delay:-2s}

/* HAMBURGER + MOBILE MENU */
.hamburger{display:none;width:42px;height:42px;border-radius:50%;border:1px solid rgba(192,57,15,0.18);background:rgba(255,255,255,0.6);align-items:center;justify-content:center;flex-direction:column;gap:4px;cursor:pointer;padding:0;flex-shrink:0;transition:background 0.2s}
.hamburger:hover{background:rgba(255,255,255,0.9)}
.hamburger span{display:block;width:18px;height:2px;background:var(--text);border-radius:2px;transition:transform 0.25s,opacity 0.2s}
.hamburger.open span:nth-child(1){transform:translateY(6px) rotate(45deg)}
.hamburger.open span:nth-child(2){opacity:0}
.hamburger.open span:nth-child(3){transform:translateY(-6px) rotate(-45deg)}
.mobile-menu{position:fixed;top:5.2rem;left:50%;transform:translateX(-50%) translateY(-12px);width:calc(100% - 1.5rem);max-width:440px;z-index:99;background:rgba(255,242,236,0.96);backdrop-filter:blur(22px) saturate(1.5);border:1px solid rgba(192,57,15,0.18);border-radius:22px;box-shadow:0 14px 40px rgba(192,57,15,0.22);padding:1rem;display:none;flex-direction:column;gap:0.35rem;opacity:0;transition:opacity 0.22s ease,transform 0.22s ease;outline:none}
.mobile-menu.open{display:flex;opacity:1;transform:translateX(-50%) translateY(0)}
.mobile-menu a{padding:0.85rem 1rem;border-radius:14px;font-size:0.95rem;font-weight:500;color:var(--text);text-decoration:none;transition:background 0.18s;outline-offset:2px}
.mobile-menu a:hover,.mobile-menu a:focus{background:rgba(192,57,15,0.07);outline:2px solid rgba(192,57,15,0.25)}
.mobile-menu .nav-btn{margin-top:0.4rem;text-align:center;color:#fff;outline-offset:2px}
.mobile-menu .nav-btn:hover,.mobile-menu .nav-btn:focus{background:#ff6b38;color:#fff}
.mobile-scrim{position:fixed;inset:0;background:rgba(42,10,4,0.32);backdrop-filter:blur(2px);z-index:98;opacity:0;pointer-events:none;transition:opacity 0.22s ease}
.mobile-scrim.open{opacity:1;pointer-events:auto}
body.menu-open{overflow:hidden}
@media(max-width:768px){
  .hamburger{display:flex}
  .nav-btn-desktop{display:none}
}

`;

const PAGE_HTML = String.raw`<!-- NAV -->
<nav id="nav">
  <a href="#" class="logo">BE<span>KA</span></a>
  <ul>
    <li><a href="#how">How it works</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#who">Who it's for</a></li>
  </ul>
  <a href="https://safe4all.online" target="_blank" rel="noopener" class="nav-btn nav-btn-desktop">Open App ↗</a>
  <button id="hamburger" class="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu" type="button">
    <span></span><span></span><span></span>
  </button>
</nav>

<!-- MOBILE MENU -->
<div id="mobile-menu" class="mobile-menu" role="dialog" aria-modal="true" aria-label="Main navigation" aria-hidden="true" tabindex="-1">
  <a href="#how" tabindex="0">How it works</a>
  <a href="#features" tabindex="0">Features</a>
  <a href="#who" tabindex="0">Who it's for</a>
  <a href="https://safe4all.online" target="_blank" rel="noopener" class="nav-btn" tabindex="0">Open App ↗</a>
</div>
<div id="mobile-scrim" class="mobile-scrim" aria-hidden="true"></div>


<!-- HERO -->
<section class="hero">
  <div class="eyebrow"><i></i> Safe4All · GBV Emergency Response · Zambia</div>

  <h1>When seconds matter,<br><em>one tap</em> calls for help.</h1>

  <p class="hero-sub">BEKA is a secure, multilingual platform connecting survivors of gender-based violence to responders, shelters, and legal aid — instantly and discreetly.</p>

  <!-- HERO VISUAL — real app screenshots -->
  <div class="phones-row">
    <div class="phone-shot"><img src="/__l5e/assets-v1/25f783f7-de1a-4cb4-8dc0-8f570c8a8e09/app-contacts-form.jpg" alt="BEKA app — add emergency contact screen" loading="eager"/></div>
    <div class="phone-shot mid"><img src="/__l5e/assets-v1/c4c30970-3af0-44ed-9d92-26c90a759b12/app-help.jpg" alt="BEKA app — press to get help panic button screen" loading="eager"/></div>
    <div class="phone-shot"><img src="/__l5e/assets-v1/14d16e1e-8d68-4df8-8f39-436acd455a45/app-settings.jpg" alt="BEKA app — privacy and settings screen" loading="lazy"/></div>
  </div>

  <!-- ORB (decorative — non-functional preview) -->
  <div class="orb-wrap" aria-hidden="true">
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="ring"></div>
    <div class="orb" role="presentation">
      <svg class="orb-icon" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
      <span class="orb-text">Help Now</span>
    </div>
  </div>

  <a href="https://safe4all.online" target="_blank" rel="noopener" class="cta-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    Get BEKA Free
  </a>

  <div class="taglines">
    <span class="tagline"><b>Bemba</b> Tapali ukwikalafye.</span>
    <span class="tagline"><b>Nyanja</b> Simuli nokha.</span>
    <span class="tagline"><b>Tonga</b> Tamuli yeka yeka.</span>
    <span class="tagline"><b>Lozi</b> Ha mu inzi mwanaa.</span>
    <span class="tagline"><b>Kaonde</b> Tamwena bene.</span>
  </div>

  <div class="scroll-hint"><div class="scroll-hint-bar"></div>scroll</div>
</section>

<hr>

<!-- HOW IT WORKS -->
<section id="how" class="section alt">
  <div class="wrap">
    <div class="section-label">How it works</div>
    <h2>From alert to assistance<br>in four steps</h2>
    <p class="lead">Offline-resilient and location-aware — designed to work in the moment that matters most.</p>
    <div class="steps-row">

      <!-- Step 1 -->
      <div class="step">
        <div class="step-icon-wrap">
          <div class="step-num" style="background:#ff5520;color:#fff">01</div>
          <svg viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
            <circle cx="53" cy="53" r="53" fill="rgba(255,85,32,0.08)"/>
            <circle cx="53" cy="53" r="35" fill="rgba(255,85,32,0.12)" stroke="rgba(255,85,32,0.35)" stroke-width="1.5"/>
            <circle cx="53" cy="53" r="22" fill="rgba(255,85,32,0.22)" stroke="rgba(255,85,32,0.55)" stroke-width="1"/>
            <circle cx="53" cy="53" r="12" fill="#ff5520"/>
            <rect x="49" y="39" width="8" height="16" rx="4" fill="white"/>
            <circle cx="53" cy="61" r="4" fill="white"/>
          </svg>
        </div>
        <div class="step-t">Press the panic button</div>
        <div class="step-d">One tap triggers an emergency alert with GPS — even when offline.</div>
      </div>

      <!-- Step 2 -->
      <div class="step">
        <div class="step-icon-wrap">
          <div class="step-num" style="background:#3dd68c;color:#0a2a1a">02</div>
          <svg viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
            <circle cx="53" cy="53" r="53" fill="rgba(61,214,140,0.07)"/>
            <!-- phone sending -->
            <rect x="36" y="30" width="34" height="52" rx="6" fill="rgba(61,214,140,0.15)" stroke="rgba(61,214,140,0.45)" stroke-width="1.2"/>
            <rect x="40" y="36" width="26" height="32" rx="3" fill="rgba(61,214,140,0.1)"/>
            <!-- signal waves -->
            <path d="M74 38 Q82 47 74 56" fill="none" stroke="rgba(61,214,140,0.5)" stroke-width="1.5" stroke-linecap="round"/>
            <path d="M78 34 Q89 47 78 60" fill="none" stroke="rgba(61,214,140,0.35)" stroke-width="1.2" stroke-linecap="round"/>
            <!-- message -->
            <rect x="40" y="40" width="26" height="14" rx="3" fill="rgba(61,214,140,0.25)"/>
            <rect x="43" y="44" width="14" height="2" rx="1" fill="rgba(61,214,140,0.7)"/>
            <rect x="43" y="49" width="10" height="2" rx="1" fill="rgba(61,214,140,0.5)"/>
          </svg>
        </div>
        <div class="step-t">Contacts are notified</div>
        <div class="step-d">Your emergency contacts get an SMS with your name and live location link.</div>
      </div>

      <!-- Step 3 -->
      <div class="step">
        <div class="step-icon-wrap">
          <div class="step-num" style="background:#3b82f6;color:#fff">03</div>
          <svg viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
            <circle cx="53" cy="53" r="53" fill="rgba(59,130,246,0.07)"/>
            <!-- map -->
            <rect x="28" y="28" width="50" height="50" rx="8" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.4)" stroke-width="1.2"/>
            <!-- map roads -->
            <line x1="28" y1="53" x2="78" y2="53" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <line x1="53" y1="28" x2="53" y2="78" stroke="rgba(255,255,255,0.15)" stroke-width="1"/>
            <!-- location marker -->
            <circle cx="42" cy="45" r="5" fill="rgba(255,85,32,0.3)" stroke="#ff5520" stroke-width="1"/>
            <circle cx="42" cy="45" r="2.5" fill="#ff5520"/>
            <!-- responder vehicle -->
            <rect x="55" y="56" width="14" height="9" rx="2" fill="rgba(59,130,246,0.6)" stroke="rgba(59,130,246,0.9)" stroke-width="1"/>
            <rect x="57" y="58" width="5" height="4" rx="1" fill="rgba(255,255,255,0.4)"/>
            <!-- arrow from vehicle to marker -->
            <line x1="55" y1="53" x2="46" y2="48" stroke="rgba(59,130,246,0.7)" stroke-width="1.2" stroke-dasharray="3 2" marker-end="url(#ah-step)"/>
            <defs><marker id="ah-step" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M2 1L8 5L2 9" fill="none" stroke="rgba(59,130,246,0.9)" stroke-width="1.5" stroke-linecap="round"/></marker></defs>
          </svg>
        </div>
        <div class="step-t">Responders dispatched</div>
        <div class="step-d">Police, VSU, or shelter units are alerted and head to your location.</div>
      </div>

      <!-- Step 4 -->
      <div class="step">
        <div class="step-icon-wrap">
          <div class="step-num" style="background:#ffaa44;color:#2a1800">04</div>
          <svg viewBox="0 0 106 106" xmlns="http://www.w3.org/2000/svg">
            <circle cx="53" cy="53" r="53" fill="rgba(255,170,68,0.07)"/>
            <!-- folder/file -->
            <rect x="28" y="42" width="50" height="38" rx="6" fill="rgba(255,170,68,0.15)" stroke="rgba(255,170,68,0.45)" stroke-width="1.2"/>
            <rect x="28" y="36" width="24" height="10" rx="4" fill="rgba(255,170,68,0.25)" stroke="rgba(255,170,68,0.45)" stroke-width="1.2"/>
            <!-- lines inside -->
            <rect x="35" y="52" width="36" height="2.5" rx="1.25" fill="rgba(255,170,68,0.55)"/>
            <rect x="35" y="59" width="28" height="2.5" rx="1.25" fill="rgba(255,170,68,0.4)"/>
            <rect x="35" y="66" width="32" height="2.5" rx="1.25" fill="rgba(255,170,68,0.35)"/>
            <!-- checkmark -->
            <circle cx="68" cy="42" r="10" fill="#ffaa44"/>
            <polyline points="63,42 66.5,46 74,38" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="step-t">A case file is created</div>
        <div class="step-d">Evidence, updates, and status tracked from alert through to resolution.</div>
      </div>

    </div>
  </div>
</section>

<hr>

<!-- FEATURES -->
<section id="features" class="section">
  <div class="wrap">
    <div class="section-label">Features</div>
    <h2>Everything built into<br>one secure platform</h2>
    <div class="grid-3">

      <div class="card c-red">
        <div class="icon-box"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/></svg></div>
        <div class="card-t">Panic button</div>
        <div class="card-d">One tap sends your location and triggers alerts. Supports silent mode. Works offline with auto-retry.</div>
        <span class="tag tag-red">Core safety</span>
      </div>

      <div class="card c-red">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
        <div class="card-t">Live location sharing</div>
        <div class="card-d">Share a real-time location link with trusted contacts. Responders track your movement on the live alerts map.</div>
        <span class="tag tag-red">Safety</span>
      </div>

      <div class="card c-amber">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg></div>
        <div class="card-t">Incident reporting</div>
        <div class="card-d">A guided three-step form captures incident type, location, and evidence. Anonymous reporting available across eight categories.</div>
        <span class="tag tag-amber">Reporting</span>
      </div>

      <div class="card c-green">
        <div class="icon-box"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
        <div class="card-t">Evidence vault</div>
        <div class="card-d">Securely upload photos, audio, documents, and ZP Form 32s. Every file is time-stamped and tamper-evident for legal proceedings.</div>
        <span class="tag tag-green">Legal</span>
      </div>

      <div class="card c-green">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
        <div class="card-t">Statement builder</div>
        <div class="card-d">Build a structured incident statement covering who, what, when, where, and injuries. Export as PDF with police reference numbers.</div>
        <span class="tag tag-green">Legal</span>
      </div>

      <div class="card c-blue">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
        <div class="card-t">Response unit directory</div>
        <div class="card-d">Police, hospitals, shelters, VSUs, OSCs, and legal aid across all 10 Zambian provinces — with on-call status and contacts.</div>
        <span class="tag tag-blue">Coordination</span>
      </div>

      <div class="card c-blue">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>
        <div class="card-t">Secure messaging</div>
        <div class="card-d">Case-level messaging between survivors, responders, and staff. WhatsApp webhook integration included.</div>
        <span class="tag tag-blue">Communication</span>
      </div>

      <div class="card c-red">
        <div class="icon-box"><svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg></div>
        <div class="card-t">Emergency contacts</div>
        <div class="card-d">Save up to seven priority contacts. Each receives an SMS the moment a panic alert is triggered.</div>
        <span class="tag tag-red">Safety</span>
      </div>

      <div class="card c-purple">
        <div class="icon-box"><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <div class="card-t">Admin dashboard</div>
        <div class="card-d">Live alerts map, escalation monitoring, audit logs, and AI-generated case summaries — all in one real-time dashboard.</div>
        <span class="tag tag-purple">Admin</span>
      </div>

    </div>
  </div>
</section>

<hr>

<!-- WHO IT'S FOR -->
<section id="who" class="section alt">
  <div class="wrap">
    <div class="section-label">Who it's for</div>
    <h2>One platform.<br>Three roles.</h2>
    <div class="who-grid">

      <div class="who-card s">
        <!-- decorative art -->
        <svg class="who-card-art" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="130" cy="30" r="80" fill="rgba(255,85,32,1)"/>
          <circle cx="80" cy="80" r="40" fill="rgba(255,85,32,0.5)"/>
        </svg>
        <div class="badge">Survivor</div>
        <div class="who-title">You are not alone.</div>
        <div class="who-desc">BEKA puts safety in your hands — discreet, offline-ready, and available in your own language.</div>
        <ul class="who-list">
          <li>Panic button with silent mode</li>
          <li>Live location to trusted contacts</li>
          <li>Anonymous incident reporting</li>
          <li>Evidence vault &amp; statement builder</li>
          <li>Find shelters, VSUs &amp; legal aid</li>
        </ul>
      </div>

      <div class="who-card r">
        <svg class="who-card-art" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="130" cy="30" r="80" fill="rgba(61,214,140,1)"/>
          <circle cx="80" cy="80" r="40" fill="rgba(61,214,140,0.5)"/>
        </svg>
        <div class="badge">Responder</div>
        <div class="who-title">Reach them faster.</div>
        <div class="who-desc">Real-time alerts and precise location data so every response is faster and better-informed.</div>
        <ul class="who-list">
          <li>Instant SMS panic alert notifications</li>
          <li>Live map with survivor coordinates</li>
          <li>Case acknowledgement &amp; updates</li>
          <li>Secure staff channel messaging</li>
          <li>Dispatch coordination across units</li>
        </ul>
      </div>

      <div class="who-card a">
        <svg class="who-card-art" viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <circle cx="130" cy="30" r="80" fill="rgba(255,170,68,1)"/>
          <circle cx="80" cy="80" r="40" fill="rgba(255,170,68,0.5)"/>
        </svg>
        <div class="badge">Administrator</div>
        <div class="who-title">Oversight at every level.</div>
        <div class="who-desc">Complete visibility into the response system — from triggered alerts through to resolved cases.</div>
        <ul class="who-list">
          <li>Live alerts map &amp; command dashboard</li>
          <li>Response unit management</li>
          <li>Critical escalation monitoring</li>
          <li>Full accountability &amp; audit logs</li>
          <li>Analytics &amp; AI case summaries</li>
        </ul>
      </div>

    </div>
  </div>
</section>

<hr>

<!-- IMPACT NUMBERS -->
<section class="section">
  <div class="wrap" style="text-align:center">
    <div class="section-label" style="justify-content:center">Our reach</div>
    <h2>Built for Zambia.<br>Ready for every province.</h2>
    <div class="numbers-strip">
      <div class="num-card">
        <div class="num-big r">10</div>
        <div class="num-label">Provinces covered across the Republic of Zambia</div>
      </div>
      <div class="num-card">
        <div class="num-big g">5+</div>
        <div class="num-label">Local languages — Bemba, Nyanja, Tonga, Lozi, Kaonde</div>
      </div>
      <div class="num-card">
        <div class="num-big a">6</div>
        <div class="num-label">Access channels — App, Web, SMS, WhatsApp, USSD, Offline</div>
      </div>
    </div>
  </div>
</section>

<hr>

<!-- LANGUAGES + INCIDENT TYPES -->
<section class="section alt">
  <div class="wrap">
    <div class="two-col">
      <div>
        <div class="section-label">Incident types supported</div>
        <h2 style="font-size:clamp(1.65rem,3.5vw,2.3rem)">Covers every form<br>of gender-based violence.</h2>
        <p class="lead" style="font-size:0.9rem">Every case type that matters to survivors in Zambia is recognised and handled with appropriate care.</p>
        <div class="incident-grid">
          <div class="incident-chip">Physical Violence</div>
          <div class="incident-chip">Sexual Violence</div>
          <div class="incident-chip">Emotional Abuse</div>
          <div class="incident-chip">Economic Abuse</div>
          <div class="incident-chip">Stalking</div>
          <div class="incident-chip">Trafficking</div>
          <div class="incident-chip">Forced Marriage</div>
          <div class="incident-chip">Other</div>
        </div>
      </div>
      <div>
        <div class="section-label">Languages &amp; channels</div>
        <h2 style="font-size:clamp(1.65rem,3.5vw,2.3rem)">In your language,<br>wherever you are.</h2>
        <p class="lead" style="font-size:0.9rem">BEKA speaks five Zambian languages and works across every channel — smartphone, feature phone, or web.</p>
        <div class="chips">
          <div class="chip"><strong>BEM</strong>Tapali ukwikalafye</div>
          <div class="chip"><strong>NYA</strong>Simuli nokha</div>
          <div class="chip"><strong>TON</strong>Tamuli yeka yeka</div>
          <div class="chip"><strong>LOZ</strong>Ha mu inzi mwanaa</div>
          <div class="chip"><strong>KAO</strong>Tamwena bene</div>
          <div class="chip"><strong>ENG</strong>You are not alone</div>
        </div>
        <div class="channels" style="margin-top:1.5rem">
          <div class="ch"><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg><span>Mobile App</span></div>
          <div class="ch"><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/></svg><span>Web Browser</span></div>
          <div class="ch"><svg viewBox="0 0 24 24"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg><span>SMS</span></div>
          <div class="ch"><svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg><span>WhatsApp</span></div>
          <div class="ch"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.74 3.46 2 2 0 0 1 3.71 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.79a16 16 0 0 0 6.29 6.29l1.13-1.13a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg><span>USSD</span></div>
          <div class="ch"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg><span>Offline-ready</span></div>
        </div>
      </div>
    </div>
  </div>
</section>

<hr>

<!-- QUOTE -->
<div class="quote-wrap">
  <div class="quote-inner">
    <span class="q-mark">"</span>
    <div class="q-rule"></div>
    <div class="q-text">No survivor should face a moment of danger without a path to safety. BEKA closes that gap — one alert at a time.</div>
    <div class="q-attr">Safe4All · Gender-Based Violence Response · Republic of Zambia</div>
  </div>
</div>

<hr>

<!-- FINAL CTA -->
<section class="final-cta">
  <div class="section-label">Get started</div>
  <h2>Ready to make your<br>community safer?</h2>
  <p>BEKA is free to access for survivors, responders, NGOs, shelters, and government agencies across Zambia. Open it now — no installation needed.</p>
    <div class="store-badges">
    <a href="#" aria-label="Download on the App Store" class="store-badge">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.365 1.43c0 1.14-.467 2.23-1.23 3.02-.82.86-2.15 1.52-3.26 1.43-.13-1.12.42-2.29 1.17-3.04.84-.85 2.27-1.49 3.32-1.41zM20.5 17.49c-.49 1.14-.73 1.65-1.36 2.66-.88 1.42-2.13 3.18-3.67 3.19-1.37.01-1.72-.89-3.58-.88-1.86.01-2.24.9-3.61.89-1.54-.01-2.72-1.6-3.6-3.01C2.21 16.5 1.92 11.96 3.45 9.62c1.08-1.66 2.79-2.63 4.39-2.63 1.63 0 2.66.9 4.01.9 1.31 0 2.11-.9 4-.9 1.43 0 2.94.78 4.02 2.13-3.53 1.94-2.96 6.99.63 8.37z"/></svg>
      <span><small>Download on the</small><strong>App Store</strong></span>
    </a>
    <a href="#" aria-label="Get it on Google Play" class="store-badge">
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.6 1.85a1.5 1.5 0 0 0-.6 1.2v17.9c0 .47.21.9.56 1.18l10.16-10.13L3.6 1.85zM14.84 13.04l2.84 2.84-11.6 6.68c-.18.1-.4.16-.62.14l9.38-9.66zm0-2.08L5.46 1.3c.2-.02.42.04.6.14l11.61 6.69-2.83 2.83zM21.5 11.1l-3.21-1.85-3.05 3.05 3.05 3.05 3.21-1.85a1.5 1.5 0 0 0 0-2.4z"/></svg>
      <span><small>Get it on</small><strong>Google Play</strong></span>
    </a>
  </div>
  <br>
  <a href="https://safe4all.online" target="_blank" rel="noopener" class="cta-btn" style="position:relative">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
    Open BEKA
  </a>
  <br>
  <a href="https://safe4all.online" target="_blank" rel="noopener" class="app-url">
    safe4all.online
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
  </a>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-wrap">
    <div>
      <div class="foot-logo">BE<span>KA</span></div>
      <div class="foot-desc">A Safe4All initiative for gender-based violence emergency response across the Republic of Zambia.</div>
    </div>
    <div class="foot-col">
      <h4>Platform</h4>
      <a href="#how">How it works</a>
      <a href="#features">Features</a>
      <a href="#who">Who it's for</a>
      <a href="https://safe4all.online" target="_blank" rel="noopener">Open App ↗</a>
    </div>
    <div class="foot-col">
      <h4>Access</h4>
      <a href="https://safe4all.online" target="_blank" rel="noopener">safe4all.online</a>
      <a href="mailto:support@safe4all.zm">Contact</a>
      <a href="#">Privacy Policy</a>
    </div>
  </div>
  <div class="foot-bottom">
    <span>© 2026 Safe4All · BEKA GBV Emergency Response</span>
    <span>Built for survivors, responders &amp; communities across Zambia</span>
  </div>
</footer>`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Safe4All — GBV Emergency Response" },
      { name: "description", content: "Safe4All is a secure, multilingual GBV emergency response platform connecting survivors to responders, shelters, and legal aid across Zambia." },
      { property: "og:title", content: "Safe4All — GBV Emergency Response" },
      { property: "og:description", content: "Secure, multilingual GBV emergency response across Zambia." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fredoka+One&family=Fredoka:wght@400;500;600;700&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const handlers: Array<{ a: HTMLAnchorElement; fn: (e: Event) => void }> = [];
    document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
      const fn = (e: Event) => {
        const href = a.getAttribute("href");
        if (!href || href === "#") return;
        const t = document.querySelector(href);
        if (t) { e.preventDefault(); (t as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" }); }
      };
      a.addEventListener("click", fn);
      handlers.push({ a, fn });
    });
    const nav = document.getElementById("nav");
    const onScroll = () => {
      if (nav) nav.style.background = window.scrollY > 50 ? "rgba(255,242,236,0.92)" : "rgba(255,242,236,0.7)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Mobile menu toggle
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobile-menu");
    const scrim = document.getElementById("mobile-scrim");
    const closeMenu = () => {
      hamburger?.classList.remove("open");
      mobileMenu?.classList.remove("open");
      scrim?.classList.remove("open");
      hamburger?.setAttribute("aria-expanded", "false");
      mobileMenu?.setAttribute("aria-hidden", "true");
      document.body.classList.remove("menu-open");
    };
    const toggleMenu = () => {
      const willOpen = !hamburger?.classList.contains("open");
      hamburger?.classList.toggle("open", willOpen);
      mobileMenu?.classList.toggle("open", willOpen);
      scrim?.classList.toggle("open", willOpen);
      hamburger?.setAttribute("aria-expanded", willOpen ? "true" : "false");
      mobileMenu?.setAttribute("aria-hidden", willOpen ? "false" : "true");
      document.body.classList.toggle("menu-open", willOpen);
    };
    hamburger?.addEventListener("click", toggleMenu);
    scrim?.addEventListener("click", closeMenu);
    const mobileLinks = mobileMenu?.querySelectorAll("a") ?? [];
    mobileLinks.forEach((a) => a.addEventListener("click", closeMenu));
    const mobileListeners = [
      { el: hamburger, type: "click", fn: toggleMenu },
      { el: scrim, type: "click", fn: closeMenu },
      ...Array.from(mobileLinks).map((a) => ({ el: a as HTMLElement, type: "click", fn: closeMenu })),
    ] as const;



    // Scroll reveal
    const targets = document.querySelectorAll<HTMLElement>(
      '.section .wrap > *, .card, .who-card, .num-card, .step, .incident-chip, .chip, .ch, .quote-inner, .final-cta > *'
    );
    targets.forEach((el, i) => {
      el.classList.add('reveal');
      if (i % 3 === 1) el.classList.add('reveal-delay-1');
      if (i % 3 === 2) el.classList.add('reveal-delay-2');
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    targets.forEach((el) => io.observe(el));

    return () => {
      handlers.forEach(({ a, fn }) => a.removeEventListener("click", fn));
      window.removeEventListener("scroll", onScroll);
      mobileListeners.forEach(({ el, type, fn }) => el?.removeEventListener(type, fn));
      io.disconnect();
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_CSS }} />
      <div dangerouslySetInnerHTML={{ __html: PAGE_HTML }} />
    </>
  );
}
