const sec = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

/**
 *
 * @param clockTime
 */
const civilianHours = clockTime =>
    ({
      ...clockTime,
      h: (clockTime.h > 12) ? clockTime.h - 12 : clockTime.h
    });

/**
 *
 * @param clockTime
 */
const appendAMPM = clockTime =>
    ({
      ...clockTime,
      ampm: (clockTime.h >= 12) ? 'PM' : 'AM'
    });

/**
 *
 * @param clockTime
 */
const convertToCivilianTime = clockTime =>
    compose(
        appendAMPM,
        civilianHours
    )(clockTime);

/**
 *
 * @param date
 */
const abstractClockTime = date =>
    ({
      h: date.getHours(),
      m: date.getMinutes(),
      s: date.getSeconds()
    });
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
            abstractClockTime,
            convertToCivilianTime,
            display(log)
        ),
        sec()
    );

startTicking();