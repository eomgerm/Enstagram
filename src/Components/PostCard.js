export default function PostCard({ postObj }) {
	const {
		avataImageURL,
		displayName,
		attachmentURL,
		likes,
		comments,
		shares,
		saves,
		text,
	} = postObj;
	return (
		<Card
			sx={{
				display: 'flex',
				backgroundColor: 'white',
				borderRadius: 2,
				flexDirection: 'column',
			}}
		>
			<CardHeader
				avatar={
					<Avatar
						src={userObj.photoURL}
						sx={{ width: 45, height: 45, border: 2, borderColor: 'grey.300' }}
					/>
				}
				action={
					<IconButton>
						<MoreHorizIcon color="black" />
					</IconButton>
				}
				title={<Typography>{userObj.displayName}</Typography>}
				subheader={<Typography sx={{ fontSize: 12, color: 'grey.400' }}>서울시</Typography>}
				sx={{ px: 2.5, pt: 2.5 }}
			/>
			<Box sx={{ px: 2.5 }}>
				<CardMedia
					component="img"
					image="https://images.unsplash.com/photo-1639166149432-d4f5adb72055?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
					sx={{ borderRadius: 2 }}
					height="883"
				/>
			</Box>
			<CardActions sx={{ display: 'flex', justifyContent: 'space-between', px: 2.5, pb: 0 }}>
				<ThemeProvider theme={actionBtnTheme}>
					<Button startIcon={<FavoriteBorderRoundedIcon />}>24.5k 좋아요</Button>
					<Button startIcon={<ChatOutlinedIcon />}>452 댓글</Button>
					<Button startIcon={<ShareRoundedIcon />}>265 공유</Button>
					<Button startIcon={<BookmarkBorderRoundedIcon />}>15 보관</Button>
				</ThemeProvider>
			</CardActions>
			<CardContent
				sx={{
					px: 2.5,
					pt: 0.5,
					pb: 1,
					'&:last-child': {
						paddingBottom: 0,
					},
				}}
			>
				<Typography>
					Lorem ipsum blahblah this is the content of the post. please follow me hello~
				</Typography>
			</CardContent>
			<CardActions sx={{ px: 2.5, pb: 2.5 }}>
				<Avatar
					src={userObj.photoURL}
					sx={{ width: 40, height: 40, border: 2, borderColor: 'grey.300' }}
				/>
				<CommentInputContainer>
					<StyledInputBase
						placeholder="댓글 달기..."
						endAdornment={
							<InputAdornment position="end">
								<Stack direction="row">
									<IconButton>
										<InsertPhotoOutlinedIcon />
									</IconButton>
									<IconButton>
										<CreateRoundedIcon />
									</IconButton>
								</Stack>
							</InputAdornment>
						}
					/>
				</CommentInputContainer>
			</CardActions>
		</Card>
	);
}