# 📚 Shoppe Book

### 💿 Демо версия: https://nifontovsv.github.io/shoppebook

## О проекте:

**Shoppe Book** - веб-приложение для поиска и покупки книг.

## 📌 Функционал

- Реализован поиск книг по названию 🔍

  - Это позволяет пользователям вводить название книги в строку поиска и мгновенно находить соответствующие книги в базе данных.

- Фильтрация книг по параметрам 🛠
  - Функциональность фильтрации позволяет пользователям ограничивать выборку книг по нескольким критериям:
    Категория — пользователи могут выбирать книги по жанру (например: история, путешествия, психология и т.д.).  
    Цена — можно фильтровать книги по диапазону цен, чтобы показывать только те книги, которые соответствуют выбранному бюджету.
    Наличие на складе — этот фильтр помогает отображать только те книги, которые есть в наличии (и исключать те, которые временно отсутствуют).
- Добавление, удаление товара в корзину и удаление из нее 🛒
  - Когда пользователь нажимает кнопку "Добавить в корзину", товар автоматически добавляется в корзину, и его количество (если уже есть в корзине) увеличивается на единицу.Если товар еще не был добавлен в корзину, то он появляется в корзине с начальной единицей товара. При удалении товара, сумма всех оставшихся товаров пересчитывается.
- Пагинация списка книг 📄
  - Улучшает производительность и упрощает навигацию по большому количеству книг.
- Детальная информация о книге 📖
  - Пользователь может кликнуть на название или обложку книги, чтобы перейти на страницу с детальной информацией. Это станет хорошей возможностью ознакомиться с книгой перед её покупкой.
- Сохранение избранных книг ❤️
  - Пользователи могут сохранять книги в избранное для быстрого доступа в будущем. Это особенно полезно, если они не готовы купить книгу сразу, но хотят вернуться к ней позже.
- Возможность оставлять рейтинг и отзывы под каждой книгой ⭐️
  - Пользователи могут оставить оценку и отзывы для книг, что помогает другим покупателям принимать решение о покупке.
- "Цитата дня" 💭
  - Функционал "Цитата дня" представляет собой интерактивный элемент, который позволяет пользователям получать цитату каждый день по их запросу, нажимая на кнопку.

## Используется Google Books API для получения данных о книгах.

📄 Документация: https://developers.google.com/books/docs/v1/using?hl=ru

```javascript
export const fetchPopularBooks = createAsyncThunk(
	'books/fetchPopularBooks',
	async () => {
		const response = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=history+popular&maxResults=18&orderBy=relevance&key=${API_KEY}`
		);
		const data = await response.json();
		return data.items || [];
	}
);
```

## 🛠 Инструменты, которые использовались в разработке проекта

- Redux Toolkit для управления состоянием
- React Router для маршрутизации
- CLSX для стилизации
- createAsyncThunk для работы с API
- использовались createSlice при создание reducers, вместо 'switch case'. Это упростило синтаксис и разработку в целом.

| Category        | Technologies                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend        | [![React](https://img.shields.io/static/v1?label=&message=React&color=61DAFB&logo=react&logoColor=FFFFFF)](https://react.dev/) [![Redux](https://img.shields.io/badge/redux-%23764ABC?logo=redux)](https://redux.js.org/)                                                                                                                                                                                                     |
| Styling         | [![SASS](https://img.shields.io/static/v1?label=&message=SASS&color=CC6699&logo=sass&logoColor=FFFFFF)](https://sass-lang.com/) [![Static Badge](https://img.shields.io/badge/Material%20UI-%23007FFF?logo=MUI&logoColor=white)](https://mui.com/) [![Static Badge](https://img.shields.io/badge/React%20Bootstrap-black?logo=React-Bootstrap&logoColor=%2341E0FD)](https://react-bootstrap.github.io/docs/components/table/) |
| Version Control | [![Git](https://img.shields.io/static/v1?label=&message=Git&color=F05032&logo=git&logoColor=FFFFFF)](https://git-scm.com/) [![GitHub](https://img.shields.io/static/v1?label=&message=GitHub&color=181717&logo=github&logoColor=FFFFFF)](https://github.com/)                                                                                                                                                                 |
| AI & Tools      | [![ChatGPT](https://img.shields.io/static/v1?label=&message=ChatGPT&color=00A67E&logo=openai&logoColor=FFFFFF)](https://openai.com/) [![Figma](https://img.shields.io/static/v1?label=&message=Figma&color=F24E1E&logo=figma&logoColor=FFFFFF)](https://www.figma.com/)                                                                                                                                                       |
| Misc            | [![Markdown](https://img.shields.io/static/v1?label=&message=Markdown&color=000000&logo=markdown&logoColor=FFFFFF)](https://www.markdownguide.org/)                                                                                                                                                                                                                                                                           |
| Editors         | [![VS Code](https://img.shields.io/static/v1?label=&message=VS%20Code&color=9013FE&logo=visualstudiocode&logoColor=FFFFFF)](https://code.visualstudio.com/)                                                                                                                                                                                                                                                                   |

## 📂 Установка и запуск

1. Клонируйте репозиторий

git clone https://github.com/nifontovsv/shoppebook.git

2. Перейдите в папку с проектом

cd shoppebook

3. Подгрузите зависимости

npm install

4. Запустите проект

npm start
