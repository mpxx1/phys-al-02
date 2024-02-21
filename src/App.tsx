import './App.css'
import {useState} from "react";
import {Axis, Heading, Legend, LineSeries, Plot} from "react-plot";


type Point = {
    x: number
    y: number
}

function App() {

    const m0 = 1.257e-6;

    const B = (
        x:          number,
        radius:     number,
        turns:      number,
        amperage:   number
    ) =>  {

        return (
            (m0 * turns * amperage * Math.pow(radius, 2)) / (2 * Math.pow(radius * radius + x * x, 1.5))
        );
    }

    const [radius,      setRadius   ] = useState("");
    const [turns,       setTurns    ] = useState("");
    const [amperage,    setAmperage ] = useState("");

    const rangeB = (
        startX:     number,
        endX:       number,
        step:       number,
        radius:     number,
        turns:      number,
        amperage:   number
    ) => {

        const x: number[] = [];
        for (let i = startX; i <= endX; i += step)
            x.push(i);

        const b = x.map(x => B(x, radius, turns, amperage));

        const plotData: Point[] = [];
        for (let i = 0; i <= x.length - 1; i++) {
            plotData.push({x: x[i], y: b[i]})
        }

        return plotData;
    }

    const plot = () => {
        const rad: number = Number.parseFloat(radius);
        const trn: number = Number.parseFloat(turns);
        const amp: number = Number.parseFloat(amperage);

        return rangeB(-10, 10, 0.5, rad, trn, amp);
    }

    return (
    <div className={"wrapper"}>
        <div className={"inputWrapper"}>
            <div>
                <label> Enter values to see the plot </label>
                <input
                    placeholder={"Radius"}
                    value={radius}
                    onChange={(event) => setRadius(event.target.value)}
                />
            </div>
            <div>
                <input
                    placeholder={"Turns"}
                    value={turns}
                    onChange={(event) => setTurns(event.target.value)}

                />
            </div>
            <div>
                <input
                    placeholder={"Amperage"}
                    value={amperage}
                    onChange={(event) => setAmperage(event.target.value)}

                />
            </div>
        </div>

        <div>

            <Plot
                width={800}
                height={800}
            >

                <Heading
                    title={"Helmholtz coils magnetic field voltage"}

                ></Heading>

                <LineSeries
                    data={plot()}
                    xAxis="x"
                    yAxis="y"
                    lineStyle={{ strokeWidth: 3 }}
                    label="B(x)"
                    displayMarkers={false}
                />
                <Axis
                    id="x"
                    position="bottom"
                    label="x, m"
                    displayPrimaryGridLines
                />
                <Axis
                    id="y"
                    position="left"
                    label="B, T"
                    displayPrimaryGridLines
                />
                <Legend position="right" />

            </Plot>

        </div>
    </div>
    )
}

export default App
