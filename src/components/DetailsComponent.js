import React, { useState } from 'react'
import { Container, Button, Card, Table } from 'react-bootstrap';
import * as d3 from "d3";
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import './styles.css';
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";


export default function DetailsComponent({ tableData }) {
    const [showResults, setShowResults] = useState(true)
    const onClickToggle = () => {
        showResults ? setShowResults(false) : setShowResults(true);
    }
    const doc = new jsPDF()

    const handleClick = (item) => {
        doc.autoTable({
            head: [['Currency', 'Gross Amount', 'Tax', 'Commission']],
            body: [
                [item.currency, item.amount, item.tax, item.commission]
            ],
        })

        doc.save('table.pdf')
    },
        LineChart = () => {
            const width = 350, height = 350, margin = 20;
            const h = height - 2 * margin, w = width - 2 * margin;
            const data = [
                { a: 1, b: 3 },
                { a: 2, b: 6 },
                { a: 3, b: 2 },
                { a: 4, b: 12 },
                { a: 5, b: 8 }
            ];

            const xFormat = d3.format('.2')

            const x = d3.scaleLinear()
                .domain(d3.extent(data, d => d.a))
                .range([margin, w])

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.b)])
                .range([h, margin]);

            const line = d3.line()
                .x(d => x(d.a))
                .y(d => y(d.b))
                .curve(d3.curveCatmullRom.alpha(0.1));

            const xTicks = x.ticks(2).map(d => (
                x(d) > margin && x(d) < w ?
                    <g key={d} transform={`translate(${x(d)},${h + margin})`}>
                        <text>{xFormat(d)}</text>
                        <line x1='0' x2='0' y1='0' y2='5' transform="translate(0,-20)" />
                    </g>
                    : null
            ))

            const yTicks = y.ticks(2).map(d => (
                y(d) > 10 && y(d) < h ?
                    <g key={d} transform={`translate(${margin},${y(d)})`}>
                        <text x="-12" y="5">{xFormat(d)}</text>
                        <line x1='0' x2='5' y1='0' y2='0' transform="translate(-5,0)" />
                    </g>
                    : null
            ))

            return (
                <Card style={{ width: '30rem', borderRadius: '8px', margin: '15px' }}>
                    <Card.Body style={{ textAlign: 'left' }}>
                        <Container className="buttonContainer">
                            <Button className="currencyButton">EUR</Button>
                            <Button className="currencyButton">USD</Button>
                        </Container>
                        <svg className="svg1" width={width} height={height}>
                            <line className="axis" x1={margin} x2={w} y1={h} y2={h} />
                            <line className="axis" x1={margin} x2={margin} y1={margin} y2={h} />
                            <path className="path1" d={line(data)} />
                            <g className="axis-labels">
                                {xTicks}
                            </g>
                            <g className="axis-labels">
                                {yTicks}
                            </g>
                        </svg>
                    </Card.Body>
                </Card>
            )
        }
    return (
        <div>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Table>
                    <thead style={{ background: '#E8E8E8', color: '#808080' }}>
                        <tr>
                            <th></th>
                            <th>Gross Amount</th>
                            <th>Tax</th>
                            <th>Commission</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map(item => (
                            <tr key={item.amount} >
                                <td>{item.currency}</td>
                                <td>{item.amount}</td>
                                <td>{item.tax}</td>
                                <td>{item.commission}</td>
                                <td onClick={() => handleClick(item)}><img alt="" style={{ width: '1rem', cursor: 'pointer' }} src="print_icon.svg" />PRINT</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div style={{ marginTop: '40px' }}>
                {showResults ? <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#808080'}} onClick={onClickToggle}>Show less <BsCaretUpFill /></p> :
                    <p style={{ textAlign: 'left', fontWeight: 'bold',  color: '#808080' }} onClick={onClickToggle}>Show <BsCaretDownFill /></p>}

                {showResults ? 
                <div>
                <hr /> 
                <LineChart /> 
                </div>
                : null}
            </div>

        </div>
    )
}
