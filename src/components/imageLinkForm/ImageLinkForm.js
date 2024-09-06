import "./ImageLinkForm.css";

import { useState, useContext } from "react";

import Logo from "../logo/Logo";
import Rank from "../rank/Rank";
import FaceRecognition from "../faceRecognition/FaceRecognition";
import UserContext from "../../auth/UserContext";
import Alert from "../../common/Alert";

const ImageLinkForm = ({ handleImage, handleIncrement }) => {
    const { currentUser, entries, setEntries } = useContext(UserContext);

    const [formData, setFormData] = useState({ input: "" });
    const [formErrors, setFormErrors] = useState([]);
    const [boxes, setBoxes] = useState([]);
    const [imageUrl, setImageUrl] = useState(null);

    console.debug(
        "ImageLinkForm",
        "handleImage=",
        typeof handleImage,
        "formData=",
        formData,
        "formErrors",
        formErrors,
        "entries",
        entries
    );

    /** Handle form submit:
     *
     * Calls login func prop and, if successful, redirect to /companies.
     */

    async function handleSubmit(evt) {
        if (evt) evt.preventDefault();
        try {
            setBoxes([]);
            setImageUrl(formData.input);
            let result = await handleImage(formData);
            if (result.data) {
                const faceBoxes = calculateFaceLocation(result.data);
                displayFaceBox(faceBoxes);
                handleIncrement({ id: currentUser.id });
                setEntries((entries) => entries + 1); // increment entries
                setFormErrors([]); // reset form errors (if any)
            } else {
                setFormErrors(["Invalid url, please try again"]);
            }
        } catch (error) {
            setFormErrors([error.message]); // Set the error message
        }
        setFormData({ input: "" });
    }

    /** Update form data field */
    function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData((data) => ({ ...data, [name]: value }));
    }

    function calculateFaceLocation(data) {
        const image = document.getElementById("inputimage");
        const { width, height } = image.getBoundingClientRect();
        const regions = JSON.parse(data).outputs[0].data.regions;
        // Check if regions are present
        if (!regions || regions.length === 0) {
            throw new Error("No face regions detected/API unable to process."); // Throw an error if no regions
        }

        return regions.map(
            ({ region_info: { bounding_box: clarifaiFace } }) => ({
                leftCol: clarifaiFace.left_col * width,
                topRow: clarifaiFace.top_row * height,
                rightCol: width - clarifaiFace.right_col * width,
                bottomRow: height - clarifaiFace.bottom_row * height,
            })
        );
    }

    const displayFaceBox = (boxes) => setBoxes(boxes);

    return (
        <div className="px-2">
            <Logo />
            <Rank name={currentUser.username} entries={entries} />
            <form onSubmit={handleSubmit} id="image-link-form">
                <p className="f4 mt-6 text-white backdrop-blur-sm w-fit mx-auto px-2">
                    {
                        "This Magic Brain will detect faces in your pictures. Give it a try!"
                    }
                </p>
                <div
                    id="search-div"
                    className="w-11/12 md:w-8/12 mx-auto my-6 shadow-xl p-2 backdrop-blur-sm"
                >
                    <div className="flex justify-center" autoComplete="off">
                        {/* Search Field */}
                        <input
                            id="search-field"
                            name="input"
                            type="text"
                            placeholder="Copy image address here..."
                            className="p-2 mr-1 text-gray-600 w-3/4"
                            onChange={handleChange}
                            value={formData.input}
                            autoComplete="on"
                        />
                        {/* Detect Button */}
                        <button
                            type="submit"
                            className="white pointer p-2 m-auto w-1/4 bg-blue-400 hover:text-white hover:bg-[#da59da] ease-in duration-200 tracking-wide"
                        >
                            Detect
                        </button>
                    </div>
                    {formErrors.length ? (
                        <div className="mt-4">
                            <Alert type="danger" messages={formErrors} />
                        </div>
                    ) : null}
                </div>
                <FaceRecognition boxes={boxes} imageUrl={imageUrl} />
            </form>
        </div>
    );
};

export default ImageLinkForm;
