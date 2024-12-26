# Project url:
## Site: https://fhntv06.github.io/telegram-mini-apps/

### Для включения тесовых данных нужно файле useGameSocket:
1) данные initialDataGameStatus добавить как default значение в хук setData
2) изменить значение переменной initTestData на true

## График
график построен с помощью библиотеки chart.js - https://www.chartjs.org/docs/latest/

**TODO**: переписать реализацию получения данных из контекста
согласно видео: https://www.youtube.com/watch?v=k2g_Og3CFKU

Работа со слоями (100 - эталон):
0 - Main (и другие страницы)
2 - Modal и blur
(
    Появляются на только на страницах, поэтому ModalProvider и AnimationProvider оборачивают только Main,
    чтобы было глобально можно добавить настройку, которая будет регулироваться z-index и position
)
1 - PanelMenu (тк нужно располагать на всех страницах)
1 - AnimationBlock (тк анимация должна быть видна только на Main)
100 - OnboardingStats
