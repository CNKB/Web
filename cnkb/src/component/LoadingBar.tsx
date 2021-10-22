import Loader from "react-loader-spinner"

const LoadingBar = ({flag, size, element}: any) => {
	return (
		flag ? (
			<Loader type="Oval"
				color="grey"
				width={size}
				height={size}
			/>
		) : (
			<>
				{element}
			</>
		)
	)
}

export default LoadingBar