document.addEventListener('DOMContentLoaded', () => {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', String(!isExpanded));
            navMenu.classList.toggle('open');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    const revealElements = document.querySelectorAll('.reveal');
    const counters = new WeakSet();

    const formatNumber = (value, target) => {
        if (String(target).includes('.')) {
            return value.toFixed(1);
        }
        if (target >= 1000) {
            return Math.round(value).toLocaleString();
        }
        return Math.round(value).toString();
    };

    const animateCounter = (element, target) => {
        const duration = 1600;
        const start = performance.now();
        const startValue = 0;
        const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const currentValue = startValue + (target - startValue) * eased;
            element.textContent = formatNumber(currentValue, target);
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
                entry.target.querySelectorAll('[data-counter]').forEach(counterEl => {
                    if (!counters.has(counterEl)) {
                        counters.add(counterEl);
                        animateCounter(counterEl, Number(counterEl.dataset.counter));
                    }
                });
                if (entry.target.dataset && entry.target.dataset.counter && !counters.has(entry.target)) {
                    counters.add(entry.target);
                    animateCounter(entry.target, Number(entry.target.dataset.counter));
                }
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => observer.observe(el));

    document.querySelectorAll('[data-counter]').forEach(el => {
        const parentCard = el.closest('.reveal');
        if (!parentCard) {
            observer.observe(el);
        }
    });

    const copyButtons = document.querySelectorAll('.copy-email');
    copyButtons.forEach(button => {
        const email = button.dataset.email || button.getAttribute('href')?.replace('mailto:', '');
        const announce = (success) => {
            button.classList.add(success ? 'copied' : 'copy-error');
            const previousText = button.getAttribute('data-original-text') || '';
            if (!previousText) {
                button.setAttribute('data-original-text', button.textContent);
            }
            button.setAttribute('data-feedback', success ? '已复制' : '复制失败');
            if (success) {
                button.textContent = email;
            }
            setTimeout(() => {
                button.classList.remove('copied', 'copy-error');
                if (button.hasAttribute('data-original-text')) {
                    button.textContent = button.getAttribute('data-original-text');
                }
                button.removeAttribute('data-feedback');
            }, 2000);
        };

        button.addEventListener('click', async (event) => {
            if (button.tagName.toLowerCase() === 'button') {
                event.preventDefault();
            }
            if (!email) {
                announce(false);
                return;
            }
            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(email);
                    announce(true);
                } else {
                    const input = document.createElement('input');
                    input.value = email;
                    document.body.appendChild(input);
                    input.select();
                    document.execCommand('copy');
                    document.body.removeChild(input);
                    announce(true);
                }
            } catch (error) {
                console.error('复制邮箱失败', error);
                announce(false);
            }
        });
    });
});
