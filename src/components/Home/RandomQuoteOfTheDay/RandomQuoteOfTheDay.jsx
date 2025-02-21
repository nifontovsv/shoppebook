import React, { useState } from 'react';
import s from './RandomQuoteOfTheDay.module.scss';

function RandomQuoteOfTheDay() {
	const [quote, setQuote] = useState(
		'«You can never be overdressed or overeducated.» - Oscar Wilde'
	);

	const handleGetRandomQuotes = () => {
		const randomIndex = Math.floor(Math.random() * quotes.length);
		setQuote(quotes[randomIndex]);
	};

	const quotes = [
		'«You can never be overdressed or overeducated.» - Oscar Wilde',
		'«Success is not the key to happiness. Happiness is the key to success.» - Herman Cain',
		'«We do not remember days, we remember moments.» - Cesare Pavese',
		'«Always forgive your enemies. Nothing annoys them more.» - Oscar Wilde',
		'«Only two things are infinite — the universe and human stupidity, and I’m not sure about the former.» - Albert Einstein',
		'«Fake It Until You Make It! Act As If You Had All The Confidence You Require Until It Becomes Your Reality.» - Brian Tracy',
		'«The  biggest  risk  is  not  taking  any  risk.  In a  world  that’s  changing  really  quickly, the only strategy  that  is  guaranteed  to  fail  is  not  taking  risks.» - Mark Zuckerberg',
		'«Our  life  is  what  our  thoughts  make  it.» - M. Aurelius',
		'«Success is one percent inspiration, ninety-nine percent perspiration.» - Thomas Edison',
	];

	return (
		<div className={s.randomQuoteBlock}>
			<div className={s.titleBlock}>
				<h1 className={s.randomQuoteTitle}>Quote of the day</h1>
				<span className={s.line}></span>
			</div>

			<p className={s.randomQuote}>{quote}</p>
			<button onClick={handleGetRandomQuotes} className={s.randomQuoteBtn}>
				Generate quotes
			</button>
		</div>
	);
}

export default RandomQuoteOfTheDay;
