import styled, {keyframes} from "styled-components";

export const AnimWrapperBG = keyframes`
0%{
background-position:100px 200px;  
}

100%{
background-position:1000px 200px;  
}
`

export const MainWrapper = styled.div`
background: rgb(22,22,23);
background: linear-gradient(90deg, rgba(22,22,23,1) 0%, rgba(27,44,48,1) 27%, rgba(20,20,25,1) 46%, rgba(0,0,0,1) 69%, rgba(17,43,51,1) 84%, rgba(22,22,23,1) 100%);
background-position:150px 0px;
animation:${AnimWrapperBG} 10s alternate infinite;
`

export const BaseWrapper = styled.div`
background: rgba(0,0,0,0.3);
display:flex;
flex-flow:row wrap;
width: 100%;
`

export const CenterWrapperStart = styled.div`
justify-content:center;
align-items:center;
display:flex;
flex-direction:column;
width: 100%;
`


export const GeneralDescription = styled.p`
color:#fff;
font-size:15px;
max-width:550px;
text-align:center;
font-style:italic;
`

export const CardsWrapper = styled.div`
justify-content:center;
align-items:center;
display:flex;
width: 100%;
@media screen and (max-width: 767px) {
  flex-direction:column;

}
`
export const CardsWrapperEnd = styled.div`
justify-content:center;
align-items:center;
display:flex;
width: 100%;

`
export const SocialMediaWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1100px;

  @media screen and (max-width: 767px) {
    margin:0;
    flex-direction: row;
    justify-content: center;
  }
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

export const CardStructure = styled.div`
background-position: -80px 0 ;
margin: 2px 35px;
padding:5px;
justify-content:center;
align-items:center;
display:flex;
flex-direction:column;
`
export const CardTitle = styled.p`
color:#fff;
font-size:20px;
text-align:center;
font-style:italic;
text-shadow: 0 0 5px #fff, 0 0 3px #fff;
@media screen and (max-width: 767px){
  font-size:30px;
}
`
export const CardTitle2 = styled.p`
color:#fff;
font-size:24px;
text-align:center;
font-style:bold;
//font-weight:400;
text-shadow: 0 0 5px #fff, 0 0 3px #fff;
@media screen and (max-width: 767px){
  font-size:30px;
  margin-left:60px;
}
`
export const ImgWrapperCard = styled.div`
justify-content:center;
align-items:center;
perspective:1000px;
`

export const AnimCardImg = keyframes`
0%{
 transform: translateZ(-10px);
}

100%{
  transform: translateZ(15px);
}
`

export const CardImg = styled.img`
height:180px;
animation:${AnimCardImg} 0.5s alternate infinite;

`
export const CardDescription = styled.p`
color:#fff;
font-size:15px;
max-width:250px;
text-align:center;
font-style:italic;
`

export const ButtonsDiv = styled.div`
display:flex;
justify-content:center;
align-items:center;
`
export const BotonVote = styled.button`
  margin: 0 6px;
  padding: 3px 9px;
  background: rgb(16,45,52);
  background: linear-gradient(90deg, rgba(16,45,52,1) 15%, rgba(20,20,25,1) 46%, rgba(23,52,61,1) 83%);
  border-radius: 10px;
  color: white;
  font-size: 15px;
  border: #12BBE1 1px solid;
  transition: 0.6s ease-in-out;
  cursor:pointer;
  &:hover {
    background: rgb(137,180,190);
    background: linear-gradient(90deg, rgba(137,180,190,1) 15%, rgba(172,237,255,1) 46%, rgba(129,198,219,1) 83%);
    color: #000;
    border: #acedff 1px dotted;
  }
`

