import React from 'react';
import DropdownFilter from '../DropdownFilter/DropdownFilter';
import RangeSlider from '../RangeSlider/RangeSlider';
import SwitchSection from '../SwitchSection/SwitchSection';
import SearchBar from '../SearchBar/SearchBar';

const FilterMobile = () => {
	return (
		<div style={{ padding: '0 10px' }}>
			<SearchBar />
			<DropdownFilter />
			<RangeSlider />
			<SwitchSection />
		</div>
	);
};

export default FilterMobile;
