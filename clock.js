const sec = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

/**
 *
 * @param format
 */
const formatClock = format =>
        time =>
            format.replace('hh', time.h)
            .replace('mm', time.m)
            .replace('ss', time.s)
            .replace('tt', time.f);

/**
 *
 * @param key
 */
const prependZero = key => clockTime =>
    ({
      ...clockTime,
      [key]: (clockTime[key] < 10) ? '0' + clockTime[key] : clockTime[key]
    });

/**
 *
 * @param civilianTime
 */
const doubleDigits = civilianTime =>
    compose(
        prependZero('h'),
        prependZero('m'),
        prependZero('s')
    )(civilianTime);

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
      f: (clockTime.h >= 12) ? 'PM' : 'AM'
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
            doubleDigits,
            formatClock('hh:mm:ss tt'),
            display(log)
        ),
        sec()
    );

startTicking();