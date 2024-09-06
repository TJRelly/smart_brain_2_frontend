/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
    console.debug("Alert", "type=", type, "messages=", messages);
    if (type === "danger") {
        type =
            "p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400";
    } else if (type === "success") {
        type =
            "p-4 my-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400";
    }

    return (
        <div className={`${type}`} role="alert">
            {messages.map((error) => (
                <p className={`mb-0 small pb-2`} key={error}>
                    {error}
                </p>
            ))}
        </div>
    );
}

export default Alert;
