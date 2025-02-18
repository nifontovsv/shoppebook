import React from 'react';
import s from './ButtonForm.module.scss';

const ButtonForm = ({ title, width, book }) => {
	return (
		<button style={{ width: `${width}` }} className={s.formBtn}>
			{title}
		</button>
	);
};

export default ButtonForm;
