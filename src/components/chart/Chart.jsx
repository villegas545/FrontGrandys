import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

/* const labels = [
    '2022/08/01',
    '2022/08/02',
    '2022/08/03',
    '2022/08/04',
    '2022/08/05',
    '2022/08/06',
    '2022/08/07'
];
*/
/* export const dataChart =[
    labels,
    datasets: [
        {
            label: 'El paso',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            yAxisID: 'y'
        },
        {
            label: 'Las Cruces',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            borderColor: 'rgb(88, 209, 31)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1'
        },
        {
            label: 'Oklahoma',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            borderColor: 'rgb(142, 31, 209)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1'
        },
        {
            label: 'Moore',
            data: labels.map(() => faker.datatype.number({min: 0, max: 1000})),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            yAxisID: 'y1'
        }
    ]
}; */
const Chart = ({data, field, nameField}) => {
    console.log(data);
    // eslint-disable-next-line no-return-assign
    data = data.filter((row) => row.id !== 0);
    data = data.map((restaurant) => {
        restaurant.Checks = restaurant.Checks.filter(
            (row) => row.date !== 'Total'
        );
        return restaurant;
    });

    console.log(data);
    const labels = data[0].Checks.map((check) => check.date);
    const randomNumbers = () => faker.datatype.number({min: 0, max: 254});

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        stacked: false,
        plugins: {
            title: {
                display: true,
                text: nameField
            }
        },
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'right'
            }
        }
    };

    const dataExtract = data.map((checks) => {
        const colors = {
            c1: randomNumbers(),
            c2: randomNumbers(),
            c3: randomNumbers()
        };

        return {
            label: checks.name.toUpperCase(),
            data: checks.Checks.map((check) => Number(check[field])),
            borderColor: `rgb(${colors.c1}, ${colors.c2}, ${colors.c3})`,
            backgroundColor: `rgba(${colors.c1}, ${colors.c2}, ${colors.c3}, .8)`,
            yAxisID: `y`
        };
    });

    const dataChart = {
        labels,
        datasets: dataExtract
    };
    return <Line options={options} data={dataChart} />;
};
export default React.memo(Chart);
