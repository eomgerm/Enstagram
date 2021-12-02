import SideNavigation from '../Components/SideNavigation';
import Banner from '../Components/Banner';

export default function Settings() {
	return (
		<>
			<Banner />
			<SideNavigation currentPage="settings" />
		</>
	);
}