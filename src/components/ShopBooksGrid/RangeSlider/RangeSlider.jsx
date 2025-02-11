import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch, useSelector } from 'react-redux';
import { setPriceRange } from '../../../store/reducers/booksListReducer';

function valuetext(value) {
	return `${value}`;
}

export default function RangeSlider() {
	const dispatch = useDispatch();
	const { minPrice, maxPrice } = useSelector((state) => state.booksList);

	const handleChange = (event, newValue) => {
		dispatch(setPriceRange({ min: newValue[0], max: newValue[1] }));
	};

	return (
		<div>
			<Box sx={{ width: '100%' }}>
				<Slider
					getAriaLabel={() => 'Temperature range'}
					value={[minPrice, maxPrice]}
					onChange={handleChange}
					min={0}
					max={100000}
					valueLabelDisplay='off'
					getAriaValueText={valuetext}
					sx={{
						color: '#565656',
						height: 4,
						borderRadius: 0,
						'& .MuiSlider-track': {
							bgcolor: 'black',
							border: 'none',
						},

						'& .MuiSlider-thumb': {
							height: 15,
							width: 15,
							backgroundColor: '#000000',
							border: 'none',
							'&:focus, &:hover, &.Mui-active': {
								boxShadow: 'none',
							},
							'&:focus-visible': {
								outline: 'none',
							},
						},
						'&:focus': {
							outline: 'none',
						},
						'& .MuiSlider-valueLabel': {
							backgroundColor: 'black',
							boxShadow: 'none',
						},
					}}
				/>
			</Box>
			<div style={{ display: 'flex', justifyContent: 'space-between', color: '#565656' }}>
				<span>
					Price: ${minPrice} - ${maxPrice}
				</span>
				<span>Filter</span>
			</div>
		</div>
	);
}
