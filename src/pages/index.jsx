import Slide from '../components/Slide';
import slides from '../slides/slides.json';

export default function Home(){
 return slides.map((s,i)=>(<Slide key={i} {...s}/>))
}