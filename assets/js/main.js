'use strict';
(function ($) {
    gsap.registerPlugin(ScrollTrigger);
    const config = {
        init() {
            this.navbarCollapse();
            this.bannerAnimation();
            this.brandSlider();
            this.featuresAnimation();
            this.tableContent();
            this.activeOdometer();
            this.testimonialSlider();
            this.backgroundImage();
            this.fancybox();
            this.processText();
            this.activeSelect2();
            this.togglePassword();
            this.account_icon();
            this.progressCrucial();
            this.subscriptionNav();
            this.chartLine();
            this.chartPie();
            this.searchForm();
            // Scroll Animation Global Function
            this.scrollAnimation();


            this.scrollToTop();
            this.fixedHeader();
            this.activeMenuClass($("ul.sidebar-menu-list"));
            this.activeRangeSlider();
            this.sectionSubheadingBg();
            //! Project Owner Preference
            this.hideNavbar();
            this.sidebarDropdown();
            this.userDropdown();
            this.sidebarOverlay();
            this.preloader();
        },

        navbarCollapse() {
            $(window).on('scroll', function () {
                var wScroll = $(this).scrollTop();
                if (wScroll > 1) {
                    $('.navbar-main').addClass('navbar-shrink');
                } else {
                    $('.navbar-main').removeClass('navbar-shrink');
                };
            });
        },

        bannerAnimation() {
            if ($(".banner-section").length) {
                // Scroll-based animations
                gsap.to(".banner-section__image", {
                    scale: 1,
                    bottom: 0,
                    rotateX: 0,
                    scrollTrigger: {
                        trigger: ".banner-section",
                        start: "top top",
                        end: "bottom 80%",
                        scrub: true,
                    }
                });

                gsap.to(".banner-section__content", {
                    scale: .6,
                    opacity: 0,
                    scrollTrigger: {
                        trigger: ".banner-section",
                        start: "top center=-100px",
                        end: "bottom center",
                        scrub: true,
                    }
                });

                // Entrance timeline
                let tl = gsap.timeline({ delay: 0.3 });

                // Heading (h1)
                tl.from(".banner-section__content h1", {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                });

                // Highlighted span text
                tl.from(".text--base", {
                    opacity: 0,
                    y: 30,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.7");

                // Rocket SVG
                tl.from(".banner-section__rocket", {
                    scale: 0,
                    rotation: -180,
                    opacity: 0,
                    duration: 1,
                    ease: "back.out(1.7)"
                }, "-=0.7");

                // Paragraph
                tl.from(".banner-section__content p", {
                    y: 30,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.5");

                // Buttons
                tl.from(".banner-section__button", {
                    y: 40,
                    opacity: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: "power2.out"
                }, "-=0.3");

                // Banner image
                tl.from(".banner-section__image", {
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5");

                // Floating rocket (infinite loop)
                gsap.to(".banner-section__rocket", {
                    y: -10,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            }
        },


        brandSlider() {
            const brandSwiper = new Swiper('.brand__slider', {
                loop: true,
                slidesPerView: 'auto',
                centeredSlides: true,
                allowTouchMove: false,
                speed: 6000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
            });
        },

        featuresAnimation() {
            if (($(".features-section").length)) {
                const featureItems = document.querySelectorAll(".feature-list__item");
                const featureImages = document.querySelectorAll(".features-image img");
                const indicator = document.querySelector(".feature-list .indicator");

                featureItems[0].classList.add("active");
                featureImages[0].classList.add("active");

                function moveIndicator(element) {
                    const rect = element.getBoundingClientRect();
                    const parentRect = element.parentElement.getBoundingClientRect();
                    gsap.to(indicator, {
                        top: rect.top - parentRect.top + "px",
                        height: rect.height,
                        duration: 0.4,
                        ease: "power3.out"
                    });
                }
                moveIndicator(featureItems[0]);

                featureItems.forEach((item, index) => {
                    item.addEventListener("mouseenter", () => {
                        featureItems.forEach(i => i.classList.remove("active"));
                        item.classList.add("active");

                        moveIndicator(item);
                        featureImages.forEach((img, i) => {
                            img.classList.remove("active");
                            if (i === index) {
                                img.classList.add("active");
                                gsap.fromTo(img, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" });
                            }
                        });
                    });
                });
            }
        },

        tableContent() {
            if ($(".pricing-section").length) {
                let tabButtons = [...document.querySelectorAll('.tabsBox button')];
                let tabIndicator = document.querySelector('.tabsBox .indicator');
                let contetnBox = [...document.querySelectorAll('.tabsContentContainer .contentBox')];
                let activeIndex;

                animateTabs();

                tabButtons.forEach((tab, index) => {
                    tab.addEventListener('click', () => {
                        animateTabs(tab, index);
                    });
                });

                function animateTabs(tab = tabButtons[0], index = 0) {
                    if (activeIndex === index) return;
                    activeIndex = index;

                    // Move indicator
                    gsap.to(tabIndicator, {
                        x: tab.offsetLeft,
                        width: tab.offsetWidth,
                        duration: 0.3,
                        ease: "power2.out"
                    });

                    // Slide content
                    gsap.to(contetnBox, {
                        x: -index * 100 + "%",
                        duration: 0.5,
                        ease: "power2.out"
                    });

                    // Animate content text
                    let activeBox = contetnBox[index];
                    let [pricingContent, h5, p, pricingPrice, h6, li, pricingBtn] = activeBox.children;

                    gsap.timeline()
                        .fromTo([pricingContent, h5, p, pricingPrice, h6, li, pricingBtn],
                            { opacity: 0, y: 5 },
                            { opacity: 1, y: 0, duration: 0.3, ease: "power2.out", stagger: 0.2, delay: 0.2 }
                        );

                    tabButtons.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                }
            }
        },

        activeOdometer() {
            document.querySelectorAll(".odometer-counter").forEach(counter => {
                let start = +counter.dataset.start || 0;   // where it begins
                let target = +counter.dataset.target;      // where it ends
                let obj = { val: start };

                gsap.to(obj, {
                    val: target,
                    duration: 2,
                    ease: "power1.out",
                    scrollTrigger: {
                        trigger: counter,
                        start: "top 80%",
                        once: true
                    },
                    onUpdate: () => {
                        counter.textContent = Math.floor(obj.val).toLocaleString();
                    }
                });
            });
        },

        testimonialSlider() {
            const testimonialSwiper = new Swiper('.testimonial-slider', {
                slidesPerView: 3,
                spaceBetween: 24,
                speed: 700,
                autoplay: {
                    delay: 4500,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                },
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 1.2 },
                    1024: { slidesPerView: 3, },
                    1400: { slidesPerView: 3 },
                },
            });
        },

        backgroundImage() {
            $(".bg-img").css("background-image", function () {
                return `url(${$(this).data("background-image")})`;
            });

        },

        fancybox() {
            Fancybox.bind("[data-fancybox]", {

            });
        },

        processText() {
            document.querySelectorAll(".process-content__item").forEach((item) => {
                ScrollTrigger.create({
                    trigger: item,
                    start: "top 80%",
                    end: "bottom 20%",
                    onEnter: () => item.classList.add("active"),
                    onEnterBack: () => item.classList.add("active"),
                    onLeave: () => item.classList.remove("active"),
                    onLeaveBack: () => item.classList.remove("active")
                });
            });
        },

        activeSelect2() {
            $(".select2").each((index, select) => {
                $(select).wrap('<div class="select2-wrapper"></div>').select2({
                    dropdownParent: $(select).closest('.select2-wrapper')
                });
            });
        },

        togglePassword() {
            $(".toggle-password").on("click", function () {
                $(this).toggleClass("fa-eye");
                var input = $($(this).attr("id"));
                if (input.attr("type") == "password") {
                    input.attr("type", "text");
                } else {
                    input.attr("type", "password");
                }
            });
        },

        account_icon() {
            if ($(".account-icon").length) {
                gsap.from(".account-icon svg", {
                    opacity: 0,
                    scale: 0.5,
                    duration: 0.8,
                    ease: "back.out(1.7)",
                    stagger: 0.2,
                    onComplete: () => {
                        gsap.to(".account-icon svg", {
                            y: -10,
                            duration: 1.5,
                            yoyo: true,
                            repeat: -1,
                            ease: "sine.inOut",
                            stagger: 0.3
                        });
                    }
                });
            }
        },


        scrollAnimation() {
            if (window.innerWidth > 768) {
                document.querySelectorAll(".animate").forEach((elem) => {
                    const direction = elem.dataset.direction || "up";

                    // Set x/y offsets based on direction
                    let x = 0, y = 0;
                    if (direction === "up") y = 50;
                    if (direction === "down") y = -50;
                    if (direction === "left") x = 50;
                    if (direction === "right") x = -50;

                    gsap.from(elem, {
                        opacity: 0,
                        x: x,
                        y: y,
                        scale: 0.8,
                        duration: 2,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: elem,
                            start: "top 95%",
                            end: "bottom 10%",
                            toggleActions: "play none none reverse",
                            markers: false,
                        }
                    });
                });
            }
        },


        progressCrucial() {
            const containers = document.querySelectorAll('.progress-container');
            if (!containers.length) return;

            const draw = (ctx, cx, cy, r, percent) => {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

                // Track
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, 2 * Math.PI);
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#026E2E';
                ctx.stroke();

                // Progress
                ctx.beginPath();
                ctx.arc(cx, cy, r, -Math.PI / 2, (2 * Math.PI * percent / 100) - Math.PI / 2);
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#0BCD5A';
                ctx.lineCap = 'round';
                ctx.stroke();

                // Text
                ctx.fillStyle = '#fff';
                ctx.font = 'bold 12px Inter';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(Math.round(percent) + '%', cx, cy);
            };

            const animate = (ctx, cx, cy, r, target) => {
                let current = 0;
                const step = () => {
                    draw(ctx, cx, cy, r, current);
                    if (current < target) {
                        current++;
                        requestAnimationFrame(step);
                    }
                };
                step();
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const canvas = entry.target.querySelector('.progress-canvas');
                        const ctx = canvas.getContext('2d');
                        const cx = canvas.width / 2;
                        const cy = canvas.height / 2;
                        const r = (canvas.width / 2) - 8;
                        const target = entry.target.dataset.percentage;
                        animate(ctx, cx, cy, r, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            containers.forEach(el => observer.observe(el));
        },


        subscriptionNav() {

        },


        chartLine() {
            var options = {
                chart: {
                    type: 'line',
                    height: 260,
                    toolbar: { show: false },
                    background: 'transparent'
                },
                series: [{
                    name: 'Rank',
                    data: [9, 9.5, 8.8, 8.2, 8.2, 7.5, 7, 6.3, 5.8, 5, 5, 4]
                }],
                xaxis: {
                    categories: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8',
                        'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'],
                    labels: {
                        style: {
                            colors: '#fff6'
                        }
                    },
                    axisBorder: {
                        color: 'transparent'
                    },
                    axisTicks: {
                        color: 'transparent'
                    }
                },
                markers: {
                    size: 5,
                    hover: {
                        size: 7
                    }
                },
                stroke: {
                    curve: 'straight',
                    width: 3
                },
                colors: ['#28af60'],
                yaxis: {
                    reversed: true,
                    min: 1,
                    max: 10,
                    tickAmount: 9,
                    labels: {
                        style: {
                            colors: '#fff6'
                        }
                    },
                    title: false
                },
                grid: {
                    borderColor: '#ffffff14',
                },
                theme: {
                    mode: 'dark'
                },
                tooltip: {
                    theme: 'dark',
                    y: {
                        formatter: function (val) {
                            return "Rank " + val;
                        }
                    }
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart-line"), options);
            chart.render();
        },

        chartPie() {
            var options = {
                chart: {
                    type: 'pie',
                    width: 190,
                    height: 120,
                    background: 'transparent',
                },
                series: [25, 75],
                stroke: {
                    width: 0,
                    colors: ['transparent']
                },
                labels: ['Fail', 'Success'],
                colors: ['#4D4D4F', '#28af60'],
                legend: {
                    position: 'right',
                    offsetX: 0,
                    offsetY: 0,
                    labels: {
                        colors: '#fff6'
                    }
                },
                dataLabels: {
                    enabled: false
                },
                theme: {
                    mode: 'dark'
                }
            };

            var chart = new ApexCharts(document.querySelector("#chart-pie"), options);
            chart.render();
        },

        fixedHeader() {
            $(window).on("scroll", function () {
                if ($(window).scrollTop() >= 300) {
                    $(".header").addClass("fixed-header");
                } else {
                    $(".header").removeClass("fixed-header");
                }
            });
        },

        scrollToTop() {
            if ($('.progress-wrap').length > 0) {
                const progressPath = document.querySelector('.progress-wrap path');
                const pathLength = progressPath.getTotalLength();
                // Set up the initial stroke styles
                progressPath.style.transition = 'none';
                progressPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
                progressPath.style.strokeDashoffset = pathLength;
                progressPath.getBoundingClientRect();
                // Set transition for stroke-dashoffset
                progressPath.style.transition = 'stroke-dashoffset 10ms linear';
                const updateProgress = () => {
                    const scroll = $(window).scrollTop();
                    const height = $(document).height() - $(window).height();
                    const progress = pathLength - (scroll * pathLength / height);
                    progressPath.style.strokeDashoffset = progress;
                };
                updateProgress();
                $(window).on('scroll', updateProgress);
                const offset = 50;
                const duration = 550;
                $(window).on('scroll', () => {
                    $('.progress-wrap').toggleClass('active-progress', $(window).scrollTop() > offset);
                });
                $('.progress-wrap').on('click', (event) => {
                    event.preventDefault();
                    $('html, body').animate({ scrollTop: 0 }, duration);
                });
            }
        },

        activeMenuClass(selector) {
            if (!$(selector).length) return;

            let fileName = window.location.pathname.split("/").reverse()[0];
            selector.find("li").each(function () {
                let anchor = $(this).find("a");
                if ($(anchor).attr("href") == fileName) {
                    $(this).addClass("active");
                }
            });
            // if any li has active element add class
            selector.children("li").each(function () {
                if ($(this).find(".active").length) {
                    $(this).addClass("active");
                }
            });
            // if no file name return
            if ("" == fileName) {
                selector.find("li").eq(0).addClass("active");
            }
        },

        activeRangeSlider() {
            if ($('input[type="range"]').length) {
                $('input[type="range"]').each(function () {
                    $(this).rangeslider({
                        polyfill: false,

                        onSlide: function (position, value) {
                            $(this.$element)
                                .siblings(".price-value")
                                .find(".text")
                                .text(value);
                            $(this.$element).siblings('[type="hidden"]').val(value);
                            $("#earning-amount").text(value * 20 * 30);
                        },
                    });
                });
            }

            // Update earning amount when range slider changes
            $('input[type="range"]').on("change", calculateEarning);

            function calculateEarning() {
                const sellPrice = $('input[name="sell-price"]').val();
                const dailySales = $('input[name="daily-sales"]').val();
                const earningAmount = sellPrice * dailySales * 30;
                $("#earning-amount").text(earningAmount);
            }
        },

        hideNavbar() {
            $('.sidebar-menu__close, .sidebar-overlay').on('click', function () {
                $('.sidebar-menu').removeClass('show-sidebar');
                $('.sidebar-overlay').removeClass('show');
            });
        },

        sidebarDropdown() {
            $('.has-dropdown > a').click(function () {
                $('.sidebar-submenu').slideUp(200);
                if ($(this).parent().hasClass('active')) {
                    $('.has-dropdown').removeClass('active');
                    $(this).parent().removeClass('active');
                } else {
                    $('.has-dropdown').removeClass('active');
                    $(this).next('.sidebar-submenu').slideDown(200);
                    $(this).parent().addClass('active');
                }
            });
            $('.has-dropdown.active').find('.sidebar-submenu').slideDown(200);
        },

        userDropdown() {
            $('.user-info__button').on('click', function () {
                $('.user-info-dropdown').toggleClass('show');
            });
            $('.user-info__button').attr('tabindex', -1).focus();

            $('.user-info__button').on('focusout', function () {
                $('.user-info-dropdown').removeClass('show');
            });

        },

        sidebarOverlay() {
            $('.navigation-bar').on('click', function () {
                $('.sidebar-menu').addClass('show-sidebar');
                $('.sidebar-overlay').addClass('show');
            });
        },

        sectionSubheadingBg() {
            $("[data-bg*='#']").each(function () {
                const bg = $(this).data('bg');
                if (bg) {
                    $(this).css('--data-bg', bg);
                }
            });

        },

        chartLine() {
            if ($("#chart-line").length) {
                var options = {
                    chart: {
                        type: 'line',
                        height: 260,
                        toolbar: { show: false },
                        background: 'transparent'
                    },
                    series: [{
                        name: 'Rank',
                        data: [9, 9.5, 8.8, 8.2, 8.2, 7.5, 7, 6.3, 5.8, 5, 5, 4]
                    }],
                    xaxis: {
                        categories: ['Jan 1', 'Jan 2', 'Jan 3', 'Jan 4', 'Jan 5', 'Jan 6', 'Jan 7', 'Jan 8',
                            'Jan 9', 'Jan 10', 'Jan 11', 'Jan 12'],
                        labels: {
                            style: {
                                colors: '#fff6'
                            }
                        },
                        axisBorder: {
                            color: 'transparent'
                        },
                        axisTicks: {
                            color: 'transparent'
                        }
                    },
                    markers: {
                        size: 5,
                        hover: {
                            size: 7
                        }
                    },
                    stroke: {
                        curve: 'straight',
                        width: 3
                    },
                    colors: ['#28af60'],
                    yaxis: {
                        reversed: true,
                        min: 1,
                        max: 10,
                        tickAmount: 9,
                        labels: {
                            style: {
                                colors: '#fff6'
                            }
                        },
                        title: false
                    },
                    grid: {
                        borderColor: '#ffffff14',
                    },
                    theme: {
                        mode: 'dark'
                    },
                    tooltip: {
                        theme: 'dark',
                        y: {
                            formatter: function (val) {
                                return "Rank " + val;
                            }
                        }
                    }
                };

                var chart = new ApexCharts(document.querySelector("#chart-line"), options);
                chart.render();
            }
        },

        chartPie() {
            if ($("#chart-pie").length) {
                var options = {
                    chart: {
                        type: 'pie',
                        width: 190,
                        height: 120,
                        background: 'transparent',
                    },
                    series: [25, 75],
                    stroke: {
                        width: 0,
                        colors: ['transparent']
                    },
                    labels: ['Fail', 'Success'],
                    colors: ['#4D4D4F', '#28af60'],
                    legend: {
                        position: 'right',
                        offsetX: 0,
                        offsetY: 0,
                        labels: {
                            colors: '#fff6'
                        }
                    },
                    dataLabels: {
                        enabled: false
                    },
                    theme: {
                        mode: 'dark'
                    }
                };

                var chart = new ApexCharts(document.querySelector("#chart-pie"), options);
                chart.render();
            }
        },

        searchForm() {
            $('.search-action-btn').on('click', function () {
                $('.navbar-search').toggleClass('show');
            });
            $('.search-close-btn').on('click', function () {
                $('.navbar-search').removeClass('show');
            });
        },




        preloader() {
            const preloader = document.getElementById('preloader');
            if (!preloader) return;

            preloader.style.transition = 'opacity 0.8s ease, height 0.5s ease';

            setTimeout(() => {
                preloader.style.opacity = '0';
                preloader.style.height = '0';
                preloader.style.borderBottomLeftRadius = '100%';
                preloader.style.borderBottomRightRadius = '100%';
            }, 100);

            setTimeout(() => {
                preloader.style.display = 'none';
            }, 900);
        }
    }


    $(window).on("load", function () {
        ScrollTrigger.refresh();
        config.preloader();
        config.init();
    });



})(jQuery);






