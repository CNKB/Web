interface Props {
	children?: any
}

const Container = ({children}: Props) => {
	return (
		<>
			{children}
		</>
	);
}

export default Container;