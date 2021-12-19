import InputBase from '@mui/material/InputBase';
import { grey } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

const TextInputContainer = styled('div')(({ theme }) => ({
	position: 'relative',
	'&:hover': {
		backgroundColor: alpha(grey[600], 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
	display: 'flex',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: grey[900],
	'& .MuiInputBase-input': {
		padding: theme.spacing(1.5, 1),
		transition: theme.transitions.create('width'),
	},
}));

export default function PlainTextInput({
	onChange,
	value,
	multiline,
	placeholder,
	endAdornment,
	inputRef,
}) {
	return (
		<TextInputContainer>
			<StyledInputBase
				multiline={multiline}
				placeholder={placeholder}
				minRows={7}
				maxRows={7}
				autoFocus
				onChange={onChange}
				value={value}
				endAdornment={endAdornment}
				fullWidth
				inputRef={inputRef}
			/>
		</TextInputContainer>
	);
}