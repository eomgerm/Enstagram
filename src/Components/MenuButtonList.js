import MenuButton from './MenuButton';
import LogOutButton from './LogOutButton';
import List from '@mui/material/List';

export default function MenuButtonList({ currentPage }) {
	return (
		<>
			<List sx={{ borderBottom: 1, borderColor: 'grey.200' }}>
				<MenuButton isCurrent={'home' === currentPage} text="피드" icon="home" />
				<MenuButton isCurrent={'direct' === currentPage} text="다이렉트" icon="direct" />
				<MenuButton isCurrent={'settings' === currentPage} text="설정" icon="settings" />
			</List>
			<List>
				<LogOutButton />
			</List>
		</>
	);
}