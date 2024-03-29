import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import InputBase from '@mui/material/InputBase';

const SearchContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(grey[600], 0.15),
	'&:hover': {
		backgroundColor: alpha(grey[600], 0.25),
	},
	marginLeft: 0,
	width: '18vw',
	minWidth: '10vw',
	display: 'flex',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: grey[500],
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: grey[900],
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
	},
}));

export default function Search({ value, onChange, inputProps, inputRef }) {
	return (
		<SearchContainer>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				fullWidth
				placeholder="검색"
				value={value}
				onChange={onChange}
				inputProps={inputProps}
				inputRef={inputRef}
			/>
		</SearchContainer>
	);
}