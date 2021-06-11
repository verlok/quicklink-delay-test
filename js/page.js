{
    const queue = [];
    const fakePrefetchTime = 1000; //TODO: make a config

    let throttle,
        delay,
        countPrefetching = 0,
        countPrefetched = 0;

    const $button = document.querySelector("button");
    const $delay = document.querySelector("#delay");
    const $throttle = document.querySelector("#throttle");
    const $prefetching = document.querySelector("#prefetching");
    const $prefetched = document.querySelector("#prefetched");

    const fakePrefetch = (el) => {
        countPrefetching += 1;
        $prefetching.innerHTML = countPrefetching;
        el.classList.add("fetch-started");
        setTimeout(() => {
            countPrefetching -= 1;
            $prefetching.innerHTML = countPrefetching;
            countPrefetched += 1;
            $prefetched.innerHTML = countPrefetched;
            el.classList.add("fetch-completed");
            manageQueue();
        }, fakePrefetchTime);
    };

    const manageQueue = () => {
        for (let i = 0; i < queue.length; i += 1) {
            if (countPrefetching >= throttle) return;
            const el = queue.shift();
            fakePrefetch(el);
        }
    };

    const enqueuePrefetch = (el) => {
        queue.push(el);
        manageQueue();
    };
    const onenter = (el) => {
        const timer = setTimeout(() => {
            enqueuePrefetch(el);
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

    const start = () => {
        $button.disabled = true;
        delay = $delay.value;
        throttle = $throttle.value;
        new LazyLoad({
            elements_selector: "article",
            callback_enter: onenter,
            callback_exit: onexit,
            cancel_on_exit: false,
            threshold: 0
        });
    };
    $button.addEventListener("click", start);
}
