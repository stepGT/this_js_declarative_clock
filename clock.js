const sec = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

/**
 * Получает шаблонную строку и использует ее для возвращения
 * показания времени, отформатированного по критериям, заданным строкой.
 * В данном примере шаблон имеет вид hh:mm:ss tt. Таким образом, formatClock
 * будет заменять заполнители показаниями часов, минут, секунд и времени суток.
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
 * Получает в качестве аргумента ключ объекта и ставит нуль впереди значения,
 * хранящегося под * этим ключом объекта. Функция получает ключ к указанному
 * полю и ставит перед значениями нуль, если значение меньше 10.
 *
 * @param key
 */
const prependZero = key => clockTime =>
    ({
      ...clockTime,
      [key]: (clockTime[key] < 10) ? '0' + clockTime[key] : clockTime[key]
    });

/**
 * Функция, получающая в качестве аргумента показание времени и обеспечивающая
 * отображение часов, минут и секунд парой цифр, подставляя для этого ноль, где
 * необходимо.
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
 * Функция, получающая в качестве аргумента
 * показание времени и преобразующая его в формат гражданского времени с
 * помощью обеих форм этого времени.
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
 * display — получает функцию цели target и возвращает функцию, которая будет
 * отправлять время в адрес цели.
 */
const display = target => time => target(time);

/**
 * Запускает часы, устанавливая интервал, вызывающий функцию
 * обратного вызова каждую секунду. Функция обратного вызова представляет
 * собой композицию из всех наших функций. Каждую секунду консоль очищается,
 * получается текущее время, показание которого проходит преобразование,
 * перевод в гражданский формат, форматирование и отображение.
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