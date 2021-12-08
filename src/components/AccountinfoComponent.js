import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { BsArrowBarUp } from "react-icons/bs";
import { useRef } from 'react'
import Papa from 'papaparse'
import DetailsComponent from './DetailsComponent';
import * as api from '../api';



export default function AccountinfoComponent() {
    const [isUploaded, setUploaded] = useState(false);
    const [isActive, setActive] = useState();
    const [isDataUploaded, setDataUploaded] = useState([]);
    const [isAccounts, setAccounts] = useState([]);
    const [isTotalBalance, setTotalBalance] = useState([]);
    const [isGrossBalance, setGrossBalance] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState([]);
    const account = 'Conto';
    const currencyType = 'Divisa';
    const type = 'Tipo';
    const net = 'Valore netto';
    const tax = 'Imposte';
    const commission = 'Commissioni';

    const today = new Date(),

        date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
    useEffect(() => {
        getCurrencies();
        getLatestRates();
        getDailyRates();
        if (isDataUploaded.length) {
            setUploaded(true);

            getAccounts();

        }
    }, [isDataUploaded, selectedAccount,]);

    const getCurrencies = () => {
        api.fetchCurrency('currencies').then(res => {
            console.log(res.data.currencies);
        })
    }

    const getLatestRates = () => {
        api.fetchLatestRates('latestRates', 'en').then(res => {
            console.log(res.data.latestRates)
        })
    }
    const getDailyRates = ()  => {
        const params = {
            date:'2021-11-05',
            baseCurrencyIsoCode: ['INR', 'USD'],
            currencyIsoCode: 'EUR',
            lang: 'en',
        }
        api.fetchDailyRates('dailyRates', params).then(res => {
            console.log(res.data.dailyRates);
        })
    }

    const getAccounts = () => {

        const accountArray = [];
        isDataUploaded.forEach(element => {
            if (!accountArray.some(item => item === element[account]) && element[account] !== undefined) {
                accountArray.push(element[account])
            }
        });
        setAccounts(accountArray);
        calculateBalance(isDataUploaded, accountArray)
    }

    const handleCard = (e) => {
        const filter = []
        setActive(e.account);
        isGrossBalance.forEach(element => {
            if (element.account === e.account) {

                filter.push({ 'currency': '€', 'amount': element.euro, 'tax': element.eurotax, 'commission': element.eurocommission }, { 'currency': '$', 'amount': element.usd, 'tax': element.usdtax, 'commission': element.usdcommission });
            }
            setSelectedAccount(filter)
        })

    }
    const calculateBalance = (dataset, accountArray) => {
        let usdCredited = 0;
        let usdDebited = 0;
        let euroCredited = 0;
        let euroDebited = 0;
        let usdCommission = 0;
        let usdTax = 0;
        let euroCommission = 0;
        let euroTax = 0;
        const totBalance = [];
        const totGross = [];
        accountArray.forEach(element => {
            if (element) {
                dataset.forEach(item => {
                    if (item[account] === element) {
                        if (item[currencyType] === 'USD') {
                            usdCommission = usdCommission + parseInt(Math.abs(item[commission]));
                            usdTax = usdTax + parseInt(Math.abs(item[tax]));
                            if (item[type] === 'Versamento' || item[type] === 'Vendita') {
                                usdCredited = usdCredited + parseInt(item[net]);
                            } else {
                                usdDebited = usdDebited + parseInt(item[net]);
                            }

                        } else if (item[currencyType] === 'EUR') {
                            euroCommission = euroCommission + parseInt(Math.abs(item[commission]));
                            euroTax = euroTax + parseInt(Math.abs(item[tax]));
                            if (item[type] === 'Versamento' || item[type] === 'Vendita') {
                                euroCredited = euroCredited + parseInt(item[net]);
                            } else {
                                euroDebited = euroDebited + parseInt(item[net]);
                            }

                        }
                    }
                });
                totBalance.push({ 'account': element, 'usd': usdCredited - usdDebited, 'euro': euroCredited - euroDebited })
                totGross.push({ 'account': element, 'usd': usdCredited + usdDebited + usdTax + usdCommission, 'usdtax': usdTax, 'usdcommission': usdCommission, 'euro': euroCredited + euroDebited + euroTax + euroCommission, 'eurotax': euroTax, 'eurocommission': euroCommission })
            }
        })
        setTotalBalance(totBalance);
        setGrossBalance(totGross);
    }

    const fileInput = useRef();
    const handleClick = event => {
        fileInput.current.click();
        event.preventDefault();
    }
    const handleUpload = e => {
        e.preventDefault();
        const files = e.target.files;
        if (files) {
            Papa.parse(files[0], {
                header: true,
                complete: function (results) {
                    localStorage.setItem('user', JSON.stringify(results.data));
                    setDataUploaded(results.data)
                }
            })
        }
    }

    return (
        <div>
            {!isUploaded ?
                <Container style={{ marginTop: '40px' }}>
                    <Row>
                        <Col xs={12} md={6}>
                            <Container style={{ textAlign: 'left' }}>
                                <h1 style={{ fontSize: '50px', fontWeight: 'bold' }}>Import your transactions file with a few clicks</h1>
                                <p style={{ fontSize: '20px', opacity: '0.6', marginTop: '20px' }}>Upload is made easy for you</p>
                                <input
                                    type="file"
                                    ref={fileInput}
                                    accept=".csv,.xlsx,.xls"
                                    onChange={handleUpload}
                                    style={{ display: 'none' }}
                                />
                                <Button style={{ width: '13rem', height: '3.5rem', marginTop: '20px', fontSize: '20px', fontWeight: 'bold', borderRadius: '25px', backgroundColor: ' #ff9933', outline: 'none', border: '1px solid #fff' }} onClick={handleClick}><BsArrowBarUp style={{ fontSize: '25px', marginRight: '15px' }} /> IMPORT</Button>
                            </Container>
                        </Col>
                        <Col xs={12} md={6}>
                            <img alt="" src="illustration.png" />
                        </Col>
                    </Row>
                </Container>
                : <Container>
                    <h6 style={{ textAlign: 'left', margin: '20px', color: '#808080' }}>YOUR BALANCE</h6>
                    <div style={{ display: 'flex' }}>
                        {isTotalBalance.map(item => (<div style={{ width: '20rem', borderRadius: '8px', margin: '15px' }} className={item.account === isActive ? " active1" : ""} key={item.account} onClick={() => handleCard(item)}>
                            <Card>
                                <Card.Body style={{ textAlign: 'left' }}>
                                    <Card.Title style={{ color: '#ff9933' }}>Account: {item.account}</Card.Title>
                                    <p>Euro balance <br /> <b>€{item.euro}</b></p>
                                    <p>US dollars balance <br /> <b>${item.usd}</b></p>
                                    <p style={{ textAlign: 'right' }}>{date}</p>
                                </Card.Body>
                            </Card>
                        </div>))}
                    </div>
                    {selectedAccount.length ? <DetailsComponent tableData={selectedAccount} /> : null}

                </Container>
            }
        </div>
    )
}
