{
    let throttle, delay;
    const fakePrefetch = (el) => {
        el.classList.add("fetch-started");
        setTimeout(() => {
            el.classList.add("fetch-completed");
        }, 1000);
    };
    const onenter = (el) => {
        const timer = setTimeout(() => {
            fakePrefetch(el);
        }, parseInt(delay));
        el.setAttribute("data-timer", timer);
    };
    const onexit = (el) => {
        const timer = el.getAttribute("data-timer");
        if (!timer) return;
        clearTimeout(timer);
        el.removeAttribute("data-timer");
        el.classList.remove("fetch-started");
    };
    const button = document.querySelector("button");
    const start = () => {
        button.disabled = true;
        delay = document.querySelector("#delay").value;
        /*  throttle=document.querySelector("#throttle").value; */
        new LazyLoad({
            elements_selector: "article",
            callback_enter: onenter,
            callback_exit: onexit,
            cancel_on_exit: false,
            threshold: 0
        });
    };
    button.addEventListener("click", start);
}
