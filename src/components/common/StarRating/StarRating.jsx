import { useState } from 'react';
import { Star } from 'lucide-react';
import styles from './StarRating.module.scss';

export default function StarRating({ rating, onChange, readOnly = false }) {
	const [hover, setHover] = useState(0);

	return (
		<div className={styles.starContainer}>
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={`${styles.star} ${(hover || rating) >= star ? styles.filled : ''}`}
					onClick={() => !readOnly && onChange(star)}
					onMouseEnter={() => !readOnly && setHover(star)}
					onMouseLeave={() => !readOnly && setHover(0)}
				/>
			))}
		</div>
	);
}
