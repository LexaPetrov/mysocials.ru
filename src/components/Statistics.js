import { Chart } from "react-charts/dist/react-charts.development"


const Statistics = ({ data, axes, options, series }) => {
    return (
        <>
            <div
                style={{
                    maxWidth: '100%',
                    height: '450px',
                    marginTop: '20px'
                }}
            >
                <Chart data={data} axes={axes} options={options} tooltip />

            </div>
            <div
                style={{
                    maxWidth: '100%',
                    height: '450px',
                    marginTop: '20px'
                }}
            >
                <Chart data={data} series={series} axes={axes} options={options} tooltip />
            </div>
        </>
    )
}

export default Statistics