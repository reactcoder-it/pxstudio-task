# Приложение для публикации информации о паб-квизах и ведения рейтинга команд

В репозитории простой GraphQL-микросервис, позволяющий создавать, обновлять и удалять записи о текущих или будущих играх (паб-квизах), а также вести сравнительную таблицу и рейтинг команд, учавствующих в паб-квизах.

Микросервис написан с использованием следующих технологий: Express, ApolloServer и MongoDB.

Для обычных **юзеров** есть только одна функция - это регистрация на мероприятие. Для **админов**, возможность создавать, обновлять и удалять записи и вести таблицу с рейтингом игроков.

## Задача

Написать удобный интерфейс для приложения. На главной странице приложения должны быть карточки с датами, изображением и короткой информацией, при клике они должны раскрываться с более детальной информацией. Внутри кнопка регистрации, при нажатии на которую появляется форма регистрации. Можно сортировать карточки по городу, дате и типу игры.

Вторая страница - это таблица с текущим рейтингом команд. На этой странице,
команды должны следовать друг за другом по убыванию рейтинга.

## Требования

1. Приложение должно быть написано исключительно на Next.js;
2. На главной странице должно показываться только 8 карточек, если их больше, должен использоваться пагинатор;
3. Не должно быть лишнего кода;
4. Все должно быть в едином codestyle;
5. Интерфейс должен быть написан на Material UI;
6. Приложение должно корректно отображаться в любых браузерах и при любых разрешениях экрана;

## Дополнительно

Ограничений по технологиям кроме UI библиотеки и фреймворка Next.js нет – выбирайте любые инструменты для выполнения задания. Главное, чтобы вашим приложением можно было пользоваться в рамках описанных сценариев. Насчёт дизайна можете много не думать – ссылок, кнопок и заголовков будет достаточно.

Тем не менее сделайте это так, чтобы этим можно было пользоваться. Ведь в итоге вы будете проектировать интерфейсы для людей.
