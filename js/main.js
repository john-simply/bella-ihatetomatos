gsap.registerPlugin(ScrollTrigger);

function initNavigation() {
  const mainNavLinks = gsap.utils.toArray(".main-nav a");
  const mainNavLinksReversed = gsap.utils.toArray(".main-nav a").reverse();

  mainNavLinks.forEach((link) => {
    // animate hover for each link using gsap utils
    link.addEventListener("mouseleave", (e) => {
      link.classList.add("animate-out");

      setTimeout(() => {
        link.classList.remove("animate-out");
      }, 300);
    });
  });

  // gsap to tween to animate nav items
  function navAnimation(direction) {
    // if positive scrollowing down is true
    const scrollingDown = direction === 1;
    const links = scrollingDown ? mainNavLinks : mainNavLinksReversed;
    return gsap.to(links, {
      duration: 1,
      stagger: 0.5,
      autoAlpha: () => (scrollingDown ? 0 : 1),
      y: () => (scrollingDown ? 20 : 0),
      ease: "power4.out",
    });
  }

  ScrollTrigger.create({
    start: 100,
    toggleClass: {
      targets: "body",
      className: "has-scrolled",
    },
    // when scroll begins, run funtion

    // deconstructing direction from onEnter event and passing it
    onEnter: ({ direction }) => navAnimation(direction),
    onLeaveBack: ({ direction }) => navAnimation(direction),
    markers: true,
  });
}

function init() {
  initNavigation();
}

window.addEventListener("load", function () {
  init();
});
