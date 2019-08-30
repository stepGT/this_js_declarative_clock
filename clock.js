const sec = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);
/**
 *
 * @param fns
 */
const compose = (...fns) =>
    (arg) =>
        fns.reduce(
            (composed, f) => f(composed),
            arg
        );
/**
 *
 * @param target
 */
const display = target => time => target(time);
/**
 *
 */
const startTicking = () =>
    setInterval(
        compose(
            clear,
            getCurrentTime,
            display(log)
        ),
        sec()
    );

startTicking();