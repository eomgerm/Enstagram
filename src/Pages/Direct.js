import SideNavigation from '../Components/SideNavigation';
import Banner from '../Components/Banner';

export default function Direct() {
	return (
		<>
			<Banner />
			<SideNavigation currentPage="direct" />
		</>
	);
}