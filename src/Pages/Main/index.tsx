import Header from "../../containers/header";
import About from "../../containers/about/About.tsx";
import Footer from "../../containers/footer";
import Center from "../../containers/center";
import {useCallback, useState} from "react";

const Main = () => {
	const [clickCount, setClickCount] = useState<number>(0);

	const handleClick = useCallback(() => {
		setClickCount(clickCount + 1);
	}, [clickCount]);

	return (
		<div className="main_page" onClick={handleClick}>
			<Header/>
			<About/>
			<Center/>
			<Footer/>
		</div>
	)
};

export default Main;
