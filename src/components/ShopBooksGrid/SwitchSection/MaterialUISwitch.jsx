import React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useDispatch, useSelector } from 'react-redux';
import { setInStock } from '../../../store/reducers/booksListReducer';

const IOSSwitch = styled((props) => (
	<Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
))(({ theme }) => ({
	width: 42,
	height: 26,
	padding: 0,
	margin: 0,
	'& .MuiSwitch-switchBase': {
		padding: 0,
		margin: 2,
		transitionDuration: '300ms',
		'&.Mui-checked': {
			transform: 'translateX(16px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				backgroundColor: '#65C466',
				opacity: 1,
				border: 0,
				...theme.applyStyles('dark', {
					backgroundColor: 'transparent',
				}),
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: 0.5,
			},
		},
		'&.Mui-focusVisible .MuiSwitch-thumb': {
			color: '#33cf4d',
			border: '6px solid #fff',
		},
		'&.Mui-disabled .MuiSwitch-thumb': {
			color: theme.palette.grey[100],
			...theme.applyStyles('dark', {
				color: theme.palette.grey[600],
			}),
		},
		'&.Mui-disabled + .MuiSwitch-track': {
			opacity: 0.7,
			...theme.applyStyles('dark', {
				opacity: 0.3,
			}),
		},
	},
	'& .MuiSwitch-thumb': {
		boxSizing: 'border-box',
		width: 22,
		height: 22,
	},
	'& .MuiSwitch-track': {
		borderRadius: 26 / 2,
		backgroundColor: '#E9E9EA',
		opacity: 1,
		transition: theme.transitions.create(['background-color'], {
			duration: 500,
		}),
		...theme.applyStyles('dark', {
			backgroundColor: '#39393D',
		}),
	},
}));

export default function CustomizedSwitches() {
	const dispatch = useDispatch();
	const { inStock } = useSelector((state) => state.booksList); // false
	const handleInStock = () => {
		dispatch(setInStock(!inStock)); // Переключаем значение
	};
	return (
		<FormGroup>
			<FormControlLabel
				control={<IOSSwitch sx={{ m: 0 }} />}
				sx={{ marginRight: 0 }}
				onClick={handleInStock}
				checked={inStock}
			/>
		</FormGroup>
	);
}
