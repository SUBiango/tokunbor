import { ThreeDots } from 'react-loader-spinner'

function Loader() {
    return (
        <ThreeDots
            visible={true}
            height="40"
            width="40"
            color="#7c6a0a"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Loader