import styled from "styled-components";
import { Slider } from "@mui/material";

export default function FilterSlider({ value, onChange, min, max, title, resetBtn }) {
  return (
      <Filters>
        <TitleFilters>{title}</TitleFilters>
        <Slider
          className="range-slider"
          value={value}
          onChange={onChange}
          valueLabelDisplay="auto"
          min={min}
          step={1}
          max={max}
        />
        <Displayfilters>
          <SmallText>{value.join(" - ")}</SmallText>
          <ResetBtn onClick={resetBtn}>Réinitialiser</ResetBtn>
        </Displayfilters>
        </Filters>
  );
};
const Filters = styled.div`
margin: 20px 0 0 20px;
& .range-slider{
  width: 270px;
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
width: 300px;
margin: 10px 0 10px 0;
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



