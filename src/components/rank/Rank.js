const Rank = ({name, entries}) => {
    return (
        <div>
            <div className="white f3 w-fit m-auto backdrop-blur-sm">
               <p className="text-3xl">Hello, {name}</p>
               <p>Your current entry count is:</p>
            </div>
            <div className="white f1 w-fit m-auto backdrop-blur-sm">
                {entries}
            </div>
        </div>
    )
}

export default Rank;