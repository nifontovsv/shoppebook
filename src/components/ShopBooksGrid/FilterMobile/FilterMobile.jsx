import React from 'react';
import DropdownFilter from '../DropdownFilter/DropdownFilter';
import RangeSlider from '../RangeSlider/RangeSlider';
import SwitchSection from '../SwitchSection/SwitchSection';
import SearchBar from '../SearchBar/SearchBar';

const FilterMobile = () => {
	return (
		<div>
			<SearchBar />
			<DropdownFilter />
			<RangeSlider />
			<SwitchSection />
		</div>
	);
};

export default FilterMobile;
