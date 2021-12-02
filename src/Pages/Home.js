import SideNavigation from '../Components/SideNavigation';
import Banner from '../Components/Banner';

export default function Home() {
	return (
		<>
			<Banner />
			<SideNavigation currentPage="home" />
		</>
	);
}