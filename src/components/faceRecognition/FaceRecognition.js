import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
    return (
        <div className="relative flex justify-center">
            <div className="absolute shadow-5 ma3" style={{ maxWidth: 800 }}>
                <img alt="" src={imageUrl} id="inputimage" />
                {boxes.map((box) => (
                    <div
                        key={box.id}
                        className="bounding-box"
                        style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default FaceRecognition;
