import styled from "styled-components";
import { useState } from "react";
import Slider from '@mui/material/Slider';

export default function FilterComponent () {

  const useFilter = (initialValue, minValue, maxValue) => {
    const [filterValue, setFilterValue] = useState(initialValue);
  
    const handleChange = (event, newValue) => {
      setFilterValue(newValue);
    };
  
    const handleReset = () => {
      setFilterValue(initialValue);
    };
  
    return [filterValue, handleChange, handleReset, minValue, maxValue];
  };

const filters = [
  { id: 1, initialValue: [0, 250000], min: 0, max: 250000, title: "Kilometrage" },
  { id: 2, initialValue: [2000, 150000], min: 2000, max: 150000, title: "Prix" },
  { id: 3, initialValue: [2000, 2023], min: 2000, max: 2023, title: "Année"},
];
  
  return (
    <div>
      {filters.map((filter) => {
        // useFilter is useFilter(initialValue, minValue, maxValue) = [filterValue, handleChange, handleReset, minValue, maxValue]
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const filterProps = useFilter(filter.initialValue, filter.min, filter.max);
   return (
   <Filters key={filter.id}>
      <TitleFilters>{filter.title}</TitleFilters>
        <Slider
            className="range-slider"
            value={filterProps[0]}
            onChange={filterProps[1]}
            valueLabelDisplay="auto"
            min={filterProps[3]}
            step={1}
            max={filterProps[4]}
          />
        <Displayfilters>
          <SmallText>{filterProps[0].join(' - ')}</SmallText>
          <ResetBtn onClick={filterProps[2]}>Réinitialiser</ResetBtn>
        </Displayfilters>
    </Filters>
   );
      })};
    </div>
  );
};

// FILTERS
const Filters = styled.div`
margin: 20px 0 0 20px;
& .range-slider{
  width: 320px;
  margin: 20px 0 0 20px;
  color: ${(props) => props.theme.mainColor};
  @media screen and (max-width: 576px){
    font-size: 16px;
    width: 200px;
  }
}
`;
const TitleFilters = styled.h2`
font-size: 20px;
font-weight: 600;
font-family: barlow;
@media screen and (max-width: 576px){
  font-size: 16px;
}
`;

const Displayfilters = styled.div`
display: flex;
justify-content: space-between;
width: 350px;
@media screen and (max-width: 576px){
  font-size: 16px;
  width: 230px;
}
`;

const SmallText = styled.div`
margin-top: 7px;
font-size: 15px;
@media screen and (max-width: 576px){
  font-size: 13px
}
`;
const ResetBtn = styled.button`
background-color: #242425;
padding: 5px;
color: #F5CB5C;
border: none;
cursor: pointer;
`;
