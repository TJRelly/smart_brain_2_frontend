import "./NotFound.css";

const NotFound = () => {
    return (
        <div className="container max-w-2xl mx-auto my-24 flex-1 flex flex-col items-center justify-center px-8 py-8 rounded shadow-xl text-black w-full backdrop-blur-sm">
            <h1 className="text-white text-3xl text-center">
                Sorry... Page Not Found.
            </h1>
        </div>
    );
};

export default NotFound;
