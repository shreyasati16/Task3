import { all } from "axios";
import React from "react";
import "./App.css";

const App = () => {
    const [studData, setStudData] = React.useState([]);
    const [presentPageData, setPresentPageData] = React.useState([]);
    const [presentPageVal, setPresentPageVal] = React.useState(1);
    const [filterParam, setFilterParam] = React.useState(["All"]);
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
            <h2> Student Data</h2>
            <select
    /*
    // here we create a basic select input
    // we set the value to the selected value
    // and update the setFilterParam() state every time onChange is called
    */
      onChange={(e) => {
      setFilterParam(e.target.value);
       }}
       className="custom-select"
       aria-label="Filter Student by Class">
        <option value="All">Filter By class</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        </select>
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
