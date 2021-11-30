import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';

export default function Loading() {
	return (
		<Container sx={{ display: 'flex', color: 'blue.500', height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
			<CircularProgress />
		</Container>
	);
}