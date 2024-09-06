import LoadingScreen from "react-loading-screen";

const LoadingSpinner = ({ loading }) => {
    return (
        <LoadingScreen
            loading={loading}
            bgColor="transparent"
            spinnerColor="#ffffff"
            textColor="#ffffff"
            logoSrc=""
            text="Loading your content..."
        />
    );
};

export default LoadingSpinner;
