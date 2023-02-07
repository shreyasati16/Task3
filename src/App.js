import React from "react";
import "./App.css";

const App = () => {
    const [studData, setStudData] = React.useState([]);
    const [presentPageData, setPresentPageData] = React.useState([]);
    const [presentPageVal, setPresentPageVal] = React.useState(1);

    const getData = async () => {
        let dat = await fetch(
            "https://63e0bacd59bb472a74278f0f.mockapi.io/api/v1/students"
        );
        dat = await dat.json();
        setStudData(dat);
        setPresentPageData(dat.slice(0, 5));
    };

    const sortData = () => {
        let sortedDat = studData.sort((a, b) => a.class - b.class);
        setStudData(sortedDat);
        setPresentPageData(
            sortedDat.slice(presentPageVal * 5 - 5, presentPageVal * 5)
        );
    };

    const onPageChange = (pageVal) => {
        setPresentPageVal(pageVal);
        setPresentPageData(studData.slice(pageVal * 5 - 5, pageVal * 5));
    };

    React.useEffect(() => {
        getData();
    }, []);
    return (
        <div className="val-table">
            <button onClick={sortData}>Sort by Class</button>
            <h2>Fake Student Data</h2>
            <table>
                <thead>
                    <tr>
                        <th>Avatar</th>
                        <th>Name</th>
                        <th>Class</th>
                        <th>Marks</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {presentPageData &&
                        presentPageData.map((data, i) => (
                            <tr key={i}>
                                <td>
                                    <img
                                        src={data.avatar}
                                        alt="avatar"
                                        className="avatar"
                                    />
                                </td>
                                <td>{data.name}</td>
                                <td>{data.class}</td>
                                <td>{data.marks}</td>
                                <td>{data.phone}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div>
                {[...Array(Math.ceil(studData.length / 5))].map((val, ind) => (
                    <button
                        className={
                            ind + 1 == presentPageVal
                                ? "pagination-button selected"
                                : "pagination-button"
                        }
                        key={ind}
                        onClick={() => onPageChange(ind + 1)}
                    >
                        {ind + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default App;
